import React, { useState } from 'react';
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
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing()};
`;

const Flex = styled.div`
  display: flex;
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

const PrecisionButtons = styled.div`
  align-self: flex-end;
`;

const PrecisionButton = styled.button`
  background: none;
  border: 0;
  width: 24px;
  height: 24px;
  color: white;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

function roundPrice(price, precision = 0) {
  const pow = Math.pow(10, +Math.abs(precision - 3));
  return Math.round(price / pow) * pow;
}

export default function OrderBook() {
  const [precision, setPrecision] = useState(3);
  const { bids, asks } = useSelector((state) => ({
    bids: Object.values(state.book.bids),
    asks: Object.values(state.book.asks),
  }));

  return (
    <Root>
      <Header>
        <Flex>
          <Title>Orderbook</Title>
          <Symbol>BTC/USD</Symbol>
        </Flex>
        <PrecisionButtons>
          <PrecisionButton
            disabled={precision === 0}
            onClick={
              precision > 0 ? () => setPrecision(precision - 1) : undefined
            }
          >
            -
          </PrecisionButton>
          <PrecisionButton
            disabled={precision === 3}
            onClick={
              precision < 3 ? () => setPrecision(precision + 1) : undefined
            }
          >
            +
          </PrecisionButton>
        </PrecisionButtons>
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
                <Col>{Number(order.amount).toFixed(precision)}</Col>
                <Col>{Number(order.total).toFixed(precision)}</Col>
                <Col>
                  {formatter.format(roundPrice(order.price, precision))}
                </Col>
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
                <Col>
                  {formatter.format(roundPrice(order.price, precision))}
                </Col>
                <Col>{Number(order.total).toFixed(precision)}</Col>
                <Col>{Number(order.amount).toFixed(precision)}</Col>
                <Col>{order.count}</Col>
              </Row>
            ))}
          </ListBody>
        </List>
      </Body>
    </Root>
  );
}
