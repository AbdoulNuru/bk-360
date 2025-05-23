export type CustomerProfileType = {
  id: string;
  name: string;
  accountNumber: string;
  category: string;
};

export type ProductStatus = 'Recommended' | 'On-hold' | 'Terminated' | 'Active';

export type Product = {
  id: string;
  name: string;
  description: string;
  status: ProductStatus;
};

export type NavigationLink = {
  name: string;
  href: string;
  active?: boolean;
};

export type TestAccount = {
  name: string;
  accountNumber: string;
  description: string;
};

export type RecommendedProduct = {
  name: string;
  reason: string;
};

export type CustomerRecommendation = {
  customer_id: string;
  customer_name: string;
  account_number: string;
  cluster: number;
  recommended_products: RecommendedProduct[];
};

export type BatchRecommendRequest = {
  account_numbers: string[];
};

export type RecommendAllResponse = {
  page: number;
  page_size: number;
  records_returned: number;
  data: CustomerRecommendation[];
};

export type ClusterDistribution = {
  cluster: string;
  value: number;
  percentage: string;
};

export type ProductRecommendation = {
  name: string;
  value: number;
  description: string;
};

export type AnalyticsResponse = {
  totalCustomers: number;
  totalRecommendations: number;
  conversionRate: number | null;
  avgProductsPerCustomer: number;
  clusterDistribution: ClusterDistribution[];
  productRecommendations: ProductRecommendation[];
  customerSegments: any[];
  lastUpdated: string;
};