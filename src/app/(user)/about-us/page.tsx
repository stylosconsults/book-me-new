import Image from "next/image";
import Link from "next/link";
import React from "react";

type WhyChooseUs = {
  heading: string
  paragraph: string
}
const whyChooseUs: WhyChooseUs[] = [
  {
    heading: "Extensive Selection of Hotels",
    paragraph: "With an extensive database of hotels worldwide, we offer an array of accommodation options that cater to every budget and preference. Whether you seek a luxurious resort, a cozy boutique hotel, or a budget-friendly stay, we have the perfect match for you."
  },

  {
    heading: "Extensive Selection of Hotels",
    paragraph: "With an extensive database of hotels worldwide, we offer an array of accommodation options that cater to every budget and preference. Whether you seek a luxurious resort, a cozy boutique hotel, or a budget-friendly stay, we have the perfect match for you."
  },

  {
    heading: "Extensive Selection of Hotels",
    paragraph: "With an extensive database of hotels worldwide, we offer an array of accommodation options that cater to every budget and preference. Whether you seek a luxurious resort, a cozy boutique hotel, or a budget-friendly stay, we have the perfect match for you."
  },

  {
    heading: "Extensive Selection of Hotels",
    paragraph: "With an extensive database of hotels worldwide, we offer an array of accommodation options that cater to every budget and preference. Whether you seek a luxurious resort, a cozy boutique hotel, or a budget-friendly stay, we have the perfect match for you."
  },

  {
    heading: "Extensive Selection of Hotels",
    paragraph: "With an extensive database of hotels worldwide, we offer an array of accommodation options that cater to every budget and preference. Whether you seek a luxurious resort, a cozy boutique hotel, or a budget-friendly stay, we have the perfect match for you."
  },

  {
    heading: "Extensive Selection of Hotels",
    paragraph: "With an extensive database of hotels worldwide, we offer an array of accommodation options that cater to every budget and preference. Whether you seek a luxurious resort, a cozy boutique hotel, or a budget-friendly stay, we have the perfect match for you."
  },

  {
    heading: "Extensive Selection of Hotels",
    paragraph: "With an extensive database of hotels worldwide, we offer an array of accommodation options that cater to every budget and preference. Whether you seek a luxurious resort, a cozy boutique hotel, or a budget-friendly stay, we have the perfect match for you."
  },

  {
    heading: "Extensive Selection of Hotels",
    paragraph: "With an extensive database of hotels worldwide, we offer an array of accommodation options that cater to every budget and preference. Whether you seek a luxurious resort, a cozy boutique hotel, or a budget-friendly stay, we have the perfect match for you."
  },

  {
    heading: "Extensive Selection of Hotels",
    paragraph: "With an extensive database of hotels worldwide, we offer an array of accommodation options that cater to every budget and preference. Whether you seek a luxurious resort, a cozy boutique hotel, or a budget-friendly stay, we have the perfect match for you."
  },
]

export default function AboutUs() {
  return (
    <div className="bg-white">

      <div className=" flex justify-evenly mb-9">
        <div className=" w-[40%] flex flex-col justify-evenly">
          <p className="font-semibold text-[2.2em]">Get To <span className="bg-mainAboutUsBlue text-white rounded-[10px] p-2 px-4">Know</span> Us</p>
          <p className="opacity-[68%] text-[1.2em]">At Bookme.rw, we believe that every journey should be filled with remarkable experiences and unforgettable memories. Our mission is to make hotel booking a seamless and enjoyable process, empowering travelers to explore the world with ease and confidence. Whether you're embarking on a leisurely vacation or a business trip, we are here to be your trusted companion on your travel adventures.</p>
          <Link className="bg-mainAboutUsBlue text-white p-2 rounded-[20px] w-[120px] text-center" href={"/contact-us"}>Contact Us</Link>
        </div>

        <Image className="w-[40%]" src={"/static/images/aboutus/aboutUsHeader.png"} alt="no_img" width={200} height={130} />
      </div>

      <div className="flex flex-col items-center gap-10 relative bg-mainAboutUsBlue ">
        <Image className="absolute top-0 left-0 w-[300px] h-[600px] z-0" src={"/static/images/aboutus/whyChooseUsTopLines.png"} alt="no_img" width={100} height={100} />
        <Image className="absolute bottom-0 right-0 w-[300px] h-[600px] z-0" src={"/static/images/aboutus/whyChooseUsBottomLines.png"} alt="no_img" width={100} height={100} />
        <div className=" flex flex-col items-center gap-4 z-10 mt-10">
          <p className="text-[2.2em] font-semibold text-white ">Why <span className="bg-white p-2 px-3 rounded-[10px] text-mainAboutUsBlue" >Choose</span>Us ?</p>
          <p className=" w-[60%] text-center text-white opacity-[68%]">At Bookme.rw, we believe that every journey should be filled with remarkable experiences and unforgettable memories.</p>
        </div>

        <div className=" mb-[80px] w-[96%] flex flex-wrap gap-[28px] justify-center z-10">
          {
            whyChooseUs.map(({heading, paragraph}, index)=>(
              <div className=" w-[31%] p-3 bg-blue-900 flex flex-col gap-2 z-10">
                <div className="flex gap-5 items-center">
                  <Image className="w-[8%] h-[90%] " src={"/static/images/aboutus/whyChooseUsIcon.png"} alt="no_img" width={20} height={5} />
                  <p className="text-white text-[1.2em] w-[80%]">{heading}</p>
                </div>

                <p className="text-white opacity-[68%]">{paragraph}</p>
              </div>
            ))
          }
        </div>

      </div>


      <div className="relative bg-[url('/static/images/aboutus/startWithUs.png')] bg-center bg-cover flex flex-col items-center justify-evenly p-3 h-[300px]">
          <div className="absolute inset-0 bg-white bg-opacity-[41%] z-0"></div>
          <p className="text-[2.2em] font-bold text-mainAboutUsBlue z-10">Start Your <span className="bg-mainAboutUsBlue p-2 px-4 rounded-[10px] text-white">Journey</span> Today</p>
          <p className="text-center w-[60%] z-10 opacity-[68%] text-[1.1em]">We invite you to join our community of passionate travelers who have made us their go-to platform for hotel bookings. Explore the world confidently, knowing that we are here to make your journey exceptional from start to finish.</p>
          <Link className="bg-mainAboutUsBlue text-white p-2 rounded-[20px] w-[120px] text-center z-10" href={"/contact-us"}>Contact Us</Link>

      </div>
    </div>
  );
}
