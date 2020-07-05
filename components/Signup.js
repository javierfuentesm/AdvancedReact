import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Error from "./ErrorMessage";
import Form from "./styles/Form";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      name
      email
      password
    }
  }
`;

const Signup = () => {
  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleInput = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };
  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await signup({ variables: state });
        console.log(res);
        setState({
          email: "",
          name: "",
          password: "",
        });
      }}
    >
      <Error error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up for an account </h2>
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
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            value={state.name}
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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default Signup;
