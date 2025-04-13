import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllPlaylist, createPlayList, deletePlaylist, updatePlaylist, deleteSongOutOfPlaylist } from '../services/PlayListService';
import { chatWithAI, getHistoryChatAI } from '../services/SongService';

export const useGetHistoryChatAi = (query = "") => {

  return useQuery({
    queryKey: ['chatAI', query],
    queryFn: () => getHistoryChatAI(query),
    
  })
}

export const useAskQuestionAI = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: chatWithAI,
    onSuccess: () => {
      queryClient.invalidateQueries(['chatAI']);
    },
    onError: (error) => {
      console.error('Error ask question with AI:', error);
    }
  });
};