import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import BatchRecommend from './components/batch/BatchRecommend';
import RecommendAll from './components/recommend/RecommendAll';
import HomePage from './components/home/HomePage';
import { NavigationLink } from './types';

function App() {
  // Get initial page from URL or default to home
  const [currentPage, setCurrentPage] = React.useState<string>(() => {
    // Remove trailing slash if present
    const path = window.location.pathname.replace(/\/$/, '');
    // Return path if it matches a valid route, otherwise return home
    return [
      '/',
      '/search-customer',
      '/batch-recommend',
      '/recommend-all'
    ].includes(path) ? path : '/';
  });
  
  const navigationLinks: NavigationLink[] = [
    { name: 'Home', href: '/', active: currentPage === '/' },
    { name: 'Search Customer', href: '/search-customer', active: currentPage === '/search-customer' },
    { name: 'Batch Recommend', href: '/batch-recommend', active: currentPage === '/batch-recommend' },
    { name: 'Recommend All', href: '/recommend-all', active: currentPage === '/recommend-all' },
  ];

  // Update URL and state when navigating
  const handleNavigation = (href: string) => {
    setCurrentPage(href);
    // Use replaceState instead of pushState to avoid building up history
    window.history.replaceState({}, '', href);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      setCurrentPage(path);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial URL if needed
    if (window.location.pathname !== currentPage) {
      window.history.replaceState({}, '', currentPage);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case '/search-customer':
        return <Dashboard />;
      case '/batch-recommend':
        return <BatchRecommend />;
      case '/recommend-all':
        return <RecommendAll />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header links={navigationLinks} onNavigate={handleNavigation} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <footer className="bg-gray-100 py-4 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-600">
            © 2025 BK360-AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;