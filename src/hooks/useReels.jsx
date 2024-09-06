import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReels = () => {
    const axiosSecure = useAxiosSecure();
    const { data: reels = [], refetch:reelsRefetch } = useQuery({
        queryKey: ["feels"],
        queryFn: async () => {
          const res = await axiosSecure.get("/reels");
          return res.data;
        },
      });
    return [reels, reelsRefetch]
};

export default useReels;