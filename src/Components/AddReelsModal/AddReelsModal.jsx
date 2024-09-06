/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import reelsImg from "../../assets/icon/add_reels.png";
const AddReelsModal = ({ refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const onSubmit = async (data) => {
    if(data?.title?.length >= 20){
      return toast.error("Provite me short title.")
    }
    try {
      setLoading(true);
      const fileImage = selectedFileName;
      const formData = new FormData();
      formData.append("file", fileImage);
      formData.append("upload_preset", "video_presed");
      const { data: imageData } = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_clowdinary_secret_key}/video/upload`,
        formData
      );
      // console.log(imageData);
      //   console.log(res.data);

      const postInfo = {
        name: user?.displayName,
        auther_image: user?.photoURL,
        email: user?.email,
        title: data?.title,
        reels: imageData?.secure_url,
        time: new Date(),
        likes: 0,
        comments: [],
      };

      const response = await axiosSecure.post("/reels", postInfo);
        if (response?.data?.acknowledged) {
          toast.success("Reels Upload successfull !");
          setSelectedFileName(null)
          reset();
          const modal = document.getElementById("reels_modal_id");
          modal.close();
          refetch();
          setLoading(false);
        }
      } catch (err) {
      console.log("reels err-->", err.message);
    }
  };
  return (
    <div>
      <button
        className="flex w-full items-center gap-2 py-2 px-3 md:px-4 text-sm  md:text-xl  border-2 border-gray-100 rounded-md text-gray-500 font-medium hover:bg-gray-300 transition-all duration-300 bg-gray-200"
        onClick={() => document.getElementById("reels_modal_id").showModal()}>
        <img src={reelsImg} className="w-6" alt="" />
        Reels
      </button>
      <dialog id="reels_modal_id" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Reels title</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Reels title"
                  required
                  {...register("title")}
                  className="textarea border border-primary focus:border-primary w-fulltextarea w-full"
                />
              </div>

              <div className="flex items-center justify-center w-full mt-5">
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload className="text-4xl text-gray-500" />
                    <p className=" text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>{" "}
                      Short video
                    </p>
                    {/* <p className="font-medium text-gray-500">
                      {selectedFileName}
                    </p> */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      short video
                    </p>
                    {selectedFileName ? (
                      <div className="font-medium text-gray-400 text-center">
                        {selectedFileName?.name.slice(0,25)} <br /> {selectedFileName?.type}{" "}
                        / {(selectedFileName?.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <input
                     accept="video/mp4"
                     id="dropzone-file"
                     type="file"
                     name="video"
                     className="hidden"
                     onChange={(e) => setSelectedFileName(e.target.files[0])}
                  />
                </label>
              </div>
              {loading ? (
                <button disabled={!selectedFileName} className="text-xl btn btn-disabled flex items-center justify-center w-full gap-2 text-black bg-primary py-2 px-4 rounded-md hover:bg-[#0f1634] transform-all duration-300 mt-5">
                  Pending
                  {loading && (
                    <span className="loading loading-dots loading-md"></span>
                  )}
                </button>
              ) : (
                <button disabled={!selectedFileName}
                  type="submit"
                  className="text-xl flex items-center justify-center w-full gap-2 text-white bg-primary py-2 px-4 rounded-md hover:bg-[#0f1634] transform-all duration-300 mt-5">
                  Post Now
                </button>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddReelsModal;
