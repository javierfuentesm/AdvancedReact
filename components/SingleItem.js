import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { SINGLE_ITEM_QUERY } from "./UpdateItem";
import DisplayError from "./ErrorMessage";
import Head from "next/head";
const SingleItem = ({ id }) => {
  const { loading, data: { item } = false, error } = useQuery(
    SINGLE_ITEM_QUERY,
    {
      variables: { id },
    }
  );

  const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${(props) => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    details {
      margin: 3rem;
      font-size: 2rem;
    }
  `;
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>
          <DisplayError error={error} />
        </p>
      ) : !item ? (
        <p>No item found </p>
      ) : (
        <SingleItemStyles>
          <Head>
            <title>Sick Fits | {item.title}</title>
          </Head>
          <img src={item.largeImage} alt={item.title} />
          <div className="details">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </SingleItemStyles>
      )}
    </div>
  );
};

export default SingleItem;
