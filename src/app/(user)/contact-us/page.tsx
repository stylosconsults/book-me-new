"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
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
    <form
      onSubmit={handleSubmit}
      className="bg-white w-fit mx-auto p-5 min-w-[400px] rounded-lg flex flex-col gap-2"
    >
      <div>
        <h1 className="text-2xl font-bold">Contact us</h1>
        <p className="text-[#777E90]">
          Have any question? Ask us, we will answer
        </p>
      </div>

      <Input
        label="Names"
        type={"text"}
        name="name"
        required
        onChange={handleChange}
      />
      <Input
        label="Email Address"
        type={"email"}
        name="email"
        required
        onChange={handleChange}
      />
      <Input
        label="Phone Number"
        type={"text"}
        name="phone"
        required
        onChange={handleChange}
      />
      <div className="flex flex-col">
        <label className="text-co-black font-bold text-base">Message</label>
        <textarea
          onChange={handleTextAreaChange}
          required
          className="bg-white focus:outline-none focus:shadow-outline border resize-y border-gray-300 rounded-lg py-2 px-4 block w-full h-full appearance-none leading-normal"
          name="message"
          placeholder="Message or Question"
        ></textarea>
      </div>
      <Button>{loading ? "Sending message..." : "Send Message"}</Button>
    </form>
  );
}
