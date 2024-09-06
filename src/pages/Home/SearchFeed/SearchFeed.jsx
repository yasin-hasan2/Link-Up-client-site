import { useLocation } from "react-router-dom";
import Feed from "../../../shared/Feed/Feed";

const SearchFeed = () => {
  const location = useLocation();
  const searchData = location.state?.searchData || {};
  return (
    <section>
      <div className="p-5 rounded-md shadow-md mt-2 bg-white text-[18px] font-semibold">
        {searchData?.length === 0 ? (
          <p className="text-red-600 text-center">Unavilable search value!</p>
        ) : (
          <p className="">
            Your total search value:
            <span className="text-primary">{searchData?.length}</span>
          </p>
        )}
      </div>
      <div className="mt-2 space-y-3">
        {searchData?.map((data, i) => (
          <Feed feed={data} key={i} />
        ))}
      </div>
    </section>
  );
};

export default SearchFeed;
