import './Category.css'
import { useDispatch, useSelector } from 'react-redux';
import { RiListSettingsLine } from "react-icons/ri";
import { BiToggleLeft } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FetchCategoryHotelsAsync } from '../../services/Slice/Hotel';
import { useState } from 'react';

const Category = () => {
    const [activeCategoryId, setActiveCategoryId] = useState(null); // حالة لتخزين الفئة النشطة
    const category = useSelector((state) => state.Category.items);

    const dispatch = useDispatch();

    const getCatogeryHotel = (id) => {
        console.log(id);
        setActiveCategoryId(id);  // عند الضغط على فئة معينة، يتم تحديث الفئة النشطة
        dispatch(FetchCategoryHotelsAsync(id));
    }

    return (
        <>
            <div className="all d-flex">
                <div className="part-parent">

                    <div className="category-part ms-5 hide-scrollbar container overflow-auto d-flex gap-2 flex-nowrap justify-content-center">
                        {
                            category?.map((item, index) => (
                                <div
                                    className={`category-box text-center `} // إضافة الكلاس النشط
                                    role='button'
                                    onClick={() => {
                                        getCatogeryHotel(item._id)
                                    }}
                                    key={index}
                                >
                                    <img className="icon" width={"20px"} src={item.icon} alt={item.name} />
                                    <p className={` label  `}>{item.name}</p>
                                    {activeCategoryId === item._id && <div className="active-underline "></div>}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <MdKeyboardArrowRight className='toggle-icons-cat' />
                <div className="btn-parent me-2">
                    <button className='btn m-0 btn-outline-light'>
                        <RiListSettingsLine size={"22px"} style={{ paddingRight: "4px" }} />
                        Filter
                    </button>
                    <button className='btn m-0 btn-outline-light ms-1'>
                        Display total before taxes
                        <BiToggleLeft size={"28px"} style={{ paddingLeft: "4px" }} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Category;
