import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../../styles/components/productImages.css";

//eslint-disable-next-line
export function ProductImages({}) {
  const product = useSelector((state) => state.singleProduct);
  const [mainImage, setMainImage] = useState(product.main_image || null);
  console.log("This is the main image", mainImage);
  console.log("THIS IS THE PRODUCT", product);
  useEffect(() => {
    if (product) {
      setMainImage(product.main_image);
    }
  }, [product]);
  function isValidJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  if (!product) return false;
  let all_images = [];
  //   eslint-disable-next-line
  if (product.additional_images) {
    //   eslint-disable-next-line
    if (isValidJSON(product.additional_images)) {
      all_images = [
        product.main_image,
        ...JSON.parse(product.additional_images).urls,
      ];
    } else {
      all_images = [product.main_image, ...product.additional_images.urls];
    }
  }
  return (
    <>
      <div className='product__images'>
        <div className='product__images-side'>
          {all_images.map((url, i) => (
            <div
              key={i}
              className={`product__preview__image ${
                mainImage === url ? "selected" : ""
              }`}
              onClick={() => setMainImage(url)}
            >
              <img src={url} alt='' />
            </div>
          ))}
        </div>
        <div className='product__main__image'>
          {/* eslint-disable */}
          <img src={mainImage} alt='' />
        </div>
      </div>
    </>
  );
}
