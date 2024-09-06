import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://link-up-server-side.vercel.app/",
});

//https://link-up-server-side.vercel.app/

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
