export class FormMessageBuilder {
  //   #messages = [];

  constructor() {
    if (new.target !== undefined) {
      throw new Error("Direct instantiation is not allowed. Use FormMessageBuilder.builder().");
    }
  }

  static builder() {
    return new FormMessageBuilder.#InternalBuilder();
  }

  static #InternalBuilder = class {
    #messages = [];

    appendError(message = "") {
      return this.#appendMessage("error", message);
    }

    appendWarning(message = "") {
      return this.#appendMessage("warning", message);
    }

    appendInfo(message = "") {
      return this.#appendMessage("info", message);
    }

    build() {
      return [...this.#messages]; // Return a copy to prevent external modifications
    }

    #appendMessage(type, message) {
      if (typeof message !== "string" || !message.trim()) {
        throw new Error(`Invalid message for ${type}: Message must be a non-empty string.`);
      }
      this.#messages.push({ type, message });
      return this; // Allow method chaining
    }
  };
}

// Example Usage:
// const messages = FormMessageBuilder.builder()
//   .appendError("Something went wrong!")
//   .appendWarning("This is a warning.")
//   .appendInfo("Informational message.")
//   .build();

// console.log(messages);
