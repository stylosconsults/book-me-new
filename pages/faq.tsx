import React from 'react'

import FAQuestion from 'components/organisms/FAQuestion'

const questions = [
  {
    question: 'How do I search for hotels on your website?',
    answer: (
      <span>
        You can easily search for hotels by entering your destination, check-in,
        and check-out dates on the homepage. Click the &quot;Search&quot; button
        to view available options.
      </span>
    ),
  },
  {
    question: 'Are the prices shown per person or per room?',
    answer: (
      <span>
        The prices displayed are usually per room, per night, based on the
        occupancy you specified during the search. However, some hotels may
        offer rates based on the number of guests.
      </span>
    ),
  },
  {
    question: 'What payment methods do you accept?',
    answer: (
      <span>
        We accept various payment methods, including major credit cards (Visa,
        MasterCard, American Express) and debit cards. Some locations may also
        allow PayPal or bank transfers.
      </span>
    ),
  },
  {
    question: 'Can I cancel or modify my reservation?',
    answer: (
      <span>
        Yes, in most cases, you can cancel or modify your reservation. However,
        cancellation policies vary by hotel, so it&apos;s important to review
        the specific terms and conditions before booking.
      </span>
    ),
  },
  {
    question: 'Is my credit card information secure on your website?',
    answer: (
      <span>
        Absolutely! We take data security seriously and use industry-standard
        encryption to protect your credit card information.
      </span>
    ),
  },
  {
    question: 'Can I see reviews and ratings for the hotels?',
    answer: (
      <span>
        Yes, we provide genuine customer reviews and ratings for each hotel,
        giving you valuable insights into the experiences of previous guests.
      </span>
    ),
  },
  {
    question: 'Are there any additional fees or taxes I need to pay?',
    answer: (
      <span>
        The final price shown during the booking process typically includes all
        taxes and fees. However, in some cases, certain destinations may charge
        local taxes upon check-in.
      </span>
    ),
  },
  {
    question: 'Do you offer special discounts for group bookings?',
    answer: (
      <span>
        Yes, we do offer special rates for group bookings. If you plan to book
        multiple rooms or have a large group, please contact our customer
        support team for assistance.
      </span>
    ),
  },
  {
    question: 'What do I do if I encounter issues during the booking process?',
    answer: (
      <span>
        If you encounter any problems while booking, or if you have questions,
        please reach out to our customer support team via email or phone.
        We&apos;re here to help!
      </span>
    ),
  },
  {
    question:
      'Can I request special amenities or preferences, such as a non-smoking room or an extra bed?',
    answer: (
      <span>
        Yes, you can usually request special amenities or preferences during the
        booking process. If the option is not available online, please contact
        the hotel directly after booking to make the request.
      </span>
    ),
  },
]

export default function Faq() {
  return (
    <div className='max-w-[1000px] pb-3'>
      <h1 className='my-3 font-bold text-xl'>
        FAQ (Frequently Asked Questions) for booking hotels on our website:
      </h1>
      <ol className='list-none'>
        {questions.map((q, key) => (
          <FAQuestion
            qNumber={key + 1}
            key={key}
            answer={q.answer}
            question={q.question}
          />
        ))}
      </ol>
      <p className='my-3'>
        If you have any other questions or need further assistance, please
        don&apos;t hesitate to contact our customer support team. Happy booking!
      </p>
    </div>
  )
}
