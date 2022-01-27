import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  border-radius: 25px;
  background-color: #e5e4e2;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin-bottom: 10px;
  &: hover {
    background-color: #d3d3d3;
    cursor: pointer;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  font-size: 40px;
  color: #151b54;
  font-weight: bold;
`;

const SubContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-top: 0.5px solid #98afc7;
`;

const TextContainer = styled.div`
  font-size: 15px;
  color: #151b54;
  font-weight: bold;
`;

function ListItem(item) {
  const [clicked, setClick] = useState(false);
  return (
    <Container onClick={() => setClick(!clicked)}>
      <TitleContainer>{item.item.API}</TitleContainer>
      {clicked ? (
        <>
          <SubContainer>
            <TextContainer>Category:</TextContainer>
            <TextContainer>{item.item.Category}</TextContainer>
          </SubContainer>
          <SubContainer>
            <TextContainer>Description:</TextContainer>
            <TextContainer>{item.item.Description}</TextContainer>
          </SubContainer>
          <SubContainer>
            <TextContainer>Link:</TextContainer>
            <TextContainer>{item.item.Link}</TextContainer>
          </SubContainer>
        </>
      ) : null}
    </Container>
  );
}

export default ListItem;
