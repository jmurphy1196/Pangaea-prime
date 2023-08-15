import dayjs from "dayjs";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "../modal/Modal";
import { EditReviewModal } from "./EditReviewModal";

// eslint-disable-next-line
export function Review({ review }) {
  // eslint-disable-next-line
  const user = useSelector((state) => state.session.user);
  if (!review) return false;
  return (
    <>
      <div className='product__review-container'>
        <header className='product__review__header'>
          {/* eslint-disable-next-line */}
          <span className='product__review__header__user'>
            {review.user.username}
          </span>
          <div className='product__review__header__stars'>
            {[1, 2, 3, 4, 5].map((val) => {
              if (val <= review.rating)
                return <FontAwesomeIcon icon={faStar} />;
              else return <FontAwesomeIcon icon={faStarEmpty} />;
            })}
            <span className='product__review__header__stars-date'>
              - {dayjs(review.createdAt).format("MM/DD/YYYY")}
            </span>
          </div>
        </header>
        <section className='product__review__content'>
          <p>{review.review}</p>
        </section>
      </div>
    </>
  );
}
