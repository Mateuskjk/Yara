const btnAvançar = document.querySelector("#enviar");

btnAvançar.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;

  // Busca apenas pelo e-mail informado — a API não expõe senhas
  fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(email)}`)
    .then((res) => res.json())
    .then((usuarios) => {
      if (usuarios.length > 0) {
        document.querySelector('.search-bar').classList.remove('error', 'highlight');
        document.querySelector('.search-bar').classList.add('highlight');

        // Passa o e-mail para a próxima página via parâmetro de consulta na URL
        window.location.href = `forget-password.html?email=${encodeURIComponent(email)}`;
      } else {
        document.querySelector('.search-bar').classList.remove('highlight');
        document.querySelector('.search-bar').classList.add('error');
        console.log('E-mail não encontrado no banco de dados');
      }
    });
});
