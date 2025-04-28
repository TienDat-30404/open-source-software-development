import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRole, deleteRole, getAllRole, updateRole } from '../services/RoleService';

export const useGetAllRole = (query = "", token) => {
  return useQuery({
    queryKey: ['roles', query, token],
    queryFn: () => getAllRole(query, token),

  })
}


export const useCreateRole = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : createRole,
    onSuccess:  (...args) => {
      queryClient.invalidateQueries(['roles']);

      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error create role:', error);
      if (onError) {
        onError(error);
      }
    }
  });
};



export const useUpdateRole = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) => updateRole({id, data, token}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['roles'])
      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error update role:', error);
      if (onError) {
        onError(error);
      }
    }
  })
}



export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['roles'])
    },
    onError: (error) => {
      console.error('Error deleting role:', error);
    }
  });
};



