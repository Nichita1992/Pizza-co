import { useSelector } from "react-redux";
import CreateUser from "../features/User/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 sm:my-16  text-center">
      <h1 className="text-zinc-700 text-center font-semibold text-xl p-3 leading-8 mb-2">
        The best pizza.
        <br />
        <span className="text-yellow-500 ">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"} type="primary">
          Return to your order, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
