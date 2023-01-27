import React from 'react'

interface InputProps {
  type: string
  placeholder?: string
  value?: string | number
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  label?: string
  [x: string | number | symbol]: unknown
}

export default function Input({
  onChange,
  placeholder,
  type,
  value,
  name,
  error,
  label,
  ...props
}: InputProps) {
  return (
    <div className='h-full w-full flex flex-col'>
      {label && (
        <label className='text-co-black font-bold text-base'>{label}</label>
      )}
      <input
        {...props}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className={`'bg-white focus:outline-none focus:shadow-outline border max-h-9 border-gray-300 rounded-lg py-2 px-4 block w-full h-full appearance-none leading-normal
        ${error ? 'border-red-500 border-2 ' : ''}`}
      />
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  )
}
