import { ReactNode } from 'react';

const CustomCard = () => {
  return (
    <div>
      <h1>Custom Card</h1>
      <p>
        <b>A Card Component That Has Multiple "Slots"</b>
      </p>

      <p>
        Full code (with example usage):{" "}
        <a href="https://github.com/academind/react-typescript-course-resources/blob/main/examples/Card.tsx">
          https://github.com/academind/react-typescript-course-resources/blob/main/examples/Card.tsx
        </a>
      </p>

      <p>
        A reusable Card component that does not just accept the children prop
        but instead also accepts an actions prop which receives JSX as value.{" "}
        <br />
        It may be used like this:
      </p>
      <pre>
        {
            `
<Card
  title="My Card"
  actions={
    <button onClick={() => console.log('Button clicked!')}>
      Click Me!
    </button>
   }
  >
  <p>Some content</p>
</Card>
            `
        }
      </pre>

      <h2>Example</h2>
      <Demo/>
    </div>
  );
};

// Example: A Card component that has multiple "slots" for content
// Main slot => children prop
// Actions slot => actions prop



type CardProps = {
  title: string;
  children: ReactNode;
  // "actions" is like an extra "slot" of this component
  // It's the same type as the children prop, since we expect JSX code as a prop value
  actions: ReactNode;
};

function Card({ title, children, actions }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
      {actions}
    </section>
  );
}

// Example Usage:
function Demo() {
  return (
    <Card
      title="My Card"
      actions={
        <button onClick={() => console.log('Button clicked!')}>
          Click Me!
        </button>
      }
    >
      <p>Some content</p>
    </Card>
  );
}

export default CustomCard;
