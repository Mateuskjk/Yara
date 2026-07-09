// Autenticação: envia e-mail e senha para o servidor, que valida com bcrypt.
// A senha nunca é salva no navegador e a lista de usuários nunca é exposta.
const btnLogin = document.querySelector("#enviar");

btnLogin.addEventListener("click", function(e){
  e.preventDefault();

  const email = document.querySelector("#tagName").value;
  const senha = document.querySelector("#pass").value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Credenciais inválidas');
      }
      return res.json();
    })
    .then((usuario) => {
      // Guarda apenas os dados públicos do usuário logado (sem senha)
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

      document.querySelector('.search-bar').classList.remove('error');
      document.querySelector('.search-bar').classList.add('highlight');

      window.location.href = 'index-with-icon.html';
    })
    .catch(() => {
      document.querySelector('.search-bar').classList.remove('highlight');
      document.querySelector('.search-bar').classList.add('error');
    });
})

//Mostra e Esconde a senha do usuário ==========================
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
// ==============================================================
