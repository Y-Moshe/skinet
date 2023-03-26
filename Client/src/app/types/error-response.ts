export interface IErrorResponse {
  message: string
  statusCode: number
}

export interface ILoginErrorResponse extends IErrorResponse {
  attemptsCount: number
  isLockedOut: boolean
}
