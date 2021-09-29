import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartCompCard from "./CartCompCard";
import SubtotalComp from "./SubtotalComp";

function CartComponent() {
  const state = useSelector((state) => state.cart);
  console.log(state);
  return (
    <Container className="justify-content-center mt-5">
      <Row>
        <Col lg="9" className="my-4">
          <Row>
            {state.items.map((item) => {
              return (
                <Col lg="6" className="mb-3">
                <CartCompCard item={item}></CartCompCard>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col>
          <SubtotalComp></SubtotalComp>
        </Col>
      </Row>
    </Container>
  );
}

export default CartComponent;
