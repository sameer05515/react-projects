import { type ReactNode } from "react";

const GenericList = () => {
  return (
    <div>
      <h1>Generic List</h1>
      <p>
        Full code (with example usage):{" "}
        <a href="https://github.com/academind/react-typescript-course-resources/blob/main/examples/List.tsx">
          https://github.com/academind/react-typescript-course-resources/blob/main/examples/List.tsx
        </a>
      </p>
      <p>
        {
          "A reusable List component which outputs an <ul> that wraps a list that may output any kind of value (strings, numbers, objects, ...). The component accepts the items as a prop as well as a renderItem prop that expects to get a function that controls how each item should be rendered."
        }
      </p>
      It may be used like this:
      <pre>
        {`
    <main>
      <section>
        <h2>Users</h2>
        <List
          items={users}
          renderItem={(user) => <li key={user.id}>{user.name}</li>}
        />
      </section>
      <section>
        <h2>Hobbies</h2>
        <List
          items={hobbies}
          renderItem={(hobby) => <li key={hobby}>{hobby}</li>}
        />
      </section>
    </main>        
            `}
      </pre>

      <h2>Example</h2>
      <Demo />
    </div>
  );
};

// Example: A Generic List Component
// This reusable component can be used to render a list of items of any type. The type of the items is passed via a generic type parameter.

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
};

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// Example Usage:

function Demo() {
  const users = [
    { id: "u1", name: "Max" },
    { id: "u2", name: "Manuel" },
  ];

  const hobbies = ["Sports", "Reading", "Cooking"];

  return (
    <main>
      <section>
        <h2>Users</h2>
        <List
          items={users}
          renderItem={(user) => <li key={user.id}>{user.name}</li>}
        />
      </section>
      <section>
        <h2>Hobbies</h2>
        <List
          items={hobbies}
          renderItem={(hobby) => <li key={hobby}>{hobby}</li>}
        />
      </section>
    </main>
  );
}

export default GenericList;
