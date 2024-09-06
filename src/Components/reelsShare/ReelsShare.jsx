/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactDOM from "react-dom";
import { IoIosShareAlt, IoMdDownload } from "react-icons/io";
import { MdClose } from "react-icons/md";
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

const ReelsShare = ({ url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="z-50">
      <button className="text-xl pt-2 text-white" onClick={openModal}>
        <IoIosShareAlt />
      </button>
      {isModalOpen && ReactDOM.createPortal(
        <dialog className="modal" open={isModalOpen}>
          <div className="modal-box">
            <form method="dialog">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="btn text-xl btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <MdClose />
              </button>
            </form>

            <div className="py-5">
              <div className="divider mb-10">
                Share or Download this Reel
              </div>
              <div className="flex items-center justify-center gap-5">
                {url && (
                  <>
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
                    <a download={url} href={url} target="_blank" className="text-xl btn btn-circle" rel="noreferrer">
                      <IoMdDownload />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </dialog>,
        document.body
      )}
    </div>
  );
};

export default ReelsShare;
