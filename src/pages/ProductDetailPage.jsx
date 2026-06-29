import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../features/products/useProducts';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { data: product, isLoading, isError, error } = useProduct(id);
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  const images = product.images?.length ? product.images : ['https://placehold.co/600x400?text=No+Image'];

  function handleAdd() {
    dispatch({ type: 'ADD', product });
    toast.success('Added to cart!');
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-sm text-indigo-600 hover:underline mb-6 flex items-center gap-1">
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col gap-3">
          <img
            src={images[activeImg]}
            alt={product.title}
            className="w-full h-80 object-cover rounded-2xl border border-gray-100"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image'; }}
          />
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}>
                  <img
                    src={img}
                    alt=""
                    className={`w-16 h-16 object-cover rounded-lg border-2 transition-colors ${i === activeImg ? 'border-indigo-600' : 'border-gray-200'}`}
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/100?text=?'; }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Info */}
        <div className="flex flex-col gap-4">
          <span className="text-xs text-indigo-500 font-medium uppercase tracking-wide">
            {product.category?.name}
          </span>
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-3xl font-bold text-indigo-600">${product.price}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleAdd} className="flex-1">
              Add to cart
            </Button>
            <Button
              variant="secondary"
              onClick={() => { handleAdd(); navigate('/cart'); }}
              className="flex-1"
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
