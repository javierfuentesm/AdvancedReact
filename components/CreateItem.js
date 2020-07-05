import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import Router from "next/router";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
    }
  }
`;
const CreateItem = () => {
  const [state, setState] = useState({
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0,
  });
  const [createItem, { loading, error, called, data }] = useMutation(
    CREATE_ITEM_MUTATION
  );

  const handleInput = ({ target: { name, type, value } }) => {
    const val = type === "number" ? parseFloat(value) : value.toString();
    setState({ ...state, [name]: val });
  };
  const uploadFile = async ({ target: { files } }) => {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dspeesyci/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setState({
      ...state,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
    console.log(file);
  };

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createItem({ variables: state });
        Router.push({
          pathname: "/item",
          query: { id: res.data.createItem.id },
        });
        console.log(res);
      }}
    >
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="File"
            required
            onChange={uploadFile}
          />
          {state.image && <img src={state.image} alt="Upload preview" />}
        </label>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            value={state.title}
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
            value={state.price}
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
            value={state.description}
            onChange={handleInput}
          />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
