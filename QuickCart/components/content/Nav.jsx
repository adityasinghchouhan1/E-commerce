'use client'

import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'

import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Truck,
  LogIn,
  AppWindow,
  Sun,
  FlaskConical,
  Leaf,
  Package,
  User,
  Users,
  Layers,
  MessageCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const { isSeller, router, getCartCount } = useAppContext()

  const [cartCount] = useState(5)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(true)

  const menuItems = [
    {
      name: 'Summer Essentials',
      icon: <Sun className="w-5 h-5" />,
      link: '/summer',
    },
    {
      name: 'Solution',
      icon: <FlaskConical className="w-5 h-5" />,
      link: '/solution',
    },
    {
      name: 'Ingredients',
      icon: <Leaf className="w-5 h-5" />,
      link: '/ingredients',
    },
    {
      name: 'Product',
      icon: <Package className="w-5 h-5" />,
      link: '/all-products',
    },
    { name: 'Men', icon: <User className="w-5 h-5" />, link: '/men' },
    { name: 'Women', icon: <Users className="w-5 h-5" />, link: '/women' },
    { name: 'Combos', icon: <Layers className="w-5 h-5" />, link: '/combos' },
  ]

  return (
    <header className="w-full shadow relative">
      {/* 🔰 Banner */}
      {showBanner && (
        <div className="bg-[#5A732A] text-white text-center text-sm py-2 relative">
          Ayurveda takes 6 months to make big changes from within
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* 🔰 Main Nav */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <Image src="/logo.svg" alt="Kapiva Logo" width={100} height={40} />

        {/* 🔍 Search */}
        <div className="hidden md:flex items-center flex-1 mx-4">
          <input
            type="text"
            placeholder="Product or Usage"
            className="w-full border rounded-l-md px-3 py-2"
          />
          <button className="bg-gray-100 p-2 rounded-r-md">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* 📦 Icons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="border px-4 py-1 rounded">
            LOGIN
          </Link>
          {/* <button className="border px-4 py-1 rounded">GET APP</button> */}
          {/* <Truck className="w-5 h-5" /> */}
          <div className="relative" onClick={() => router.push('/cart')}>
            <ShoppingCart className="w-6 h-6" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </div>
          {isSeller && (
            <button
              onClick={() => router.push('/seller')}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
          <button onClick={() => setMobileOpen(true)}>
            <Menu />
          </button>
        </div>
      </div>

      {/* 📱 Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="font-bold text-lg">Login</span>
          <button onClick={() => setMobileOpen(false)}>
            <X />
          </button>
        </div>

        <div className="p-4 space-y-1">
          <h3 className="text-sm font-semibold text-gray-600">SHOP</h3>
          {menuItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="flex items-center gap-3 py-2 border-b cursor-pointer hover:bg-gray-50 transition-all px-1"
            >
              <div className="text-green-700">{item.icon}</div>
              <span>{item.name}</span>
            </Link>
          ))}

          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-600">Blog</h3>
            <h3 className="text-sm font-semibold text-gray-600">
              Download App
            </h3>
          </div>
        </div>
      </div>

      {/* 🟠 Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* ✅ WhatsApp Button */}
      <a
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="bg-green-500 hover:bg-green-600 rounded-full p-3 shadow-lg">
          <MessageCircle className="text-white w-5 h-5" />
        </div>
      </a>
    </header>
  )
}
