import { deletePlan, updatePlan } from "../services/PlanService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createUser, deleteUser, getAllUser, updateUser } from "../services/UserService";

export const useGetAllUser = (query = "", token) => {
  return useQuery({
    queryKey: ['users', query, token],
    queryFn: () => getAllUser(query, token),
  })
}


export const useCreateUser = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['users']);

      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error create user:', error);
      if (onError) {
        onError(error);
      }
    }
  });
};



export const useUpdateUser = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) => updateUser({id, data, token}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['users'])
      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error update user:', error);
      if (onError) {
        onError(error);
      }
    }
  })
}


export const useDeleteUser = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteUser(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
    onError: (error) => {
      console.error('Error deleting user:', error);
    }
  });
};