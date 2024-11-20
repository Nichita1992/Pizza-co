/* eslint-disable no-unused-vars */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartItems, getTotalCartPrice } from "../Cart/CartSlice";
import EmptyCart from "../Cart/EmptyCart";
import store from "../../Store";
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../User/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

/* const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]; */

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();

  const { state: isSubmiting } = navigation;
  const submitingStatus = isSubmiting === "submitting";

  const formErrors = useActionData();

  const dispatch = useDispatch();
  const cart = useSelector(getCartItems);
  const {
    address,
    error: errorAddress,
    position,
    status: addressStatus,
    username,
  } = useSelector((state) => state.user);

  const isLoadingPosition = addressStatus === "loading";

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? (20 / 100) * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="space-y-6 p-2">
      <h2>Ready to order? Let go!</h2>

      {/*<Form method="POST" action="order/new">*/}
      <Form method="POST" className="space-y-6">
        <div className="space-y-3">
          <label>First Name</label>
          <div>
            <input
              defaultValue={username}
              type="text"
              name="customer"
              required
              className="input"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className="input" />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div className="space-y-3 ">
          <label>Address</label>
          <div className="relative">
            <input
              type="text"
              name="address"
              required
              className="input"
              disabled={isLoadingPosition}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
            {!position.latitude && !position.longitude && (
              <span className="absolute top-1 right-[3px] z-51">
                <Button
                  disabled={isLoadingPosition}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="h-[80px]space-y-3 space-x-3 flex flex-row items-center ">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-5 w-5 accent-yellow-500 focus:ring focus:outline-none  focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-100 rounded-[10px]"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input
            type="hidden"
            name="position"
            value={[position.latitude, position.longitude]}
          ></input>

          <Button disabled={submitingStatus} type="primary">
            {submitingStatus
              ? "Placing order..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a valid phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  /*do not overuse*/
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
