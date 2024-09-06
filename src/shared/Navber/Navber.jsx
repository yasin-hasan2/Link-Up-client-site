import "./navber.css";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { SiYoutubeshorts } from "react-icons/si";
import chatsIcon from "../../assets/icon/chats.png";
import userIcon from "../../assets/icon/user.png";
import bookmarkIcon from "../../assets/icon/bookmark.png";
import settingIcon from "../../assets/icon/setting.png";
import logoutIcon from "../../assets/icon/logout.png";
import { IoIosNotifications, IoMdHome } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import useNotification from "../../hooks/useNotification";

const Navber = () => {
  const { user, logOut } = useAuth();
  const [nofitications] = useNotification();
  const notiReduce = nofitications.reduce(
    (prev, current) => prev + current?.count,
    0
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Success !");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <nav className="bg-white fixed top-0 w-full shadow-lg py-1 px-4 z-50">
      <div
        id="toNap"
        className="flex justify-between   items-center  max-w-7xl mx-auto"
      >
        <h1 className="text-2xl font-bold">Link Up</h1>
        <ul className={`flex items-center gap-8 md:gap-28 `}>
          <li>
            <NavLink to="/" className="text-2xl">
              <IoMdHome />
            </NavLink>
          </li>
          <li>
            <NavLink to="" className="text-2xl">
              <SiYoutubeshorts />
            </NavLink>
          </li>
          <li className="block md:hidden">
            <NavLink to="" className="text-2xl">
              <IoChatbubbleEllipsesOutline />
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/notification" className="text-2xl flex">
              <IoIosNotifications />
              <div className="badge -ml-1">{notiReduce}</div>
            </NavLink>
          </li>
        </ul>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={user && user?.photoURL} />
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-3 border shadow-2xl "
          >
            <li>
              <Link
                to={"/profile"}
                className=" text-xl font-medium flex items-center"
              >
                <img src={userIcon} className="w-6" alt="" /> Profile
              </Link>
            </li>
            <li>
              <Link
                to={"/save-post"}
                className=" text-xl font-medium flex items-center"
              >
                <img src={bookmarkIcon} className="w-6" alt="" />
                Bookmark
              </Link>
            </li>
            <li>
              <Link to={""} className=" text-xl font-medium flex items-center">
                <img src={chatsIcon} className="w-6" alt="" /> Add Chats
              </Link>
            </li>
            <li>
              <Link to={"/setting"} className=" text-xl font-medium">
                <img src={settingIcon} className="w-6" alt="" /> Setting
              </Link>
            </li>
            <button
              className="btn border shadow-md text-xl"
              onClick={handleLogOut}
            >
              <img src={logoutIcon} className="w-6" alt="" /> Log Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
