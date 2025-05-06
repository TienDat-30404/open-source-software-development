import { getAllRoom, createRoom, deleteRoom } from "../services/RoomService"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
export const useGetAllRoom = (query = "", token) => {
  return useQuery({
    queryKey: ['rooms', query, token],
    queryFn: () => getAllRoom(query, token),

  })
}


export const useCreateRoom = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createRoom(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
    },
    onError: (error) => {
      console.error('Error create room:', error);
    }
  });
};


export const useDeleteRoom = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteRoom(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms'])
    },
    onError: (error) => {
      console.error('Error deleting room:', error);
    }
  });
};