import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder, thunkGetOrder } from "../../store/singleOrder";
import { OrderProducts } from "../OrderProducts";
import "../../styles/pages/orderPage.css";

export function OrderPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.singleOrder);
  useEffect(() => {
    if (orderId) {
      (async () => {
        const res = await dispatch(thunkGetOrder(orderId));
      })();
    }
    return () => {
      dispatch(removeOrder());
    };
  }, [orderId, dispatch]);
  if (!orderId) return false;
  if (!order) return false;
  return (
    <>
      <div className='order__page'>
        <header className='order__heading'>
          <h1>Order # {order.id}</h1>
          <span>
            Status:{" "}
            <span className={`order-status order-status-${order.status}`}>
              {order.status}
            </span>
          </span>
        </header>
        {order.products && <OrderProducts products={order.products} />}
      </div>
    </>
  );
}
