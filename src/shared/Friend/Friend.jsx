/* eslint-disable react/prop-types */
import { IoPersonAddSharp } from "react-icons/io5";
import useGetSIngleUser from "../../hooks/useGetSIngleUser";
import Swal from "sweetalert2";
import useAxiosMessanger from "../../hooks/useAxiosMessenger";
const Friend = ({ friend , chatsRefetch}) => {
  const { name, email, _id, photo } = friend;
  const [sinleUser] = useGetSIngleUser();
  const axiosMessanger = useAxiosMessanger();
  // add freind
  const handleSendFreind = () => {
    const postInfo = {
      senderId: sinleUser?._id,
      receiverId: _id,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure add your conversation ${name} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosMessanger.post("/chat", postInfo);
          if (response?.data) {
            Swal.fire({
              title: "Good job",
              text: `Successfully ${name} added your conversation!`,
              icon: "success",
            });
            chatsRefetch()
          }
        } catch (err) {
          console.log("add conversation error->", err);
        }
      }
    });
  };

  return (
    <div className=" shadow-xl border p-5 rounded-md bg-white overflow-hidden">
      <div className="avatar flex justify-center">
        <div className="w-14 rounded-full">
          <img src={photo} />
        </div>
      </div>
      <h2 className="text-xl font-semibold text-slate-900 text-center">{name}</h2>
      <h2 className="font-semibold text-slate-600 text-center mb-2">{email}</h2>
      <div className="flex justify-center">
        <button onClick={handleSendFreind} className="flex items-center gap-2 hover:bg-blue-700 text-[18px] font-medium bg-primary px-4 py-2 rounded-md text-white">Connect<IoPersonAddSharp /></button>
      </div>
    </div>
  );
};

export default Friend;
