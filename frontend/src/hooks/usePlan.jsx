import { getAllPlan } from "../services/PlanService"
import { useQuery } from "@tanstack/react-query"
export const useGetAllPlan = (query = "") => {
    return useQuery({
      queryKey: ['plans', query],
      queryFn: () => getAllPlan(query),
      
    })
  }