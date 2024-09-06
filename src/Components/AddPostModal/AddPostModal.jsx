/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import postimg from "../../assets/icon/post.png";
const AddPostModal = ({ refetch, name, isMedia, setIsMedia }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);
  // const [isMedial, setIsMedia] = useState(false)
  const onSubmit = async (data) => {
    try {
      if (selectedFileName && selectedFileName.size >= 5265000) {
        reset();
        setSelectedFileName(null);
        const modal = document.getElementById("post_modal_id");
        modal.close();
        return toast.error("Please provide a smaller media file!");
      }

      setLoading(true);

      let postInfo = {
        name: user?.displayName,
        auther_image: user?.photoURL,
        email: user?.email,
        article: data?.article || "",
        image: "",
        time: new Date(),
        likes: 0,
        comments: [],
        feelings: data?.feelings || "",
      };

      if (!selectedFileName && data?.article) {
        // Upload article
        const response = await axiosSecure.post("/feeds", postInfo);
        if (response?.data?.acknowledged) {
          toast.success("Your post was successful!");
          reset();
          setSelectedFileName(null);
          const modal = document.getElementById("post_modal_id");
          modal.close();
          refetch();
        }
      } else if (
        selectedFileName &&
        selectedFileName.type.startsWith("image")
      ) {
        // Upload image
        const formData = new FormData();
        formData.append("image", selectedFileName);
        const { data: imageData } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imgbb_API_key
          }`,
          formData
        );
        postInfo.image = imageData?.data?.display_url;
        const response = await axiosSecure.post("/feeds", postInfo);
        if (response?.data?.acknowledged) {
          toast.success("Your post was successful!");
          reset();
          setSelectedFileName(null);
          const modal = document.getElementById("post_modal_id");
          modal.close();
          refetch();
        }
      } else if (selectedFileName && selectedFileName.type === "video/mp4") {
        // Upload video
        const formData = new FormData();
        formData.append("file", selectedFileName);
        formData.append("upload_preset", "video_presed");
        const { data: videoData } = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_clowdinary_secret_key
          }/video/upload`,
          formData
        );
        postInfo.video = videoData?.secure_url;
        const response = await axiosSecure.post("/feeds", postInfo);
        if (response?.data?.acknowledged) {
          toast.success("Your post was successful!");
          reset();
          setSelectedFileName(null);
          const modal = document.getElementById("post_modal_id");
          modal.close();
          refetch();
        }
      } else {
        toast.error("Please provide a valid file or article.");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error submitting post:", err);
      setLoading(false);
    }
  };
  const selectFeelings = watch("feelings");

  // modal control
  const handleModal = () => {
    setIsMedia(false);
    document.getElementById("post_modal_id").showModal();
  };
  return (
    <div>
      <button
        className="flex  items-center gap-2 py-2 px-3 md:px-8 text-sm  md:text-xl  border-2 border-gray-100 rounded-md text-gray-500 font-medium bg-gray-200 hover:bg-gray-300 transition-all duration-300"
        onClick={handleModal}>
        <img src={postimg} className="w-6" alt="" />
        {name}
      </button>
      <dialog id="post_modal_id" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle text-xl btn-ghost absolute right-2 top-2">
              <MdClose />
            </button>
          </form>
          <div>
            <div className="divider">Create Post</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-500">Feelings</span>
                </label>
                <select
                  {...register("feelings")}
                  value={selectFeelings}
                  onChange={(e) => setValue("feelings", e.target.value)}
                  className="select select-bordered w-full">
                  <option value="">None</option>
                  <option value="Happy 😊">Happy 😊</option>
                  <option value="Loved 😘">Loved 😘</option>
                  <option value="Thankful 😊">Thankful 😊</option>
                  <option value="Normal 🙂">Normal 🙂</option>
                  <option value="Proud 🥰">Proud 🥰</option>
                  <option value="Angry 😡">Angry 😡</option>
                  <option value="Sleep 😴">Sleep 😴</option>
                  <option value="Hungry 😩">Hungry 😩</option>
                  <option value="Sorry 🙃">Sorry 🙃</option>
                  <option value="Missing 😭">Missing 😭</option>
                  <option value="Crazy 😁">Crazy 😁</option>
                  <option value="Sick 😣">Sick 😣</option>
                  <option value="Sad 🥲">Sad 🥲</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-500">Article</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Share your article..."
                  {...register("article")}
                  className="textarea border border-primary focus:border-primary w-full"
                />
              </div>

              {/* medial box with conditional */}
              <div
                className={`${
                  isMedia ? "block" : "hidden"
                } flex items-center justify-center w-full mt-5`}>
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload className="text-4xl text-gray-500" />
                    <p className=" text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>{" "}
                      Photo/video
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG, video/mp4
                    </p>
                    {selectedFileName ? (
                      <div className="font-medium text-gray-400 text-center">
                        {selectedFileName?.name.slice(0,50)} <br /> {selectedFileName?.type}{" "}
                        / {(selectedFileName?.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <input
                    accept="image/png,image/jpeg,image/jpg,video/mp4"
                    id="dropzone-file"
                    type="file"
                    name="image"
                    className="hidden"
                    onChange={(e) => setSelectedFileName(e.target.files[0])}
                  />
                </label>
              </div>

              {loading ? (
                <button className="text-xl btn btn-disabled flex items-center justify-center w-full gap-2 text-black bg-primary py-2 px-4 rounded-md mt-5">
                  Post Now
                  {loading && (
                    <span className="loading loading-spinner text-black"></span>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-xl flex items-center justify-center w-full gap-2 text-white bg-primary py-2 px-4 rounded-md hover:bg-[#131a39] transform-all duration-300 mt-5">
                  Post Now
                  {loading && (
                    <span className="loading loading-spinner text-white"></span>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddPostModal;
