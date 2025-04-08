import { getAllRoom, createRoom, deleteRoom } from "../services/RoomService"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
export const useGetAllRoom = (query = "") => {
  return useQuery({
    queryKey: ['rooms', query],
    queryFn: () => getAllRoom(query),

  })
}


export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
    },
    onError: (error) => {
      console.error('Error create room:', error);
    }
  });
};


export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms'])
    },
    onError: (error) => {
      console.error('Error deleting room:', error);
    }
  });
};