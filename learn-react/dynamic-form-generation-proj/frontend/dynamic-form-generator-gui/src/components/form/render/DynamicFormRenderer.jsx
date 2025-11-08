import React, { useState } from 'react';

// Subcomponents for rendering different types of form fields

const TextInputField = ({ id, label, value, onChange, type = "text" }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input 
      type={type}
      id={id} 
      name={id} 
      value={value || ''} 
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />
  </div>
);

const TextAreaField = ({ id, label, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea 
      id={id} 
      name={id} 
      value={value || ''} 
      onChange={onChange}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
    />
  </div>
);

const SelectField = ({ id, label, value, options, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select 
      id={id} 
      name={id} 
      value={value || ''} 
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ id, label, checked, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        id={id} 
        name={id} 
        checked={checked || false} 
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <span className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </span>
    </label>
  </div>
);

const DynamicFormRenderer = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, key) => {
    const { value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [key]: newValue
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-4">
      {Object.keys(schema).map(key => {
        const { label, type, options } = schema[key];
        switch (type) {
          case 'text':
          case 'email':
          case 'password':
          case 'number':
            return (
              <TextInputField 
                key={key} 
                id={key} 
                label={label}
                type={type}
                value={formData[key] || ''} 
                onChange={(e) => handleChange(e, key)} 
              />
            );
          case 'textarea':
            return (
              <TextAreaField 
                key={key} 
                id={key} 
                label={label} 
                value={formData[key] || ''} 
                onChange={(e) => handleChange(e, key)} 
              />
            );
          case 'select':
            return (
              <SelectField 
                key={key} 
                id={key} 
                label={label} 
                value={formData[key] || ''} 
                options={options} 
                onChange={(e) => handleChange(e, key)}
              />
            );
          case 'checkbox':
            return (
              <CheckboxField 
                key={key} 
                id={key} 
                label={label} 
                checked={formData[key] || false} 
                onChange={(e) => handleChange(e, key)} 
              />
            );
          default:
            return null;
        }
      })}
      <div className="pt-4">
        <button 
          onClick={handleSubmit}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DynamicFormRenderer;
