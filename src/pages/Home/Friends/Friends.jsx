import Friend from "../../../shared/Friend/Friend";
import useGetAllUser from "../../../hooks/useGetAllUser";
import useGetSIngleUser from "../../../hooks/useGetSIngleUser";
import useChats from "../../../hooks/useChats";
import SectionHelmet from "../../../shared/SectionHelmet/SectionHelmet";

const Friends = () => {
  const [users] = useGetAllUser();
  const [sinleUser] = useGetSIngleUser();
  const [chats, chatsRefetch] = useChats();

  //get avilable user with existing all users
  const userId = chats?.map((chat) =>
    chat.members.find((member) => member !== sinleUser._id)
  );

  const finalUsers = users?.filter((user) => user._id !== sinleUser._id);
  const availableUsers = finalUsers.filter(
    (user) => !userId.includes(user?._id)
  );

  return (
    <>
      <SectionHelmet title={"Free Time | Add Conversation"} />
      <div className="grid px-3 md:grid-cols-2 gap-5 mt-3">
        {availableUsers?.map((friend) => (
          <Friend
            key={friend?._id}
            friend={friend}
            chatsRefetch={chatsRefetch}
          />
        ))}
      </div>
    </>
  );
};

export default Friends;
