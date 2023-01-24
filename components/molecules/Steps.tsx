import React from 'react'

interface StepsProps {
  steps: string[]
  setCurrent?: React.Dispatch<React.SetStateAction<number>>
  current: number
  title?: string
}
export default function Steps({ current, setCurrent, steps }: StepsProps) {
  return (
    <div className=' relative h-fit'>
      {/* <div className='h-[2px] w-full absolute bg-gray-200 left-0 top-1/2 -translate-y-[400%]'></div> */}
      <div className='flex items-center gap-2 w-full justify-between'>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex z-10 w-fit flex-col items-center cursor-pointer ${
              index <= current ? 'text-co-black' : 'text-co-gray'
            }`}
            onClick={
              setCurrent !== undefined
                ? () => setCurrent(index)
                : () => {
                    // do nothing
                  }
            }
          >
            <div
              className={`h-16 w-16 rounded-full flex items-center justify-center text-white font-bold text-2xl ${
                index < current && 'bg-co-green'
              } ${index === current && ' bg-co-blue '} ${
                index > current && 'bg-co-black'
              } `}
            >
              <p>{index + 1}</p>
            </div>

            <p className='font-bold text-sm mt-2 capitalize'>{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
