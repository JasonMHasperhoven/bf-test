import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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

const TextWrapper = styled.div`
  flex-grow: 1;
`;

const Text = styled.div``;

const SubText = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.primaryTextColor3};
`;

export default function Ticker(props) {
  const ticker = useSelector((state) => state.ticker.data);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
  });

  return (
    <Root>
      <Icon src="https://www.bitfinex.com/assets/BTC-alt-631a4985ef5564fba7508526f8952ba54cd598318506bee963cc9b6d00600278.svg" />
      {ticker && (
        <>
          <TextWrapper>
            <Text>BTC/USD</Text>
            <SubText>VOL {formatter.format(ticker.volume)}</SubText>
            <SubText>LOW {formatter.format(ticker.low)}</SubText>
          </TextWrapper>
          <TextWrapper>
            <Text>{formatter.format(ticker.lastPrice)}</Text>
            <SubText>
              {Math.round(ticker.dailyChange * 100) / 100} (
              {Math.round(ticker.dailyChangeRelative * 10000) / 100}%)
            </SubText>
            <SubText>HIGH {formatter.format(ticker.high)}</SubText>
          </TextWrapper>
        </>
      )}
    </Root>
  );
}
