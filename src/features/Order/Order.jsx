/* eslint-disable no-unused-vars */
// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";
import OrderItem from "./OrderItem";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const styleStatusDelivered =
    "bg-green-500 rounded-full py-1 px-2.5 text-red-50 font-semibold uppercase tracking-wider";
  const styleStatusPreparing =
    "bg-yellow-500 rounded-full py-1 px-2.5 text-red-50 font-semibold uppercase tracking-wider";
  const stylePriority =
    "bg-red-500 rounded-full py-1 px-2.5 text-red-50 font-semibold uppercase tracking-wider";

  return (
    <div className="p-2 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-bold">Order #{id} status</h2>
        <div className="space-x-2">
          {priority && <span className={stylePriority}>Priority</span>}
          <span
            className={
              status === "Preparing"
                ? styleStatusPreparing
                : styleStatusDelivered
            }
          >
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-zinc-200 py-6 px-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-zinc-400">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y space-y-2 py-2">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="flex flex-col flex-wrap gap-2 bg-zinc-200 py-6 px-5">
        <p>Pizza price: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">
          To pay on delivery:{" "}
          <span>{formatCurrency(orderPrice + priorityPrice)}</span>
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
