import { ReactNode, useState } from 'react'

import { MdOutlineChevronLeft } from 'react-icons/md'

export default function FAQuestion({
  question,
  answer,
  qNumber,
}: {
  question: string
  answer: ReactNode
  qNumber: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <li className='my-3 border-2'>
      <button
        className='flex items-center w-full'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='bg-gray-500 flex justify-between text-white w-full text-left p-3'>
          <b>
            {qNumber}. {question}
          </b>
          <p className='ml-auto inline-block'>
            <MdOutlineChevronLeft
              className={`${isOpen ? 'rotate-90' : 'rotate-180'}`}
              size={28}
            />
          </p>
        </div>
      </button>
      {isOpen && <div className='p-3'>{answer}</div>}
    </li>
  )
}
