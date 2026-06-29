import { useState, useEffect } from 'react';
import { useProducts, useCategories } from '../features/products/useProducts';
import ProductCard from '../features/products/ProductCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Input from '../components/Input';
import Button from '../components/Button';

const LIMIT = 12;

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // reset to first page when filters change
  useEffect(() => { setOffset(0); }, [debouncedSearch, categoryId]);

  const filters = {
    limit: LIMIT,
    offset,
    ...(debouncedSearch && { title: debouncedSearch }),
    ...(categoryId && { categoryId }),
  };

  const { data: products, isLoading, isError, error, isFetching, isPlaceholderData } = useProducts(filters);
  const { data: categories } = useCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:w-72"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        >
          <option value="">All categories</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {(search || categoryId) && (
          <Button variant="ghost" onClick={() => { setSearch(''); setCategoryId(''); }}>
            Clear
          </Button>
        )}
      </div>

      {isLoading || (isFetching && !isPlaceholderData) ? (
        <Spinner />
      ) : isError ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          {isPlaceholderData && isFetching && (
            <p className="text-sm text-indigo-500 mb-3 animate-pulse">Updating…</p>
          )}
          {products?.length === 0 ? (
            <div className="flex flex-col items-center py-20 gap-3">
              <span className="text-4xl">🔍</span>
              <p className="text-gray-500">No products found. Try a different search.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 transition-opacity ${isPlaceholderData ? 'opacity-50' : 'opacity-100'}`}>
              {products?.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <Button
              variant="secondary"
              onClick={() => setOffset((o) => Math.max(0, o - LIMIT))}
              disabled={offset === 0 || isFetching}
            >
              ← Previous
            </Button>
            <span className="text-sm text-gray-500">Page {offset / LIMIT + 1}</span>
            <Button
              variant="secondary"
              onClick={() => setOffset((o) => o + LIMIT)}
              disabled={(products?.length ?? 0) < LIMIT || isFetching}
            >
              Next →
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
