class DreamError extends Error {
  private firstStack: string | undefined = undefined;

  constructor(
    msg: string,
    cause?: Error,
    public metadata?: Record<string, unknown>,
  ) {
    super(msg);

    Object.setPrototypeOf(this, DreamError.prototype);

    if (cause !== undefined) {
      const subMessage =
        cause instanceof Error
          ? cause.message
          : `non-error object thrown: ${JSON.stringify(cause)}`;
      this.message = `${this.message}: ${subMessage}`;

      if (!this.firstStack) {
        this.firstStack = cause.stack;
      }
    }

    this.stack = this.firstStack;

    this.metadata = {
      ...(cause instanceof DreamError ? cause.metadata : {}),
      ...metadata,
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public log() {
    const noMetadata =
      !this.metadata || Object.entries(this.metadata).length === 0;

    if (noMetadata) {
      console.error(this.message);
    } else {
      console.error(this.message, this.metadata);
    }
  }
}

export default DreamError;
