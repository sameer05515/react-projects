/**
 * A utility class for constructing structured form messages using the builder pattern.
 * This class enforces message type consistency (`error`, `warning`, `info`) and prevents
 * direct instantiation, ensuring all objects are built through the `builder()` method.
 *
 * @example
 * const messages = FormMessageBuilder.builder()
 *   .appendError("Invalid input")
 *   .appendWarning("Field is required")
 *   .appendInfo("Data saved successfully")
 *   .build();
 * console.log(messages);
 * // Output:
 * // [
 * //   { type: "error", message: "Invalid input" },
 * //   { type: "warning", message: "Field is required" },
 * //   { type: "info", message: "Data saved successfully" }
 * // ]
 *
 * @class
 */
class FormMessageBuilder {
  /**
   * Private constructor to prevent direct instantiation.
   * Throws an error if an attempt is made to create an instance manually.
   *
   * @throws {Error} If instantiated directly.
   */
  constructor() {
    if (new.target !== undefined) {
      throw new Error("Direct instantiation is not allowed. Use FormMessageBuilder.builder().");
    }
  }

  /**
   * Initializes a new instance of the message builder.
   * Each call to `builder()` creates a fresh builder instance with an empty message list.
   *
   * @returns {FormMessageBuilder.#InternalBuilder} A new builder instance.
   *
   * @example
   * const builder = FormMessageBuilder.builder();
   */
  static builder() {
    return new FormMessageBuilder.#InternalBuilder();
  }

  /**
   * Internal builder class that handles message creation.
   * This class is accessible only through the `builder()` method.
   *
   * @class
   * @private
   */
  static #InternalBuilder = class {
    /** @type {Array<{type: "error" | "warning" | "info", message: string}>} */
    #messages = [];

    /**
     * Appends an error message to the message list.
     *
     * @param {string} message - The error message to append.
     * @returns {FormMessageBuilder.#InternalBuilder} The current builder instance for chaining.
     * @throws {Error} If the message is not a non-empty string.
     *
     * @example
     * FormMessageBuilder.builder().appendError("Invalid input").build();
     */
    appendError(message = "") {
      return this.#appendMessage("error", message);
    }

    /**
     * Appends a warning message to the message list.
     *
     * @param {string} message - The warning message to append.
     * @returns {FormMessageBuilder.#InternalBuilder} The current builder instance for chaining.
     * @throws {Error} If the message is not a non-empty string.
     */
    appendWarning(message = "") {
      return this.#appendMessage("warning", message);
    }

    /**
     * Appends an informational message to the message list.
     *
     * @param {string} message - The info message to append.
     * @returns {FormMessageBuilder.#InternalBuilder} The current builder instance for chaining.
     * @throws {Error} If the message is not a non-empty string.
     */
    appendInfo(message = "") {
      return this.#appendMessage("info", message);
    }

    /**
     * Returns a copy of the built message array to prevent external modifications.
     *
     * @returns {Array<{type: "error" | "warning" | "info", message: string}>} The list of messages.
     *
     * @example
     * const messages = FormMessageBuilder.builder()
     *   .appendError("Invalid input")
     *   .appendWarning("Check this field")
     *   .build();
     */
    build() {
      return [...this.#messages]; // Return a copy to ensure immutability
    }

    /**
     * Validates and appends a message of a specific type.
     *
     * @param {"error" | "warning" | "info"} type - The message type.
     * @param {string} message - The message content.
     * @returns {FormMessageBuilder.#InternalBuilder} The current builder instance for chaining.
     * @throws {Error} If the message is not a valid non-empty string.
     * @private
     */
    #appendMessage(type, message) {
      if (typeof message !== "string" || !message.trim()) {
        throw new Error(`Invalid message for ${type}: Message must be a non-empty string.`);
      }
      this.#messages.push({ type, message });
      return this; // Allow method chaining
    }
  };
}

export default FormMessageBuilder;

// Example Usage:
// const messages = FormMessageBuilder.builder()
//   .appendError("Something went wrong!")
//   .appendWarning("This is a warning.")
//   .appendInfo("Informational message.")
//   .build();

// console.log(messages);
