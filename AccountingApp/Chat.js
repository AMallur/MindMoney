async function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  addMessage('You', msg);
  input.value = '';
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  });
  const data = await res.json();
  addMessage('Bot', data.reply);
}

function addMessage(sender, text) {
  const windowEl = document.getElementById('chat-window');
  const entry = document.createElement('div');
  entry.className = 'chat-entry';
  entry.innerHTML = `<strong>${sender}:</strong> ${text}`;
  windowEl.appendChild(entry);
  windowEl.scrollTop = windowEl.scrollHeight;
}

if (document.getElementById('chat-form')) {
  document.getElementById('chat-form').addEventListener('submit', sendMessage);
