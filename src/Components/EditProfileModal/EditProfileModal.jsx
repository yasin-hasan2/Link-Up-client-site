/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { FaUserEdit } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const EditProfileModal = ({ refetch, profile }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  //   console.log(profile);
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      // console.log(imageData)
      const profileInfo = {
        bio: data?.bio,
        work: data?.work,
        home: data?.home,
        institute: data?.institute,
        relation: data?.relation,
        date_of_birth: data?.birthDay,
        social: data?.social,
        email: user?.email,
      };
      setLoading(true);
      const res = await axiosPublic.patch(
        `/profiles/${profile?._id}`,
        profileInfo
      );
      //   console.log(res.data);
      if (res.data?.acknowledged) {
        toast.success("Profile Update Successfully !");
        reset();
        const modal = document.getElementById("Edit_profile_modal_id");
        modal.close();
        refetch();
        setLoading(false);
      }
    } catch (err) {
      console.log("profile create err--->", err);
    }
  };

  const relationStatus = watch("relation");

  return (
    <div>
      <button
        className="text-sm md:text-xl flex items-center md:gap-2 btn text-white bg-primary py-2 px-4 rounded-md hover:bg-[#0d132e] transform-all duration-300"
        onClick={() =>
          document.getElementById("Edit_profile_modal_id").showModal()
        }>
        <FaUserEdit /> Edit Profile
      </button>

      <dialog id="Edit_profile_modal_id" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
        <div className="modal-action absolute right-0 top-0">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-circle text-xl bg-slate-800 text-white"><MdClose/></button>
            </form>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="grid grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <input
                    type="text"
                    {...register("bio")}
                    defaultValue={profile?.bio}
                    placeholder="Bio length 30"
                    className="py-3 px-2 outline-none border text-gray-500  border-primary text-sm rounded-lg  focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Work</span>
                  </label>
                  <input
                    type="text"
                    {...register("work")}
                    defaultValue={profile?.work}
                    placeholder="Your Work name"
                    className="py-3 px-2 outline-none border text-gray-500  border-primary text-sm rounded-lg  focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Home</span>
                  </label>
                  <input
                    type="text"
                    {...register("home")}
                    defaultValue={profile?.home}
                    placeholder="Your Home"
                    className="py-3 px-2 outline-none border text-gray-500  border-primary text-sm rounded-lg  focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Institute</span>
                  </label>
                  <input
                    type="text"
                    {...register("institute")}
                    defaultValue={profile?.institute}
                    placeholder="Your Institute"
                    className="py-3 px-2 outline-none border text-gray-500  border-primary text-sm rounded-lg  focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Relation Status</span>
                  </label>
                  <select
                    {...register("relation")}
                    onChange={(e) => setValue("relation", e.target.value)}
                    value={relationStatus}
                    defaultValue={profile?.relation}
                    className="select select-bordered"
                    name=""
                    id="">
                    <option value="Single">Single</option>
                    <option value="Merit">Merit</option>
                    <option value="In a Relationship">In a Relationship</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date Of Birth</span>
                  </label>
                  <input
                    type="date"
                    {...register("birthDay")}
                    defaultValue={profile?.date_of_birth}
                    className="py-3 px-2 outline-none border text-gray-500  border-primary text-sm rounded-lg  focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Social Link</span>
                  </label>
                  <input
                    type="text"
                    {...register("social")}
                    defaultValue={profile?.social}
                    placeholder="Any Social Link"
                    className="py-3 px-2 outline-none border text-gray-500  border-primary text-sm rounded-lg  focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 w-full"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-xl flex justify-center items-center w-full gap-2 text-white bg-primary py-2 px-4 rounded-md hover:bg-[#06144d] transform-all duration-300 mt-5">
                Submit{" "}
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

export default EditProfileModal;
