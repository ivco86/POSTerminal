import { useState, useEffect } from 'react';
import { Product } from '../types';
import { productsApi } from '../api/products';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsApi.list().then(({ data }) => setProducts(data.items));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">SKU</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4">{p.sku || '-'}</td>
                <td className="px-6 py-4">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4">{p.stock_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
