// Array para armazenar informações dos passageiros
let passageiros = [];

const addInformationPassenger = document.querySelector('#save');

addInformationPassenger.addEventListener('click', () => {
    // Obter valores dos inputs
    const nome = document.querySelector('#nome').value;
    const sobrenome = document.querySelector('#s-nome').value;
    const cpf = document.querySelector('#cpf').value;
    const rg = document.querySelector('#rg').value;
    const idade = document.querySelector('#idade').value;
    const email = document.querySelector('#email').value;

    // Criar objeto com as informações
    const passageiro = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        rg: rg,
        idade: idade,
        email: email
    };

    // Adicionar objeto ao array
    passageiros.push(passageiro);

    alert("Informações Salvas de: " + passageiros[passageiros.length - 1].nome);

    // Limpar os campos dos inputs após adicionar as informações
    document.querySelector('#nome').value = '';
    document.querySelector('#s-nome').value = '';
    document.querySelector('#cpf').value = '';
    document.querySelector('#rg').value = '';
    document.querySelector('#idade').value = '';
    document.querySelector('#email').value = '';

    // Exibir o array no console (pode ser removido em produção)
    console.log(passageiros);

    // Recuperar o objeto infoticket do sessionStorage
    const infoticketData = localStorage.getItem('infoticket');
    const infoticket = JSON.parse(infoticketData) || {};

    // Adicionar os dados do passageiro ao objeto infoticket
    infoticket.passageiros = passageiros;

    // Atualizar o objeto infoticket no sessionStorage
    localStorage.setItem('infoticket', JSON.stringify(infoticket));
    
});


const sendToDBButton = document.querySelector('#send');

sendToDBButton.addEventListener('click', () => {
// Supondo que 'passageiros' seja o array que você deseja enviar para o servidor
fetch('/passageiros', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(passageiros),
})
    .then(response => response.json())
    .then(data => {
        alert(data.statusCode === 200 ? 'Passageiros salvos com sucesso!' : 'Erro ao salvar passageiros.');
        
        // Limpar o array local se desejar
        // passageiros = [];

        // Se você quiser manter os dados locais e apenas enviar os novos, 
        // você pode criar uma nova array para os novos passageiros
        const novosPassageiros = [];

        // Redirecionar após o processamento bem-sucedido
        
        sendToDBButton.disabled = true;
    })
    .catch(error => console.error('Erro ao enviar para o banco de dados:', error));
    
    window.location.href = 'payment.html';
});


