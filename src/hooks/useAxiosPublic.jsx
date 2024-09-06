import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://link-up-server-side.vercel.app/",
});
//http://localhost:9000/
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
