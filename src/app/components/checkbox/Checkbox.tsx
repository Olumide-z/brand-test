import React from 'react'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <label className='inline-flex items-center'>
      <input
        type='checkbox'
        className='form-checkbox h-5 w-5 text-blue-500 rounded-lg'
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className='ml-2'></span>
    </label>
  )
}

export default Checkbox
