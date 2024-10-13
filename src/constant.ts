export const WS_URL = process.env.NODE_ENV === 'production'
  ? 'wss://api.pearl.computer'
  : 'ws://localhost:8080';
