import React from 'react';
import './Details.css';
import { useNavigate } from 'react-router-dom';


const Thingstoknow = ({ hostId, rating, reviews, houseRules }) => {

  const { lastName, firstName, profileImage, role, createdAt } = hostId;
  const createDate = new Date(createdAt);
  const diffInMonths = Math.floor((new Date() - createDate) / (1000 * 60 * 60 * 24 * 30));
  const navigate = useNavigate()

  if (!hostId) return null;

  console.log(reviews);


  const handelSendId = (id) => {
    console.log(id);
    navigate(`/messages/${id}`)
  }
  return (
    <>
      <div className="row">
        <div className="comment w-75 m-auto">
          {(!reviews || reviews.length === 0) ? (
            <p>No reviews yet...</p>
          ) : (
            reviews.map((item, index) => {
              const user = item.reviewId.userId;
              const reviewDate = new Date(item.reviewId.createdAt).toLocaleDateString('en-EG', {
                day: 'numeric',
                month: 'long',
              });

              return (
                <div className="col-md-6 " key={index}>
                  <div className="card review-card">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <img src={user.avatar} alt="avatar" className="review-avatar me-2" />
                        <div>
                          <div className="review-header">{user.name}</div>
                          <span className="review-subtitle">{reviewDate}</span>
                        </div>
                      </div>
                      <p className="rating">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>
                            {index < item.reviewId.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </p>
                      <span className="ms-2 review-subtitle mb-2">{item.reviewId.comment}</span>
                      <p className="review-text">Great stay, I recommend it</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {reviews.length > 4 && (
          <div className="row coustem-button text-center">
            <button className="btn col-10 col-md-2 btn-outline-dark m-auto">
              Show all {reviews.length} reviews
            </button>
            <Link href="#" className="d-block mt-2 text-secondary">Learn how reviews work</Link>
          </div>
        )}
      </div>

      <div className="mt-2 border-top pt-3 row w-75 m-5 m-auto px-2">
        <h4>Meet your host</h4>
        <div className="col-md-4 col-12 mb-4">
          <div className="custom_card p-4 shadow-lg row d-flex flex-column flex-md-row text-center" role="button">
            <div className="col-md-8 mb-4 mb-md-0 ">
              <img src={profileImage} className="userImg2 rounded-circle" alt="" />
              <h6 className='mt-2'>{firstName} {lastName}</h6>
              <p>{role}</p>
            </div>

            <div className="col-md-1">
              {(!reviews || reviews.length === 0) ? (
                <p>No reviews</p>
              ) : (
                <>
                  <h3>{reviews.length}</h3>
                  <p className="border-bottom py-0 pb-2">Reviews</p>
                </>
              )}
              <h3>{rating} <i className="fa-solid fa-star fs-6"></i></h3>
              <p className="border-bottom pb-2 py-0">Rating</p>
              <h6>{diffInMonths}</h6>
              <p className="py-0" style={{ fontSize: "14px" }}>Months hosting</p>
            </div>
          </div>


          <div className="mt-4">
            {houseRules.map((rule, index) => (
              <p key={index}><i className="bi bi-geo-alt-fill"></i> <span>{rule}</span></p>
            ))}
            <p>Hello, I appreciate exchanges and discoveries</p>
            <button type="button" className="btn-dark border-0 bg-body p-0 text-decoration-underline">Show more</button>
          </div>
        </div>

        <div className="col-md-8 col-12 ps-md-5 ">
          <h5>Host details</h5>
          <p>Response rate: 100%</p>
          <p>Responds within an hour</p>
          <button className="btn btn-dark mt-1"
            onClick={() => handelSendId(hostId._id)}
          >Message host</button>
          <p className="border-bottom pb-4 mt-2">
            You can message the host in Chinese, and Airbnb provides a translation function
          </p>
        </div>
      </div>
    </>
  );
};

export default Thingstoknow;
