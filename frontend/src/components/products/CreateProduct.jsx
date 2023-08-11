import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faX } from "@fortawesome/free-solid-svg-icons";

import "../../styles/components/createProduct.css";

export function CreateProduct() {
  const mainImageUploadInput = useRef();
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [categories, setCategories] = useState("");
  const [stockQuantity, setStockQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  return (
    <>
      <form className='product__create__form'>
        <h1>Start selling with Pangaea!</h1>
        <div className='product__create__form__group'>
          <input
            type='text'
            placeholder=' '
            onChange={(e) => setProductName(e.target.value)}
          />
          <label className={`${productName !== "" && "filled"}`}>
            Product name
          </label>
          <div className='product__create__form__group'>
            <input
              type='text'
              placeholder=' '
              onChange={(e) => setBrandName(e.target.value)}
            />
            <label className={`${brandName !== "" && "filled"}`}>
              Brand name
            </label>
          </div>
        </div>
        <div className='product__create__form__group'>
          <input
            type='text'
            placeholder=' '
            onChange={(e) => setCategories(e.target.value)}
          />
          <label className={`${categories !== "" && "filled"}`}>
            categories ( , )
          </label>
        </div>
        <div className='product__create__form__group'>
          <input
            type='number'
            placeholder=' '
            min={0}
            step={1}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
          <label className={`${stockQuantity !== null && "filled"}`}>
            Stock Quantity
          </label>
          <div className='product__create__form__group'>
            <input
              type='number'
              placeholder=' '
              min={0}
              max={999999}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label className={`${price !== null && "filled"}`}>Price</label>
          </div>
        </div>
        <div className='product__create__form__group f-center'>
          {!mainImage ? (
            <div
              className='product__create__form__main-image'
              onClick={() => {
                if (mainImageUploadInput.current)
                  mainImageUploadInput.current.click();
              }}
            >
              <h3>Preview Image</h3>
              <FontAwesomeIcon icon={faFileUpload} fontSize={30} />
              <input
                ref={mainImageUploadInput}
                type='file'
                className='hidden'
                onChange={(e) => {
                  if (e.target.files[0]) {
                    const file = e.target.files[0];
                    if (file.type.substring("image/")) {
                      setMainImage(file);
                    }
                  }
                }}
              />
            </div>
          ) : (
            <div className='product__create__form__main-image__uploaded'>
              <img src={URL.createObjectURL(mainImage)} alt='' />
              <button
                className='product__create__form__main-image__close'
                onClick={() => setMainImage(null)}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
