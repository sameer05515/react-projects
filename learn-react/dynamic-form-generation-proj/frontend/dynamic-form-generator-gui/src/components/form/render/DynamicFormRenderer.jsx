import React, { useState } from 'react';

// Subcomponents for rendering different types of form fields

const TextInputField = ({ id, label, value, onChange }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input 
      type="text" 
      id={id} 
      name={id} 
      value={value || ''} 
      onChange={onChange} 
    />
  </div>
);

const TextAreaField = ({ id, label, value, onChange }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <textarea 
      id={id} 
      name={id} 
      value={value || ''} 
      onChange={onChange} 
    />
  </div>
);

const SelectField = ({ id, label, value, options, onChange }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <select 
      id={id} 
      name={id} 
      value={value || ''} 
      onChange={onChange}
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ id, label, checked, onChange }) => (
  <div>
    <label>
      <input 
        type="checkbox" 
        id={id} 
        name={id} 
        checked={checked || false} 
        onChange={onChange} 
      />
      {label}
    </label>
  </div>
);

const DynamicForm = ({ schema, onSubmit }) => {
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
    <div>
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DynamicForm;
