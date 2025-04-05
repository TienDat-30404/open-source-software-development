import { getItem } from "./apis"
export const getAllPlan = async(query) => {
    return getItem('plans', query)
}
