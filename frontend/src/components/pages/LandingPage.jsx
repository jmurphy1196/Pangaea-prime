import { FeaturedProductsContainer } from "../products/landingPage/FeaturedProductsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../styles/pages/landingPage.css";
import { thunkGetProducts } from "../../store/products";
import { thunkGetFeaturedProducts } from "../../store/featuredProducts";

export function LandingPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkGetProducts());
      const res2 = await dispatch(thunkGetFeaturedProducts());
    })();
  }, [dispatch]);
  return (
    <>
      <div className='landing__page'>
        <FeaturedProductsContainer />
      </div>
    </>
  );
}
