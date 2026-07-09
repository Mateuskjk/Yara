const btnAccount = document.querySelector('#send');

btnAccount.addEventListener('click', function (e) {
  e.preventDefault();

  const nome = document.querySelector('#nome').value;
  const sobrenome = document.querySelector('#s-nome').value;
  const email = document.querySelector('#email').value;
  const confEmail = document.querySelector('#c-email').value;
  const senha = document.querySelector('#pass').value;
  const confSenha = document.querySelector('#Confpass').value;

  // As confirmações são validadas aqui no cliente e não são enviadas
  // nem armazenadas — o servidor só recebe os dados necessários.
  if (email !== confEmail) {
    alert('Os e-mails informados não coincidem.');
    return;
  }

  if (senha !== confSenha) {
    alert('As senhas informadas não coincidem.');
    return;
  }

  fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, sobrenome, email, senha })
  })
    .then(response => {
      if (response.status === 409) {
        throw new Error('E-mail já cadastrado.');
      }
      if (!response.ok) {
        throw new Error('Erro na solicitação. Status: ' + response.status);
      }
      return response.json();
    })
    .then(() => {
      window.location.href = "login.html";
    })
    .catch(error => {
      console.error('Erro:', error);
      alert(error.message);
    });
});

function mostrarSenha(){
  var inputPass = document.getElementById('pass')
  var btnShowPass = document.getElementById('btn-senha')

  if(inputPass.type === 'password'){
    inputPass.setAttribute('type','text')
    btnShowPass.classList.replace('bi-eye', 'bi-eye-slash')
  } else{
    inputPass.setAttribute('type','password')
    btnShowPass.classList.replace('bi-eye-slash','bi-eye')
  }
}

function mostrarConfSenha(){
  var inputPass = document.getElementById('Confpass')
  var btnShowPass = document.getElementById('btn-Confsenha')

  if(inputPass.type === 'password'){
    inputPass.setAttribute('type','text')
    btnShowPass.classList.replace('bi-eye', 'bi-eye-slash')
  } else{
    inputPass.setAttribute('type','password')
    btnShowPass.classList.replace('bi-eye-slash','bi-eye')
  }
}
