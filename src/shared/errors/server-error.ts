interface SeverErrorProps {
  message: string;
  statusCode: number;
}

class ServerError extends Error {
  message: string;
  statusCode: number;

  constructor(props: SeverErrorProps) {
    super(props.message);

    this.message = props.message;
    this.statusCode = props.statusCode;

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export default ServerError;
