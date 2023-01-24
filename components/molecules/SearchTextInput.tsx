import React from 'react'

interface SearchTextInputProps {
  placeholder: string
  type: string
  name: string
  subTitle: string
  icon: JSX.Element
}
export default function SearchTextInput({
  placeholder,
  icon,
  name,
  subTitle,
  type,
}: SearchTextInputProps) {
  return (
    <label className='flex flex-row gap-1 max-w-[200px]'>
      <p className='text-gray-500 mt-2'>{icon}</p>
      <div className='text-sm text-co-primary'>
        <input
          className='font-bold w-full  bg-transparent text-xl placeholder:text-co-black text-co-black border-0 focus:ring-0 outline-none border-none'
          placeholder={placeholder}
          type={'text'}
          name={name}
        />
        <p className='text-gray-500 font-light text-sm'>{subTitle}</p>
      </div>
    </label>
  )
}
