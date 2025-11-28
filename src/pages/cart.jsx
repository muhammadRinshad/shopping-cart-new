import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart, decrement } from "../redux/cartSlice";
import Navbar from "../components/nav";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-black min-h-screen text-[#D4AF37]">
    <Navbar />
    <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">🛍️ Your Cart</h1>
{cartItems.length === 0 ? (
          <p className="text-gray-400 text-lg">Your cart is empty.</p>
        ) : (
          <>
  <div className="space-y-6">
{cartItems.map((item) => (
         <div
          key={item.id}
         className="flex items-center justify-between bg-gray-900 p-4 rounded-lg shadow-lg"
         >
 <div className="flex items-center space-x-4">
      <img
       src={item.image}
       alt={item.title}
       className="h-20 w-20 object-contain bg-white p-2 rounded"/>
   <div>
      <h2 className="text-lg font-bold">{item.title}</h2>
         <p>${item.price.toFixed(2)}</p>
         <p>Qty: {item.quantity}</p>
     </div>
  </div>
   <div className="space-x-3">
     {item.quantity > 1 && (
           <button
             onClick={() => dispatch(decrement(item.id))}
       className="bg-[#D4AF37] text-black px-3 py-1 rounded-lg hover:bg-[#FFD700] transition"           >
             −
           </button>
         )}
     <button
      onClick={() => dispatch(addToCart(item))}
      className="bg-[#D4AF37] text-black px-3 py-1 rounded-lg hover:bg-[#FFD700] transition" >   +
    </button>
   <button
    onClick={() => dispatch(removeFromCart(item.id))}
    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
     >
      Remove
  </button>
   </div>
  </div>
      ))}
 </div>
     <div className="mt-8 flex justify-between items-center">
     <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
   <button
     onClick={() => dispatch(clearCart())}
    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"  >
                Clear Cart
 </button>
   </div>
      </>
      )}
  </div>
  </div>
  );
}

export default Cart;
