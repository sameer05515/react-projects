const AboutThisProjectV1 = () => {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">About This Project</h1>
  
        <p className="text-gray-700 leading-relaxed mb-4">
          This project provides a **JSX Renderer**, allowing users to input JSX as a **string**, 
          dynamically transform it into valid **React components**, and render the output. 
          It is built using **Vite + TypeScript + React + Babel Standalone**.
        </p>
  
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🎯 Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>🖊️ Users can **enter JSX code** inside a text area.</li>
          <li>⚡ On clicking the **Render** button, Babel transpiles the JSX string.</li>
          <li>⚙️ The transpiled code is **executed dynamically** and rendered inside a preview area.</li>
          <li>🚀 Built with **Babel Standalone** to handle JSX-to-JavaScript transformation on the fly.</li>
          <li>🔍 **Error handling** is in place to catch invalid JSX and display helpful messages.</li>
        </ul>
  
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🛠️ Technologies Used</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>🔹 <strong>React + TypeScript</strong> – Ensures type safety and component-driven UI.</li>
          <li>🔹 <strong>Vite</strong> – Provides a fast development experience.</li>
          <li>🔹 <strong>Babel Standalone</strong> – Enables JSX transformation without requiring a build step.</li>
          <li>🔹 <strong>Tailwind CSS</strong> – For effortless and responsive UI styling.</li>
        </ul>
  
        <h2 className="text-xl font-semibold text-gray-800 mb-2">⚙️ How It Works?</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>✏️ **User Inputs JSX Code** inside a text area.</li>
          <li>🔄 The JSX string is **transpiled using Babel Standalone**.</li>
          <li>🖥️ Transpiled JavaScript is **executed dynamically** with `new Function()`.</li>
          <li>✅ If valid, the JSX is **rendered inside the output preview area**.</li>
          <li>⚠️ If invalid, an **error message** is displayed instead.</li>
        </ol>
  
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🔍 Example Input</h2>
        <div className="bg-gray-200 p-4 rounded-md font-mono text-sm">
          {`<div style={{ color: 'red', fontWeight: 'bold' }}>Hello, JSX!</div>`}
        </div>
  
        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">💡 Learning Outcomes</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>✔️ Understanding **how JSX is processed and converted** into JavaScript.</li>
          <li>✔️ Exploring **Babel's capabilities** for in-browser JSX transformation.</li>
          <li>✔️ Experimenting with **dynamic rendering techniques** using `new Function()`.</li>
          <li>✔️ Learning to **handle user-generated content safely** in React.</li>
        </ul>
  
        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">🚀 Future Enhancements</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>🌟 Save rendered JSX configurations for later use.</li>
          <li>🌟 Allow admins to **design cards/components** from the frontend.</li>
          <li>🌟 Introduce **drag-and-drop UI for component creation**.</li>
        </ul>
      </div>
    );
  };
  
  export default AboutThisProjectV1;
  