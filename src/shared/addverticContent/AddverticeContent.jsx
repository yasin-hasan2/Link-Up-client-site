import img1 from '../../assets/images/add-1.jpeg'
import img2 from '../../assets/images/add-2.jpeg'

const AddverticeContent = () => {
    return (
        <div className='flex flex-col gap-5'>
            <img src={img1} className='w-full object-cover rounded-md' alt="" />
            <img src={img2} className='w-full object-cover rounded-md' alt="" />
        </div>
    );
};

export default AddverticeContent;