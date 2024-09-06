import useNotification from "../../../hooks/useNotification";
import SectionHelmet from "../../../shared/SectionHelmet/SectionHelmet";
import Notification from "./Notification";
const Notifications = () => {
  const [nofitications, refetch, isLoading] = useNotification();
  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }
  return (
    <div className="mt-2 mx-2">
      <SectionHelmet title={"Free Time | Notification"} />
      <div className="space-y-2">
        {nofitications?.length === 0 ? (
          <p className="text-center mt-5 text-primary">No Notification!</p>
        ) : (
          <>
            {" "}
            {nofitications?.map((notification) => (
              <Notification
                notification={notification}
                key={notification?._id}
                refetch={refetch}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
