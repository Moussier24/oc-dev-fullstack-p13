declare module 'sockjs-client/dist/sockjs' {
  const SockJS: {
    new (url: string, _reserved?: any, options?: any): WebSocket;
  };
  export default SockJS;
}
