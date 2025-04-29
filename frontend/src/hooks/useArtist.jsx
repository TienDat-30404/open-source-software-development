import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createArtist, deleteArtist, getAllArtist, updateArtist } from '../services/ArtistService';

export const useGetAllArtist = (query = "") => {
  return useQuery({
    queryKey: ['artists', query],
    queryFn: () => getAllArtist(query),

  })
}

export const useCreateArtist = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArtist,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['artists']);

      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error create artist:', error);
      if (onError) {
        onError(error);
      }
    }
  });
};




export const useUpdateArtist = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) => updateArtist({id, data, token}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['artists'])
      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error create artist:', error);
      if (onError) {
        onError(error);
      }
    }
  })
}



export const useDeleteArtist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteArtist(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['artists'])
    },
    onError: (error) => {
      console.error('Error deleting room:', error);
    }
  });
};


