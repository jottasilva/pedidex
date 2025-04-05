import { defineStore } from "pinia";
import { ref, computed, watch, onMounted } from "vue";
import webSocketService from "./websocket_client";
export const useWebSocketStore = defineStore("websocket", () => {
  const messages = ref([]);

  function sanitizeMessage(payload) {
    const cleanedPayload = { ...payload };
    for (let key in cleanedPayload) {
      if (typeof cleanedPayload[key] === "function") {
        cleanedPayload[key] = null;
      }
    }
    return cleanedPayload;
  }

  function addMessage(payload) {
    const sanitizedMessage = sanitizeMessage(payload);
    sanitizedMessage.id = crypto.randomUUID();
    const now = new Date();
    sanitizedMessage.timestamp = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(now);

    messages.value.push(sanitizedMessage);
    saveMessagesToLocalStorage();
  }

  function saveMessagesToLocalStorage() {
    localStorage.setItem("messagesOrders", JSON.stringify(messages.value));
  }

  function loadMessagesFromLocalStorage() {
    const savedMessages = localStorage.getItem("messagesOrders");
    if (savedMessages) {
      messages.value = JSON.parse(savedMessages);
    }
  }

  const filteredMessages = computed(() => {
    return Array.isArray(messages.value)
      ? messages.value.filter((msg) => msg.message !== "service")
      : [];
  });

  function removeMessage(id) {
    messages.value = messages.value.filter((msg) => msg.id !== id);
    saveMessagesToLocalStorage();
  }

  const orderCallNotify = (number) => {
    const data = {
            establishment_id:number,
            message:"pedido",
            table_number:2123,
            group_name: "notify"
    };

    try {
        webSocketService.sendMessage(data);
       console.log("websocket avisado com sucesso!")
    } catch (err) {
        console.log("Error" + err);
    }
};

  onMounted(() => {
    loadMessagesFromLocalStorage();
  });

  return { messages, addMessage, filteredMessages, removeMessage, orderCallNotify};
});
