/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useChats from "../../hooks/useChats";

const Conversation = ({
  data,
  currentUser,
  online,
  //   refetch,
  setCurrentChat,
}) => {
  const axiosPublic = useAxiosPublic();
  const [chats] = useChats()
  // get conversation  data with id
  const userId = data?.members.find((id) => id !== currentUser);
  const { data: conversationData, isLoading } = useQuery({
    queryKey: ["conversationData", userId],
    queryFn: () =>
      axiosPublic.get(`/user/${userId}`).then((response) => response.data),
  });
  //   console.log(conversationData);
  // conversation skeliton loading
  if (isLoading) {
    return (
      <div className="relative  w-64 animate-pulse gap-2 p-4">
        <div className="h-10 w-10 rounded-full bg-slate-400"></div>
          <div className="h-2 w-[20%] rounded-lg bg-slate-400 text-sm mt-1"></div>
      </div>
    );
  }
  return (
   <div onClick={() => setCurrentChat(data)} className={`flex flex-col items-center ${chats?.length <= 3 ? "w-full" : "w-[100px]"}`}>
     <div  className={`avatar border-2 rounded-full border-primary ${
        online ? "online" : "offline"
      } cursor-pointer`}>
      <div className="w-10 rounded-full ">
        <img src={conversationData?.photo} alt="no photo"/>
      </div>
    </div>
    <h4 className="text-center text-[10px] md:text-[14px] ">{conversationData?.name ? conversationData.name.charAt(0).toUpperCase() + conversationData.name.slice(1).toLowerCase() : ''}</h4>
   </div>
  );
};

export default Conversation;
