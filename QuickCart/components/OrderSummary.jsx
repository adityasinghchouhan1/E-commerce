import { addressDummyData } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OrderSummary = () => {
  const { currency, router, getCartCount, getCartAmount } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [userAddresses, setUserAddresses] = useState([])

  // 👉 Coupon states
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [message, setMessage] = useState('')

  const fetchUserAddresses = async () => {
    setUserAddresses(addressDummyData)
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address)
    setIsDropdownOpen(false)
  }

  // 👉 Apply coupon
  const handleApplyCoupon = async () => {
    try {
      const res = await axios.post('http://localhost:8008/api/apply-coupon', {
        code: promoCode,
        orderAmount: getCartAmount(),
      })

      if (res.data.success) {
        setDiscount(res.data.discount)
        setMessage('✅ ' + res.data.message)
      } else {
        setDiscount(0)
        setMessage('❌ ' + res.data.message)
      }
    } catch (err) {
      setDiscount(0)
      setMessage('❌ Invalid coupon')
    }
  }

  const createOrder = async () => {
    // Example order object
    const order = {
      items: getCartCount(),
      amount: getCartAmount(),
      discount: discount,
      finalAmount:
        getCartAmount() + Math.floor(getCartAmount() * 0.02) - discount,
      address: selectedAddress,
    }

    console.log('Placing order: ', order)
    // 👉 Call your order API here
  }

  useEffect(() => {
    fetchUserAddresses()
  }, [])

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        {/* --- Address Dropdown --- */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : 'Select Address'}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-0' : '-rotate-90'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{' '}
                    {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push('/add-address')}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* --- Coupon Code --- */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-green-600 text-white px-9 py-2 hover:bg-green-700"
            >
              Apply
            </button>
          </div>
          {message && (
            <p className="mt-2 text-sm text-gray-700 font-medium">{message}</p>
          )}
        </div>

        <hr className="border-gray-500/30 my-5" />

        {/* --- Order Details --- */}
        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">
              {currency}
              {getCartAmount()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-700 font-medium">
              <p>Discount</p>
              <p>
                -{currency}
                {discount}
              </p>
            </div>
          )}
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {currency}
              {getCartAmount() + Math.floor(getCartAmount() * 0.02) - discount}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-green-600 text-white py-3 mt-5 hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  )
}

export default OrderSummary
