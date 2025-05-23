import React from 'react';
import { ArrowRight, Brain, Database, Search, Users, CheckCircle2, ListFilter, Table } from 'lucide-react';
import { Button } from '../ui/button';
import { TestAccount } from '../../types';
import StatsSection from './StatsSection';

const HomePage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const testAccounts: TestAccount[] = [
    {
      name: "EPIPHANIE MUKASHYAKA",
      accountNumber: "100162369053",
      description: "Business owner with multiple product recommendations including BK Quick and merchant services"
    },
    {
      name: "SAMUEL NDAGIJIMANA",
      accountNumber: "100151693924",
      description: "Agricultural customer eligible for specialized Agri Loan products"
    },
    {
      name: "SABINE NIYIGENA",
      accountNumber: "100046242577",
      description: "Student profile with savings and prepaid card recommendations"
    },
    {
      name: "AGNES UJENEZA",
      accountNumber: "100177259424",
      description: "Customer with digital banking and merchant service needs"
    },
    {
      name: "Pierre Albert KARAMBIZI",
      accountNumber: "100085525877",
      description: "Staff member eligible for special loan products and credit facilities"
    }
  ];

  const steps = [
    {
      title: "Choose a Test Account",
      description: "Select from our pre-configured test accounts"
    },
    {
      title: "Copy Account Number",
      description: "Click to copy the account number to clipboard"
    },
    {
      title: "Search Customer",
      description: "Use the account number in the search page"
    }
  ];

  const additionalFeatures = [
    {
      icon: ListFilter,
      title: "Batch Processing",
      description: "Test multiple accounts at once",
      path: "/batch-recommend",
      hint: "Perfect for processing multiple customers"
    },
    {
      icon: Table,
      title: "View All Recommendations",
      description: "See recommendations for all customers",
      path: "/recommend-all",
      hint: "Access the complete recommendation database"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-2xl">
                <Brain size={48} className="text-blue-200" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Banking Recommendations
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Transforming customer experiences with intelligent product recommendations based on banking behavior
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50"
              onClick={() => onNavigate('/search-customer')}
            >
              Try Demo <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-blue-900 mb-2">70K+</h3>
              <p className="text-blue-700">Training Data Points</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-blue-900 mb-2">95%</h3>
              <p className="text-blue-700">Accuracy Rate</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-blue-900 mb-2">Real-time</h3>
              <p className="text-blue-700">Analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <StatsSection />

      {/* Test System Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Test Our System
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Steps and Features Card */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
                  {/* Steps */}
                  <div className="space-y-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Test</h3>
                    {steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{step.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Features */}
                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Features</h3>
                    {additionalFeatures.map((feature, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <feature.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => onNavigate(feature.path)}
                        >
                          Try Now
                        </Button>
                        <p className="text-xs text-gray-500 mt-2 text-center">{feature.hint}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Test Accounts */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Accounts</h3>
                    <div className="grid gap-4">
                      {testAccounts.map((account, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 truncate">{account.name}</h3>
                            <p className="text-sm text-blue-600 font-medium mt-0.5">Account: {account.accountNumber}</p>
                            <p className="text-sm text-gray-600 mt-1">{account.description}</p>
                          </div>
                          <Button
                            variant="outline"
                            className="flex-shrink-0"
                            onClick={() => {
                              navigator.clipboard.writeText(account.accountNumber);
                              const button = document.activeElement as HTMLButtonElement;
                              const originalText = button.innerHTML;
                              button.innerHTML = 'Copied!';
                              setTimeout(() => {
                                button.innerHTML = originalText;
                              }, 2000);
                            }}
                          >
                            <CheckCircle2 size={16} className="mr-2" />
                            Copy
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Model Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <Brain className="w-12 h-12 text-blue-200" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-center mb-8 text-white">
                  About Our AI Model
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Training Data</h3>
                    <p className="text-blue-100">
                      Trained on over 70,000 banking transactions and customer interactions,
                      our model understands complex patterns in banking behavior to make
                      highly accurate product recommendations.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Analysis Factors</h3>
                    <ul className="space-y-2 text-blue-100">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                        Transaction patterns
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                        Account balance trends
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                        Product usage behavior
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                        Customer demographics
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;