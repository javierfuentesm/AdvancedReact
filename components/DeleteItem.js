import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_QUERY = gql`
  mutation DELETE_ITEM_QUERY($id: ID!) {
    deleteItem(id: $id) {
      id
      title
      description
      price
    }
  }
`;
const DeleteItem = ({ children, id }) => {
  // Con apollo si solo afectamos o actualizamos un elemento y regresamos el id apollo se encarga de actualizartodo
  // pero si borramos o afectamos varias entitades tenemos que hacerlo a mano
  const [deleteItem, { error }] = useMutation(DELETE_ITEM_QUERY, {
    variables: { id },
    update(cache, { data: { deleteItem } }) {
      //se lee el cache que se tiene
      const { items } = cache.readQuery({ query: ALL_ITEMS_QUERY });
      // Se escribe en el cache filtrando el id que regresa el elemento que se borro
      cache.writeQuery({
        query: ALL_ITEMS_QUERY,
        data: { items: items.filter((item) => item.id !== deleteItem.id) },
      });
    },
  });

  return (
    <button
      onClick={() => {
        if (confirm("Are yu sure you want to delete this item?")) {
          deleteItem().then((r) => console.log(r));
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteItem;
