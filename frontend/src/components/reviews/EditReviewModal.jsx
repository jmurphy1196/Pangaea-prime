import { Modal } from "../modal/Modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import "../../styles/components/editReview.css";
import {
  thunkCreateReview,
  thunkEditProductReview,
} from "../../store/singleProduct";

export function EditReviewModal({ isOpen, onClose, review, productId }) {
  const dispatch = useDispatch();
  const [currentRating, setCurrentRating] = useState(
    review ? review.rating : 1
  );
  const [rating, setRating] = useState(review ? review.rating : 1);
  const [reviewContent, setReviewContent] = useState(
    review ? review.review : ""
  );

  const handleSubmit = async () => {
    // create review
    if (!review) {
      const res = await dispatch(
        thunkCreateReview(productId, {
          rating,
          review: reviewContent,
        })
      );
      console.log("THIS IS THE RES IN THE COMPONENT", res);
      onClose();
    } else {
      // edit review
      const res = await dispatch(
        thunkEditProductReview(review.id, { rating, review: reviewContent })
      );
      console.log("THIS IS THE RES IN THE COMPONENT ", res);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='edit-review__modal'>
        <header className='edit-review__header'>
          <h2>{review ? "Edit Review" : "Create Review"}</h2>
        </header>
        <div className='edit-review__stars'>
          {[1, 2, 3, 4, 5].map((val) => {
            return (
              <FontAwesomeIcon
                icon={currentRating >= val ? faStar : faStarEmpty}
                key={val}
                onMouseEnter={() => setCurrentRating(val)}
                onMouseLeave={() => setCurrentRating(rating)}
                onClick={() => setRating(val)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </div>
        <div className='edit-review__text'>
          <textarea
            name='review'
            id=''
            cols='30'
            rows='7'
            placeholder='review...'
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          ></textarea>
        </div>
        <div className='edit-review__actions'>
          <button onClick={handleSubmit}>{review ? "Edit" : "Create"}</button>
        </div>
      </div>
    </Modal>
  );
}
