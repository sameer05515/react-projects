import React, { useState } from "react";

type OptionItem = { value: string; label: string };

interface RadioButtonsComponentProps {
  initialSelectedOption?: string;
  options: OptionItem[];
  onChange?: (selected: OptionItem) => void;
  orientation?: "row" | "column";
  className?: string;
  optionClassName?: string;
}

const RadioButtonsComponent: React.FC<RadioButtonsComponentProps> = ({
  initialSelectedOption = "",
  options = [],
  onChange = () => {},
  orientation = "row",
  className = "",
  optionClassName = "",
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(initialSelectedOption);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, option: OptionItem) => {
    setSelectedOption(e.target.value);
    onChange(option);
  };

  const containerClasses =
    orientation === "column" ? "flex flex-col gap-2" : "flex flex-wrap gap-4";

  return (
    <div className={`${containerClasses} ${className}`}>
      {options.map((option: OptionItem) => (
        <label
          key={option.value}
          className={`inline-flex items-center gap-2 text-sm text-gray-800 ${optionClassName}`}
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={(e) => handleOptionChange(e, option)}
            className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonsComponent;

// Usage example
// const itemTypeOptions = [
//   { value: 'topic', label: 'Topic' },
//   { value: 'section', label: 'Section' },
//   { value: 'link', label: 'Link' },
//   { value: 'interview-question', label: 'Interview Question' },
// ];

// // In your main component or App component
// const App = () => {
//   return <RadioButtonsComponent options={itemTypeOptions} />;
// };

// export default App;
