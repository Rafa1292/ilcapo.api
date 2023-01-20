export class CustomResponse<T> {
  public content: T | null = null
  public message: string = ''
  public error: boolean = true

  setResponse (content: T, message: string, error: boolean): void {
    this.setContent(content)
    this.setMessage(message)
    this.setError(error)
  }

  setContent (content: T): void {
    this.content = content
  }

  setMessage (message: string): void {
    this.message = message
  }

  setError (error: boolean): void {
    this.error = error
  }
}
