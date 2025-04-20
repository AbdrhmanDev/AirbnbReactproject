import React from 'react';
import './Details.css';

const Thingstoknow = ({ hostId, rating, reviews ,houseRules}) => {
  if (!hostId) return null;

  const { lastName, firstName, profileImage, role, createdAt } = hostId;
  const createDate = new Date(createdAt);
  const diffInMonths = Math.floor((new Date() - createDate) / (1000 * 60 * 60 * 24 * 30));
  console.log(reviews.length);
  
  return (
    <>
      <div className="row mt-4">
        <div className="comment row w-75 m-auto">
          {(!reviews || reviews.length === 0) ? (
            <p>No reviews yet</p>
          ) : (
            reviews.map((item, index) => {
              const user = item.reviewId.userId;
              const reviewDate = new Date(user.createdAt).toLocaleDateString('en-EG', {
                day: 'numeric',
                month: 'long'
              });

              return (
                <div className="col-md-6" key={index}>
                  <div className="card review-card">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <img src={user.profileImage} alt="avatar" className="review-avatar" />
                        <div>
                          <div className="review-header">{user.firstName}</div>
                          <span className="review-subtitle">{reviewDate}</span>
                        </div>
                      </div>
                      <span className="rating">
                        {item.reviewId.rating === 5 ? '★★★★★' : '★★★★'}
                      </span>
                      <span className="ms-2 review-subtitle mb-2">{item.reviewId.comment}</span>
                      <p className="review-text">Great stay, I recommend it</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

       {
        reviews.length > 4 ? <div className=" row coustem-button">
        <button className="btn col-2 btn-outline-dark">Show all {reviews.length > 4 } reviews</button>
        <a href="#" className="d-block mt-2 text-secondary col">Learn how reviews work</a>
      </div>:""
       }
      </div>

      <div className="mt-5 border-top pt-4 row w-75 m-auto">
        <h4>Meet your host</h4>
        <div className="col-md-4 col-8 flex-column">
          <div className="custom_card p-4 shadow-lg row" role="button">
            <div className="col-6 text-center align-content-center">
              <img src={profileImage} className="userImg2 rounded-circle" alt="" />
              <h6 className='mt-2'>{firstName} {lastName}</h6>
              <p>{role}</p>
            </div>

            <div className="col-6">
              {(!reviews || reviews.length === 0) ? (
                <p className='ms-4'>No reviews</p>
              ) : (
                <>
                    <div >
                      <h3 className="ms-4">{reviews.length}</h3>
                      <p className="border-bottom py-0 pb-2 ms-4">Reviews</p>
                    </div>
                </>
              )}
              <h3 className="ms-4">{rating} <i className="fa-solid fa-star fs-6"></i></h3>
              <p className="border-bottom pb-2 py-0 ms-4">Rating</p>
              <h6 className="ms-4">{diffInMonths}</h6>
              <p className="ms-4 py-0" style={{ fontSize: "14px" }}>Months hosting</p>
            </div>
          </div>

          {/* باقي معلومات الهوست مع الأيقونات */}
          <div className="mt-5">
            {
              houseRules.map((ind,index)=>{
                return(
                  <p key={index}><i className="bi bi-geo-alt-fill"></i> <span>{ind}</span></p>
                )
              })
            }
    
            <p>Hello, I appreciate exchanges and discoveries</p>
            <button type="button" className="btn-dark border-0 bg-body ms-2 p-0 text-decoration-underline">Show more</button>
          </div>
        </div>

        <div className="col-md-8 col-12 ps-5">
          <h5>Host details</h5>
          <p>Response rate: 100%</p>
          <p>Responds within an hour</p>
          <button className="btn btn-dark mt-1">Message host</button>
          <p className="border-bottom pb-4 mt-2">You can message the host in Chinese, and Airbnb provides a translation function</p>
        </div>
      </div>
    </>
  );
};

export default Thingstoknow;
