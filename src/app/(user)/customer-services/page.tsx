"use client"
import Link from "next/link";
import React, { FunctionComponent, SVGProps, useRef } from "react";
import HotelRecommendation from "../../../../public/static/images/customer-services/assistYou/HotelRecommendations.svg"
import BookingAssistance from "../../../../public/static/images/customer-services/assistYou/BookingAssistance.svg"
import SpecialRequests from "../../../../public/static/images/customer-services/assistYou/SpecialRequests.svg"
import CancellationsModifications from "../../../../public/static/images/customer-services/assistYou/CancellationAndModification.svg"
import GroupBookings from "../../../../public/static/images/customer-services/assistYou/GroupBookings.svg"
import TravelAdviceAndTips from "../../../../public/static/images/customer-services/assistYou/TraveAdviceAndTips.svg"
import ProblemResolution from "../../../../public/static/images/customer-services/assistYou/problemResolution.svg"
import LeftArrow from "../../../../public/static/images/customer-services/assistYou/leftSvg.svg"
import RightArrow from "../../../../public/static/images/customer-services/assistYou/rightSvg.svg"

interface HowToAssistYouTypes {
  image: FunctionComponent<SVGProps<SVGSVGElement>>;
  name: string;
  description: string;
}

const howToAssistYou: HowToAssistYouTypes[] = [
  {
    image: HotelRecommendation,
    name: "Hotel Recommendation",
    description: "Unsure which hotel is the best fit for your trip? Our knowledgeable customer service representatives are ready to provide personalized hotel recommendations based on your preferences, budget, and travel needs."

  },

  {
    image: BookingAssistance,
    name: "Booking Assistance",
    description: "Need help with navigating our website or making a reservation? Our team is just a phone call or live chat away, guiding you through the booking process and ensuring you secure the best deals."
  },

  {
    image: SpecialRequests,
    name: "Special Requests",
    description: "If you have specific requirements or special requests, such as room preferences, accessibility needs, or extra amenities, our team will liaise with the hotels to accommodate your needs."

  },

  {
    image: HotelRecommendation,
    name: "Hotel Recommendation",
    description: "Unsure which hotel is the best fit for your trip? Our knowledgeable customer service representatives are ready to provide personalized hotel recommendations based on your preferences, budget, and travel needs."

  },

  {
    image: BookingAssistance,
    name: "Booking Assistance",
    description: "Need help with navigating our website or making a reservation? Our team is just a phone call or live chat away, guiding you through the booking process and ensuring you secure the best deals."
  },


  {
    image: SpecialRequests,
    name: "Special Requests",
    description: "If you have specific requirements or special requests, such as room preferences, accessibility needs, or extra amenities, our team will liaise with the hotels to accommodate your needs."

  },

  {
    image: CancellationsModifications,
    name: "Cancellation and Modification",
    description: "Life can be unpredictable, and plans may change. Our customer service agents are here to assist you with cancellations or modifications to your booking, all in accordance with the hotel'res policies."

  },

  {
    image: GroupBookings,
    name: "Group Bookings",
    description: "Organizing a group trip can be complex. Allow our team to handle the logistics and secure multiple rooms for your group, ensuring everyone enjoys a seamless booking experience."

  },

  {
    image: TravelAdviceAndTips,
    name: "Travel Advice and Tips",
    description: "Want insider tips on the best attractions, local eateries, or hidden gems at your destination? Our travel-savvy representatives are eager to share their expertise and help you create an unforgettable itinerary."

  },

  {
    image: ProblemResolution,
    name: "Problem Resolution",
    description: "Should any issues arise during your stay, rest assured that we will be your advocate in resolving them promptly and efficiently. Our team will work diligently to ensure your satisfaction. 24/7 Availability"
  }


]

export default function CustomerServices() {
  const scrollAssistYouRef = useRef<HTMLDivElement | null>(null)

  const handleScrollAssistYouLeft = () => {
    const scrollAmount = (scrollAssistYouRef.current?.clientWidth || 0) * 0.31
    scrollAssistYouRef.current?.scrollBy({
      top: 0,
      left: -scrollAmount,
      behavior: 'smooth'
    })
  }

  const handleScrollAssistYouRight = () => {
    const scrollAmount = (scrollAssistYouRef.current?.clientWidth || 0) * 0.31
    scrollAssistYouRef.current?.scrollBy({
      top: 0,
      left: scrollAmount,
      behavior: 'smooth'
    })
  }
  return (
    <div className="bg-white ">
      <div style={{
        background: `linear-gradient(to top right, #ffffff 80%, rgba(1, 66, 235, 0.1) 100%)`
      }} className="bg-white  flex flex-col justify-center  h-[330px]">
        <div className="flex flex-col items-center  gap-7 ">
          <p className="text-[2.1em] mt-5 font-bold w-[65%] text-center">Your <span className="bg-mainAboutUsBlue text-white p-2 rounded-[10px]">Comfort</span> is Our <span className="bg-mainAboutUsBlue text-white p-2 rounded-[10px]">Priority</span></p>
          <p className="w-[65%] text-center opacity-[68%]">At Bookme.rw, we take pride in providing exceptional customer service to ensure your hotel booking experience is smooth, delightful, and stress-free. Our dedicated customer support team is committed to assisting you at every step of your journey, from finding the perfect hotel to making sure your stay is nothing short of extraordinary. Your comfort and satisfaction are our top priorities, and we are here to make your travel dreams a reality.</p>
          <Link className="bg-mainAboutUsBlue mb-5 text-white p-2 px-3 rounded-[15px]" href={"contact-us"}>Contact Us</Link>

        </div>
      </div>
      <div style={{
        background: `linear-gradient(to bottom left, #ffffff 10%, rgba(1, 66, 235, 0.1) 100%)`
      }} className="bg-[#FBFBFB] flex flex-col items-center py-10 gap-10">
        <p className="font-bold text-[2em]">How Can We <span className="bg-mainAboutUsBlue text-white p-2 px-3 rounded-[10px]">Assist</span> You</p>

        <div className="w-[90%] ">
          <div ref={scrollAssistYouRef} className=" w-full flex overflow-hidden gap-5 ">
            {howToAssistYou.map(({ image: ImageComponent, name, description }, index) => (
              <div key={index} className=" flex flex-col items-center gap-5 p-3 bg-white shrink-0 w-[30%] rounded-[10px]">
                <ImageComponent className="w-[100%] h-[230px]" />
                <p className="text-textColor text-[1.2em] font-bold">{name}</p>
                <p className="text-center text-textColor opacity-[63%]">{description}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="w-full flex justify-center gap-[4em]">
          <button onClick={handleScrollAssistYouLeft}>
            <LeftArrow className="bg-white h-[50px] w-[50px] rounded-[100%] p-3 flex justify-center items-center" />
          </button>

          <button onClick={handleScrollAssistYouRight}>
            <RightArrow className="bg-white h-[50px] w-[50px] rounded-[100%] p-3 flex justify-center items-center" />
          </button>
        </div>

      </div>
      <div className="relative bg-[url('/static/images/aboutus/startWithUs.png')] bg-center bg-cover flex flex-col items-center justify-evenly p-3 h-[300px]">
          <div className="absolute inset-0 bg-black bg-opacity-[53%] z-0"></div>
          <p className="text-[2.2em] font-bold text-white z-10">We Are Here To <span className="bg-mainAboutUsBlue p-2 px-4 rounded-[10px] text-white">Help</span></p>
          <p className="text-center w-[60%] z-10 opacity-[68%] text-[1.1em] text-white">Our commitment to serving you knows no bounds. Whether you have questions in the early hours of the morning or require assistance late at night, our customer service team is available 24/7 to cater to your needs. Your convenience is paramount, and we are just a call or message away.</p>
          <Link className="bg-mainAboutUsBlue text-white p-2 rounded-[20px] w-[120px] text-center z-10" href={"/contact-us"}>Contact Us</Link>

      </div>
    </div>
  );
}
