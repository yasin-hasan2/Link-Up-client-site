import { useQuery } from "@tanstack/react-query";
import useGetSIngleUser from "./useGetSIngleUser";
import useAxiosMessanger from "./useAxiosMessenger";

const useChats = () => {
    const axiosMessanger = useAxiosMessanger()
    const [sinleUser] = useGetSIngleUser();
    const { data: chats =[], refetch:chatsRefetch} = useQuery({
        queryKey: ["chatsData", sinleUser?._id],
        queryFn: () => axiosMessanger.get(`/chat/${sinleUser?._id}`).then((response) => response.data),
      });
      return [chats, chatsRefetch]
};

export default useChats;

