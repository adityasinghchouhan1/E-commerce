'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const NewsCarousel = () => {
  const newsItems = [
    {
      logo: '/unlockbanner.webp',
      text: 'Kapiva Dia Free Juice innovation to manage',
    },
    {
 logo: '/unlockbanner.webp',      text: 'Featured Kapiva building the Ingestible Skincare Trend',
    },
    {
 logo: '/unlockbanner.webp',      text: 'Featured the launch of Kapiva Skin Foods',
    },
    {
 logo: '/unlockbanner.webp',      text: 'Featured Kapiva’s products as must-have nutritional supplements',
    },
    {
 logo: '/unlockbanner.webp',      text: 'Featured Effective Lifestyle Trends by Kapiva',
    },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-8 md:px-16">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
        In the News
      </h2>

      {/* Subtext & Stat */}
      <div className="text-center mt-6 mb-12">
        <p className="text-base text-[#B97E63] tracking-wider">
          Improving health with Ayurveda
        </p>
        <h3 className="text-4xl sm:text-5xl font-bold text-[#B97E63] mt-2">2M+</h3>
        <p className="text-lg font-semibold text-[#B97E63]">
          HAPPY AYURVEDA CONSUMERS
        </p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="px-2"
      >
        {newsItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow rounded-lg px-6 py-4 h-full flex flex-col items-center text-center">
              <Image
                src={item.logo}
                alt={`News logo ${index + 1}`}
                width={120}
                height={60}
                className="mb-4 object-contain w-full"
              />
              <hr className="w-full border-gray-300 mb-4" />
              <p className="text-sm text-gray-800">{item.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewsCarousel;
