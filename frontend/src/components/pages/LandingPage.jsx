import { FeaturedProductsContainer } from "../products/landingPage/FeaturedProductsContainer";
import "../../styles/pages/landingPage.css";

export function LandingPage() {
  return (
    <>
      <div className='landing__page'>
        <FeaturedProductsContainer />
      </div>
    </>
  );
}
