import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "../styles/components/myOrders.css";
import { thunkGetOrders } from "../store/orders";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkGetOrders());
    })();
  }, [dispatch]);

  if (!orders.orderedOrders.length) return false;

  return (
    <>
      <div className='my__orders'>
        <header className='my__orders-heading'>
          <h2>My Orders</h2>
        </header>
        {orders.orderedOrders.map((orderId) => (
          <div className='order__card' key={orderId}>
            <Link className='order-link' to={`/orders/${orderId}`}>
              {" "}
              <h2>Order # {orders[orderId].id}</h2>{" "}
            </Link>
            <span>
              Created: {dayjs(orders[orderId].createdAt).format("MM-DD-YYYY")}
            </span>
            <span>
              Status:{" "}
              <span
                className={`order-status order-status-${orders[orderId].status}`}
              >
                {orders[orderId].status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
