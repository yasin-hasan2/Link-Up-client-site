/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdUpdate } from "react-icons/md";
import Modal from "react-modal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdatePostModal = ({ setIsToggle, post, refetch }) => {
  const { article, _id } = post;
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const postInfo = {
        article: data?.article ? data?.article : "",
      };

      const response = await axiosSecure.patch(`/feeds/${_id}`, postInfo);
      console.log(response.data);
      if (response?.data?.acknowledged) {
        toast.success("Your post was successful!");
        reset();
        closeModal();
        refetch();
        setIsToggle(false);
        setLoading(false);
      }
    } catch (err) {
      console.log("post err-->", err);
    }
  };

  return (
    <div>
      <button
        className="text-xl text-white bg-slate-500 px-4 py-2 rounded-md hover:bg-slate-600 transform-all duration-300"
        onClick={openModal}
      >
        <MdUpdate />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Post Modal"
        className={"max-w-2xl mx-auto mt-20 bg-white p-10 rounded-md shadow-2xl z-20"}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-500">Article</span>
                </label>
                <textarea
                  type="text"
                  required
                  
                  defaultValue={article}
                  {...register("article")}
                  className="py-3 px-2 outline-none border text-gray-500  border-primary text-sm rounded-lg  focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 w-fullv"
                />
              </div>
              {/* <div className="flex items-center justify-center w-full mt-5">
                <label
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload className="text-4xl text-gray-500" />
                    <p className=" text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>{" "}
                      Photo
                    </p>
                   
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG
                    </p>
                  </div>
                  <input
                    accept="image/svg+xml,image/png,image/jpeg"
                    id="dropzone-file"
                    type="file"
                    name="image" 
                    className="hidden"
                    {...register("image")}
                  />
                </label>
              </div> */}
              <button
                type="submit"
                className="text-xl flex items-center justify-center w-full gap-2 text-white bg-primary py-2 px-4 rounded-md hover:bg-[#0b122b] transform-all duration-300 mt-5">
                Update Now
                {loading && (
                  <span className="loading loading-spinner text-white"></span>
                )}
              </button>
            </form>
        
      </Modal>
    </div>
  );
};

export default UpdatePostModal;
