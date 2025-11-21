/**
 * Fallback Strategies
 * --------------------
 * This file defines and exports a set of fallback strategies to standardize 
 * the behavior of components and utilities across the application when 
 * encountering undefined, null, or invalid data. These strategies help 
 * maintain consistent handling of edge cases and improve code readability.
 * 
 * Importance of Fallback Strategies:
 * 1. **Consistency**: Provides a unified way to handle invalid or undefined 
 *    cases across multiple modules.
 * 2. **Scalability**: Makes it easy to introduce new strategies without 
 *    altering existing logic.
 * 3. **Debugging**: Helps in diagnosing issues by clearly defining how 
 *    fallback behavior is expected to function in each scenario.
 * 4. **Reusability**: Encourages code reuse by centralizing fallback logic.
 * 5. **Clarity**: Improves the readability of code by eliminating redundant 
 *    "if-else" conditions spread across various files.
 * 
 * Use Cases:
 * - Handling invalid or non-existing component names gracefully.
 * - Avoiding application crashes due to unexpected values.
 * - Customizing behavior based on specific requirements in different contexts.
 * 
 * Please find additional strategies [**here**](./Readme.md)
 */

export const FallbackStrategies = {
    /**
     * `RETURN_DEFAULT_COMPONENT`:
     * Returns a pre-defined default component in case of invalid or 
     * non-existing input. This is the most user-friendly strategy, ensuring 
     * that the UI remains functional and communicates the issue effectively.
     */
    RETURN_DEFAULT_COMPONENT: "RETURN_DEFAULT_COMPONENT",
  
    /**
     * `RETURN_NULL`:
     * Returns `null` when an invalid or non-existing input is encountered.
     * This strategy is useful for rendering conditions where an absence of 
     * output (instead of a default fallback) is desired.
     */
    RETURN_NULL: "RETURN_NULL",
  
    /**
     * `RETURN_UNDEFINED`:
     * Returns `undefined` for invalid or non-existing input. This strategy 
     * can be used in cases where explicit non-definition of behavior is 
     * required or for programmatic checks outside the UI.
     */
    RETURN_UNDEFINED: "RETURN_UNDEFINED",
  };
  