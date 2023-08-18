import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearProducts, thunkGetProducts } from "../../store/products";
import { useLocation } from "react-router-dom";
import { ProductList } from "../products/landingPage/ProductList";
import "../../styles/pages/productsPage.css";

export function ProductsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productIds = useSelector((state) => state.products.orderedProductIds);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    dispatch(clearProducts());
    (async () => {
      const filter = {};
      for (let [key, value] of queryParams.entries()) {
        filter[key] = value;
      }
      const res = await dispatch(thunkGetProducts(filter));
      console.log("THIS IS THE RES", res);
    })();
  }, [dispatch, location.search]);
  if (!productIds.length) return <p>No search results found...</p>;
  return (
    <>
      <div className='products__page'>
        <ProductList productIds={productIds} />
      </div>
    </>
  );
}
