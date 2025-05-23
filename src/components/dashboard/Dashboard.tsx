import React, { useState } from 'react';
import CustomerProfile from './CustomerProfile';
import ProductList from './ProductList';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useGetCustomerRecommendationQuery } from '../../store/api/recommendationsApi';
import { EmptyState } from '../ui/empty-state';
import { Skeleton } from '../ui/skeleton';

const Dashboard: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [searchInitiated, setSearchInitiated] = useState(false);
  
  const {
    data: customer,
    isLoading,
    isError,
    error
  } = useGetCustomerRecommendationQuery(accountNumber, {
    skip: !searchInitiated || !accountNumber,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountNumber) {
      setSearchInitiated(true);
    }
  };

  const renderContent = () => {
    if (!searchInitiated) {
      return (
        <EmptyState
          title="Search for a Customer"
          description="Enter a customer account number to view their personalized product recommendations"
        />
      );
    }

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Skeleton className="h-[200px] w-full mb-6" />
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-[100px] w-full" />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <EmptyState
          title="Error Loading Data"
          description={`Failed to load customer data. ${(error as any)?.data?.message || 'Please try again.'}`}
        />
      );
    }

    if (!customer) {
      return (
        <EmptyState
          title="No Results Found"
          description="No customer found with the provided account number. Please check and try again."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CustomerProfile customer={customer} />
        </div>
        <div className="lg:col-span-2">
          <ProductList products={customer.recommended_products.map((rp, index) => ({
            id: String(index + 1),
            name: rp.name,
            description: rp.reason,
            status: 'Recommended'
          }))} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Customer Product Recommendations
            </h1>
            <p className="text-blue-100">
              Search for a customer to view personalized product recommendations
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Enter customer account number..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              disabled={!accountNumber}
            >
              Search
            </Button>
          </form>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;