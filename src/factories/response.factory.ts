import { CustomResponse } from '../utils/genericTypes/response.type'

export const toNewCustomResponse = (): CustomResponse<any> => {
  try {
    return new CustomResponse<any>()
  } catch (error) {
    return {
      content: undefined,
      message: [''],
      error: true,
      setContent (content: any): void {
        this.content = content
      },
      setMessage (message: string[]): void {
        this.message = message
      },
      setError (error: boolean): void {
        this.error = error
      },
      setResponse (content: any, message: string[], error: boolean): void {
        this.setContent(content)
        this.setMessage(message)
        this.setError(error)
      }
    }
  }
}
