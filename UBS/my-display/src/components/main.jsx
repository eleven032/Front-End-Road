import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchData } from "../actions/fetchData";
import ListItem from "./listItem";
import NotFound from "./notFound";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 100px;
  font-size: 84px;
  color: #add8e6;
`;

const LoadingContainer = styled.div`
  font-size: 50px;
  color: #808080;
  margin-top: 200px;
`;

class Main extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    return (
      <Container>
        <TitleContainer>Public API List</TitleContainer>
        {this.props.loading ? (
          <LoadingContainer>is loading...</LoadingContainer>
        ) : this.props.error ? (
          <NotFound />
        ) : Array.isArray(this.props.item.entries) ? (
          this.props.item.entries.map((element) => (
            <ListItem item={element} key={element.API + element.Link} />
          ))
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.products.item,
  loading: state.products.loading,
  error: state.products.error,
});

export default connect(mapStateToProps)(Main);
