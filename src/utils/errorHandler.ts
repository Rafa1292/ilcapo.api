
export const errorHandler = (error: any): any => {
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
