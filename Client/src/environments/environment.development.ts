export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api',
  maxLoginAttempts: 5,
  useCache: true,
  isEditMode: true,
  stripePublisableKey: process.env.NG_APP_STRIPE_PUBLISABLE_KEY,
}
