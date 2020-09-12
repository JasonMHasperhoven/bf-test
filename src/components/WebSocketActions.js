import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { connect, disconnect } from '../slices/socket';
import { subscribe as tickerSubscribe } from '../slices/ticker';

const Root = styled.div`
  padding: ${(props) => props.theme.spacing()};
`;

// const ConnectButton = styled(Button)`
//   background: ${(props) => props.theme.buyColor};
//   border-color: ${(props) => props.theme.buyColor};
//   color: ${(props) => props.theme.primaryTextColor};

//   ${(props) =>
//     props.loading &&
//     css`
//       background-image: repeating-linear-gradient(
//         -45deg,
//         transparent,
//         transparent 1rem,
//         rgba(0, 0, 0, 0.2) 1rem,
//         rgba(0, 0, 0, 0.2) 2rem
//       );
//     `}
// ` = styled(Button)`
//   background: ${(props) => props.theme.sellColor};
//   border-color: ${(props) => props.theme.sellColor};
//   color: ${(props) => props.theme.primaryTextColor};

//   ${(props) =>
//     props.loading &&
//     css`
//       background-image: repeating-linear-gradient(
//         -45deg,
//         transparent,
//         transparent 1rem,
//         rgba(0, 0, 0, 0.2) 1rem,
//         rgba(0, 0, 0, 0.2) 2rem
//       );
//     `}
// `;

export default function WebSocketActions() {
  const dispatch = useDispatch();
  const { isConnected, isConnecting, isDisconnecting } = useSelector(
    (state) => state.socket
  );

  // useEffect(() => {
  //   if (isConnected) {
  //     dispatch(tickerSubscribe());
  //   }
  // }, [dispatch, isConnected]);

  return (
    <Root>
      {' '}
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
