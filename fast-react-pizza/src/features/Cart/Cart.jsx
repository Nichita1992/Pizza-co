/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartItems } from "./CartSlice";
import { getUsername } from "../User/userSlice";

function Cart() {
  const cart = useSelector(getCartItems);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();

  function handleResetCart() {
    dispatch(clearCart());
  }

  if (cart.length === 0) return <EmptyCart />;
  return (
    <>
      <div className="space-y-5 flex flex-col text-left p-2 ">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>

        <h2>
          Your cart, {username.charAt(0).toUpperCase() + username.slice(1)}
        </h2>

        <ul className=" divide-y divide-zinc-300">
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </ul>
        <div className="flex flex-row justify-start space-x-2">
          <Button to="/order/new" type="primary">
            Order pizzas
          </Button>

          <Button onClick={handleResetCart} type="secondary">
            Clear cart
          </Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
