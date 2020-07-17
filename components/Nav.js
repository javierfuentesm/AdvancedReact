import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./User";
import { perPage } from "../config";

const Nav = () => {
  const { loading, error, data: { me } = false } = useQuery(CURRENT_USER_QUERY);
  return (
    <NavStyles>
      <Link href="/items">
        <a>Shop</a>
      </Link>
      {me ? (
        <>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/me">
            <a>Account</a>
          </Link>
        </>
      ) : (
        <Link href="/signup">
          <a>Sing UP</a>
        </Link>
      )}
    </NavStyles>
  );
};

export default Nav;
