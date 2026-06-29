import { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem('orders')) ?? [];
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(load);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  function placeOrder(items, total, form) {
    const order = {
      id: Date.now(),
      items,
      total,
      ...form,
      placedAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
