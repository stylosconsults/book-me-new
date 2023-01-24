import React from 'react'

interface TabsProps {
  tabs: Array<string>
  setactiveTab?: (index: number) => void
  activeTab: number
}
//  border-0 border-b-2 border-co-gray hover:border-co-black
export default function Tabs({ setactiveTab, tabs, activeTab }: TabsProps) {
  return (
    <div className='flex flex-row gap-2 border-b-2 border-co-gray'>
      {tabs.map((tab, index) => {
        return (
          <div key={index} className='h-fit relative group'>
            <button
              onClick={() => setactiveTab !== undefined && setactiveTab(index)}
              className={`text-center group-hover:text-co-blue px-4 pb-3 text-sm font-bold ${
                activeTab === index ? 'text-co-blue' : 'text-co-black'
              } bg-transparent`}
            >
              {tab}
            </button>
            <div
              className={`h-[2px] bg-co-blue absolute ${
                activeTab === index
                  ? 'w-full'
                  : 'w-0 group-hover:w-full transition-all duration-700'
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}
