const w = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

w.onmessage = (msg) => console.log(msg.data);

const tickerSubscriptionMessage = JSON.stringify({
  event: 'subscribe',
  channel: 'ticker',
  symbol: 'tBTCUSD',
});

w.onopen = () => w.send(tickerSubscriptionMessage);

w.close();
