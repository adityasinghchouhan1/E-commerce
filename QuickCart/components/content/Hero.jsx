'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'

const images = ['/banner1.webp', '/unlockbanner.webp', '/banner1.webp']

export default function Hero() {
  return (
    <div className="relative w-full  h-[70vh] sm:h-[70vh] xs:h-[40vh]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative mt-1 w-full h-[70vh] sm:h-[70vh] xs:h-[40vh]">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                priority
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
