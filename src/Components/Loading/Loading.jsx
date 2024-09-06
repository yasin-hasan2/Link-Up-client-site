import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-gradient h-[100vh]">
      <div className="flex flex-col h-[80vh] md:h-[90vh] justify-center items-center">
        <div className=" p-3 rounded-xl logo">
          <h1 className="text-2xl font-bold">Link Up</h1>
        </div>
      </div>
      <p className="text-center italic">© Copyright by Yasin</p>
    </div>
  );
};

export default Loading;
