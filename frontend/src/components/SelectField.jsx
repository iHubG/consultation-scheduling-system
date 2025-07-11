import React from 'react'

const SelectField = ({ label, value, onChange, options = [], disabled = false, placeholder = '-- Choose --' }) => {
  return (
    <label className="block mb-4 font-medium text-gray-700">
      {label}
      <select
        className="w-full mt-1 p-2 border rounded focus:ring-purple-300 outline-none"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectField
