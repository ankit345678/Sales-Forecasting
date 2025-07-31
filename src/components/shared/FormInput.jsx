export const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  children,
  required = true,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-300 mb-1"
    >
      {label}
    </label>
    {type === "select" ? (
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 transition"
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 transition"
        step={type === "number" ? "any" : undefined}
      />
    )}
  </div>
);
