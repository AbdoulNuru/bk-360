import React from 'react';
import { Product } from '../../types';
import StatusBadge from '../ui/StatusBadge';

type ProductCardProps = {
  product: Product;
  index: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-gray-500">PRODUCT#{index + 1}</div>
          <StatusBadge status={product.status} />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;