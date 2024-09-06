import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetBookmark = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: savePosts = [], refetch:bookmarkRefetch } = useQuery({
    queryKey: ["savePost"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/post-save?email=${user?.email}`);
      return res.data;
    },
  });
  return [savePosts, bookmarkRefetch];
};

export default useGetBookmark;
