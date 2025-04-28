import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createArtist, deleteArtist, getAllArtist, updateArtist } from '../services/ArtistService';
import { createSong, getAllSong, updateSong } from '../services/SongService';

export const useGetAllSong = (query = "") => {
  return useQuery({
    queryKey: ['songs', query],
    queryFn: () => getAllSong(query),

  })
}

export const useCreateSong = ({ onSuccess, onError, token }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : (data) => createSong(data, token),
    onSuccess:  (...args) => {
      queryClient.invalidateQueries(['songs']);

      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error create song:', error);
      if (onError) {
        onError(error);
      }
    }
  });
};






export const useUpdateSong = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) => updateSong({id, data, token}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['songs'])
      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error create song:', error);
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


