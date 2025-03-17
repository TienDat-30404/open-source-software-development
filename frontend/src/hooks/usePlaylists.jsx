import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllPlaylist, createPlayList, deletePlaylist, updatePlaylist, deleteSongOutOfPlaylist } from '../services/PlayListService';
import { use } from 'react';

export const usePlaylists = (query = "") => {
  return useQuery({
    queryKey: ['playlists', query],
    queryFn: () => getAllPlaylist(query)
  })
}

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlayList,
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
    },
    onError: (error) => {
      console.error('Error create playlist:', error);
    }
  });
};

export const useDeletePlayList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePlaylist(id),
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
    mutationFn: ({id, data}) => updatePlaylist(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists'])
    },
    onError: (error) => {
      console.error('Error deleting playlist:', error);
    }
  })
}

export const useDeleteSongOutOfPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : ({idPlaylist, idSong}) => deleteSongOutOfPlaylist(idPlaylist, idSong),
    onSuccess : () => {
      console.log("222222")
      queryClient.invalidateQueries(['playlists'])
    },
    onError: (error) => {
      console.error('Error delete song out playlist:', error)
    }
  })
}


