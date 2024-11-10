"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Image from "next/image";
import React, { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    website: "Bookme",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTextAreaChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        alert("Message sent!");
      })
      .catch((error) => {
        alert("Error occured");
      })
      .finally(() => setLoading(false));
  };

  return (

    <div style={{
      background: `linear-gradient(to bottom right, #ffffff 70%, rgba(1, 66, 235, 0.04) 100%)`
    }} className="flex justify-evenly bg-white  ">
      <div className="w-[40%] pt-[20px] gap-5 flex flex-col">
        <p className="text-[2.2em] font-semibold">Let's <span className="bg-mainAboutUsBlue rounded-[10px] text-white p-1 px-2">Get</span> In Touch</p>
        <p className="opacity-[68%] text-[1.1em]">At Bookme.rw, we believe that every journey should be filled with remarkable experiences and unforgettable memories.At Bookme.rw, we believe that every journey should be filled with remarkable experiences and unforgettable memories.At Bookme.rw, we believe that every journey should be filled with remarkable experiences and unforgettable memories.At Bookme.rw, we believe that every journey should be filled with remarkable experiences and unforgettable memories.</p>
      </div>
      <form className="w-[45%] gap-8 flex flex-col items-center p-2 ">
        <div className=" w-full flex justify-between">
          <div className="flex flex-col relative gap-1">
            <label className="text-mainAboutUsBlue ps-2" htmlFor="name">Name</label>
            <Image className="w-[15px] h-[15px] absolute top-[44px] left-[18px]" src={"/static/images/contactUS/Name.png"} alt="no_image" width={20} height={20} />
            <input className=" text-[1.1em] p-4 ps-10 border-none outline-none rounded-[27px] bg-mainAboutUsBlue bg-opacity-[4%]" type="text" id="name" placeholder="Enter your name" />
          </div>

          <div className=" relative flex flex-col gap-1">
            <label className="text-mainAboutUsBlue ps-2" htmlFor="phone">Phone</label>
            <Image className="w-[15px] h-[15px] absolute top-[44px] left-[18px]" src={"/static/images/contactUS/Your_phone_email.png"} alt="no_image" width={10} height={10} />
            <input className=" text-[1.1em] p-4 ps-10 border-none outline-none rounded-[27px] bg-mainAboutUsBlue bg-opacity-[4%]" type="number" name="phone" placeholder="Enter your phone number" />
          </div>
        </div>

        <div className="relative flex flex-col w-full gap-1">
          <label className="text-mainAboutUsBlue ps-2" htmlFor="email">Email</label>
          <Image className="w-[15px] h-[15px] absolute top-[44px] left-[18px]" src={"/static/images/contactUS/Your_phone_email.png"} alt="no_image" width={10} height={10} />
          <input className=" text-[1.1em] p-4 ps-10 border-none outline-none  rounded-[27px] bg-mainAboutUsBlue bg-opacity-[4%]" type="email" placeholder="Enter your email" />
        </div>

        <div className="relative flex flex-col w-full gap-1">
          <label className="text-mainAboutUsBlue ps-2" htmlFor="message">Message</label>
          <Image className="w-[15px] h-[15px] absolute top-[44px] left-[18px]" src={"/static/images/contactUS/your_message.png"} alt="no_image" width={10} height={10} />
          <textarea className=" text-[1.1em] p-4 ps-10 h-[200px] border-none outline-none rounded-[27px] bg-mainAboutUsBlue bg-opacity-[4%]" name="message" id="message" placeholder="Enter your message"></textarea>
        </div>

        <button className="bg-mainAboutUsBlue text-white p-2 rounded-[20px] w-[160px] text-center">Send Message</button>
      </form>
    </div>
    // <form
    //   onSubmit={handleSubmit}
    //   className="bg-white w-fit mx-auto p-5 min-w-[400px] rounded-lg flex flex-col gap-2"
    // >
    //   <div>
    //     <h1 className="text-2xl font-bold">Contact us</h1>
    //     <p className="text-[#777E90]">
    //       Have any question? Ask us, we will answer
    //     </p>
    //   </div>

    //   <Input
    //     label="Names"
    //     type={"text"}
    //     name="name"
    //     required
    //     onChange={handleChange}
    //   />
    //   <Input
    //     label="Email Address"
    //     type={"email"}
    //     name="email"
    //     required
    //     onChange={handleChange}
    //   />
    //   <Input
    //     label="Phone Number"
    //     type={"text"}
    //     name="phone"
    //     required
    //     onChange={handleChange}
    //   />
    //   <div className="flex flex-col">
    //     <label className="text-co-black font-bold text-base">Message</label>
    //     <textarea
    //       onChange={handleTextAreaChange}
    //       required
    //       className="bg-white focus:outline-none focus:shadow-outline border resize-y border-gray-300 rounded-lg py-2 px-4 block w-full h-full appearance-none leading-normal"
    //       name="message"
    //       placeholder="Message or Question"
    //     ></textarea>
    //   </div>
    //   <Button>{loading ? "Sending message..." : "Send Message"}</Button>
    // </form>
  );
}
