class A {
  constructor() {
    console.log("new.target", new.target);
  }

  static builder(){
    return new A();
  }

  doSomething(task = "") {
    console.log("I am working on : " + task);
  }
}

const myA1 = new A();

myA1.doSomething("Learning new.target");

A.builder();
