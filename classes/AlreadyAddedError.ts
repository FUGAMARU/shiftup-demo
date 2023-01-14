class AlreadyAddedError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export default AlreadyAddedError