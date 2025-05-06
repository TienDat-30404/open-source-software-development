import { createPlan, deletePlan, getAllPlan, updatePlan } from "../services/PlanService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
export const useGetAllPlan = (query = "", token) => {
  return useQuery({
    queryKey: ['plans', query, token],
    queryFn: () => getAllPlan(query, token),

  })
}

export const useCreatePlan = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlan,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['plans']);

      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error create plan:', error);
      if (onError) {
        onError(error);
      }
    }
  });
};



export const useUpdatePlan = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) => updatePlan({id, data, token}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['plans'])
      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error update plan:', error);
      if (onError) {
        onError(error);
      }
    }
  })
}


export const useDeletePlan = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePlan(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['plans'])
    },
    onError: (error) => {
      console.error('Error deleting plan:', error);
    }
  });
};