import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
// import Loader from './Loader';
// import Button from './Button';
// import {
//   billsRequest,
//   removeBillRequest,
//   addBillRequest,
// } from '../slices/bills';
// import { RootState } from '../store';

const Root = styled.div`
  width: 350px;
  display: flex;
  background: ${(props) => props.theme.secondaryBg};
  padding: ${(props) => props.theme.spacing()};
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-right: ${(props) => props.theme.spacing()};
`;

const VolumeWrapper = styled.div`
  flex-grow: 1;
`;

const LastWrapper = styled.div`
  flex-grow: 1;
`;

export default function Ticker(props) {
  // const dispatch = useDispatch();
  // const bills = useSelector((state: RootState) =>
  //   state.bills.data.filter((bill) => bill.isBill === isBill)
  // );
  // const [openBillId, setOpenBillId] = useState('');

  // useEffect(() => {
  //   dispatch(billsRequest());
  // }, [dispatch]);

  return (
    <Root>
      <Icon src="https://www.bitfinex.com/assets/BTC-alt-631a4985ef5564fba7508526f8952ba54cd598318506bee963cc9b6d00600278.svg" />
      <VolumeWrapper>BTC/USD</VolumeWrapper>
      <LastWrapper>10,343</LastWrapper>
    </Root>
  );
}
