import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./User";
import { perPage } from "../config";

const Nav = () => {
  const { loading, error, data: { me } = false } = useQuery(CURRENT_USER_QUERY);
  return (
    <NavStyles>
      {me && <p>{me.name}</p>}

      <Link href="/items">
        <a>Shop</a>
      </Link>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      <Link href="/orders">
        <a>Orders</a>
      </Link>
      <Link href="/me">
        <a>Account</a>
      </Link>
    </NavStyles>
  );
};

export default Nav;
