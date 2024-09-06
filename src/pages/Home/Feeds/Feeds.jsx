/* eslint-disable react/no-unknown-property */
import Feed from "../../../shared/Feed/Feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import AddPostModal from "../../../Components/AddPostModal/AddPostModal";
import AddReelsModal from "../../../Components/AddReelsModal/AddReelsModal";
import { useState } from "react";
import mediaimg from "../../../assets/icon/media.png";
import { IoSearch } from "react-icons/io5";
import "./feeds.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const Feeds = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isMedia, setIsMedia] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // get data
  const getNewFeeds = async ({ pageParam = 0 }) => {
    try {
      const response = await axiosSecure.get(
        `/feeds?limit=10&offset=${pageParam}`
      );
      const data = response.data;
      return { ...data, prevOffset: pageParam};
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  const { data, fetchNextPage, hasNextPage, refetch, isLoading } =
  useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: getNewFeeds,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 10 > lastPage.articlesCount) {
        return false;
      }
      return lastPage.prevOffset + 10;
    },
  });

  const feeds = data?.pages
    .flatMap((page) => {
      return Object.values(page).map((article) => {
        return {
          _id: article?._id,
          name: article?.name,
          auther_image: article?.auther_image,
          email: article?.email,
          image: article?.image,
          article: article?.article,
          video: article?.video,
          time: article?.time,
          likes: article?.likes,
          comments: article?.comments,
          feelings: article?.feelings,
        };
      });
    })
    .filter((article) => article.article);

  const handleMedia = () => {
    setIsMedia(true);
    const modal = document.getElementById("post_modal_id");
    modal.showModal();
  };

  // search field change handler
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // search field submit handler
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPublic.get(`search?q=${searchValue}`);
      navigate("/search-value", {
        state: { searchData: res.data},
      });
      setSearchValue("");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className=" w-full relative">
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white shadow-md rounded-md my-2 sticky top-14 md:top-0 z-10 transition-all duration-300">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearch className="text-gray-400" />
          </div>
          <input
            type="search"
            name="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-md bg-white outline-none"
            placeholder="Search name & article..."
            required
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">
            Search
          </button>
        </div>
      </form>

      <div className="p-5 mb-2 md:my-2 rounded-md shadow-md space-y-4 border bg-white">
        <div className="flex items-center gap-2 ">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
          <h2 className="px-4 py-2 rounded-full bg-gray-200 font-semibold text-slate-500 w-full">
            Hey {user?.displayName}, share your feelings ?
          </h2>
        </div>
        <hr />
        <div className="flex items-center gap-3 md:gap-5 justify-center">
          <AddPostModal
            isMedia={isMedia}
            setIsMedia={setIsMedia}
            name={"Post"}
            refetch={refetch}
          />
          <button
            className="flex  items-center gap-2 py-2 px-3 md:px-8 text-sm  md:text-xl  border-2 border-gray-100 rounded-md text-gray-500 font-medium bg-gray-200 hover:bg-gray-300 transition-all duration-300"
            onClick={handleMedia}>
            <img src={mediaimg} className="w-6" alt="" /> Media
          </button>
          <AddReelsModal refetch={refetch} />
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="loader">
            <div className="wrapper">
              <div className="circle"></div>
              <div className="line-1"></div>
              <div className="line-2"></div>
              <div className="line-3"></div>
              <div className="line-4"></div>
            </div>
          </div>
        ) : (
          <>
            {feeds?.length === 0 ? (
              <p className="text-center mt-2">No post!</p>
            ) : (
              <InfiniteScroll
                dataLength={feeds ? feeds.length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                >
                <div className="space-y-3">
                  {feeds &&
                    feeds.map((feed, idx) => (
                      <Feed key={idx} feed={feed} refetch={refetch} />
                    ))}
                </div>
              </InfiniteScroll>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feeds;
