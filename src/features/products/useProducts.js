import { useQuery } from '@tanstack/react-query';
import { getProducts, getProduct, getCategories } from '../../api/products';

export function useProducts(filters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    placeholderData: (prev) => prev,
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  });
}
