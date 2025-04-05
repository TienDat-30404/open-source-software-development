import { useQuery } from '@tanstack/react-query';
import { getAllPaymentMethod } from '../services/PaymentMethodService';

export const useGetAllPaymentMethod = (query = "") => {
  return useQuery({
    queryKey: ['payment-methods', query],
    queryFn: () => getAllPaymentMethod(query),
    
  })
}
