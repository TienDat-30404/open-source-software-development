import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllPlaylist, createPlayList, deletePlaylist, updatePlaylist, deleteSongOutOfPlaylist } from '../services/PlayListService';

export const usePlaylists = (query = "", token) => {
  return useQuery({
    queryKey: ['playlists', query, token],
    queryFn: () => getAllPlaylist(query, token),
    
  })
}

export const useCreatePlaylist = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createPlayList(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
    },
    onError: (error) => {
      console.error('Error create playlist:', error);
    }
  });
};

export const useDeletePlayList = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePlaylist(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists'])
    },
    onError: (error) => {
      console.error('Error deleting playlist:', error);
    }
  });
};

export const useUpdatePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  updatePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists'])
    },
    onError: (error) => {
      console.error('Error update playlist:', error);
    }
  })
}

export const useDeleteSongOutOfPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : ({idPlaylist, idSong, token}) => deleteSongOutOfPlaylist({idPlaylist, idSong, token}),
    onSuccess : () => {
      queryClient.invalidateQueries(['playlists'])
    },
    onError: (error) => {
      console.error('Error delete song out playlist:', error)
    }
  })
}


