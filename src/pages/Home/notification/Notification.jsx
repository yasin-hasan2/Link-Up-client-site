/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { format } from "timeago.js";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification, refetch }) => {
  const { _id, NotifyName, type, date, prevId, status } = notification;
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You sure delete this notification?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`notification/${id}`);
        if (res.data?.acknowledged) {
          Swal.fire({
            title: "Deleted!",
            text: "Your notification has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  const handleNotification = async () => {
    navigate(`/feeds/${prevId}`);
    const PatchData = {
      count: 0,
      status: "Read",
    };
    await axiosPublic.patch(`notification/${_id}`, PatchData);
    refetch();
  };
  return (
    <div className="w-full bg-white py-3 px-5 rounded-md flex items-center justify-between shadow-md">
      <div onClick={handleNotification} className="w-full cursor-pointer">
        <h2
          className={` ${
            status === "Unread"
              ? "text-gray-800 font-bold"
              : "text-gray-500 font-medium "
          }`}>
          {NotifyName} {type}
        </h2>{" "}
        <p>
          <small>{format(date)}</small>
          <small className="ml-5 italic">{status}</small>
        </p>
      </div>
      <button
        onClick={() => handleDelete(_id)}
        className="btn btn-circle btn-sm text-xl">
        <MdClose />
      </button>
    </div>
  );
};

export default Notification;
