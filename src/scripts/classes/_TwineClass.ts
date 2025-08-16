/**
 * Base class for all serializable classes in Twine save games.
 *
 * Best Practices:
 * - Inherit from TwineClass for any class that may be saved or restored from game state.
 * - Provides standardized clone and serialization (toJSON) methods.
 * - Ensures compatibility with Twine's save/load system.
 * - If you do not inherit from this, you must implement compatible clone() and toJSON() methods yourself.
 */
export abstract class TwineClass {
  /**
   * Creates a deep copy of the current instance, preserving its class type.
   *
   * @returns A new instance of the same class with identical properties.
   * @bestPractice Always use clone() for duplicating objects to avoid reference issues in game state.
   */
  clone<T extends {}>(this: T): T {
    return setup.rebuildClassObject((this as any).constructor, this);
  }

  /**
   * Serializes the instance to a JSON-compatible object, including class name for reconstruction.
   *
   * @returns JSON representation of the instance, including type metadata.
   * @bestPractice Use toJSON() for all objects that may be saved to Twine variables.
   */
  toJSON(): {} {
    return setup.toJsonHelper(this.constructor.name, this);
  }
}

/**
 * Base class for serializable classes not defined directly on the `setup` object.
 *
 * Best Practices:
 * - Inherit from TwineClassCustom if your class is defined outside of `setup` (e.g., in a namespace).
 * - Override getContainer() to return the full namespace path as a string (e.g., 'setup.a.b.c').
 * - Ensures correct deserialization and class reconstruction.
 */
export abstract class TwineClassCustom {
  /**
   * Returns the string path to the container/namespace of this class.
   *
   * @returns Namespace path (e.g., 'setup', 'setup.a.b.c').
   * @bestPractice Override this method if your class is not directly under `setup`.
   */
  getContainer(): string {
    return `setup`;
  }

  /**
   * Creates a deep copy of the current instance, preserving its class type and namespace.
   *
   * @returns A new instance of the same class with identical properties.
   * @bestPractice Always use clone() for duplicating objects to avoid reference issues in game state.
   */
  clone<T extends {}>(this: T): T {
    return setup.rebuildClassObject((this as any).constructor, this);
  }

  /**
   * Serializes the instance to a JSON-compatible object, including class name and container for reconstruction.
   *
   * @returns JSON representation of the instance, including type and container metadata.
   * @bestPractice Use toJSON() for all objects that may be saved to Twine variables.
   */
  toJSON(): {} {
    return setup.toJsonHelper(this.constructor.name, this, this.getContainer());
  }
}
