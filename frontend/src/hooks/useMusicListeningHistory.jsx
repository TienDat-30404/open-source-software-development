import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAllHistoryMusic, deleteHistoryMusic, getAllHistoryMusicOfUser, getTopSong, saveHistoryListeningMusic } from '../services/MusicListeningHistoryService';
export const useGetHistoryMusicListening = (query = "", token) => {
  return useQuery({
    queryKey: ['history_music', query, token],
    queryFn: () => getAllHistoryMusicOfUser(query, token),
    
  })
}


export const useSaveHistoryListeningMusic = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => saveHistoryListeningMusic(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['history_music']);
    },
    onError: (error) => {
      console.error('Error when save history listening music:', error);
    }
  });
};

export const useDeleteSongHistoryMusic = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteHistoryMusic(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['history_music'])
    },
    onError: (error) => {
      console.error('Error deleting history music:', error);
    }
  });
};


export const useDeleteAllSongHistoryMusic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllHistoryMusic,
    onSuccess: () => {
      queryClient.invalidateQueries(['history_music'])
    },
    onError: (error) => {
      console.error('Error delete all history music:', error);
    }
  });
};



export const useGetTopSong = (query = "") => {
  return useQuery({
    queryKey: ['history/top-songs', query],
    queryFn: () => getTopSong(query),

  })
}
