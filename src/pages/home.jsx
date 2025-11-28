import React, { useEffect, useState } from 'react'
import Navbar from '../components/nav'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function Home() {
  const [Product, setProduct] = useState([])
  const dispatch = useDispatch()

  function fetchData() {
    fetch("https://fakestoreapi.com/products")
      .then(res => {
        !res.ok && alert("An error occurred")
        return res.json()
      })
      .then(data => setProduct(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-[#e6be3c]">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
        {Product.map(product => (
          <div 
            key={product.id} 
            className="bg-gray-900 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
          >
            <Link to={`/product/${product.id}`} className="flex-1">
              <img 
                src={product.image} 
                alt={product.title} 
                className="h-48 w-full object-contain mb-4" 
              />
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
              <p className="text-gray-400 font-bold text-lg">${product.price}</p>
            </Link>

            <button
              onClick={() => {
                dispatch(addToCart(product));
                toast.success(`${product.title} added to cart!`, {
                  style: { background: "#D4AF37", color: "black", fontWeight: "bold" },
                  icon: "🛒"
                });
              }}
              className="mt-4 bg-[#D4AF37] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
