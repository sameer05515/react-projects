export class ValidationError extends Error {
    data: any;
    statusCode: number;
  
    constructor(message: string, data: any = null) {
      super(message);
      this.name = "ValidationError";
      this.data = data; // Optional data field
      this.statusCode = 400; // HTTP Bad Request
  
      // Set the prototype explicitly, to fix issues with instanceof checks
      Object.setPrototypeOf(this, ValidationError.prototype);
    }
  }