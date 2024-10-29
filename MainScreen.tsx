import * as React from 'react';
import { Product } from '../types';
import { ProductList } from './ProductList';
import { DeliveryEstimator } from './DeliveryEstimator';

export function MainScreen() {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  return (
    <stackLayout className="p-4">
      <label className="text-2xl font-bold mb-4">Delivery Estimator</label>
      
      <label className="font-bold mb-2">Select a Product:</label>
      <ProductList onSelectProduct={setSelectedProduct} />
      
      {selectedProduct && (
        <>
          <label className="font-bold mt-4">
            Selected: {selectedProduct.name}
          </label>
          <DeliveryEstimator selectedProduct={selectedProduct} />
        </>
      )}
    </stackLayout>
  );
}