import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import formatter from '../helpers/formatter';
import NoDetails from './NoDetails';

const Root = styled.div`
  background: ${(props) => props.theme.secondaryBg};
  width: 800px;
  margin-right: ${(props) => props.theme.spacing()};
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
  padding-top: 0;
`;

const ListBody = styled.div`
  padding: ${(props) => props.theme.spacing()};
  padding-top: 0;
`;

const Row = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  border-radius: 4px;
  overflow: hidden;

  &:hover {
    background: hsla(0, 0%, 39.2%, 0.1);
  }
`;

const RowBar = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;

  ${(props) => css`
    width: ${props.width || 0}%;
  `}

  ${(props) =>
    props.bid &&
    `
    right: 0;
    background: rgba(${props.theme.buyColorRgb}, 0.2);
  `};

  ${(props) =>
    props.ask &&
    `
    left: 0;
    background: rgba(${props.theme.sellColorRgb}, 0.2);
  `};
`;

const Col = styled.div`
  position: relative;
  z-index: 2;
  width: 25%;
  text-align: right;
`;

const Buttons = styled.div`
  flex-shrink: 0;
`;

const Button = styled.button`
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

const ZoomInIcon = styled((props) => (
  <svg
    viewBox="0 0 24 24"
    height="16"
    width="16"
    focusable="false"
    role="img"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>ZoomIn icon</title>
    <path d="M11 6H9v3H6v2h3v3h2v-3h3V9h-3z"></path>
    <path d="M10 2c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
  </svg>
))`
  position: relative;
  top: 4px;
`;

const ZoomOutIcon = styled((props) => (
  <svg
    viewBox="0 0 24 24"
    height="16"
    width="16"
    focusable="false"
    role="img"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>ZoomOut icon</title>
    <path d="M6 9h8v2H6z"></path>
    <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
  </svg>
))`
  position: relative;
  top: 4px;
`;

function roundPrice(price, precision = 0) {
  const pow = Math.pow(10, +Math.abs(precision - 3));
  return Math.round(price / pow) * pow;
}

export default function OrderBook() {
  const [precision, setPrecision] = useState(3);
  const [barDepth, setBarDepth] = useState(1);
  const { bids, asks, lastPrice } = useSelector((state) => ({
    bids: Object.values(state.book.bids),
    asks: Object.values(state.book.asks),
    lastPrice: state.ticker.data.lastPrice,
  }));

  return (
    <Root>
      <Header>
        <Flex>
          <Title>Orderbook</Title>
          <Symbol>BTC/USD</Symbol>
        </Flex>
        <Flex>
          <Buttons>
            <Button
              disabled={precision === 0}
              onClick={
                precision > 0 ? () => setPrecision(precision - 1) : undefined
              }
              data-testid="decrease-precision"
            >
              -
            </Button>
            <Button
              disabled={precision === 3}
              onClick={
                precision < 3 ? () => setPrecision(precision + 1) : undefined
              }
              data-testid="increase-precision"
            >
              +
            </Button>
          </Buttons>
          <Buttons>
            <Button
              disabled={barDepth === 0}
              onClick={
                barDepth > 0 ? () => setBarDepth(barDepth - 1) : undefined
              }
              data-testid="decrease-bardepth"
            >
              <ZoomOutIcon />
            </Button>
            <Button
              disabled={barDepth === 10}
              onClick={
                barDepth < 10 ? () => setBarDepth(barDepth + 1) : undefined
              }
              data-testid="increase-bardepth"
            >
              <ZoomInIcon />
            </Button>
          </Buttons>
        </Flex>
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
            {bids.length ? (
              bids.reverse().map((order) => (
                <Row key={order.price}>
                  <RowBar
                    bid
                    width={(lastPrice - order.price) * barDepth}
                    data-testid="bid-bar"
                    data-teststate={(order.price - lastPrice) * barDepth}
                  />
                  <Col data-testid="bid-count">{order.count}</Col>
                  <Col data-testid="bid-amount">
                    {Number(order.amount).toFixed(precision)}
                  </Col>
                  <Col data-testid="bid-total">
                    {Number(order.total).toFixed(precision)}
                  </Col>
                  <Col data-testid="bid-price">
                    {formatter.format(roundPrice(order.price, precision))}
                  </Col>
                </Row>
              ))
            ) : (
              <NoDetails>No details</NoDetails>
            )}
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
            {asks.length ? (
              asks.map((order) => (
                <Row key={order.price}>
                  <RowBar
                    ask
                    width={(order.price - lastPrice) * barDepth}
                    data-testid="ask-bar"
                    data-teststate={(order.price - lastPrice) * barDepth}
                  />
                  <Col data-testid="ask-price">
                    {formatter.format(roundPrice(order.price, precision))}
                  </Col>
                  <Col data-testid="ask-total">
                    {Number(order.total).toFixed(precision)}
                  </Col>
                  <Col data-testid="ask-amount">
                    {Number(order.amount).toFixed(precision)}
                  </Col>
                  <Col data-testid="ask-count">{order.count}</Col>
                </Row>
              ))
            ) : (
              <NoDetails>No details</NoDetails>
            )}
          </ListBody>
        </List>
      </Body>
    </Root>
  );
}
