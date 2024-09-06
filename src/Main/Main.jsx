import { Outlet } from "react-router-dom";
import Navber from "../shared/Navber/Navber";
import Sideber from "../pages/Home/Sideber/Sideber";
// import Messangers from "../Components/Messanger/Messangers";

const Main = () => {
  return (
    <div className=" bg-gray-200 w-full">
      {/* only mobile device navber */}
      <div className="block md:hidden fixed w-full z-50">
        <Navber />
      </div>
      <div className="md:flex gap-6  max-w-[1380px] mx-auto">
        <div className="md:w-1/4">
          {/* Left Sidebar */}
          <div className="hidden md:block sticky top-0 h-screen overflow-y-auto">
            {/* Content of left sidebar */}
            <Sideber />
          </div>
        </div>
        <div className="md:w-[44%] pt-14 md:pt-0">
          {/* Main Content */}
          <div className="bg-gray-200 min-h-screen">
            <Outlet />
          </div>
        </div>
        <div className="md:w-[30%] hidden md:block mr-3">
          {/* Right Sidebar chat content */}
          <div className="sticky top-2 h-[97vh] p-5 overflow-y-auto bg-white  rounded-md">
            {/* Content of right sidebar */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
