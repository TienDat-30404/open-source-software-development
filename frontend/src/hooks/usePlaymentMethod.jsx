import { useQuery } from '@tanstack/react-query';
import { getAllPaymentMethod } from '../services/PaymentMethodService';

export const useGetAllPaymentMethod = (query = "", token) => {
  return useQuery({
    queryKey: ['payment-methods', query, token],
    queryFn: () => getAllPaymentMethod(query, token),
    enabled: !!token,
    
  })
}
