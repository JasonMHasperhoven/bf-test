import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
  width: 33%;
  text-align: right;
`;

function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);
  var hours = date.getHours();
  var minutes = '0' + date.getMinutes();
  var seconds = '0' + date.getSeconds();

  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

export default function Trades(props) {
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
            {trades.map((trade) => (
              <Row key={trade.id}>
                <Col>{timestampToTime(trade.mts)}</Col>
                <Col>{trade.price}</Col>
                <Col>{trade.amount}</Col>
              </Row>
            ))}
          </ListBody>
        </List>
      </Body>
    </Root>
  );
}
