import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/components/productReviews.css";
import { thunkGetReviewData } from "../../store/singleProduct";
import { Review } from "./Review";
import { EditReviewModal } from "./EditReviewModal";
import { useParams } from "react-router-dom";

// eslint-disable-next-line
export function ProductReviews({ productId }) {
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.singleProduct.reviews);
  const userReview = useSelector((state) => state.singleProduct.userReview);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(thunkGetReviewData(productId));
      setLoading(false);
    })();
  }, [productId, dispatch]);
  if (!reviews) return false;

  return (
    <>
      {userReview ? (
        <>
          <EditReviewModal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            review={userReview}
            productId={productId}
          />
          <button className='edit-review' onClick={() => setModalIsOpen(true)}>
            Edit
          </button>
        </>
      ) : (
        <>
          <EditReviewModal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            productId={productId}
          />
          <button className='edit-review' onClick={() => setModalIsOpen(true)}>
            Create Review
          </button>
        </>
      )}
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </>
  );
}
