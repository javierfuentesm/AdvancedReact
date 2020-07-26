import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Error from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN = gql`
  mutation SIGNIN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const SigIn = () => {
  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [signin, { loading, error }] = useMutation(SIGNIN);

  const handleInput = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };
  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await signin({
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
          variables: state,
        });
        setState({
          email: "",
          name: "",
          password: "",
        });
      }}
    >
      <Error error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign In </h2>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleInput}
          />
        </label>{" "}
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleInput}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
};

export default SigIn;
