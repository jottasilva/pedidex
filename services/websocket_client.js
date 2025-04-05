import { WS_URL } from "./apiService";
import { useWebSocketStore } from "./useWebSocketStore";

class WebSocketService {
  constructor() {
    this.url = WS_URL;
    this.socket = null;
  }

  connect() {
    this.socket = new WebSocket(this.url);
    const store = useWebSocketStore();
    this.socket.onopen = () => {
      console.log("Conectado ao WebSocket");
    };
  
    this.socket.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        if (receivedData.message !== 'service' && receivedData.table_number != null) {
          store.addMessage(receivedData);
      }
      } catch (error) {
        console.log("Erro ao processar mensagem recebida:", error);
      }
    };
    

    this.socket.onerror = (error) => {
      console.log("Erro no WebSocket:", error);
    };

    this.socket.onclose = () => {
      console.log("Conexão WebSocket fechada");
    };
  }
  onMessage(event) {
    try {
      const receivedData = JSON.parse(event.data);
    } catch (error) {
      console.log("Erro ao processar mensagem recebida:", error);
    }
  }
  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));  
    } else {
        console.log("WebSocket não está conectado.");
    }
}

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
