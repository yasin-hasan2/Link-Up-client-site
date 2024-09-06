import useAuth from "../../hooks/useAuth";
import SectionHelmet from "../../shared/SectionHelmet/SectionHelmet";
import coverImg from "../../assets/images/cover.jpeg";
import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosSchool, IoMdHome } from "react-icons/io";
import { GiSelfLove } from "react-icons/gi";
import Navber from "../../shared/Navber/Navber";
import CreateProfileModal from "../../Components/CreateProfileModal/CreateProfileModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import EditProfileModal from "../../Components/EditProfileModal/EditProfileModal";
import CoverPhotoEditModal from "../../Components/CoverPhotoEditModal/CoverPhotoEditModal";
import ProfilePicUpdateModal from "../../Components/ProfilePicUpdateModal/ProfilePicUpdateModal";
import ProfilePostTabs from "../../Components/ProfilePostTabs/ProfilePostTabs";

const Profile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: profiles = [], refetch } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/profiles?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <section className="">
      <SectionHelmet title={`${user?.displayName} - Profile`} />
      <Navber />
      <div className="max-w-5xl mx-auto ">
        <div className="relative">
          {/* cover  photo */}
          {profiles?.map((profile) => (
            <div key={profile?._id} className="md:h-[400px] w-full relative">
              <img
                className="w-full object-cover md:h-[400px] rounded-md"
                src={profile?.cover}
                alt=""
              />
              <CoverPhotoEditModal profile={profile} refetch={refetch} />
            </div>
          ))}
          {/* default cover photo */}
          <img
            className={`${
              profiles.length === 0 ? "block" : "hidden"
            } w-full object-cover md:h-[400px] rounded-md`}
            src={coverImg}
            alt=""
          />
          <div className="avatar absolute -bottom-10 md:-bottom-20  md:left-10 left-5">
            <div className="w-36 rounded-full ring ring-pink-500 ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} />
            </div>
            <ProfilePicUpdateModal />
          </div>
        </div>
        <div className=" flex flex-col md:flex-row items-center justify-between px-5 md:ml-[200px] mt-14 md:mt-5  ">
          <div className="relative">
            <h2 className="text-4xl  font-bold top-10">{user?.displayName}</h2>
            <p className="text-gray-500 font-medium">{user?.email}</p>
          </div>
          <div className="flex items-center gap-5 mt-4 md:mt-0">
            <CreateProfileModal refetch={refetch} profiles={profiles} />
            {profiles.map((profile) => (
              <EditProfileModal
                key={profile?._id}
                refetch={refetch}
                profile={profile}
              />
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3 mt-10">
          <div className="md:h-screen md:sticky top-0">
          {profiles.length === 0 ? (
            <p className="text-xl text-center text-red-600 font-medium mt-10">
              Please Create a profile !
            </p>
          ) : (
            profiles?.map((profile) => (
              <div key={profile?._id} className="space-y-3 ml-5">
                <h1 className="text-xl font-semibold text-slate-950">Intro</h1>
                <p className="h-[100px] flex items-center justify-center border shadow rounded-md bg-gray-200 text-slate-900 font-medium overflow-y-scroll w-full">
                  {profile?.bio}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <MdOutlineEmail /> {user?.email}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <IoIosSchool /> Work At - {profile?.work}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <IoMdHome /> Home - {profile?.home}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <IoIosSchool />
                  Institute - {profile?.institute}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <GiSelfLove /> Relation - {profile?.relation}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <GiSelfLove /> Date Of Birth - {profile?.date_of_birth}
                </p>
                <Link
                  target="_blank"
                  to={`${profile?.social || ""}`}
                  className="text-gray-600 font-medium flex items-center gap-1 link link-hover">
                  <FaLink /> {profile?.social || "?"}
                </Link>
              </div>
            ))
          )}
          </div>
          {/* content */}
          <div className="col-span-2">
            <ProfilePostTabs />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
