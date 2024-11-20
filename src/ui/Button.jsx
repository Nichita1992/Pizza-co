/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    " bg-yellow-400 text-zinc-800 font-bold py-3 px-3 hover:bg-yellow-300 focus:ring focus:outline-none focus:ring-yellow-400 focus:ring-offset-2 transition-colors tracking-wide uppercase rounded-[50px] disabled:text-zinc-300 disabled:bg-zinc-200";

  const secondary =
    "text-zinc-800 border-zinc-400 border-2 font-bold py-2.5 px-3 transition-colors tracking-wide uppercase rounded-[50px] disabled:text-zinc-300 disabled:bg-zinc-200 hover:bg-zinc-300 focus:ring focus:outline-none focus:ring-zinc-300 focus:ring-offset-2 transition-colors";

  const round =
    "bg-yellow-400 text-zinc-800 font-bold py-3 px-5 hover:bg-yellow-300 focus:ring focus:outline-none focus:ring-yellow-400 focus:ring-offset-2 transition-colors tracking-wide uppercase rounded-[100px] disabled:text-zinc-300 disabled:bg-zinc-200";

  const small =
    "text-xs bg-yellow-400 text-zinc-800 font-bold py-2 px-3 w-40 hover:bg-yellow-300 focus:ring focus:outline-none focus:ring-yellow-400 focus:ring-offset-2 transition-colors tracking-wide uppercase rounded-[50px] disabled:text-zinc-300 disabled:bg-zinc-200";

  const styles = {
    primary: base,
    secondary,
    round,
    small,
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
