let user = "Premendra";

console.log(user);

// user=34;

let user2: string;

// user2=34;

let user3: {
  name: string;
  age: number;
  isAdmin: boolean;
  id: string | number;
};

user3 = {
  name: "Premendra",
  age: 37,
  isAdmin: true,
  id: 1,
};

let hobbies: Array<string>;

hobbies = ["Sports", "Study"];

let hobbies2: string[];

function add(a: number, b: number): void {
  const res = a + b;
  console.log(res);
}

add(1, 2);

function add2(a: number, b: number): number {
  const res = a + b;

//   console.log(res);
  return res;
}

add2(7, 7);

function calculate(
  a: number,
  b: number,
  calcFn: (a: number, b: number) => number
): number {
  return calcFn(a, b);
}

let result=calculate(8,9, add2);
console.log(result);

type AddFn= (a: number, b: number) => number;

function calculate2(
    a: number,
    b: number,
    calcFn: AddFn
  ): number {
    return calcFn(a, b);
  }
  
  let result2=calculate2(80,99, add2);
  console.log(result2);