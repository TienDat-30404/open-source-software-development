import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createArtist, deleteArtist, getAllArtist, updateArtist } from '../services/ArtistService';
import { createSong, getAllSong } from '../services/SongService';

export const useGetAllSong = (query = "") => {
  return useQuery({
    queryKey: ['songs', query],
    queryFn: () => getAllSong(query),

  })
}

export const useCreateSong = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : createSong,
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




export const useUpdateArtist = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateArtist(id, data),
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


