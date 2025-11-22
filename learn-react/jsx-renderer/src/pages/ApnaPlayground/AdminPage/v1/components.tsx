// import React from "react";

// interface CardProps {
//   componentType: "Card";
//   title: string;
//   content: string;
// }

// interface ButtonProps {
//   componentType: "Button";
//   label: string;
//   onClick: () => void;
// }

// interface HeadingProps {
//   componentType: "Heading";
//   text: string;
// }

// export const Card: React.FC<CardProps> = ({ title, content }) => (
//   <div className="p-4 border rounded-md shadow-md bg-white">
//     <h3 className="text-lg font-bold">{title}</h3>
//     <p className="text-gray-600">{content}</p>
//   </div>
// );

// export const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
//   <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={onClick}>
//     {label}
//   </button>
// );

// export const Heading: React.FC<HeadingProps> = ({ text }) => (
//   <h2 className="text-xl font-semibold">{text}</h2>
// );
