export const errorHandler = (error: any): any => {
  if (error.name === 'UnauthorizedError' && error.inner.name === 'TokenExpiredError') {
    return ['No tienes autorizacion para esta accion']
  }

  if (error?.errors?.length > 0) {
    const errors: string[] = error.errors.map((err: any) => {
      return err.message
    })
    return errors
  }

  if (error instanceof Error) {
    return [error.message]
  }
}
