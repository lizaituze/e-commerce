import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import Input from '../components/Input';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const FIELDS = [
  { id: 'name', label: 'Full name', type: 'text', placeholder: 'Jane Doe' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
  { id: 'address', label: 'Shipping address', type: 'text', placeholder: '123 Main St' },
  { id: 'city', label: 'City', type: 'text', placeholder: 'New York' },
  { id: 'card', label: 'Card number', type: 'text', placeholder: '•••• •••• •••• ••••', maxLength: 19 },
];

export default function CheckoutPage() {
  const { items, total, dispatch } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', card: '' });
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 gap-4">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        <Link to="/"><Button>Shop now</Button></Link>
      </div>
    );
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!Object.values(form).every(Boolean)) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    try {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));
      const order = placeOrder(items, total, form);
      dispatch({ type: 'CLEAR' });
      toast.success('Order placed!');
      navigate(`/orders/${order.id}`);
    } catch {
      toast.error('Checkout failed, please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      <div className="grid md:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-4">
          {FIELDS.map((f) => (
            <Input key={f.id} {...f} value={form[f.id]} onChange={handleChange} required />
          ))}
          <Button type="submit" disabled={submitting} className="mt-2 py-3 text-base">
            {submitting ? 'Placing order…' : `Place order · $${total.toFixed(2)}`}
          </Button>
        </form>
        {/* Order summary */}
        <div className="md:col-span-2">
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <h2 className="font-semibold text-gray-700 mb-4">Order summary</h2>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm gap-2">
                  <span className="text-gray-600 line-clamp-1 flex-1">{item.title} × {item.qty}</span>
                  <span className="font-medium text-gray-800 whitespace-nowrap">${(item.price * item.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
