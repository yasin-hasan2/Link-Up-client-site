/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionHelmet from "../shared/SectionHelmet/SectionHelmet";
import googlepng from "../assets/icon/google.png";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const { signIn, googleLogin, passReset, user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await signIn(data?.email, data?.password)
        .then(() => {
          toast.success(`login Success !`);
          navigate(location?.state ? location?.state : "/");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (err) {
      console.log("sign in error --->", err);
    }
  };

  // google login
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

  // pass reset
  const handlePassReset=()=>{
    passReset(user?.email)
    .then(()=>{
      toast.success("Please check your email and set new password!")
    })
    .catch(err=>{
      toast.error("Password reset error", err.message)
    })
  }

  return (
    <div>
      <SectionHelmet title={"Free Time | Login"} />
      <div className="flex justify-center h-screen items-center">
        <div className="relative justify-center flex flex-col rounded-xl text-gray-700 shadow-2xl p-10 border">
          <h4 className="font-sans text-2xl font-semibold text-center">
            Welcome Back !
          </h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  name="email"
                  type="email"
                  {...register("email", { required: true })}
                  
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                {errors.email && <span className="text-red-500 text-sm">Email field is required</span>}
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Email
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="password"
                  name="password"
                  {...register("password", { required: true })}
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                {errors.password && <span className="text-red-500 text-sm">Password field is required</span>}
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
              </div>
            </div>
            <p onClick={handlePassReset} className="link">Reset Password?</p>
            <button
              className="mt-6 block w-full select-none rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true">
              Login
            </button>
            <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Don't have any account?
              <Link
                className="font-medium text-primary transition-colors hover:text-blue-700"
                to="/registration">
                Registration
              </Link>
            </p>
          </form>
          <div>
            <button onClick={handleGoogleLogin} className="text-xl font-medium text-black py-1 px-4 w-full border border-primary rounded-md hover:text-white hover:bg-primary transition-all duration-300 flex items-center gap-2 justify-center"> <img src={googlepng} className="w-6" alt="" /> <span>Continue with Google</span> </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
