import { createReducer, on } from '@ngrx/store'
import { Basket, IBasket, IBasketTotals } from '@/types'
import ACTIONS from '../actions/basket'

export interface IBasketState extends IBasketTotals {
  basket: IBasket
}

const initialState = (): IBasketState => ({
  basket: new Basket(),
  shipping: 0,
  subtotal: 0,
  total: 0,
})

export default createReducer<IBasketState>(
  initialState(),
  on(ACTIONS.saveItemToBasket, (state, { item, increase }) => {
    // Increase product quantity if already exists in the basket
    const existenceItem = state.basket.items.find((i) => i.id === item.id)
    if (existenceItem) {
      const newQuantity = increase
        ? existenceItem.quantity + item.quantity
        : existenceItem.quantity - item.quantity

      return {
        ...state,
        basket: {
          ...state.basket,
          items: [
            ...state.basket.items.filter((i) => i.id !== item.id),
            { ...item, quantity: newQuantity },
          ],
        },
      }
    }

    // Add item
    return {
      ...state,
      basket: {
        ...state.basket,
        items: [...state.basket.items, item],
      },
    }
  }),

  on(ACTIONS.updateBasketSuccess, (state, { basket }) => {
    const subtotal = basket.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    const total = subtotal + state.shipping

    return {
      ...state,
      basket,
      subtotal,
      total,
    }
  }),

  on(ACTIONS.deleteBasketSuccess, () => ({ ...initialState() }))
)
