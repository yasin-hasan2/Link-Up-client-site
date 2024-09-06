
import Reel from "../../shared/Reel/Reel";
import SectionHelmet from "../../shared/SectionHelmet/SectionHelmet";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useReels from "../../hooks/useReels";
const Reels = () => {
  const [reels, reelsRefetch] = useReels()
  const navigate = useNavigate();
  
  // console.log(reels);
  return (
    <div>
      {/* <Navber/> */}
      <SectionHelmet title={"Free Time | Reels"} />
      <div className=" md:w-[25%] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="fixed right-3 top-2 z-50 text-2xl text-white md:text-black">
          <MdArrowBack />
        </button>
        {reels?.length === 0 ? (
          <p className="text-red-500 text-center font-semibold mt-10">
            No Reels Available !
          </p>
        ) : (
            <Swiper
            // direction={'vertical'}
            slidesPerView={1}
            spaceBetween={10}
            mousewheel={true}
            navigation={true} modules={[Navigation]} className="mySwiper"
          >
            {reels.map((reel) => (
              <SwiperSlide key={reel._id}>
                <Reel reel={reel} refetch={reelsRefetch} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Reels;
