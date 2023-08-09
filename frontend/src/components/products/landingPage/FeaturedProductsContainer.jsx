import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../../../styles/components/featuredProducts.css";

export function FeaturedProductsContainer() {
  return (
    <>
      <div className='featured__container'>
        <div className='featured__banner__container'>
          <header className='featured__banner__caption'>
            <h1>TV Fire Stick</h1>
            <h1 className='featured__banner__price'>$19.99</h1>
          </header>
          <img src='/images/tv-stick.png' alt='' />
        </div>
        <div className='featured__products__container'>
          <div className='featured__product__container'>
            <div className='featured__product__image'>
              <h1 className='featured__product__heading'>Drinkware</h1>
              <img
                src='https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/MISC/STANLEY/CategoryCard_1x_d_Stanley._SY304_CB588619800_.jpg'
                alt=''
              />
            </div>
            <Link className='featured__product__caption' to=''>
              Shop Stanley Drinkware
            </Link>
          </div>
          <div className='featured__product__container'>
            <div className='featured__product__image'>
              <h1 className='featured__product__heading'>Drinkware</h1>
              <img
                src='https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/MISC/STANLEY/CategoryCard_1x_d_Stanley._SY304_CB588619800_.jpg'
                alt=''
              />
            </div>
            <Link className='featured__product__caption' to=''>
              Shop Stanley Drinkware
            </Link>
          </div>
          <div className='featured__product__container'>
            <div className='featured__product__image'>
              <h1 className='featured__product__heading'>Drinkware</h1>
              <img
                src='https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/MISC/STANLEY/CategoryCard_1x_d_Stanley._SY304_CB588619800_.jpg'
                alt=''
              />
            </div>
            <Link className='featured__product__caption' to=''>
              Shop Stanley Drinkware
            </Link>
          </div>
          <div className='featured__product__container'>
            <div className='featured__product__image'>
              <h1 className='featured__product__heading'>Drinkware</h1>
              <img
                src='https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/MISC/STANLEY/CategoryCard_1x_d_Stanley._SY304_CB588619800_.jpg'
                alt=''
              />
            </div>
            <Link className='featured__product__caption' to=''>
              Shop Stanley Drinkware
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
