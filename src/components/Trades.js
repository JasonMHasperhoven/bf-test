import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import timestampToTime from '../helpers/timestampToTime';
import NoDetails from './NoDetails';

const Root = styled.div`
  background: ${(props) => props.theme.secondaryBg};
  width: 400px;
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
  width: 100%;
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
  width: 100%;
  display: flex;
  border-radius: 4px;

  ${(props) =>
    props.positive !== undefined &&
    `
    background: rgba(${
      props.positive ? props.theme.buyColorRgb : props.theme.sellColorRgb
    }, 0.1);
  `};
`;

const Col = styled.div`
  width: 33.33%;
  text-align: right;
`;

export default function Trades() {
  const trades = useSelector((state) => Object.values(state.trades.data));

  return (
    <Root>
      <Header>
        <Title>Trades</Title>
        <Symbol>BTC/USD</Symbol>
      </Header>
      <Body>
        <List>
          <ListHeader>
            <Row>
              <Col>Time</Col>
              <Col>Price</Col>
              <Col>Amount</Col>
            </Row>
          </ListHeader>
          <ListBody>
            {trades.length ? (
              trades.map((trade) => (
                <Row key={trade.id} positive={trade.amount > 0}>
                  <Col data-testid="trade-time">
                    {timestampToTime(trade.mts)}
                  </Col>
                  <Col data-testid="trade-price">{trade.price}</Col>
                  <Col data-testid="trade-amount">{trade.amount}</Col>
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
