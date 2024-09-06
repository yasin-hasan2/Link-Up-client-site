import SectionHelmet from "../../../shared/SectionHelmet/SectionHelmet";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useGetBookmark from "../../../hooks/useGetBookmark";
import ReactPlayer from "react-player";

const SavePost = () => {
  const axiosPublic = useAxiosPublic();
  const [savePosts, bookmarkRefetch] = useGetBookmark();

  const handleDelete = (_id) => {
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
        const res = await axiosPublic.delete(`/post-save/${_id}`);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted !",
            icon: "success",
          });
          bookmarkRefetch();
        }
      }
    });
  };
  return (
    <section className="mx-3">
      <SectionHelmet title={"Free Time | Save Post"} />
      <h2 className="text-xl font-semibold text-center my-3 md:my-5">
        Total Save Post: {savePosts?.length}
      </h2>
      <div className="space-y-3">
        {savePosts?.length === 0 ? (
          <p className="text-red-500 text-xl text-center md:mt-20">
            No Post Saved !
          </p>
        ) : (
          savePosts?.map((savePost) => (
            <div
              key={savePost?._id}
              className="flex relative flex-col md:flex-row gap-3 shadow-md w-full p-3 bg-white rounded-md h-[200px]">
              {
                <div
                  className={`${
                    savePost?.image || savePost?.video ? "block" : "hidden"
                  } w-1/2`}>
                  {savePost?.image ? (
                    <img
                      src={savePost?.image}
                      className="object-cover h-full  w-full rounded-md"
                      alt=""
                    />
                  ) : (
                    <div className="h-full w-full bg-black">
                      <ReactPlayer
                        style={{
                          borderRadius: "50px",
                        }}
                        progressInterval={1000}
                        controls
                        playing={false}
                        volume={0.5}
                        url={savePost?.video}
                        width="100%"
                        height="100%"
                      />
                    </div>
                  )}
                </div>
              }
              <div className="">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={savePost?.auther_image} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium flex items-center gap-3">
                      {savePost?.name}{" "}
                      <span className="text-[16px] font-normal text-gray-400">
                        {savePost?.feelings ? (
                          <p>
                            Feelings with{" "}
                            <span className="font-medium text-gray-950">
                              {savePost?.feelings}
                            </span>
                          </p>
                        ) : (
                          ""
                        )}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500">
                      {savePost?.time?.slice(0, 10)}
                    </p>
                  </div>
                </div>
                <p>{savePost?.article}</p>
                <div className="absolute  right-0  bottom-5">
                  <button
                    onClick={() => handleDelete(savePost?._id)}
                    className="btn btn-circle text-xl">
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SavePost;
