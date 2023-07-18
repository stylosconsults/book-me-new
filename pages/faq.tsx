import React from 'react'

export default function faq() {
  return (
    <div className='max-w-[1000px] pb-3'>
      <h1 className='my-3 font-bold text-xl'>
        FAQ (Frequently Asked Questions) for booking hotels on our website:
      </h1>
      <ol className='list-inside list-decimal last:font-bold'>
        <li className='my-3'>
          <b>How do I search for hotels on your website? </b>
          <span className='ml-1'>
            You can easily search for hotels by entering your destination,
            check-in, and check-out dates on the homepage. Click the
            &quot;Search&quot; button to view available options.
          </span>
        </li>
        <li className='my-3'>
          <b>Are the prices shown per person or per room?</b>
          <span className='ml-1'>
            The prices displayed are usually per room, per night, based on the
            occupancy you specified during the search. However, some hotels may
            offer rates based on the number of guests.
          </span>
        </li>
        <li className='my-3'>
          <b>What payment methods do you accept? </b>
          <span className='ml-1'>
            We accept various payment methods, including major credit cards
            (Visa, MasterCard, American Express) and debit cards. Some locations
            may also allow PayPal or bank transfers.
          </span>
        </li>
        <li className='my-3'>
          <b>Can I cancel or modify my reservation?</b>
          <span className='ml-1'>
            Yes, in most cases, you can cancel or modify your reservation.
            However, cancellation policies vary by hotel, so it&apos;s important
            to review the specific terms and conditions before booking.
          </span>
        </li>
        <li className='my-3'>
          <b>Is my credit card information secure on your website? </b>
          <span className='ml-1'>
            {' '}
            Absolutely! We take data security seriously and use
            industry-standard encryption to protect your credit card
            information.
          </span>
        </li>
        <li className='my-3'>
          <b>Can I see reviews and ratings for the hotels? </b>
          <span className='ml-1'>
            Yes, we provide genuine customer reviews and ratings for each hotel,
            giving you valuable insights into the experiences of previous
            guests.
          </span>
        </li>
        <li className='my-3'>
          <b>Are there any additional fees or taxes I need to pay? </b>
          <span className='ml-1'>
            The final price shown during the booking process typically includes
            all taxes and fees. However, in some cases, certain destinations may
            charge local taxes upon check-in.
          </span>
        </li>
        <li className='my-3'>
          <b>Do you offer special discounts for group bookings?</b>
          <span className='ml-1'>
            Yes, we do offer special rates for group bookings. If you plan to
            book multiple rooms or have a large group, please contact our
            customer support team for assistance.
          </span>
        </li>
        <li className='my-3'>
          <b>What do I do if I encounter issues during the booking process?</b>
          <span className='ml-1'>
            If you encounter any problems while booking, or if you have
            questions, please reach out to our customer support team via email
            or phone. We&apos;re here to help!
          </span>
        </li>
        <li className='my-3'>
          <b>
            Can I request special amenities or preferences, such as a
            non-smoking room or an extra bed?{' '}
          </b>
          <span className='ml-1'>
            Yes, you can usually request special amenities or preferences during
            the booking process. If the option is not available online, please
            contact the hotel directly after booking to make the request.
          </span>
        </li>
      </ol>
      <p className='my-3'>
        If you have any other questions or need further assistance, please
        don&apos;t hesitate to contact our customer support team. Happy booking!
      </p>
    </div>
  )
}
