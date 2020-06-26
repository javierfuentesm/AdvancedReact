import React, { Component } from "react";
import { Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Form from "./styles/Form";
import styled from "styled-components";
import Item from "./Item";
import Pagination from "./Pagination";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;
const Center = styled.div`
  text-align: center;
`;
const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items = ({ page }) => {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>{`Error: ${error}`}</p>;
  return (
    <Center>
      <Pagination page={page} />
      <ItemsList>
        {data.items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ItemsList>
      <Pagination page={page} />
    </Center>
  );
};

export default Items;
export { ALL_ITEMS_QUERY };
