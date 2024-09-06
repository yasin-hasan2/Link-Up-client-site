  /* eslint-disable react/prop-types */
import { MdClose, MdInsertComment } from "react-icons/md";
import { useState } from "react"; // Import useState
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { format } from "timeago.js";
// import EmojiPicker from "emoji-picker-react";

const CommentsModal = ({ comments, id, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    // console.log(data, id);
    const commentInfo = {
      name: user?.displayName,
      auther_pic: user?.photoURL,
      comment: data?.comment,
      date: new Date(),
    };

    try {
      await axiosPublic.post(`/videos/comment/${id}`, commentInfo);
      reset();
      refetch();
    } catch (err) {
      console.log("comment post err-->", err);
    }
  };

  return (
    <div>
      <button
        className="font-medium flex items-center gap-1 text-gray-500"
        onClick={openModal}>
        <MdInsertComment /> Comment {comments?.length}
      </button>
      {isModalOpen && (
        <dialog open={isModalOpen} className="modal">
          <div className="modal-box w-11/12 max-w-3xl relative">
            <div className="modal-action">
              <form method="dialog" className="absolute right-0 top-0">
                <button onClick={closeModal} className="btn btn-circle text-xl">
                  <MdClose/>
                </button>
              </form>
            </div>
            <div className="space-y-3">
              {comments?.map((comment, index) => (
                <div className="space-y-3 border p-3 rounded-md" key={index}>
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={comment?.auther_pic} />
                      </div>
                    </div>
                    <div>
                    <h3 className="text-xl font-semibold">{comment?.name}</h3>
                  <p className="text-sm">{format(comment?.date)}</p>
                    </div>
                  </div>
                  <p className="bg-gray-100 text-slate-900 font-medium w-fit rounded-md py-3 px-5">
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
                    placeholder="Your Comments"></textarea>
                </div>
                <div className="absolute right-1 -bottom-7">
                  {/* <EmojiPicker /> */}
                  <button type="submit" className="text-xl text-pink-500">
                    <IoMdSend />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CommentsModal;
