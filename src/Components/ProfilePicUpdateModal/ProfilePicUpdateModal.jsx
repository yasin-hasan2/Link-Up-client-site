/* eslint-disable react/prop-types */
import axios from "axios";
import { IoCameraOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const ProfilePicUpdateModal = () => {
  const [selectedFileName, setSelectedFileName] = useState(null);
  const { profileUpdate, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fileImage = selectedFileName;
      // console.log(fileImage);
      const formData = new FormData();
      formData.append("image", fileImage);
      const { data: imageData } = await axios.post(
        "https://api.imgbb.com/1/upload?key=ee9960786c60a08168b8606c5d54ae38",
        formData
      );
      // console.log(imageData)
      if (imageData?.success) {
        await profileUpdate(user?.displayName, imageData?.data?.display_url);
        user.reload();
        toast.success("Profile Pic Update Success !");
        const modal = document.getElementById("profile_pic_update");
        modal.close();
        setSelectedFileName(null);
        setLoading(false);
      }
    } catch (err) {
      console.log("profile pic update err--->", err);
    }
  };
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="absolute right-0 bottom-0 btn btn-circle text-xl"
        onClick={() =>
          document.getElementById("profile_pic_update").showModal()
        }>
        <IoCameraOutline />
      </button>
      <dialog id="profile_pic_update" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <div className="divider text-gray-500">Update Profile Pic</div>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <div className="flex items-center justify-center w-full mt-5">
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <MdOutlineCloudUpload className="text-4xl text-gray-500" />
                      <p className=" text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        Photo
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                      {selectedFileName ? (
                        <div className="font-medium text-gray-400 text-center">
                          {selectedFileName?.name.slice(0,30)} <br />{" "}
                          {selectedFileName?.type} /{" "}
                          {(selectedFileName?.size / 1024 / 1024).toFixed(2)} MB
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
              </div>
              <button
                disabled={!selectedFileName}
                type="submit"
                className={`${
                  selectedFileName === null
                    ? "disabled bg-gray-400"
                    : "bg-primary  hover:bg-blue-600 "
                } text-xl flex items-center  justify-center w-full gap-2 text-white  py-2 px-4 rounded-md transform-all duration-300 mt-5`}>
                Update Now{" "}
                {loading && (
                  <span className="loading loading-spinner text-white"></span>
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfilePicUpdateModal;
