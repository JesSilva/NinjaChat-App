class ChatUI{

    // Construtor
    constructor(list){
        this.list = list;
    }

    // Gera o template HTML para cada mensagem obtida
    render(data){
        // Modifica a data da mensagem para um formato mais agradável de leitura
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true }
        )
        const html = `
            <li class="list-group-item">
                <span class="username">${ data.username }</span>
                <span class="msg">${ data.message }</span>
                <div class="time">${ when }</div>
            </li>
        `;

        // Adiciona a mensagem à lista
        this.list.innerHTML += html;
    }

    // Limpa a lista
    clear(){
        this.list.innerHTML = '';
    }
}