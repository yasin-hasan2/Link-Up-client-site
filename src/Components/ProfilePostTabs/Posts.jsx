/* eslint-disable react/prop-types */
import { HiDotsVertical } from "react-icons/hi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MdClose, MdDelete } from "react-icons/md";
import UpdatePostModal from "./UpdatePostModal";
import Swal from "sweetalert2";
import PostCommentModal from "../../shared/VideoCommentModal/VideoCommentsModal";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";
import useGetSIngleUser from "../../hooks/useGetSIngleUser";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import PostShare from "../PostShare/PostShare";

const Posts = ({ post, refetch }) => {
  const { name, article, time, likes, comments, _id, auther_image, image, video, feelings, email } =
    post;
  const [likeCount, setLikeCount] = useState(likes);
  const axiosPublic = useAxiosPublic();
  const [liked, setLiked] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [ref, inView] = useInView();
  const [sinleUser] = useGetSIngleUser();
    // get like state in local storage
    useEffect(() => {
      const likedState = localStorage.getItem(`liked_${_id}`);
      if (likedState === "true") {
        setLiked(true);
      }
    }, [_id]);
  const handleLike = async () => {
    const userId = sinleUser?._id;
    try {
      // liked
      if (!liked) {
        await axiosPublic.post(`/feeds/likes/${_id}`, { userId });
        // set like state in local storage
        localStorage.setItem(`liked_${_id}`, "true");
        setLiked(true);
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
        const postInfo = {
          email:email,
          NotifyName: sinleUser?.name,
          type: "Liked your post",
          date: new Date(),
          count:1,
          prevId: _id,
          status: "Unread"
        };
        await axiosPublic.post('notification', postInfo)
      } else {
        //dislike
        await axiosPublic.post(`/feeds/Dislikes/${_id}`, { userId });
        // set like state in local storage
        localStorage.setItem(`liked_${_id}`, "false");
        setLiked(false);
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed to like/unlike post");
    }
  };
 
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure delete this post ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/feeds/${_id}`);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted !",
            icon: "success",
          });
          refetch()
        }
      }
    });
  };
  return (
    <div ref={ref} className="p-2 border rounded-md">
      <div className="flex justify-between items-center gap-2 relative">
      <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={auther_image} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium flex items-center gap-3">
              {name}{" "}
              <span className="text-[16px] font-normal text-gray-400">
                {feelings ? (
                  <p>
                    Feelings with{" "}
                    <span className="font-medium text-gray-950">
                      {feelings}
                    </span>
                  </p>
                ) : (
                  ""
                )}
              </span>
            </h3>
            <p className="text-sm text-gray-500">{time?.slice(0, 10)}</p>
          </div>
        </div>
        <button onClick={() => setIsToggle(!isToggle)} className={`text-2xl `}>
          {isToggle ? <MdClose /> : <HiDotsVertical />}
        </button>
        <div
          className={`${
            isToggle
              ? "absolute right-4 top-9 bg-slate-700 p-5 rounded-md shadow-md"
              : "hidden"
          } flex flex-col gap-2 z-10`}>
          <button
            onClick={handleDelete}
            className="text-xl text-white bg-slate-500 px-4 py-2 rounded-md hover:bg-slate-600 transform-all duration-300">
            <MdDelete />
          </button>
          <UpdatePostModal
            post={post}
            setIsToggle={setIsToggle}
            refetch={refetch}
          />
        </div>
      </div>
      <h5 className="font-medium my-5">{article}</h5>

      <div className={`${image || video ? "block" : "hidden"}`}>
        {image ? (
          <img
            src={image}
            className="object-cover h-[350px] w-full rounded-md"
            alt=""
          />
        ) : (
          <div className="h-[350px] w-full bg-black">
            <ReactPlayer
        style={{
          borderRadius: '20px' 
        }}
        progressInterval={1000}
          controls
          playing={inView}
          volume={0.5}
          url={video}
          width="100%"
          height="100%"
        />
          </div>
        )}
      </div>

     {/* react  */}
     <div className="flex justify-start px-5 py-3">
        <div className="flex items-center gap-5">
          {liked ? (
            <button
              onClick={handleLike}
              className="flex items-center text-pink-500 gap-1 text-xl">
              <FcLike />
              {likeCount}
            </button>
          ) : (
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-xl text-gray-500">
              <FaRegHeart /> {likeCount}
            </button>
          )}
          <PostCommentModal comments={comments} refetch={refetch} id={_id} />
          {
            image || video ? <PostShare url={image || video}/> : ""
          }
        </div>
       
      </div>
    </div>
  );
};

export default Posts;
