import React from 'react';
import Header from './Header'
import Meta from './Meta'
import styled from 'styled-components'

const MyButton = styled.button`
  background: red;
  font-size: 100px;

`
const Page = ({children}) => {
    return (
        <div>
            <Meta/>
            <Header/>
            {children}
            <MyButton>Click Me</MyButton>
        </div>
    );
};

export default Page;
