import axios from "axios";
const url = import.meta.env.VITE_socket_url;
const axiosMessanger  = axios.create({
    baseURL: url
})
//http://localhost:9000/
const useAxiosMessanger = () => {
    return axiosMessanger
}
 
export default useAxiosMessanger;