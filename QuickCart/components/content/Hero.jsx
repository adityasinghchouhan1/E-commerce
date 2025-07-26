'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import axios from 'axios'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/autoplay'

export default function Hero() {
  const [sliderImages, setSliderImages] = useState([])

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await axios.get('http://localhost:8008/api/getsliderdata')
        if (res.data.status && res.data.data) {
          const imagePaths = res.data.data.map((item) => item.image)
          setSliderImages(imagePaths)
        }
      } catch (error) {
        console.error('Error fetching slider images:', error)
      }
    }

    fetchSliderImages()
  }, [])

  return (
    <div className="relative w-full h-[70vh] sm:h-[70vh] xs:h-[40vh]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full h-full"
      >
        {sliderImages.map((filename, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[70vh] sm:h-[70vh] xs:h-[40vh]">
              <Image
                src={`http://localhost:8008/uploads/${filename}`}
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
