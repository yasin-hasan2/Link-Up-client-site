/* eslint-disable react/prop-types */
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import ReactPlayer from "react-player";
import ReelComment from "../../Components/ReelsCommant/ReelComme";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useGetBookmark from "../../hooks/useGetBookmark";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import useGetSIngleUser from "../../hooks/useGetSIngleUser";
import { format } from "timeago.js";
import ReelsShare from "../../Components/reelsShare/ReelsShare";

const Reel = ({ reel, refetch }) => {
  const { name, title, time, auther_image, reels, _id, comments, likes, email } = reel;
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [ref, inView] = useInView();
  const [savePosts, bookmarkRefetch] = useGetBookmark();
  const [sinleUser] = useGetSIngleUser();
  // get like state in local storage
  useEffect(() => {
    const likedState = localStorage.getItem(`reels_liked_${_id}`);
    if (likedState === "true") {
      setLiked(true);
    }
  }, [_id]);

  // like the reels
  const handleLike = async () => {
    const userId = sinleUser?._id;
    try {
      // liked
      if (!liked) {
        await axiosPublic.post(`/reels/likes/${_id}`, { userId });
        // set like state in local storage
        localStorage.setItem(`reels_liked_${_id}`, "true");
        setLiked(true);
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
        const postInfo = {
          email:email,
          NotifyName: sinleUser?.name,
          type: "Liked your reel",
          date: new Date(),
          count:1,
          prevId: _id,
          status: "Unread"
        };
        await axiosPublic.post('notification', postInfo)
      } else {
        //dislike
        await axiosPublic.post(`/reels/Dislikes/${_id}`, { userId });
        // set like state in local storage
        localStorage.setItem(`reels_liked_${_id}`, "false");
        setLiked(false);
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed to like/unlike post");
    }
  };
  // bookmark find
  useEffect(() => {
    bookmarkRefetch();
    const isExist = savePosts?.find((post) => post?.PrevId === _id);
    if (isExist) {
      bookmarkRefetch();
      setIsSaved(true);
    }
  }, [_id, savePosts, bookmarkRefetch]);
  const handleAddSave = async () => {
    const isExist = savePosts?.find((post) => post?.PrevId === _id);
    if (isExist) {
      toast.error("Already saved this reel !");
    } else {
      setIsSaved(false);
      try {
        const postInfo = {
          name: name,
          title: title,
          time: time,
          email: user?.email,
          auther_image: auther_image,
          video: reels,
          PrevId: _id,
        };
        const res = await axiosSecure.post("/post-save", postInfo);
        if (res.data?.acknowledged) {
          bookmarkRefetch();
          toast.success("Reels bookmark Success !");
        }
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };
  return (
    <div
      ref={ref}
      className=" shadow-md  relative w-full bg-black  rounded-md h-[100vh]">
      <div className="relative">
        <div className="flex items-center gap-2 absolute  p-3 bg-[rgba(0,0,0,0.5)] w-full">
          <div className="avatar right-1">
            <div className="w-10 rounded-full">
              <img src={auther_image} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl text-white font-bold">{name}</h3>
          </div>
        </div>
        <div className="w-full shadow-lg h-[100vh]">
          <ReactPlayer
            style={{
              borderRadius: "50px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            loop={true}
            controls
            playing={inView}
            volume={0.5}
            url={reels}
            width="100%"
            height="100%"
          />
        </div>
        <div
          style={{ backdropFilter: "blur(20px)" }}
          className="flex z-30 flex-col py-5 px-3 space-y-7 text-xl  rounded-full w-fit absolute bottom-20 md:bottom-6 right-1 text-white">
          {liked ? (
            <button
              onClick={handleLike}
              className="flex flex-col items-center text-pink-500 gap-1 text-xl">
              <FcLike />
              <span className="text-white">{likeCount}</span>
            </button>
          ) : (
            <button
              onClick={handleLike}
              className="flex flex-col items-center gap-1 text-xl text-white">
              <FaRegHeart /> {likeCount}
            </button>
          )}
          <ReelComment refetch={refetch} id={_id} comments={comments} email={email}/>

          <ReelsShare url={reels} />
          {isSaved ? (
            <button onClick={handleAddSave} className="text-xl text-pink-500">
              <BsFillBookmarkCheckFill />
            </button>
          ) : (
            <button onClick={handleAddSave} className="text-xl">
              <FaRegBookmark />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start gap-1  absolute bottom-0 bg-[rgba(0,0,0,0.5)] w-full z-20 left-1">
        <h3 className="text-xl font-medium  text-white">{title}</h3>
        <p className="text-sm text-gray-200">{format(time)}</p>
      </div>
    </div>
  );
};

export default Reel;
