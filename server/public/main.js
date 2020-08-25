const socket = io();
const input = document.querySelector("#text");
const chat = document.querySelector("#chat");

socket.on("message", (message) => {
  console.log("in main.js", message);

  outputMessage(message);

  //   chatMessages.scrollTop = chatMessages.scrollHeight;
});

input.addEventListener("submit", (e) => {
  e.preventDefault();

  //get message text
  const message = e.target.elements.msg.value;
  //   console.log(message);

  //emit message to server
  socket.emit("chatMessage", message);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

const outputMessage = (message) => {
  const div = document.createElement("div");
  div.innerHTML = `<p>${message}</p>`;

  chat.appendChild(div);
};
