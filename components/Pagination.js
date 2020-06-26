import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import DisplayError from "./ErrorMessage";
import { perPage } from "../config";
import Head from "next/head";
import Link from "next/link";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;
const Pagination = ({ page }) => {
  const {
    loading,
    data: { itemsConnection: { aggregate: { count } = false } = false } = false,
    error,
  } = useQuery(PAGINATION_QUERY);
  const pages = Math.ceil(count / perPage);
  return (
    <>
      {loading ? (
        <p>Loading..</p>
      ) : error ? (
        <p>
          <DisplayError error={error} />
        </p>
      ) : !count ? (
        <p>No pagination found</p>
      ) : (
        <PaginationStyles>
          <Head>
            <title>
              Sick fits! Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{ pathname: "items", query: { page: page - 1 } }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              ⏮️ Prev
            </a>
          </Link>
          <p>
            Page {page} of {pages}
          </p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{ pathname: "items", query: { page: page + 1 } }}
          >
            <a className="prev" aria-disabled={page >= pages}>
              Next ⏭️
            </a>
          </Link>
        </PaginationStyles>
      )}
    </>
  );
};

export default Pagination;
