import { FaGithub, FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      if (res) {
        const postInfo = {
          photo:res?.user?.photoURL,
          name: res?.user?.displayName,
          email: res?.user?.email,
        };
        console.log(res.user);
        await axiosPublic.post("/users", postInfo);
        toast.success("Google Login Success !");
        navigate(location?.state ? location?.state : "/");
      }
    } catch (err) {
      console.log("Google login error-->", err);
    }
  };
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="text-xl font-medium text-black py-1 px-4 w-full border border-primary rounded-md hover:text-white hover:bg-primary transition-all duration-300"
        onClick={() =>
          document.getElementById("SocialLogin_modal").showModal()
        }>
        Social Login
      </button>
      <dialog id="SocialLogin_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="text-xl font-semibold text-center border-b-2 w-fit border-slate-700 mx-auto mb-5">
            Social Login 👇
          </h2>
          <div className="flex gap-6 justify-center p-5 rounded-md">
            <button className="btn btn-circle text-2xl border text-blue-500">
              <MdFacebook />
            </button>
            <button
              onClick={handleGoogleLogin}
              className="btn btn-circle text-2xl border text-blue-700">
              <FaGoogle />
            </button>
            <button className="btn btn-circle text-2xl border text-slate-800">
              <FaGithub />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SocialLogin;
