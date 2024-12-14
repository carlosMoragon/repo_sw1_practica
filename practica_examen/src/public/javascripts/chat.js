const socket = io();

socket.on('chat', (msg) => {
    const emisor = msg.emisor;
    const message = msg.message;

    renderOtherMessage(emisor, message);
});

function renderMyMessage(message){
    console.log("entra");
    const messagesContainer = document.getElementById('messagesContainer');

    let item = document.createElement("li");

    let contentDiv = document.createElement("div");
    contentDiv.className = "content-message";

    let info_label = document.createElement("label");
    info_label.textContent = message;
    info_label.className = "info-message";  

    let author_label = document.createElement("label");
    author_label.textContent = "YOU";
    author_label.className = "author-message my-message";

    contentDiv.appendChild(author_label);
    contentDiv.appendChild(info_label);

    item.appendChild(contentDiv);
    item.className = "my-message message";
    
    messagesContainer.appendChild(item);
}

function renderOtherMessage(emisor, message){
    const messagesContainer = document.getElementById('messagesContainer');

    let item = document.createElement("li");

    let contentDiv = document.createElement("div");
    contentDiv.className = "content-message";

    let info_label = document.createElement("label");
    info_label.textContent = message;
    info_label.className = "info-message";  

    let author_label = document.createElement("label");
    author_label.textContent = emisor;
    author_label.className = "author-message other-message";

    contentDiv.appendChild(author_label);
    contentDiv.appendChild(info_label);

    item.appendChild(contentDiv);
    item.className = "other-message message";
    
    messagesContainer.appendChild(item);
}

document.getElementById("form_message").addEventListener('submit', (e) => {
    e.preventDefault();
});

function sendMessage(emisor){
    const message = document.getElementById("messageInput");
    console.log(`message: ${message}, emisor: ${emisor}`);
    socket.emit('chat', {
        message: message.value,
        emisor: emisor
    });

    
    renderMyMessage(message.value);
    message.value = "";
}