import React from 'react'

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={`animate-spin w-10 h-10 border-2 rounded-full border-l-co-blue ${className}`}
    />
  )
}
