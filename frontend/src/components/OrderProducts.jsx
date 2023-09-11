export function OrderProducts({ products }) {
  return (
    <>
      <div className='order__products'>
        {products.map((product) => (
          <div className='order__product' key={product.id}>
            <div className='order__product-img'>
              <img
                src={
                  product.main_image
                    ? product.main_image
                    : product.product.main_image
                }
                alt=''
              />
            </div>
            <div className='order__product-details'>
              <h2>{product.product_name}</h2>
              {/* <p>Qty: {product.CartProduct.quantity}</p>
              <p>Price: ${product.CartProduct.quantity * product.price}</p> */}
              <p>
                Qty:{" "}
                {product.CartProduct
                  ? product.CartProduct.quantity
                  : product.quantity}
              </p>
              <p>Price: ${product.quantity * product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='order__products-details'>
        <span>
          Items:{" "}
          {/* {products.reduce((acc, val) => acc + val.CartProduct.quantity, 0)} */}
          {products.reduce((acc, val) => {
            if (val.CartProduct) return acc + val.quantity;
            return acc + val.quantity;
          }, 0)}
        </span>
        <span>
          Total: $
          {/* {Number(
            products.reduce(
              (acc, val) => acc + val.price * val.CartProduct.quantity,
              0
            )
          ).toFixed(2)} */}
          {Number(
            products.reduce((acc, val) => {
              return acc + val.price * val.quantity;
            }, 0)
          ).toFixed(2)}
        </span>
      </div>
    </>
  );
}
