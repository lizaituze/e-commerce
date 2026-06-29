import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import Button from '../components/Button';

export default function OrderHistoryPage() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 gap-4">
        <span className="text-5xl">📦</span>
        <p className="text-gray-500 text-lg">No orders yet.</p>
        <Link to="/"><Button>Start shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow block"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="font-semibold text-gray-800">Order #{order.id}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {new Date(order.placedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                </p>
                <p className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-indigo-600">${order.total.toFixed(2)}</p>
                <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Confirmed
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
