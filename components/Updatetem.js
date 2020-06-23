import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import Router from "next/router";
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;
const UpdateItem = (props) => {
  const [state, setState] = useState({});
  const { loading: queryLoading, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: props.id },
  });
  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION);

  const handleInput = ({ target: { name, type, value } }) => {
    const val = type === "number" ? value : value.toString();
    setState({ ...state, [name]: val });
  };
  if (queryLoading) return <p>Loading...</p>;
  if (!data.item) return <p>No item found for ID...</p>;
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateItem({
          variables: {
            id: props.id,
            ...state,
          },
        });
        /*        Router.push({
          pathname: "/item",
          query: { id: res.data.updateItem.id },
        });*/
        console.log(res);
      }}
    >
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            defaultValue={data.item.title}
            onChange={handleInput}
          />
        </label>

        <label htmlFor="title">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            required
            defaultValue={data.item.price}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="title">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter a Description"
            required
            defaultValue={data.item.description}
            onChange={handleInput}
          />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
