import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import formatter from '../helpers/formatter';
// import Loader from './Loader';
// import Button from './Button';
// import {
//   billsRequest,
//   removeBillRequest,
//   addBillRequest,
// } from '../slices/bills';
// import { RootState } from '../store';

const Root = styled.div`
  background: ${(props) => props.theme.secondaryBg};
  width: 800px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  padding: ${(props) => props.theme.spacing()};
`;

const Title = styled.div`
  margin-right: ${(props) => props.theme.spacing()};
`;

const Symbol = styled.div`
  color: ${(props) => props.theme.primaryTextColor3};
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  font-size: 13px;
`;

const List = styled.div`
  width: 50%;
`;

const ListHeader = styled.div`
  color: ${(props) => props.theme.primaryTextColor3};
  padding: ${(props) => props.theme.spacing()};
`;

const ListBody = styled.div`
  padding: ${(props) => props.theme.spacing()};
`;

const Row = styled.div`
  width: 100%;
  display: flex;
`;

const Col = styled.div`
  width: 25%;
  text-align: right;
`;

export default function OrderBook(props) {
  const { bids, asks } = useSelector((state) => state.book);

  return (
    <Root>
      <Header>
        <Title>Orderbook</Title>
        <Symbol>BTC/USD</Symbol>
      </Header>
      <Body>
        <List>
          <ListHeader>
            <Row>
              <Col>Count</Col>
              <Col>Amount</Col>
              <Col>Total</Col>
              <Col>Price</Col>
            </Row>
          </ListHeader>
          <ListBody>
            {Object.values(bids)
              .reverse()
              .map((order) => (
                <Row key={order.count + order.amount + order.price}>
                  <Col>{order.count}</Col>
                  <Col>{order.amount}</Col>
                  <Col>{order.total}</Col>
                  <Col>{formatter.format(order.price)}</Col>
                </Row>
              ))}
          </ListBody>
        </List>
        <List>
          <ListHeader>
            <Row>
              <Col>Price</Col>
              <Col>Total</Col>
              <Col>Amount</Col>
              <Col>Count</Col>
            </Row>
          </ListHeader>
          <ListBody>
            {Object.values(asks).map((order) => (
              <Row key={order.count + order.amount + order.price}>
                <Col>{formatter.format(order.price)}</Col>
                <Col>{order.total}</Col>
                <Col>{order.amount}</Col>
                <Col>{order.count}</Col>
              </Row>
            ))}
          </ListBody>
        </List>
      </Body>
    </Root>
  );
}
