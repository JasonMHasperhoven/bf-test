import React from 'react';
import styled from 'styled-components';
import OrderBook from './components/OrderBook';
import Ticker from './components/Ticker';
import Trades from './components/Trades';
import WebSocketActions from './components/WebSocketActions';

const Root = styled.div`
  margin: ${(props) => props.theme.spacing(3)} auto;
  max-width: 1024px;
`;

const Flex = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing()};
`;

function App() {
  return (
    <Root>
      <Flex>
        <Ticker />
        <WebSocketActions />
      </Flex>
      <Flex>
        <OrderBook />
        <Trades />
      </Flex>
    </Root>
  );
}

export default App;
