// import store from '../store';

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

// socket.onmessage = (event) => {
//   store.dispatch({
//     type: 'receiveMessage',
//     payload: JSON.parse(event.data),
//   });
// };
