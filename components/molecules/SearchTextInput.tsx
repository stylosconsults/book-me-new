import React from 'react'

interface SearchTextInputProps {
  placeholder: string
  type: string
  name: string
  subTitle: string
  icon: JSX.Element
  value?: string
  readonly?: boolean
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  [x: string | number | symbol]: unknown
}
export default function SearchTextInput({
  placeholder,
  icon,
  name,
  subTitle,
  type,
  readonly,
  value,
  handleChange,
  ...props
}: SearchTextInputProps) {
  return (
    <label className='flex flex-row gap-1 bg-black/10 lg:bg-transparent p-2 lg:p-0 w-full lg:max-w-[200px]'>
      <p className='text-gray-500 mt-2'>{icon}</p>
      <div className='text-sm text-co-primary'>
        <input
          className='font-bold w-full  bg-transparent text-xl placeholder:text-co-black text-co-black border-0 focus:ring-0 outline-none border-none'
          placeholder={placeholder}
          type={'text'}
          defaultValue={value}
          name={name}
          readOnly={readonly}
          onChange={e => handleChange && handleChange(e)}
          {...props}
        />
        <p className='text-gray-500 font-light text-sm'>{subTitle}</p>
      </div>
    </label>
  )
}
