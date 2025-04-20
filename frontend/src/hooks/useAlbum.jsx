import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createArtist, deleteArtist, getAllArtist, updateArtist } from '../services/ArtistService';
import { createSong, getAllSong } from '../services/SongService';
import { createAlbum, getAllAlbum } from '../services/AlbumService';

export const useGetAllAlbum = (query = "") => {
  return useQuery({
    queryKey: ['albums', query],
    queryFn: () => getAllAlbum(query),

  })
}

export const useCreateAlbum = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : createAlbum,
    onSuccess:  (...args) => {
      queryClient.invalidateQueries(['albums']);

      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error create album:', error);
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


