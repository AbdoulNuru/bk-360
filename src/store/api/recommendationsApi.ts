import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CustomerRecommendation, BatchRecommendRequest, RecommendAllResponse, AnalyticsResponse } from '../../types';

export const recommendationsApi = createApi({
  reducerPath: 'recommendationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getCustomerRecommendation: builder.query<CustomerRecommendation, string>({
      query: (accountNumber) => `/customer/${accountNumber}`,
    }),
    getBatchRecommendations: builder.mutation<CustomerRecommendation[], BatchRecommendRequest>({
      query: (body) => ({
        url: '/recommend-batch',
        method: 'POST',
        body,
      }),
    }),
    getAllRecommendations: builder.query<RecommendAllResponse, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => 
        `/recommend-all?page=${page}&page_size=${pageSize}`,
    }),
    getAnalytics: builder.query<AnalyticsResponse, void>({
      query: () => '/analytics',
      // keepUnusedDataFor: 600, // Cache for 10 minutes
    }),
  }),
});

export const {
  useGetCustomerRecommendationQuery,
  useGetBatchRecommendationsMutation,
  useGetAllRecommendationsQuery,
  useGetAnalyticsQuery,
} = recommendationsApi;