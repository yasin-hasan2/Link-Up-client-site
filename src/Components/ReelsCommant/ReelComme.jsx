/* eslint-disable react/prop-types */
// ReelComment.jsx
import { useState } from "react";
import ReactDOM from "react-dom";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaRegCommentDots } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { format } from "timeago.js";
import useGetSIngleUser from "../../hooks/useGetSIngleUser";

const ReelComment = ({ comments, id, refetch , email}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const [sinleUser] = useGetSIngleUser()
  const { user } = useAuth();

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const commentInfo = {
      name: user?.displayName,
      auther_pic: user?.photoURL,
      comment: data?.comment,
      date: new Date(),
    };

    const postInfo = {
      email:email,
      NotifyName: sinleUser?.name,
      type: "Comment your reel",
      date: new Date(),
      count:1,
      prevId: id,
      status: "Unread"
    };
   

    try {
      await axiosPublic.post(`/reels/comment/${id}`, commentInfo);
      reset();
      refetch();
      await axiosPublic.post('notification', postInfo)
    } catch (err) {
      console.log("comment post err-->", err);
    }
  };

  return (
    <div className="z-50">
      <button
        className="font-medium flex flex-col items-center"
        onClick={openModal}
      >
        <FaRegCommentDots /> {comments?.length}
      </button>
      {isModalOpen &&
        ReactDOM.createPortal(
          <dialog open={isModalOpen} className="modal ">
            <div className="modal-box w-11/12 max-w-xl relative border shadow-2xl">
              <div className="modal-action">
                <form method="dialog" className="absolute right-0 top-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeModal();
                    }}
                    className="btn btn-circle text-xl"
                  >
                    <MdClose/>
                  </button>
                </form>
              </div>
              <div className="">
                {comments?.map((comment, index) => (
                  <div
                    className="space-y-1 p-3 rounded-md"
                    key={index}
                  >
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={comment?.auther_pic} alt="Author Avatar" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {comment?.name}
                        </h3>
                        <p className="text-sm">
                          <small>{format(comment?.date)}</small>
                        </p>
                      </div>
                    </div>
                    <p className="bg-gray-100 border text-slate-900 font-medium w-fit rounded-md py-3 px-5 ml-10">
                      {comment?.comment}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative mt-16">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <textarea
                      required
                      {...register("comment")}
                      className="textarea textarea-bordered"
                      placeholder="Your Comments"
                    ></textarea>
                  </div>
                  <div className="absolute right-1 bottom-0">
                    <button type="submit" className="text-2xl text-pink-500">
                      <IoMdSend />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>,
          document.body
        )}
    </div>
  );
};

export default ReelComment;
