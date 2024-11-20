import { useSelector } from "react-redux";

function User() {
  const user = useSelector((state) => state.user.username);

  if (!user) return null;

  return (
    <div className="text-sm font-semibold hidden tablet:block">{user}</div>
  );
}

export default User;
