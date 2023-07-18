import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'

import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    website: 'Bookme',
  })

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      alert('hi')
    }
  }, [router.isReady])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleTextAreaChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = (e: any) => {
    setLoading(true)
    e.preventDefault()

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/contact-us`, formData)
      .then(() => {
        alert('Message sent!')
      })
      .catch(error => {
        alert('Error sending message')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white w-fit mx-auto p-5 min-w-[400px] rounded-lg flex flex-col gap-2'
    >
      <div>
        <h1 className='text-2xl font-bold'>Contact us</h1>
        <p className='text-[#777E90]'>
          Have any question? Ask us, we will answer
        </p>
      </div>

      <Input
        label='Names'
        type={'text'}
        name='name'
        required
        onChange={handleChange}
      />
      <Input
        label='Email Address'
        type={'email'}
        name='email'
        required
        onChange={handleChange}
      />
      <Input
        label='Phone Number'
        type={'text'}
        name='phone'
        required
        onChange={handleChange}
      />
      <div className='flex flex-col'>
        <label className='text-co-black font-bold text-base'>Message</label>
        <textarea
          onChange={handleTextAreaChange}
          required
          className='bg-white focus:outline-none focus:shadow-outline border resize-y border-gray-300 rounded-lg py-2 px-4 block w-full h-full appearance-none leading-normal'
          name='message'
          placeholder='Message or Question'
        ></textarea>
      </div>
      <Button className='bg-blue-600 text-white'>
        {loading ? 'Sending message...' : 'Send Message'}
      </Button>
    </form>
  )
}
