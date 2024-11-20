/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../Cart/CartSlice";
import DeleteItem from "../Cart/DeleteItem";
import UpdateItemQuantity from "../Cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <>
      <li className="flex flex-row gap-5 p-2  ">
        <img
          src={imageUrl}
          alt={name}
          className={`${!soldOut ? "rounded-full" : "rounded-full grayscale opacity-50"}`}
        />
        <div className="flex flex-col pl-5 content-center grow">
          <p
            className={`${!soldOut ? "text-[22px] font-bold" : "text-[22px] font-bold grayscale opacity-50"}`}
          >
            {name}
          </p>
          <p
            className={`${!soldOut ? "text-[16px] capitalize" : "text-[16px] capitalize grayscale opacity-50"}`}
          >
            {ingredients.join(", ")}
          </p>

          <div className="flex flex-row gap-3  justify-between items-center mt-auto font-bold">
            {!soldOut ? (
              <p>{formatCurrency(unitPrice)}</p>
            ) : (
              <p className="uppercase grayscale opacity-50">Sold out</p>
            )}
            {!soldOut && (
              <div className="flex flex-row gap-2">
                {currentQuantity > 0 && (
                  <UpdateItemQuantity
                    pizzaId={id}
                    currentQuantity={currentQuantity}
                  />
                )}
                {!currentQuantity && (
                  <Button type="primary" onClick={handleAddToCart}>
                    Add to cart
                  </Button>
                )}
                {currentQuantity > 0 && <DeleteItem pizzaId={id} />}
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  );
}

export default MenuItem;
