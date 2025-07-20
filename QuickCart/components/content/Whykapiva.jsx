import React from "react";
import Image from "next/image";

const WhyKapiva = () => {
  return (
    <section className="relative bg-white  py-16">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-black text-center">
        Why Kapiva?
      </h2>
      <p className="text-center text-lg sm:text-xl mt-2 text-[#B97E63] tracking-widest">
        HEALTHY INSIDE, HAPPY OUTSIDE
      </p>

      {/* Section 01 */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="ps-20">
          <h3 className="text-[60px] sm:text-[80px] font-bold text-[#B97E63] leading-none">01</h3>
          <h4 className="text-xl sm:text-2xl font-bold mt-4">
            FORMULATED BY EXPERTS AT KAPIVA ACADEMY OF AYURVEDA
          </h4>
          <p className="mt-4 text-base sm:text-lg text-gray-800">
            Experts at Kapiva Academy of Ayurveda, Ph.D.'s, and Ayurvedacharya with
            over 50 years of cumulative experience build formulations with
            scientifically and clinically tested ingredients, to make our proprietary
            products that help you reach your health goals.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/whykapiva01.webp"
            alt="Kapiva Experts"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>
      </div>

      {/* Section 02 */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="order-2 md:order-1 flex justify-center md:justify-start">
          <Image
            src="/whykapiva02.webp"
            alt="Kapiva Validation"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>
        <div className="order-1 md:order-2 text-end pe-20">
          <h3 className="text-[60px] sm:text-[80px] font-bold text-[#B97E63] leading-none">02</h3>
          <h4 className="text-xl sm:text-2xl font-bold mt-4">
            TESTED INGREDIENTS & CLINICAL VALIDATION
          </h4>
          <p className="mt-4 text-base sm:text-lg text-gray-800">
            Our formulations undergo clinical validation and testing to ensure safety and effectiveness. Kapiva’s commitment to Ayurvedic principles and modern science results in products you can trust for your wellness journey.
          </p>
        </div>
      </div>

      {/* Section 03 */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="ps-20">
          <h3 className="text-[60px] sm:text-[80px] font-bold text-[#B97E63] leading-none">03</h3>
          <h4 className="text-xl sm:text-2xl font-bold mt-4">
            SUSTAINABLE & NATURAL SOURCING
          </h4>
          <p className="mt-4 text-base sm:text-lg text-gray-800">
            Kapiva ensures sustainability by sourcing ingredients naturally and ethically. Our processes respect the environment while delivering high-quality, potent Ayurvedic products to support your health holistically.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/whykapiva03.webp"
            alt="Kapiva Sustainability"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyKapiva;
