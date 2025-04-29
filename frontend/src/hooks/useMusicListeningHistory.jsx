import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllHistoryMusicOfUser, saveHistoryListeningMusic } from '../services/MusicListeningHistoryService';
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
