let socket = null;

export const connectWebSocket = (onMessage) => {
  socket = new WebSocket("ws://127.0.0.1:8000/ws");

  socket.onopen = () => {
    console.log("✅ Connected to Nexora WebSocket");

    // Keep connection alive every 30 seconds
    setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send("ping");
      }
    }, 30000);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("❌ WebSocket Disconnected");
  };

  socket.onerror = (error) => {
    console.log(error);
  };
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};
