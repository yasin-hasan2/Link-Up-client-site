import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import useAuth from "../../hooks/useAuth";

const NameChnageModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { user, profileUpdate } = useAuth();
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onSubmit = async (data) => {
    const name = data?.firstName + " " + data?.lastName;
    try {
      setLoading(true);
      await profileUpdate(name, user?.photoURL);
      setLoading(false);
      closeModal();
    } catch (err) {
      console.log("post err-->", err);
    }
  };
  return (
    <div>
      <button
        className=" font-medium text-gray-400 link"
        onClick={openModal}>
        Name Change
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Post Modal"
        className={
          "max-w-2xl mx-auto mt-20 bg-white p-10 rounded-md shadow-2xl"
        }>
          <div className="flex justify-end">
          <button onClick={closeModal} className=" mt-5 btn btn-circle text-xl">
          <MdClose />
        </button>
          </div>
        <div className="divider">Change Your Name</div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="firstName"
              type="text"
              {...register("firstName")}
              required
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              FirstName
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="lastName"
              type="text"
              {...register("lastName")}
              required
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Last Name
            </label>
          </div>
          <button
            type="submit"
            className="text-xl flex items-center justify-center w-full gap-2 text-white bg-primary py-2 px-4 rounded-md hover:bg-[#0b122b] transform-all duration-300 mt-5">
            Update Now
            {loading && (
              <span className="loading loading-spinner text-white"></span>
            )}
          </button>
        </form>
        
      </Modal>
    </div>
  );
};

export default NameChnageModal;
