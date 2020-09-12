import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { connect, disconnect } from '../slices/socket';

const Root = styled.div`
  padding: ${(props) => props.theme.spacing()};
  align-items: center;
  display: flex;
`;

export default function WebSocketActions() {
  const dispatch = useDispatch();
  const { isConnected, isConnecting, isDisconnecting } = useSelector(
    (state) => state.socket
  );

  return (
    <Root>
      {isConnected ? (
        <Button
          onClick={() => dispatch(disconnect())}
          loading={isDisconnecting}
          disabled={isDisconnecting}
          red
        >
          Disconnect
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(connect())}
          loading={isConnecting}
          disabled={isConnecting}
          green
        >
          Connect
        </Button>
      )}
    </Root>
  );
}
