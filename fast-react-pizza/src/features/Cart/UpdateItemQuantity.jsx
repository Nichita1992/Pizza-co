/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "./CartSlice";
import Button from "../../ui/Button";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  function handleIncreaseQuantity() {
    dispatch(increaseQuantity(pizzaId));
  }

  function handleDecreaseQuantity() {
    dispatch(decreaseQuantity(pizzaId));
  }
  return (
    <div className="flex gap-1">
      <Button type="round" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <span className="px-2 py-3 text-sm">{currentQuantity}</span>
      <Button type="round" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
