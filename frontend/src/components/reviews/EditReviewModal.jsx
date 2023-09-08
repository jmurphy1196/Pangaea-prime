import { Modal } from "../modal/Modal";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/editReview.css";
import {
  thunkCreateReview,
  thunkDeleteProductReview,
  thunkEditProductReview,
} from "../../store/singleProduct";

export function EditReviewModal({ isOpen, onClose, productId }) {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.singleProduct.userReview);
  const [loading, setLoading] = useState(false);
  const [currentRating, setCurrentRating] = useState(
    review ? review.rating : 1
  );
  const [rating, setRating] = useState(review ? review.rating : 1);
  const [reviewContent, setReviewContent] = useState(
    review ? review.review : ""
  );

  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);

  const handleDelete = async () => {
    const res = await dispatch(thunkDeleteProductReview(review.id));
    onClose();
  };

  const handleSubmit = async () => {
    // create review
    setFormTouched(true);
    if (!Object.values(formErrors).length) {
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
    }
  };

  useEffect(() => {
    if (review) {
      setCurrentRating(review.rating);
      setRating(review.rating);
      setReviewContent(review.review);
    } else {
      setCurrentRating(1);
      setRating(1);
      setReviewContent("");
    }
  }, [review]);

  useEffect(() => {
    const errors = {};
    if (reviewContent.length < 10 || reviewContent.length > 200)
      errors.reviewContent = "Review must be between 10 and 200 characters";
    setFormErrors(errors);
  }, [reviewContent]);

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
        {formTouched && (
          <ul className='review__errors'>
            {Object.values(formErrors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <div className='edit-review__text'>
          <textarea
            name='review'
            id=''
            cols='30'
            rows='7'
            className={formErrors.reviewContent && formTouched && "errors"}
            placeholder='review...'
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          ></textarea>
        </div>
        <div className='edit-review__actions'>
          <button onClick={handleSubmit}>{review ? "Edit" : "Create"}</button>
          {review && (
            <button
              className='delete-btn'
              onClick={handleDelete}
              disabled={
                Object.values(formErrors).length > 0 && formTouched === true
              }
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
