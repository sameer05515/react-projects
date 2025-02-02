class A {
  constructor() {
    if (new.target === A) {
      throw new Error("Direct instantiation is not allowed. Use A.builder() to create an instance.");
    }
    console.log("Created via builder method.");
    console.log("new.target", new.target); // Will show internal constructor method in builder
  }

  static builder() {
    return new A.InternalBuilder(); // InternalBuilder ensures controlled instantiation
  }

  static InternalBuilder = class {
    constructor() {
      // This will be the constructor that's used when calling A.builder().
      console.log("Inside InternalBuilder constructor");
    }

    doSomething(task = "") {
      console.log("I am working on : " + task);
    }
  };
}

try {
  const myA1 = new A(); // Error: Direct instantiation is not allowed.
  myA1.doSomething();
} catch (error) {
  console.trace(error.message);
}

const myA2 = A.builder(); // This works, using the builder method
myA2.doSomething("Learning new.target");
