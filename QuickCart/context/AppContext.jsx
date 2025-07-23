'use client'
import { productsDummyData, userDummyData } from '@/assets/assets'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AppContext = createContext()

export const useAppContext = () => {
  return useContext(AppContext)
}

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY
  const router = useRouter()

  const [products, setProducts] = useState([])
  const [userData, setUserData] = useState(false)
  const [isSeller, setIsSeller] = useState(true)
  const [cartItems, setCartItems] = useState({})

  const fetchProductData = async () => {
    try {
      const res = await axios.get('http://localhost:8008/api/Productget') // <-- update this endpoint
      setProducts(res.data.products)
      console.log('Fetched Products:', res.data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchUserData = async () => {
    setUserData(userDummyData)
  }

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      cartData[itemId] += 1
    } else {
      cartData[itemId] = 1
    }
    setCartItems(cartData)
  }

  const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems)
    if (quantity === 0) {
      delete cartData[itemId]
    } else {
      cartData[itemId] = quantity
    }
    setCartItems(cartData)
  }

  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items]
      }
    }
    return totalCount
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items)
      if (itemInfo && cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items]
      }
    }
    return Math.floor(totalAmount * 100) / 100
  }

  useEffect(() => {
    fetchProductData()
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [])

  const value = {
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}
