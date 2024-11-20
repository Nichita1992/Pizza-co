/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import DeleteItem from "./DeleteItem";
import EmptyCart from "./EmptyCart";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCartItems, getCurrentQuantityById } from "./CartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-2 tablet:flex tablet:items-center tablet:justify-between  ">
      <p>
        {quantity} &times; {name}
      </p>

      <div className="flex flex-row justify-between items-center tablet:gap-10">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
