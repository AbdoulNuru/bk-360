import React, { useState, useRef } from 'react';
import { Download, Search, User, Upload, X, ChevronRight, FileDown } from 'lucide-react';
import { useGetBatchRecommendationsMutation } from '../../store/api/recommendationsApi';
import { Button } from '../ui/button';
import { EmptyState } from '../ui/empty-state';
import { Skeleton } from '../ui/skeleton';
import * as Dialog from '@radix-ui/react-dialog';
import * as XLSX from 'xlsx';

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
        {customer.recommended_products.map((product: any, idx: number) => (
          <div key={idx} className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-base font-medium text-blue-900 mb-1">{product.name}</h4>
            <p className="text-sm text-blue-700">{product.reason}</p>
          </div>
        ))}
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

const BatchRecommend: React.FC = () => {
  const [accountNumbers, setAccountNumbers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [getBatchRecommendations, { data: customers, isLoading, isError }] = useGetBatchRecommendationsMutation();

  const handleAddAccount = () => {
    if (inputValue && !accountNumbers.includes(inputValue)) {
      setAccountNumbers([...accountNumbers, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveAccount = (account: string) => {
    setAccountNumbers(accountNumbers.filter(acc => acc !== account));
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ['account_number']
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'account_numbers_template.xlsx');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError(null);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json<{ account_number: string }>(firstSheet);

          if (rows.length === 0) {
            setFileError('The file is empty');
            return;
          }

          if (!rows[0].hasOwnProperty('account_number')) {
            setFileError('Invalid file format. Please use the template provided');
            return;
          }

          const newAccounts = rows
            .map(row => row.account_number?.toString().trim())
            .filter(acc => acc && !accountNumbers.includes(acc));

          if (newAccounts.length === 0) {
            setFileError('No new account numbers found in the file');
            return;
          }

          setAccountNumbers(prev => [...prev, ...newAccounts]);
        } catch (error) {
          setFileError('Error reading file. Please ensure it\'s a valid Excel file');
        }
      };
      reader.readAsArrayBuffer(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (accountNumbers.length > 0) {
      setSearchInitiated(true);
      try {
        await getBatchRecommendations({ 
          account_numbers: accountNumbers 
        });
      } catch (error) {
        console.error('Error submitting batch recommendations:', error);
      }
    }
  };

  const renderContent = () => {
    if (!searchInitiated) {
      return (
        <EmptyState
          title="Get Batch Recommendations"
          description="Add account numbers or upload a file to get recommendations for multiple customers"
        />
      );
    }

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <EmptyState
          title="Error Loading Data"
          description="An error occurred while fetching recommendations. Please try again."
        />
      );
    }

    if (!customers || customers.length === 0) {
      return (
        <EmptyState
          title="No Results Found"
          description="No recommendations found for the provided account numbers. Please check and try again."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <Dialog.Root key={`${customer.customer_id}-${customer.account_number}`}>
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <User size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900">{customer.customer_name}</h3>
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
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-900">Recommended Products</h4>
                      {customer.recommended_products.length > 3 && (
                        <Dialog.Trigger asChild>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            View All <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </Dialog.Trigger>
                      )}
                    </div>
                    <div className="space-y-3">
                      {customer.recommended_products.slice(0, 3).map((product: any, idx: number) => (
                        <div key={idx} className="bg-blue-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-blue-900 mb-1">{product.name}</h4>
                          <p className="text-xs text-blue-700">{product.reason}</p>
                        </div>
                      ))}
                      {customer.recommended_products.length > 3 && (
                        <div className="text-sm text-gray-500 text-center pt-2">
                          +{customer.recommended_products.length - 3} more products
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProductModal customer={customer} />
          </Dialog.Root>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Batch Recommendations
            </h1>
            <p className="text-blue-100">
              Process multiple customer recommendations at once
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter account number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAccount()}
                  />
                </div>
                <Button 
                  onClick={handleAddAccount} 
                  disabled={!inputValue}
                  className="w-[120px]"
                >
                  Add Account
                </Button>
              </div>
              
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-4 text-sm text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={downloadTemplate}
                  className="w-full"
                >
                  <FileDown size={18} className="mr-2" />
                  Download Template
                </Button>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload size={18} className="mr-2" />
                  Upload Excel File
                </Button>

                {fileError && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                    {fileError}
                  </div>
                )}
              </div>
              
              {accountNumbers.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
                  {accountNumbers.map((account) => (
                    <div
                      key={account}
                      className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border"
                    >
                      <span className="text-sm">{account}</span>
                      <button
                        onClick={() => handleRemoveAccount(account)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <Button
                onClick={handleSubmit}
                disabled={accountNumbers.length === 0 || isLoading}
                className="w-full"
              >
                Get Recommendations
              </Button>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default BatchRecommend;