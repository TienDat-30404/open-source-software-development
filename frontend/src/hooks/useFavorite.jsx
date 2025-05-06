import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllPlaylist, createPlayList, deletePlaylist, updatePlaylist, deleteSongOutOfPlaylist } from '../services/PlayListService';
import { addSongFavorite, deleteSongFavorite, getAllFavoriteOfUser } from '../services/FavofiteService';

export const useGetFavoriteOfUser = (query = "", token) => {
  return useQuery({
    queryKey: ['favorites', query, token],
    queryFn: () => getAllFavoriteOfUser(query, token),
    
  })
}

export const useAddSongFavorite = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addSongFavorite(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
    },
    onError: (error) => {
      console.error('Error add song favorite:', error);
    }
  });
};

export const useDeleteSongFavorite = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteSongFavorite(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites'])
    },
    onError: (error) => {
      console.error('Error deleting favorite:', error);
    }
  });
};
