import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../services/CategoryService';

export const useGetAllCatgory = (query = "") => {
  return useQuery({
    queryKey: ['categories', query],
    queryFn: () => getAllCategory(query),

  })
}


export const useCreateCategory = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : createCategory,
    onSuccess:  (...args) => {
      queryClient.invalidateQueries(['categories']);

      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error create category:', error);
      if (onError) {
        onError(error);
      }
    }
  });
};



export const useUpdateCategory = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) => updateCategory({id, data, token}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['artists'])
      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error update category:', error);
      if (onError) {
        onError(error);
      }
    }
  })
}



export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories'])
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
    }
  });
};



