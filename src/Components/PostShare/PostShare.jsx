/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const PostShare = ({ url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button className="text-xl text-gray-500 mt-1" onClick={openModal}>
        <IoIosShareAlt />
      </button>
      {isModalOpen && (
        <dialog open={isModalOpen} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <div className="py-5">
              <div className="divider mb-10">
                Share this media file
              </div>
              <div className="flex items-center justify-center gap-5">
                <FacebookShareButton url={url}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={url}>
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <TelegramShareButton url={url}>
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
                <TwitterShareButton url={url}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PostShare;
