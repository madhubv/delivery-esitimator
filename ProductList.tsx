import * as React from 'react';
import { StyleSheet } from "react-nativescript";
import { Product } from '../types';
import { DataService } from '../services/DataService';

interface ProductListProps {
  onSelectProduct: (product: Product) => void;
}

export function ProductList({ onSelectProduct }: ProductListProps) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProducts = async () => {
      const dataService = new DataService();
      await dataService.initialize();
      setProducts(dataService.getProducts());
      setLoading(false);
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <stackLayout className="p-4">
        <label>Loading products...</label>
      </stackLayout>
    );
  }

  return (
    <scrollView height="300">
      <stackLayout>
        {products.map(product => (
          <button
            key={product.id}
            className={`p-4 m-2 rounded-lg ${product.inStock ? 'bg-blue-500' : 'bg-gray-400'}`}
            onTap={() => product.inStock && onSelectProduct(product)}
          >
            <formattedString>
              <span className="text-white font-bold">{product.name}</span>
              <span className="text-white ml-2">₹{product.price}</span>
              <span className="text-xs text-white ml-2">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </formattedString>
          </button>
        ))}
      </stackLayout>
    </scrollView>
  );
}