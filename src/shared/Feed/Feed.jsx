/* eslint-disable react/prop-types */
import { FcLike } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import PostCommentModal from "../VideoCommentModal/VideoCommentsModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";
import useGetSIngleUser from "../../hooks/useGetSIngleUser";
import useGetBookmark from "../../hooks/useGetBookmark";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import PostShare from "../../Components/PostShare/PostShare";
import { format } from "timeago.js";

const Feed = ({ feed, refetch }) => {
  const {
    name,
    email,
    article,
    time,
    likes,
    comments,
    _id,
    auther_image,
    image,
    video,
    feelings,
  } = feed;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [liked, setLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [sinleUser] = useGetSIngleUser();
  const [ref, inView] = useInView();
  const [savePosts, bookmarkRefetch] = useGetBookmark();
  const [isShowArticle,setIsShowArticle] = useState(true)
  const { user } = useAuth();
  // get like state in local storage
  useEffect(() => {
    const likedState = localStorage.getItem(`liked_${_id}`);
    if (likedState === "true") {
      setLiked(true);
    }
  }, [_id]);

  // like the post
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
          email: email,
          NotifyName: sinleUser?.name,
          type: "Liked your post",
          date: new Date(),
          count: 1,
          prevId: _id,
          status: "Unread",
        };
        await axiosPublic.post("notification", postInfo);
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

  // bookmark find
  useEffect(() => {
    bookmarkRefetch();
    const isExist = savePosts?.find((post) => post?.PrevId === _id);
    if (isExist) {
      bookmarkRefetch();
      setIsSaved(true);
    }
  }, [_id, savePosts, bookmarkRefetch]);

  // add to bookmark
  const handleAddSave = async () => {
    const isExist = savePosts?.find((post) => post?.PrevId === _id);
    if (isExist) {
      toast.error("Already saved this post !");
    } else {
      setIsSaved(false);
      try {
        const postInfo = {
          name: name,
          article: article,
          time: time,
          email: user?.email,
          auther_image: auther_image,
          image: image,
          video: video,
          feelings: feelings,
          PrevId: _id,
        };
        const res = await axiosSecure.post("/post-save", postInfo);
        if (res.data?.acknowledged) {
          bookmarkRefetch();
          toast.success("Post added Success !");
        }
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };

  return (
    <div ref={ref} className="p-3 border rounded-md bg-white shadow">
      <div className="flex justify-between items-center gap-2 relative">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={auther_image} />
            </div>
          </div>
          <div>
            <h3 className=" font-medium flex items-center gap-3">
              {name}
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
            <p className="text-sm text-gray-500 -mt-1">{format(time)}</p>
          </div>
        </div>
      </div>
      <h5 className="font-medium my-5">
        {isShowArticle ? article?.slice(0,100) : article}
        <span onClick={()=>setIsShowArticle(!isShowArticle)} className={`link link-primary link-hover ml-1 ${article?.length <= 100 || undefined ? "hidden" : "inline"}`}>{isShowArticle ? "More..." : "Show less"}</span>
      </h5>

      <div className={`${image || video ? "block" : "hidden"}`}>
        {image ? (
          <img
            src={image}
            className="object-cover w-full rounded-md max-h-[800px]"
            alt=""
          />
        ) : (
          <div className="h-[350px] w-full bg-black">
            <ReactPlayer
              style={{
                borderRadius: "20px",
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
      <div className="flex justify-between px-5 py-3">
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
          <PostCommentModal
            comments={comments}
            email={email}
            refetch={refetch}
            id={_id}
          />
          <PostShare url={`https://free-time-56230.web.app/feeds/${_id}`} />
        </div>
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
  );
};

export default Feed;
