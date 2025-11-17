const WS_URL = (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + "/ws";
const ws = new WebSocket(WS_URL);

const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const messagesDiv = document.getElementById('messages');

sendBtn.onclick = () => {
  const text = msgInput.value;
  ws.send(JSON.stringify({ type:"chat", text }));
  msgInput.value = "";
}

ws.onmessage = (ev) => {
  const data = JSON.parse(ev.data);
  const el = document.createElement('div');
  el.textContent = data.text || JSON.stringify(data);
  messagesDiv.appendChild(el);
}
