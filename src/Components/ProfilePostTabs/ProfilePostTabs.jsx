/* eslint-disable react/no-unknown-property */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Posts from "./Posts";
import ProfileReel from "./ProfileReels.";

const ProfilePostTabs = () => {
  const [currentTab, setCurrentTab] = useState("Your Feeds");
  const tabsList = ["Your Feeds", "Your Reels"];
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const { data: profilePosts = [], refetch } = useQuery({
    queryKey: ["profilePost"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/feeds?email=${user?.email}`);
      return res.data;
    },
  });
  const { data: profileReels = [], refetch:reelsReferch } = useQuery({
    queryKey: ["reels"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reels?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <Tabs>
      <TabList className="flex flex-wrap justify-center items-center gap-5 cursor-pointer text-xl font-medium ">
        {tabsList.map((tab) => (
          <Tab
            onClick={() => setCurrentTab(tab)}
            className={`bg-gray-300 rounded-md py-2 px-4 outline-none ${
              currentTab === tab ? "text-[#40aff4]" : undefined
            }`}
            key={tab}>
            {tab}
          </Tab>
        ))}
      </TabList>
      {/* post container */}
      <TabPanel className={"md:mx-20 mt-5 space-y-2"}>
      {
        profilePosts?.length === 0 ? <p className="text-red-600 text text-center mt-5">No Post Added !</p> : <>
        {profilePosts.map((post) => (
          <Posts key={post?._id} post={post} refetch={refetch} />
        ))}
        </>
      }
      </TabPanel>
      {/* reels container */}
      <TabPanel>
      <div className="md:mx-[150px] flex flex-col  gap-3">
      {
        profileReels?.length === 0 ? <p className="text-red-600 text text-center mt-5">No Reel Added !</p> : <>
        {profileReels.map((reels) => (
          <ProfileReel key={reels?._id} reel={reels} refetch={reelsReferch} />
        ))}
        </>
      }
      </div>
      </TabPanel>
    </Tabs>
  );
};

export default ProfilePostTabs;
