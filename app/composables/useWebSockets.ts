import { ref } from 'vue';

export const useWebSocket = (url: string) => {
    const message = ref('');
    const messages = ref<string[]>([]);
    const socket = ref<WebSocket | null>(null);

    const connect = () => {
        socket.value = new WebSocket(url);

        socket.value.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.value.onmessage = (event) => {
            messages.value.push(event.data);
        };

        socket.value.onclose = () => {
            console.log('WebSocket connection closed');
        };
    };

    const sendMessage = (msg: string) => {
        if (socket.value && socket.value.readyState === WebSocket.OPEN) {
            socket.value.send(msg);
        }
    };

    const disconnect = () => {
        if (socket.value) {
            socket.value.close();
        }
    };

    return {
        message,
        messages,
        connect,
        sendMessage,
        disconnect,
    };
};