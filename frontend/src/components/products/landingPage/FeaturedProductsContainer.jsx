import { useSelector } from "react-redux";
import { FeaturedProductList } from "./FeaturedProductList";
import { Link } from "react-router-dom";
import "../../../styles/components/featuredProducts.css";

export function FeaturedProductsContainer() {
  const productStore = useSelector((state) => state.featuredProducts);
  const productIds = useSelector(
    (state) => state.featuredProducts.orderedFeaturedProductIds
  );
  if (!productIds.length) return false;
  const bannerProduct = productStore[productIds[0]];

  return (
    <>
      <div className='featured__container'>
        <div className='featured__banner__container'>
          <header className='featured__banner__caption'>
            <h1>{bannerProduct.product_name}</h1>
            <h1 className='featured__banner__price'>${bannerProduct.price}</h1>
          </header>
          <Link to={`/product/${bannerProduct.id}`}>
            <img src={productStore[productIds[0]].main_image} alt='' />
          </Link>
        </div>
        <FeaturedProductList />
      </div>
    </>
  );
}
