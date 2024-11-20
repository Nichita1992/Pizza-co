import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="space-y-5 flex flex-col text-left p-2 ">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="font-semibold">
        Your cart is empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
