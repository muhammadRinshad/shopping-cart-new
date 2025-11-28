import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
     const cartCount = cartItems.length;

  return (
  <div className="px-6 py-4 flex justify-between items-center shadow-lg bg-black text-[#D4AF37]">
    <Link 
        to="/" 
        className="text-2xl font-extrabold tracking-wide hover:text-[#FFD700] transition">
       🛒 Shopeee
      </Link>
    <div className="flex items-center space-x-6 text-lg font-medium">
      <Link to="/" className="hover:text-[#FFD700] transition">Home</Link>
       <Link to="/cart" className="cart-link ">
             Cart  🛒
            {cartCount > 0 && <span className="cart-count mr-2">({cartCount})</span>}
          </Link>
      </div>

    </div>
  );
}

export default Navbar;
