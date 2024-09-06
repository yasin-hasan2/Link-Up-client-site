import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useNotification = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const {data:nofitications = [], refetch, isLoading} = useQuery({
        queryKey: ["notifications", user?.email],
        queryFn: async()=>{
            const res = await axiosPublic.get(`notification?email=${user?.email}`);
            return res.data
        }
    })
    return [nofitications, refetch, isLoading]
};

export default useNotification;