# Pangaea Prime
[Visit Pangaea](https://pangaea-prime.onrender.com/)


Pangaea Prime is a full-stack e-commerce application inspired by Amazon. Built with a modern tech stack including Express, React, Redux, and PostgreSQL, it offers a seamless shopping experience, allowing users to browse products, add them to their cart, and place orders with ease.




![Pangea](https://github.com/jmurphy1196/Pangaea-prime/assets/65454757/828e89e5-8b6d-4eb7-8e0e-d38039ab6f17)

![pang-1](https://github.com/jmurphy1196/Pangaea-prime/assets/65454757/83414453-03b5-43e9-83bc-04af7cfe5aec)

![pangaea-1](https://github.com/jmurphy1196/Pangaea-prime/assets/65454757/c1387a48-1703-45dd-b50f-4ee34b97852c)

## Technologies used

**Frontend**  
  
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

**Backend**  
  
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)  ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

 **Cloud Services**  
  
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Features

- **Product Listing**: Browse a wide range of products with detailed descriptions and images.
  ```js
  export function Product({ productId }) {
  const product = useSelector((state) => state.products[productId]);
  if (!product) return false;
  return (
    <>
      <div className='product__container'>
        <div className='product__image'>
          <img src={product.main_image} alt='' />
        </div>
        <div className='product__information'>
          <Link to={`/product/${product.id}`}>
            <h1 className='product__name'>{product.product_name}</h1>
          </Link>
          <Link
            to={`/products?brand=${product.Brand.name}`}
            className='product__brand'
          >
            {product.Brand.name}
          </Link>
          <div className='product__ratings'>
            <div className='product__stars'>
              {[1, 2, 3, 4, 5].map((val) => {
                if (!product.avgRating)
                  return (
                    <FontAwesomeIcon
                      className='stars'
                      icon={faStarEmpty}
                      key={val}
                    />
                  );
                if (product.avgRating >= val) {
                  return (
                    <FontAwesomeIcon
                      className='stars'
                      icon={faStar}
                      key={val}
                    />
                  );
                } else {
                  return (
                    <FontAwesomeIcon
                      className='stars'
                      icon={faStarEmpty}
                      key={val}
                    />
                  );
                }
              })}
              <span>
                {product.avgRating !== null
                  ? Number(product.avgRating).toFixed(2)
                  : 0.0}
              </span>
            </div>
          </div>
          <div className='product__price'>
            <h1>${product.price}</h1>
          </div>
          <div className='product__delivery'>
            <p>
              Free delivery{" "}
              <strong>
                {dayjs(new Date()).add(2, "day").format("ddd, MMM D")}
              </strong>
            </p>
            <p>
              or fastest delivery{" "}
              <strong>
                {dayjs(new Date()).add(1, "day").format("ddd, MMM D")}
              </strong>
            </p>
          </div>
          <div className='product__stock'>
            <p>{product.stock_quantity} left in stock</p>
          </div>
        </div>
      </div>
    </>
  );
  ```
- **Shopping Cart**: Add products to your cart with a single click and view your cart's contents anytime.
```js
export function CartProductsList({ products }) {
  console.log("TEHISER ASRJELK JRKLESJKLFJSDKLJFKLDS", products);
  if (!products) return false;
  return (
    <>
      <div className='cart__products-container'>
        <h2>My Cart</h2>
        <div className='cart__products'>
          {products.map((prod) => (
            <CartProduct key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </>
  );
}
  ```
- **Order Placement**: Seamlessly place orders and receive order confirmations.
  ```js
  export function CreateOrder() {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("CA");
  const [postalCode, setPostalCode] = useState("");
  const [formPage, setFormPage] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const cardElement = elements.getElement(CardElement);
  const history = useHistory();

  useEffect(() => {
    const errors = {};
    if (address_1.length < 1 || address_1.length > 200)
      errors.address_1 = "Address 1 must be between 1 and 200 characters";
    if (
      address_2.length > 0 &&
      (address_2.length < 1 || address_2.length > 200)
    )
      errors.address_2 = "Address 2 must be between 1 and 200 characters";
    if (city.length < 1 || city.length > 40)
      errors.city = "City must be between 1 and 40 characters";
    if (!postalCode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/))
      errors.postalCode = "Enter a valid postal code";
    setFormErrors(errors);
  }, [address_1, address_2, city, state, postalCode]);
    ```




