import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/nav";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";


function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json()) 
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="text-center p-10">Loading...</div>;

  return (
    <div>
      <Navbar />
     <div className="flex flex-col md:flex-row p-10 gap-10 bg-black text-[#D4AF37]">
      <div className="flex-1 flex justify-center">
        <img src={product.image} alt={product.title} className="h-80 object-contain" />
        </div>
        <div className="flex-1">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-2xl font-semibold mb-6">${product.price}</p>
          <button
            onClick={() => {dispatch(addToCart(product));navigate("/cart")}}
            className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg hover:bg-[#FFD700] transition"
          >
            Add to Cart 🛒
      </button>
     </div>
      </div>
    </div>
  );
}

export default ProductDetails;
