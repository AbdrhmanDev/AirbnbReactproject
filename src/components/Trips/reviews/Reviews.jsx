import React, { useState } from 'react'
import { Modal, Button, ToastContainer } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AddReviewsThunk } from '../../../services/Slice/reviews/Addreviews';
import { toast } from 'react-toastify';

const Reviews = ({ show, onClose, idHotel, idBooking }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = async () => {
    if(rating =='' || comment ==''){
      toast.info('Please enter your review.')

    }
    else{
    try {
      const res = await dispatch(AddReviewsThunk({
        bookingId: idBooking,
        HotelId: idHotel,
        rating: rating,
        comment: comment
      }));
      console.log(res);
      console.log("Rating:", rating);
      console.log("Comment:", comment);
      onClose();
    } catch (err) {
      console.error("Error submitting review:", err);
    }}
  };
  return (
    <>
      <div>
        <Modal show={show} onHide={onClose} centered>
          <Modal.Body className="text-center">
            <h5 className="mb-4">Reviews The Hotel</h5>


            <div className="mb-3">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={starValue}
                    size={30}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                    color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    style={{ cursor: "pointer", transition: "color 200ms" }}
                  />
                );
              })}
            </div>

            <textarea
              className="form-control mb-3"
              placeholder="متن دیدگاه"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ height: '100px', resize: 'none' }}
            />

            <Button onClick={handleSubmit} variant="dark" className="w-100 rounded-pill">
              send
            </Button>
          </Modal.Body>
        </Modal>
        <ToastContainer/>
      </div>
    </>
  )
}

export default Reviews