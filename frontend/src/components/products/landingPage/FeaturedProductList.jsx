import { useSelector } from "react-redux";
import { FeaturedProductCard } from "./FeaturedProductCard";

export function FeaturedProductList() {
  const productIds = useSelector((state) => state.products.orderedProductIds);
  if (!productIds) return false;
  return (
    <div className='featured__products__container'>
      {productIds.slice(1, 5).map((pId) => {
        return <FeaturedProductCard productId={pId} key={pId} />;
      })}
    </div>
  );
}
