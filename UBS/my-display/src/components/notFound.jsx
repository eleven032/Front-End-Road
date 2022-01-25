import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    margin-top:150px;
    font-size: 65px;
`;

const NotFound = () => (
    <Container>Sorry...404 - Not Found!</Container>
);

export default NotFound;