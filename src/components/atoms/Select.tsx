import React from 'react'

import Select from 'react-select'

interface SelectWithErrorProps {
  label?: string
  name: string
  options: { value: string; label: string }[]
  error?: string
  placeholder?: string
  onChange: ({ value, name }: { value: string; name: string }) => void
  [x: string | number | symbol]: unknown
}
export default function SelectWithError({
  label,
  name,
  options,
  onChange,
  error,
  placeholder,
  ...props
}: SelectWithErrorProps) {
  return (
    <div>
      {label && (
        <label className='text-co-black font-bold text-base' htmlFor={name}>
          {label}
        </label>
      )}
      <Select
        {...props}
        placeholder={placeholder}
        id={name}
        styles={{
          control: baseStyles => ({
            ...baseStyles,
            borderColor: !error ? 'grey' : 'red',
          }),
        }}
        options={options}
        onChange={e =>
          onChange({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value: e!.value,
            name: name,
          })
        }
      />
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  )
}
