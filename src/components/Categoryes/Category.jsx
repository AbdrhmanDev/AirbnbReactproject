import './Category.css'
import { useDispatch, useSelector } from 'react-redux';
import { AiFillBell } from "react-icons/ai";
import { MdOutlineReviews } from "react-icons/md";
import { AiFillBulb } from "react-icons/ai";
import { RiListSettingsLine } from "react-icons/ri";
import { BiToggleLeft } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
const Category = () => {

    const category= useSelector((state) => state.Category.items);
    console.log(category);

  
    useDispatch();
    return (
        <>
            <div className="all d-flex">
                <div className="part-parent">

                    <div className="category-part ms-5 hide-scrollbar container overflow-auto mt-4 d-flex gap-2 flex-nowrap justify-content-center">
                        {
                            category?.map((item,index) => (
                               <Link  className="text-decoration-none" key={index}>
                                <div className="category-box text-center" key={index} >
                                    {/* <div className="icon">{item.icon}</div> */}
                                    <img className="icon" width={"20px"} src={item.icon} alt={item.name} />
                                    <p className="label">{item.name}</p>
                                </div>
                               </Link>
                            ))
                        }
                    </div>
                </div>
                        <MdKeyboardArrowRight className='toggle-icons-cat' />
                <div className="btn-parent me-2">
                    <button className='btn m-0 btn-outline-light '>
                        <RiListSettingsLine size={"22px"} style={{ paddingRight: "4px" }} />
                        Filter</button>
                    <button className='btn m-0 btn-outline-light ms-1 '>Display total before taxes
                        <BiToggleLeft size={"28px"} style={{ paddingLeft: "4px" }} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Category