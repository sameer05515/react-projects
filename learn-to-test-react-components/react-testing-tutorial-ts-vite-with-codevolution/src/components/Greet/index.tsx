type GreetProps={
  name?:string
}

const Greet = (prps:GreetProps) => {
  return <div>Hello {prps?.name}</div>;
};

export default Greet;
