import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../../components/Button';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const image = product.images?.[0] || 'https://placehold.co/400x300?text=No+Image';

  function handleAdd() {
    dispatch({ type: 'ADD', product });
    toast.success(`"${product.title}" added to cart`);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <img
          src={image}
          alt={product.title}
          className="w-full h-52 object-cover"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300?text=No+Image'; }}
        />
      </Link>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs text-indigo-500 font-medium uppercase tracking-wide">
          {product.category?.name}
        </span>
        <Link to={`/products/${product.id}`} className="font-semibold text-gray-800 hover:text-indigo-600 line-clamp-2 text-sm leading-snug">
          {product.title}
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-indigo-600">${product.price}</span>
          <Button onClick={handleAdd} className="text-xs px-3 py-1.5">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
