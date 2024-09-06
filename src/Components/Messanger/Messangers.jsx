/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useGetSIngleUser from "../../hooks/useGetSIngleUser";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useChats from "../../hooks/useChats";
import Conversation from "./Conversation";
import Message from "./Message";
import useGetAllUser from "../../hooks/useGetAllUser";
import useAxiosMessanger from "../../hooks/useAxiosMessenger";
import "./messanger.css";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Navber from "../../shared/Navber/Navber";
import { IoIosSend } from "react-icons/io";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import notificationurl from "../../assets/notification.wav"
let socket;
const Messangers = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const axiosMessanger = useAxiosMessanger();
  const axiosSecure = useAxiosSecure();
  const [chats, chatsRefetch] = useChats();
  const [sinleUser] = useGetSIngleUser();
  const [anotherUser, setAnotherUser] = useState(null);
  const [users] = useGetAllUser();
  const messageContainerRef = useRef(null);
  const notificationSoundRef = useRef(new Audio(notificationurl));
  const url = import.meta.env.VITE_socket_url;
  // connect socket server
  useEffect(() => {
    socket = io(url);
    socket?.emit("setup", sinleUser);
    socket?.on("connect", () => {
      if (sinleUser) {
        socket?.emit("addUsers", sinleUser._id);
      }
    });
    socket?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    socket?.on("connect_error", (error) => {
      console.error("Socket server connection error-->", error);
      // toast.error("Failed to connect to real-time server. Please try again later.");
    });

    return () => {
      // Clean up socket connection
      socket?.disconnect();
    };
  }, [sinleUser, url]);
  // get message from socket
  useEffect(() => {
    socket?.on("getMessage", async (data) => {
      const senderUser = users.filter((user) => user?._id === data?.senderId);
      if (currentChat) {
        setMessages([...messages, data]);
        notificationSoundRef.current.play();
        toast.success(`${senderUser[0].name} Send a message`, {
          position: "bottom-left",
          duration: 3000,
        });
      }
    });
  }, [messages, currentChat, axiosSecure, users]);

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  // send message
  const handleSend = async () => {
    const message = {
      senderId: sinleUser?._id,
      text: newMessage,
      chatId: currentChat?._id,
    };
    if (newMessage && currentChat) {
      // send message socket
      const receiverId = currentChat?.members.find(
        (id) => id !== sinleUser?._id
      );
      socket?.emit("sendMessage", {
        senderId: sinleUser?._id,
        receiverId,
        text: newMessage,
      });

      try {
        //send message database
        const { data } = await axiosMessanger.post("/message", message);
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message. Please try again later.");
      }
    } else {
      toast.error("Please type any message!");
    }
  };
  // Event listener for Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      handleSend(); // Send the message
    }
  };
  // get message in database
  const {isLoading: messageLoading } = useQuery({
    queryKey: ["messageData", currentChat?._id],
    queryFn: async () => {
      if (currentChat) {
        const response = await axiosMessanger.get(
          `/message/${currentChat?._id}`
        );
        setMessages(response.data);
        return response.data;
      }
      return [];
    },
  });


  // find another user
  useEffect(() => {
    const receiverId = currentChat?.members.find((id) => id !== sinleUser?._id);
    const anotherUser = users.find((user) => user?._id === receiverId);
    setAnotherUser(anotherUser);
  }, [currentChat?.members, sinleUser?._id, users]);

  // Online status check
  const isOnline = (chat) => {
    const chatMember = chat.members.find((member) => member !== sinleUser._id);
    return onlineUsers.some((user) => user.userId === chatMember);
  };
  // delete conversation
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete this conversation?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosMessanger.delete(
            `/chat/${currentChat?._id}`
          );
          if (response?.data) {
            Swal.fire({
              title: "",
              text: `Conversation deleted successfully!`,
              icon: "success",
            });
            chatsRefetch();
            setCurrentChat(null);
          }
        } catch (error) {
          console.error("Failed to delete conversation:", error.message);
          Swal.fire({
            title: "Error",
            text: "Failed to delete conversation. Please try again later.",
            icon: "error",
          });
        }
      }
    });
  };

  //auto scroll in bottom
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <section>
      <div className="md:hidden block fixed z-50">
        <Navber />
      </div>
      {/* conversation */}
      <div
        className={`h-20 md:h-24 ${
          chats?.length === 0
            ? ""
            : "flex overflow-y-hidden overflow-x-auto items-center"
        }  px-2 gap-3 bg-gray-200 rounded-md mt-14 md:mt-0 shadow-md`}>
        {chats?.length === 0 ? (
          <h2 className="text-primary font-medium mt-2 text-center">
            Please add a freind!
          </h2>
        ) : (
          <>
            {chats?.map((chat) => (
              <div key={chat?._id}>
                <Conversation
                  data={chat}
                  refetch={chatsRefetch}
                  setCurrentChat={setCurrentChat}
                  currentUser={sinleUser?._id}
                  online={isOnline(chat)}
                />
              </div>
            ))}
          </>
        )}
      </div>
      <hr />
      {/* chatbox */}
      {currentChat ? (
        <div className="relative md:mt-4 ">
          {/* messages */}
          <div
            style={{ scrollBehavior: "smooth" }}
            ref={messageContainerRef}
            className=" bg-gray-200 rounded-md h-[calc(100vh-200px)] md:h-[60vh] overflow-y-auto relative">
            {/* user name inf */}
            <div className="sticky top-0 w-full  flex justify-between items-center p-2 bg-primary">
              <div className="flex items-center gap-1">
                <div className="avatar">
                  <div className="w-8 rounded-full border-2 border-primary">
                    <img src={anotherUser?.photo} alt="none" />
                  </div>
                </div>
                <h3 className="text-white font-medium">{anotherUser?.name}</h3>
              </div>
              <div>
                <button onClick={handleDelete} className="text-xl text-white">
                  <MdDelete />
                </button>
              </div>
            </div>
            {messageLoading ? (
              <p className="text-center mt-20">
                <span className="loading loading-spinner text-primary"></span>
              </p>
            ) : (
              <div className="flex flex-col justify-end px-2">
                {messages?.length === 0 ? (
                  <p className="text-primary text-center mt-24 font-medium">
                    No Message !
                  </p>
                ) : (
                  <>
                    {messages?.map((message, i) => (
                      <Message
                        key={i}
                        message={message}
                        anotherUser={anotherUser}
                      />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
          <hr className="my-3" />
          {/* send box */}

          <div class="fixed md:relative bottom-1 w-full flex px-2">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={newMessage}
            />
            <button
              onClick={handleSend}
              id="send-button"
              class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">
              <IoIosSend className="text-2xl" />
            </button>
          </div>
        </div>
      ) : (
        <h2 className="text-center mt-40 text-primary font-medium text-xl">
          Select a chat to start messaging!
        </h2>
      )}
    </section>
  );
};

export default Messangers;
