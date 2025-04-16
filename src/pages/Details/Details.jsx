import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetHotelByIdThunk } from '../../services/Slice/HotelById';
import { useParams } from 'react-router-dom';

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const HotelById = useSelector((state) => state.HotelByID.getById);
  const isLoading = useSelector((state) => state.HotelByID.isLoading);
  const isError = useSelector((state) => state.HotelByID.isError);
  const errorMessage = useSelector((state) => state.HotelByID.errorMessage);

  useEffect(() => {
    if (id) {
      dispatch(GetHotelByIdThunk(id));
    }
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {isLoading ? (
        <p className="text-xl font-semibold text-blue-500">جاري تحميل التفاصيل...</p>
      ) : isError ? (
        <p className="text-xl font-semibold text-red-500">حدث خطأ: {errorMessage}</p>
      ) : HotelById ? (
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          <img
            className="w-full h-64 object-cover"
            src={HotelById?.images?.[0] || "https://via.placeholder.com/400x300"}
            alt={HotelById.title}
          />
          <div className="p-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{HotelById.title}</h2>
            <p className="text-gray-600 mb-4">{HotelById.description}</p>
            <div className="text-sm text-gray-500">
              <p><strong>العنوان:</strong> {HotelById.address?.country}, {HotelById.address?.city}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">لا توجد بيانات.</p>
      )}
    </div>
  );
  
};

export default Details;
