import React, { useState } from 'react';
import { Search, Download, X, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { useGetAllRecommendationsQuery } from '../../store/api/recommendationsApi';
import { Button } from '../ui/button';
import { EmptyState } from '../ui/empty-state';
import { Skeleton } from '../ui/skeleton';
import * as Dialog from '@radix-ui/react-dialog';

const ProductModal = ({ customer }: { customer: any }) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 animate-slide-in-center">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <User size={24} className="text-blue-600" />
        </div>
        <div>
          <Dialog.Title className="text-xl font-semibold text-blue-900">
            {customer.customer_name}
          </Dialog.Title>
          <div className="text-sm text-gray-500">Account: {customer.account_number}</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Customer ID</span>
          <span className="text-sm font-semibold text-blue-900">{customer.customer_id}</span>
        </div>
        <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Cluster</span>
          <span className="text-sm font-semibold text-blue-900">{customer.cluster}</span>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Recommended Products</h4>
          <div className="space-y-3">
            {customer.recommended_products.map((product: any, idx: number) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-1">{product.name}</h4>
                <p className="text-xs text-blue-700">{product.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog.Close asChild>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
);

const RecommendAll: React.FC = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;

  const {
    data: response,
    isLoading,
    isError
  } = useGetAllRecommendationsQuery({ 
    page,
    pageSize
  });

  const handleDownload = () => {
    if (!response?.data) return;

    const csvContent = [
      ['Customer ID', 'Customer Name', 'Account Number', 'Cluster', 'Recommended Products'],
      ...response.data.map(customer => [
        customer.customer_id,
        customer.customer_name,
        customer.account_number,
        customer.cluster,
        customer.recommended_products.map(p => p.name).join(', ')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recommendations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Remove duplicates based on account number
  const uniqueData = response?.data ? 
    Array.from(new Map(response.data.map(item => [item.account_number, item])).values()) 
    : [];

  const filteredData = uniqueData.filter(customer => 
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.account_number.includes(searchTerm)
  );

  const handlePrevious = () => {
    setPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (response?.data?.length === pageSize) {
      setPage(prev => prev + 1);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <EmptyState
          title="Error Loading Data"
          description="An error occurred while fetching the recommendations. Please try again."
        />
      );
    }

    if (!response?.data || response.data.length === 0) {
      return (
        <EmptyState
          title="No Recommendations Available"
          description="There are currently no recommendations to display."
        />
      );
    }

    if (filteredData.length === 0) {
      return (
        <EmptyState
          title="No Matching Results"
          description="Try adjusting your search terms to find what you're looking for."
        />
      );
    }

    return (
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Number
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cluster
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Top Recommended Product
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((customer) => (
                <tr key={`${customer.customer_id}-${customer.account_number}`} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.customer_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.account_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Cluster {customer.cluster}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.recommended_products[0] && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {customer.recommended_products[0].name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button className="text-blue-600 hover:text-blue-900 font-semibold">
                          View Details
                        </button>
                      </Dialog.Trigger>
                      <ProductModal customer={customer} />
                    </Dialog.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between items-center">
            <Button 
              variant="outline"
              onClick={handlePrevious}
              disabled={page === 0}
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous
            </Button>
            <div className="text-sm text-gray-700">
              Page {page + 1}
            </div>
            <Button 
              variant="outline"
              onClick={handleNext}
              disabled={!response?.data || response.data.length < pageSize}
            >
              Next
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
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
              All Recommendations
            </h1>
            <p className="text-blue-100">
              View and manage all customer recommendations
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by name or account number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleDownload} 
              disabled={isLoading || !response?.data}
            >
              <Download size={18} className="mr-2" />
              Download CSV
            </Button>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RecommendAll;