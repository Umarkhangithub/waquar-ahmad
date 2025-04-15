import React, { memo } from "react";

const InputField = memo(
  ({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    placeholder = "",
    ...rest
  }) => {
    // Styles for the input field
    const inputClasses = "w-full p-2 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500";
    const errorTextClasses = "text-red-500 text-sm mt-1";

    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-orange-500 mb-2"
        >
          {label}
        </label>
        
        {/* Input or Textarea */}
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            rows={4}
            value={value}
            className={inputClasses}
            placeholder={placeholder}
            onChange={onChange}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            {...rest}
          ></textarea>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            className={inputClasses}
            placeholder={placeholder}
            onChange={onChange}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            {...rest}
          />
        )}

        {/* Error Message */}
        {error && (
          <p id={`${name}-error`} className={errorTextClasses}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

// Set default props if necessary
InputField.defaultProps = {
  type: "text",
  placeholder: "",
};

export default InputField;
