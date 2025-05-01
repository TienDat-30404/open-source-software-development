import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  deleteArtist, getAllArtist, updateArtist } from '../services/ArtistService';
import { createAlbum, deleteAlbum, getAllAlbum, updateAlbum } from '../services/AlbumService';

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




export const useUpdateAlbum = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) => updateAlbum({id, data, token}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['albums'])
      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error('Error update album:', error);
      if (onError) {
        onError(error);
      }
    }
  })
}





export const useDeleteAlbum = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteAlbum(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['albums'])
    },
    onError: (error) => {
      console.error('Error delete album:', error);
    }
  });
};


