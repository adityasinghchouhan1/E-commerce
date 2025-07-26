'use client'
import React from 'react'
import HeaderSlider from '@/components/content/Hero'
import HomeProducts from '@/components/HomeProducts'
// import Banner from '@/components/Banner'
// import NewsLetter from '@/components/NewsLetter'
import FeaturedProduct from '@/components/FeaturedProduct'
import Navbar from '@/components/Navbar'
import Footer from '@/components/content/Footer'
import MainSlider from '@/components/content/NewsCarousel'
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-10 lg:px-0">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <MainSlider />
        {/* <NewsLetter /> */}
      </div>
      <Footer />
    </>
  )
}

export default Home
