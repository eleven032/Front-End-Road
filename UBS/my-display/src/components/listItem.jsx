import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    border-radius: 25px;
    background-color: #E5E4E2;
    flex-direction: column; 
    align-items:center; 
    width:500px;
    margin-bottom: 10px;
    &: hover {
        background-color: #D3D3D3;
        cursor: pointer;
    }
`;

const TitleContainer = styled.div`
    display:flex;
    font-size: 40px;
    color: #151B54;
    font-weight: bold;
`;
const SubContainer = styled.div`
    width: 450px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    padding:10px;
    border-top: 0.5px solid #98AFC7;
    
`;

const TextContainer = styled.div`
    font-size: 15px;
    color: #151B54;
    font-weight: bold;
`;

function ListItem(item) {
  const [clicked, setClick] = useState(false);
  const { innerItem } = item;
  return (
    <Container onClick={() => setClick(!clicked)}>
      <TitleContainer>{innerItem.API}</TitleContainer>
      {clicked
        ? (
          <>
            <SubContainer>
              <TextContainer>Category:</TextContainer>
              <TextContainer>{innerItem.Category}</TextContainer>
            </SubContainer>
            <SubContainer>
              <TextContainer>Description:</TextContainer>
              <TextContainer>{innerItem.Description}</TextContainer>
            </SubContainer>
            <SubContainer>
              <TextContainer>Link:</TextContainer>
              <TextContainer>{innerItem.Link}</TextContainer>
            </SubContainer>
          </>
        )
        : null}
    </Container>
  );
}

export default ListItem;
