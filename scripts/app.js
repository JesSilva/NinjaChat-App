const chatList = document.querySelector('.chat-list');
const newMsgForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

// Submit de nova mensagem
newMsgForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = newMsgForm.message.value.trim();

    chatroom.addMessage(message)
        .then(() => newMsgForm.reset())
        .catch(err => console.error(err));
});

// Atualiza o nome do usuário
newNameForm.addEventListener('submit', e => {
    e.preventDefault();

    const newName = newNameForm.username.value.trim();
    chatroom.updateUsername(newName);

    newNameForm.reset();

    // Exibe a mensagem de atualização
    updateMsg.innerText = `Nome atualizado para: ${ newName }`;
    setTimeout(() => updateMsg.innerText = '', 3000);
});

// Atualiza a sala e busca as mensagens da nova
rooms.addEventListener('click', e => {
    
    if(e.target.tagName === 'BUTTON'){

        // Limpa a lista
        chatUI.clear(); 
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(data => chatUI.render(data));
    }
});

// Verifica se o usuário já possui um username
const username = localStorage.username ? localStorage.username : 'Anon'; 

// Instancias das classes
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);


// Obtém os chats e renderiza eles na UI
chatroom.getChats(data => chatUI.render(data));