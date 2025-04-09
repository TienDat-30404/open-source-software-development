import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllHistoryMusicOfUser, saveHistoryListeningMusic } from '../services/MusicListeningHistoryService';
export const useGetHistoryMusicListening = (query = "") => {
  return useQuery({
    queryKey: ['history_music', query],
    queryFn: () => getAllHistoryMusicOfUser(query),
    
  })
}


export const useSaveHistoryListeningMusic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveHistoryListeningMusic,
    onSuccess: () => {
      queryClient.invalidateQueries(['history_music']);
    },
    onError: (error) => {
      console.error('Error when save history listening music:', error);
    }
  });
};
