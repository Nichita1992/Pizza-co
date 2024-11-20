import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./CartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="bg-zinc-700 text-zinc-100 text-transform: uppercase text-sm px-4 py-4 tablet:px-6 tablet:text-base flex flex-row justify-between items-center ">
      <p className="text-zinc-300 space-x-4">
        <span className="font-semibold ">{totalCartQuantity} pizzas</span>
        <span className="font-semibold">{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
