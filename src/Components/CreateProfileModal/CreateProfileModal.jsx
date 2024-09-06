/* eslint-disable react/prop-types */
import axios from "axios";
import { useForm } from "react-hook-form";
import { IoMdCreate } from "react-icons/io";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const CreateProfileModal = ({refetch,profiles}) => {
    const { register, handleSubmit, setValue, watch, reset } = useForm();
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const onSubmit = async(data)=>{
        // console.log(data);
        try{
            const fileImage = data?.file[0];
            const formData = new FormData();
            formData.append("image", fileImage);
            const { data: imageData } = await axios.post(
              "https://api.imgbb.com/1/upload?key=ee9960786c60a08168b8606c5d54ae38",
              formData
            );
            // console.log(imageData)
            const profileInfo = {
                cover: imageData?.data?.display_url,
                bio: data?.bio,
                work: data?.work,
                home: data?.home,
                institute: data?.institute,
                relation: data?.relation,
                date_of_birth: data?.birthDay,
                social: data?.social,
                email: user?.email
            }
            if (imageData?.success) {
              const res = await axiosPublic.post('/profiles', profileInfo)
              console.log(res.data);
              if(res.data?.acknowledged){
                toast.success("Profile Create Successfully !")
                reset()
                const modal = document.getElementById("Create_profile_modal")
                modal.close()
                refetch()
              }
            }
        }catch(err){
            console.log('profile create err--->', err);
        }
    }
    const relationStatus = watch("relation")
  return (
    <div>
      {
        profiles.length === 0 ? <button
        className="text-xl flex items-center gap-2 text-white bg-primary py-2 px-4 rounded-md hover:bg-[#0b122c] transform-all duration-300"
        onClick={() =>
          document.getElementById("Create_profile_modal").showModal()
        }>
        <IoMdCreate /> Create Profile
      </button> :
      <button
      className="text-sm md:text-xl flex items-center md:gap-2 text-white bg-primary py-2 px-4 btn btn-disabled"
     >
      <IoMdCreate /> Create Profile
    </button>
      }
      <dialog id="Create_profile_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="grid grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cover Photo</span>
                </label>
                <input
                  type="file"
                  {...register("file")}
                  required
                  placeholder="Type here"
                  className="py-3 px-2 outline-none border text-gray-500  border-primary text-sm rounded-lg  focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <input
                  type="text"
                  {...register("bio")}
                  required
                  placeholder="Your profile bio"
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                  placeholder="Any Social Link"
                  className="py-3 px-2 outline-none border text-gray-500  border-primary text-sm rounded-lg  focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 w-full"
                />
              </div>
              </div>
              <button type="submit" className="text-xl w-full gap-2 text-white bg-primary py-2 px-4 rounded-md hover:bg-[#0b1129] transform-all duration-300 mt-5">Submit</button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateProfileModal;
