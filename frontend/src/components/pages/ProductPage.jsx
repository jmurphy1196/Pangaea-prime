import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/productPage.css";
import {
  clearSingleProduct,
  thunkSetSingleProduct,
} from "../../store/singleProduct";
import { ProductImages } from "../products/ProductPage/ProductImages";
import { ProductDetails } from "../products/ProductPage/ProductDetails";
import { ProductReviews } from "../reviews/ProductReviews";

export function ProductPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.singleProduct);

  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkSetSingleProduct(productId));
      console.log("this is the res", res);
    })();
    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, productId]);
  if (!product) return false;
  return (
    <>
      <div className='product__page'>
        <div className='product__page__image-container'>
          <ProductImages product={product} />
        </div>
        <div className='product__page__details-container'>
          <ProductDetails />
        </div>
        <div className='product__page__reviews-container'>
          <ProductReviews productId={productId} />
        </div>
      </div>
    </>
  );
}
