import React, { useEffect, useState } from 'react'
import Navbar from '../components/nav'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function Home() {
  const [Product, setProduct] = useState([])
  const dispatch=useDispatch()

  function fetchData() {
     fetch("https://fakestoreapi.com/products")
     .then(res=>{
      console.log("heyy ",res);
      
      !res.ok&&alert("an error occured")

      return res.json()})
     .then(data=>{
      console.log("got",data);
      
      setProduct(data)
     })

  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log(Product);
  
  return (
    <div> 
    <Navbar/>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-10 bg-black text-[#D4AF37]">
    {Product.map(product => (
    <div key={product.id} className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} className="h-40 mx-auto mb-4" />
          <h3 className="text-xl font-bold">{product.title}</h3>
          <p className="text-gray-400 mb-3">${product.price}</p>
          </Link>
      <button
  onClick={() => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`, {
      style: { background: "#D4AF37", color: "black", fontWeight: "bold" },
      icon: "🛒"
    });
  }}
  className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg hover:bg-[#FFD700] transition"
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