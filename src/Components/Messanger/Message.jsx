/* eslint-disable react/prop-types */
import useGetSIngleUser from "../../hooks/useGetSIngleUser";
import { format } from "timeago.js";
// eslint-disable-next-line react/prop-types, no-unused-vars
const Message = ({ message, anotherUser }) => {
  const [sinleUser] = useGetSIngleUser();
  const { senderId, text, createdAt } = message;
  return (
    <div className="mt-2">
      {senderId === sinleUser?._id ? (
        // current user message
        <div className="w-full">
          <div className="mb-2 text-right">
            <p className="bg-blue-500 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl py-2 px-5 inline-block">
              {text}
             
            </p><br />
            <span><small>{format(createdAt)}</small></span>
          </div>
        </div>
      ) : (
        // another user message
        <div className="w-full gap-2">
         
          <div className="mb-2">
            <p className="bg-gray-600 text-white rounded-tl-xl rounded-tr-xl rounded-br-xl py-2 px-4 inline-block">
              {text}
            </p><br />
            <span><small>{format(createdAt)}</small></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
