// ye line add kr dena adi jha bhi footer ko render kraega 

{/* <div className="flex flex-col justify-between">
        <Footer />
      </div> */}


'use client';

import { ArrowRight, Mail, PhoneCall } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#F4F1ED] text-black">
      {/* 🌿 Top Banner Subscribe */}
      <div
        className="bg-cover bg-center py-12 px-6 text-white text-center"
        style={{
          backgroundImage: "url('/unlockbanner.webp')", // Replace with your leafy background image
        }}
      >
        <h2 className="text-3xl font-bold mb-4">
          unlock offers & <br />
          <span className="italic">subscribe for content</span>
        </h2>
        <div className="max-w-xl mx-auto flex items-center bg-white rounded overflow-hidden shadow-md">
          <input
            type="text"
            placeholder="Enter your phone number"
            className="flex-1 px-4 py-3 text-black outline-none"
          />
          <button className="bg-[#2B4C3F] hover:bg-[#1f3a30] p-4">
            <ArrowRight className="text-white" />
          </button>
        </div>
      </div>

      {/* 🔻 Bottom Section */}
      <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8   mx-auto">
        {/* 📍 Address & Phone */}
        <div className="space-y-4">
          <Image src="/logo.svg" alt="Kapiva Logo" width={100} height={40} />
          <p className="text-sm">
            No 16-1 and 17-2,<br />
            Vaishnavi Tech Park,<br />
            Ambalipura Village,<br />
            Varthur Hobli, Varthur,<br />
            Bengaluru, Karnataka 560103
          </p>
          <p className="flex items-center gap-2 text-lg font-bold">
            <PhoneCall className="w-5 h-5" />
            1800-274-2575
          </p>
        </div>

        {/* 📎 Links */}
        <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
          <div className="space-y-2">
            <p>SHOP ALL</p>
            <p>MY ACCOUNT</p>
            <p>FAQS</p>
          </div>
          <div className="space-y-2">
            <p>ABOUT US</p>
            <p>BLOG</p>
            <p>MEDIA</p>
            <p>CONTACT US</p>
          </div>
        </div>

        {/* 📩 Mailing List */}
        <div className="space-y-4">
          <p className="font-semibold">JOIN OUR MAILING LIST</p>
          <div className="flex border border-black w-full max-w-sm">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-3 py-2 outline-none"
            />
            <button className="bg-[#1f3a30] px-4">
              <ArrowRight className="text-white" />
            </button>
          </div>
       
          <p className="font-semibold">FOLLOW US</p>
          <div className="flex gap-4 text-2xl">
            <a href="#"><img src="/icons/instagram.svg" className="h-6" /></a>
            <a href="#"><img src="/icons/facebook.svg" className="h-6" /></a>
            <a href="#"><img src="/icons/youtube.svg" className="h-6" /></a>
            <a href="#"><img src="/icons/twitter.svg" className="h-6" /></a>
          </div>

          <p className="pt-4 font-medium">Also available on:</p>
          <div className="flex flex-wrap items-center gap-2">
            <img src="/logos/amazon.png" className="h-5" />
            <img src="/logos/flipkart.png" className="h-5" />
            <img src="/logos/zepto.png" className="h-5" />
            <img src="/logos/instamart.png" className="h-5" />
          </div>

          <p className="pt-4 font-medium">We Accept:</p>
          <div className="flex flex-wrap items-center gap-2">
            <img src="/logos/amazon-pay.png" className="h-5" />
            <img src="/logos/bhim.png" className="h-5" />
            <img src="/logos/cod.png" className="h-5" />
            <img src="/logos/rupay.png" className="h-5" />
            <img src="/logos/visa.png" className="h-5" />
            <img src="/logos/mastercard.png" className="h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
