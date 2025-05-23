import React from 'react';
import { CustomerRecommendation } from '../../types';
import { User } from 'lucide-react';

type CustomerProfileProps = {
  customer: CustomerRecommendation;
};

const CustomerProfile: React.FC<CustomerProfileProps> = ({ customer }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={24} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-blue-800">{customer.customer_name}</h2>
          <div className="text-sm text-gray-500">Customer ID: {customer.customer_id}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-500">Account Number</div>
          <div className="text-lg font-semibold text-gray-900">{customer.account_number}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-500">Cluster</div>
          <div className="text-lg font-semibold text-gray-900">{customer.cluster}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;