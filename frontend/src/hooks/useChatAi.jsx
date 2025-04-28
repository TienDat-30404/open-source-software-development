import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllPlaylist, createPlayList, deletePlaylist, updatePlaylist, deleteSongOutOfPlaylist } from '../services/PlayListService';
import { chatWithAI, getHistoryChatAI } from '../services/SongService';

export const useGetHistoryChatAi = (query = "", token) => {

  return useQuery({
    queryKey: ['chatAI', query, token],
    queryFn: () => getHistoryChatAI(query, token),
    
  })
}

export const useAskQuestionAI = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => chatWithAI(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['chatAI']);
    },
    onError: (error) => {
      console.error('Error ask question with AI:', error);
    }
  });
};