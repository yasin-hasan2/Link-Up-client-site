import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useGetSIngleUser = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: sinleUser = [] } = useQuery({
    queryKey: ["SingleUser", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`single-user?email=${user?.email}`);
      return res.data;
    },
  });
//   console.log(sinleUser);
  return [sinleUser];
};

export default useGetSIngleUser;
