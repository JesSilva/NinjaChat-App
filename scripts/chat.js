class Chatroom{
    // Construtor
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats'); // Collection da base de dados
        this.unsub;
    }

    // Adição da mensagem à sala de chat
    async addMessage(msg){

        // formata o conteudo da mensagem para a inserção no banco
        const now = new Date();
        const chat = {
            message: msg,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        // Salva na base de dados e retorna o resultado
        const response = await this.chats.add(chat);
        return response;
    }

    // Monitora em tempo real as mensagens
    getChats(callback){

        this.unsub = this.chats
            .where('room', '==', this.room) // Ordenação por sala atual
            .orderBy('created_at') // Ordenação por data
            .onSnapshot(snapshot => { // Listener
                snapshot.docChanges().forEach(newMsgs => {
                    
                    //Atualiza a interface
                    if(newMsgs.type === 'added'){
                        callback(newMsgs.doc.data());
                    }
                });
            });
    }

    // Atualiza o nome do usuário
    updateUsername(username){
        this.username = username;
        localStorage.setItem('username', username);
    }

    // Atualiza o listener para a sala de chat escolhida
    updateRoom(room){
        this.room = room;
        
        if(this.unsub){
            this.unsub();
        }
    }
}