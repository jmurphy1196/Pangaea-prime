import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faX,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "../../styles/components/createProduct.css";
import {
  thunkCreateSingleProduct,
  thunkDeleteSingleProduct,
  thunkSetSingleProduct,
  thunkUpdateSingleProduct,
} from "../../store/singleProduct";

// eslint-disable-next-line
export function CreateProduct({ edit }) {
  const { productId } = useParams();
  const product = useSelector((state) => state.singleProduct);
  const mainImageUploadInput = useRef();
  const additionalImageUploadInput = useRef();
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [categories, setCategories] = useState("");
  const [stockQuantity, setStockQuantity] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainImageDelete, setMainImageDelete] = useState();
  const [additionalImagesDelete, setAdditionalImagesDelete] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formTouched, setFormTouched] = useState({
    productName: false,
    brandName: false,
    categories: false,
    stockQuantity: false,
    price: false,
    description: false,
    submit: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const errors = {};
    //TODO this is messy, think about cleaning this up
    if (productName.length < 3 || productName.length > 100)
      errors.productName = "Product name must be between 3 and 100 characters";
    if (brandName.length < 1 || brandName.length > 20)
      errors.brandName = "Brand name must be between 1 and 20 characters";
    if (
      categories.split(", ").filter((cat) => cat !== "").length < 1 ||
      categories.split(", ").length > 50
    )
      errors.categories = "You may select between 1 and 50 categories";
    if (stockQuantity < 1 || stockQuantity > 999999)
      errors.stockQuantity = "Stock quantity must be between 1 and 999,999";
    if (price < 0 || price > 999999 || price === null || price === undefined)
      errors.price = "Price must be between 0 and $999,999";
    if (description.length < 10 || description.length > 300)
      errors.description = "Description must be between 10 and 300 characters";
    setFormErrors(errors);
  }, [
    productName,
    brandName,
    categories,
    stockQuantity,
    price,
    mainImage,
    additionalImages,
    description,
  ]);
  useEffect(() => {
    (async () => {
      if (productId) {
        await dispatch(thunkSetSingleProduct(productId));
      }
    })();
  }, [dispatch, productId]);
  useEffect(() => {
    if (product && edit) {
      setProductName(product.product_name);
      setBrandName(product.Brand.name);
      setCategories(product.Categories.map((cat) => cat.name).join(", "));
      setDescription(product.description);
      setStockQuantity(product.stock_quantity);
      setPrice(product.price);
      setMainImage(product.main_image);
      if (product.additional_images) {
        if (typeof product.additional_images === "string") {
          const parsedImages = JSON.parse(product.additional_images);
          setAdditionalImages([...parsedImages.urls]);
        } else {
          setAdditionalImages([...product.additional_images.urls]);
        }
      }
    }
  }, [product, edit]);

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(thunkDeleteSingleProduct(product.id));
    setLoading(false);
    if (res) history.push("/account");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched({
      price: true,
      productName: true,
      brandName: true,
      categories: true,
      stockQuantity: true,
      description: true,
      submit: true,
    });
    if (!Object.values(formErrors).length) {
      if (!edit) {
        const imageData = new FormData();
        imageData.append("main_image", mainImage);
        for (let additionalImage of additionalImages) {
          imageData.append("additional_images[]", additionalImage);
        }
        setLoading(true);
        const res = await dispatch(
          thunkCreateSingleProduct(
            {
              product_name: productName,
              brand: brandName,
              price,
              description,
              stock_quantity: stockQuantity,
              categories: categories.split(","),
            },
            imageData
          )
        );
        setLoading(false);
        if (res.id) {
          history.push(`/product/${res.id}`);
        }
      } else {
        const imageData = new FormData();
        if (typeof mainImage !== "string")
          imageData.append("main_image", mainImage);
        for (let img of additionalImages) {
          if (typeof img !== "string")
            imageData.append("additional_images[]", img);
        }
        setLoading(true);
        const res = await dispatch(
          thunkUpdateSingleProduct(
            product.id,
            {
              product_name: productName,
              brand: brandName,
              price,
              description,
              stock_quantity: stockQuantity,
              categories: categories.split(","),
              main_image_to_delete: mainImageDelete,
              additional_images_to_delete: additionalImagesDelete,
            },
            imageData
          )
        );
        setLoading(false);
        console.log("THIS IS THE RES, in the component", res);
        history.push(`/product/${res.id}`);
      }
    }
  };
  return (
    <>
      <form className='product__create__form' onSubmit={handleSubmit}>
        <h1>Start selling with Pangaea!</h1>
        {formTouched.submit && (
          <div className='product__create__form__group'>
            <ul>
              {Object.values(formErrors).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className='product__create__form__group'>
          <input
            className={`${
              formTouched.productName && formErrors.productName && "errors"
            }`}
            type='text'
            placeholder=' '
            value={productName}
            onChange={(e) => {
              setFormTouched({ ...formTouched, productName: true });
              setProductName(e.target.value);
            }}
          />
          <label
            className={`${productName !== "" && "filled"} ${
              formTouched.productName && formErrors.productName && "errors"
            }`}
          >
            Product name
          </label>
          <div className='product__create__form__group'>
            <input
              className={`${
                formTouched.brandName && formErrors.brandName && "errors"
              }`}
              type='text'
              placeholder=' '
              value={brandName}
              onChange={(e) => {
                setFormTouched({ ...formTouched, brandName: true });
                setBrandName(e.target.value);
              }}
            />
            <label
              className={`${brandName !== "" && "filled"} ${
                formTouched.brandName && formErrors.brandName && "errors"
              }`}
            >
              Brand name
            </label>
          </div>
        </div>
        <div className='product__create__form__group'>
          <input
            className={`${
              formTouched.categories && formErrors.categories && "errors"
            }`}
            type='text'
            placeholder=' '
            value={categories}
            onChange={(e) => {
              setFormTouched({ ...formTouched, categories: true });
              setCategories(e.target.value);
            }}
          />
          <label
            className={`${categories !== "" && "filled"} ${
              formTouched.categories && formErrors.categories && "errors"
            }`}
          >
            categories ( , )
          </label>
        </div>
        {categories.length > 0 && (
          <div className='product__create__form__group'>
            {[...new Set(categories.split(",").map((word) => word.trim()))].map(
              (category, i) => {
                if (category.trim() !== "")
                  return (
                    <span key={i} className='product__create__form__category'>
                      <FontAwesomeIcon
                        className='category-close'
                        icon={faX}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategories((prev) =>
                            prev.replace(new RegExp(`${category}`, "g"), "")
                          );
                        }}
                      />
                      {category}
                    </span>
                  );
              }
            )}
          </div>
        )}
        <div className='product__create__form__group'>
          <textarea
            name='description'
            id=''
            cols='30'
            rows='10'
            placeholder='Description...'
            className={`${
              formErrors.description && formTouched.description && "errors"
            }`}
            value={description}
            onChange={(e) => {
              setFormTouched({ ...formTouched, description: true });
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className='product__create__form__group'>
          <input
            className={`${
              formTouched.stockQuantity && formErrors.stockQuantity && "errors"
            }`}
            type='number'
            placeholder=' '
            min={0}
            step={1}
            value={stockQuantity}
            onChange={(e) => {
              setFormTouched({ ...formTouched, stockQuantity: true });
              setStockQuantity(e.target.value);
            }}
          />
          <label
            className={`${stockQuantity !== null && "filled"} ${
              formTouched.stockQuantity && formErrors.stockQuantity && "errors"
            }`}
          >
            Stock Quantity
          </label>
          <div className='product__create__form__group'>
            <input
              className={`${formTouched.price && formErrors.price && "errors"}`}
              type='number'
              placeholder=' '
              min={0}
              max={999999}
              value={price}
              step={"0.01"}
              onChange={(e) => {
                setFormTouched({ ...formTouched, price: true });
                setPrice(+e.target.value);
              }}
            />
            <label
              className={`${price !== null && "filled"} ${
                formTouched.price && formErrors.price && "errors"
              }`}
            >
              Price
            </label>
          </div>
        </div>
        <div className='product__create__form__group f-center'>
          {!mainImage ? (
            <div
              className='product__create__form__main-image'
              onClick={(e) => {
                e.stopPropagation();
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
              <img
                src={
                  typeof mainImage === "string"
                    ? mainImage
                    : URL.createObjectURL(mainImage)
                }
                alt=''
              />
              <button
                className='product__create__form__main-image__close'
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof mainImage === "string") {
                    // delete
                    setMainImageDelete(mainImage);
                  }
                  setMainImage(null);
                }}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
          )}
        </div>
        <div className='product__create__form__group f-center'>
          {additionalImages.map((img, i) => {
            return (
              <div
                key={i}
                className='product__create__form__additional-image__uploaded'
              >
                <button
                  className='product__create__form__additional-image__close'
                  type='button'
                  onClick={(e) => {
                    console.log("YOU CLICKED THE CLOSE BUTTON!!!");
                    e.stopPropagation();
                    if (typeof img === "string") {
                      setAdditionalImagesDelete((prev) => [...prev, img]);
                    }
                    setAdditionalImages((prev) =>
                      prev.filter((val, idx) => idx !== i)
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt=''
                />
              </div>
            );
          })}
          <div
            className='product__create__form__additional-image'
            onClick={(e) => {
              e.stopPropagation();
              if (additionalImageUploadInput.current) {
                additionalImageUploadInput.current.click();
              }
            }}
          >
            <h3>Additional Image</h3>
            <FontAwesomeIcon icon={faFileUpload} fontSize={30} />
            <input
              type='file'
              className='hidden'
              ref={additionalImageUploadInput}
              onChange={(e) => {
                if (additionalImages.length < 4) {
                  if (e.target.files[0]) {
                    const file = e.target.files[0];
                    if (file.type.substring("image/")) {
                      setAdditionalImages((prev) => [...prev, file]);
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        <button
          disabled={
            (Object.values(formErrors).length > 0 && formTouched.submit) ||
            loading
          }
          type='submit'
          className='product__create__form-submit'
        >
          {edit && !loading ? (
            "Edit"
          ) : !edit && !loading ? (
            "Create"
          ) : (
            <FontAwesomeIcon className='spinner' icon={faSpinner} />
          )}
        </button>
        {edit && !loading ? (
          <button
            disabled={
              (Object.values(formErrors).length > 0 && formTouched.submit) ||
              loading
            }
            type='button'
            className='product__create__form-delete'
            onClick={handleDelete}
          >
            {" "}
            Delete{" "}
          </button>
        ) : (
          edit &&
          loading && <FontAwesomeIcon className='spinner' icon={faSpinner} />
        )}
      </form>
    </>
  );
}
