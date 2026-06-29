import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, dispatch, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 gap-4">
        <span className="text-5xl">🛒</span>
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        <Link to="/">
          <Button>Browse products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center">
            <img
              src={item.images?.[0] || 'https://placehold.co/80?text=?'}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/80?text=?'; }}
            />
            <div className="flex-1 min-w-0">
              <Link to={`/products/${item.id}`} className="font-medium text-gray-800 hover:text-indigo-600 line-clamp-1">
                {item.title}
              </Link>
              <p className="text-indigo-600 font-bold mt-1">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}
                disabled={item.qty === 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-50 disabled:opacity-40"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold">{item.qty}</span>
              <button
                onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <p className="w-20 text-right font-semibold text-gray-700">${(item.price * item.qty).toFixed(2)}</p>
            <button
              onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
              className="text-red-400 hover:text-red-600 transition-colors ml-2"
              aria-label="Remove"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-indigo-50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-gray-500 text-sm">Subtotal</p>
          <p className="text-3xl font-bold text-indigo-700">${total.toFixed(2)}</p>
        </div>
        <Link to="/checkout">
          <Button className="text-base px-8 py-3">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
