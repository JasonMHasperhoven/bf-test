export let socket;

export function connect() {
  return new Promise((resolve) => {
    socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    socket.onopen = (event) => {
      resolve({ onopenEvent: event, socket });
    };
  });
}

export function disconnect() {
  return new Promise((resolve) => {
    socket.close();
    socket.onclose = (event) => resolve(event.data);
  });
}

export function send(eventMessage) {
  socket.send(JSON.stringify(eventMessage));
}

export function subscribeTicker() {
  send({
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD',
  });
}

export function subscribeBook() {
  send({
    event: 'subscribe',
    channel: 'book',
    symbol: 'tBTCUSD',
  });
}

export function subscribeTrades() {
  send({
    event: 'subscribe',
    channel: 'trades',
    symbol: 'tBTCUSD',
  });
}
