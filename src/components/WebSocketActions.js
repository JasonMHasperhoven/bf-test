import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { connect, disconnect } from '../slices/socket';

const Root = styled.div`
  padding: ${(props) => props.theme.spacing()};
`;

const ConnectButton = styled(Button)`
  background: ${(props) => props.theme.buyColor};
  border-color: ${(props) => props.theme.buyColor};
  color: ${(props) => props.theme.primaryTextColor};
`;

const DisconnectButton = styled(Button)`
  background: ${(props) => props.theme.sellColor};
  border-color: ${(props) => props.theme.sellColor};
  color: ${(props) => props.theme.primaryTextColor};
`;

export default function WebSocketActions() {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.socket.isConnected);

  return (
    <Root>
      {' '}
      {isConnected ? (
        <DisconnectButton onClick={() => dispatch(disconnect())}>
          Disconnect
        </DisconnectButton>
      ) : (
        <ConnectButton onClick={() => dispatch(connect())}>
          Connect
        </ConnectButton>
      )}
    </Root>
  );
}
