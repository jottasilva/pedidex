import { WS_URL } from "./apiService";

class WebSocketService {
  constructor() {
    this.url = WS_URL;
    this.socket = null;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("Conectado ao WebSocket");
    };

    this.socket.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        console.log("Mensagem recebida:", receivedData);
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
  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message)); // Enviando apenas "message"
        console.log("Mensagem enviada:", { message });
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
