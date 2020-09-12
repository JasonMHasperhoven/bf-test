import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import formatter from '../helpers/formatter';

const Root = styled.div`
  background: ${(props) => props.theme.secondaryBg};
  width: 800px;
  margin-right: 40px;
  border-radius: 6px;
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
  border-radius: 4px;

  &:hover {
    background: hsla(0, 0%, 39.2%, 0.1);
  }
`;

const Col = styled.div`
  width: 25%;
  text-align: right;
`;

export default function OrderBook(props) {
  const { bids, asks } = useSelector((state) => ({
    bids: Object.values(state.book.bids),
    asks: Object.values(state.book.asks),
  }));

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
            {bids.reverse().map((order) => (
              <Row key={order.price}>
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
            {asks.map((order) => (
              <Row key={order.price}>
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
