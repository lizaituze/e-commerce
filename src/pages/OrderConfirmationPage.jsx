import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import Button from '../components/Button';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { orders } = useOrders();
  const order = orders.find((o) => String(o.id) === String(id));

  if (!order) {
    return (
      <div className="flex flex-col items-center py-24 gap-4">
        <p className="text-gray-500">Order not found.</p>
        <Link to="/"><Button>Go home</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 flex flex-col items-center gap-6 text-center">
      <CheckCircle size={64} className="text-green-500" />
      <h1 className="text-2xl font-bold text-gray-800">Order confirmed!</h1>
      <p className="text-gray-500">Thank you, <strong>{order.name}</strong>. Your order has been placed.</p>
      <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100 text-left">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">Order #{order.id}</p>
        <ul className="flex flex-col gap-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600 line-clamp-1 flex-1">{item.title} × {item.qty}</span>
              <span className="font-medium text-gray-800">${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold text-gray-800">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
        <div className="mt-3 text-sm text-gray-500">
          <p>Shipping to: {order.address}, {order.city}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Link to="/orders"><Button variant="secondary">View all orders</Button></Link>
        <Link to="/"><Button>Continue shopping</Button></Link>
      </div>
    </div>
  );
}
