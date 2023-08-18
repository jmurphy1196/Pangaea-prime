import { FeaturedProductsContainer } from "../products/landingPage/FeaturedProductsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../styles/pages/landingPage.css";
import { thunkGetProducts } from "../../store/products";

export function LandingPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkGetProducts());
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
