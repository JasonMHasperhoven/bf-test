import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import formatter from '../helpers/formatter';

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

const DailyChange = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.primaryTextColor3};

  ${(props) => props.positive && `color: ${props.theme.buyColor};`}
  ${(props) => props.negative && `color: ${props.theme.sellColor};`}
`;

export default function Ticker(props) {
  const ticker = useSelector((state) => state.ticker.data);

  return (
    <Root>
      <Icon src="https://www.bitfinex.com/assets/BTC-alt-631a4985ef5564fba7508526f8952ba54cd598318506bee963cc9b6d00600278.svg" />
      <TextWrapper>
        <Text>BTC/USD</Text>
        <SubText>VOL {formatter.format(ticker.volume)}</SubText>
        <SubText>LOW {formatter.format(ticker.low)}</SubText>
      </TextWrapper>
      <TextWrapper>
        <Text>{formatter.format(ticker.lastPrice)}</Text>
        <DailyChange
          positive={ticker.dailyChangeRelative > 0}
          negative={ticker.dailyChangeRelative < 0}
        >
          {ticker.dailyChange} ({ticker.dailyChangeRelative}%)
        </DailyChange>
        <SubText>HIGH {formatter.format(ticker.high)}</SubText>
      </TextWrapper>
    </Root>
  );
}
