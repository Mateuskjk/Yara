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
};

const btnAvancarPass = document.querySelector("#enviar");

btnAvancarPass.addEventListener("click", async (e) => {
  e.preventDefault();

  // O e-mail chega através da URL (definido na página anterior)
  const urlParams = new URLSearchParams(window.location.search);
  const emailInURL = urlParams.get('email');
  const emailDecoded = decodeURIComponent(emailInURL);

  if (!emailDecoded) {
    console.error("E-mail do usuário não encontrado na URL");
    return;
  }

  const senha = document.querySelector("#pass").value;
  const confSenha = document.querySelector("#Confpass").value;

  if (!senha || !confSenha) {
    console.error("Nova senha não informada");
    return;
  }

  if (senha !== confSenha) {
    alert('As senhas informadas não coincidem.');
    return;
  }

  try {
    // Obtém o ID do usuário a partir do e-mail
    const userId = await getUserIdByEmail(emailDecoded);

    if (userId !== null) {
      // O servidor aplica o hash (bcrypt) antes de salvar a nova senha
      const response = await fetch(`/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senha }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar a senha. Status: ' + response.status);
      }

      await response.json();
      window.location.href = 'login.html';
    } else {
      console.error('Usuário não encontrado com o e-mail fornecido.');
    }
  } catch (err) {
    console.error('Erro durante a atualização de senha:', err);
  }
});

async function getUserIdByEmail(email) {
  const response = await fetch(`/usuarios?email=${encodeURIComponent(email)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Não foi possível obter o ID do usuário.');
  }

  const usuarios = await response.json();
  return usuarios.length > 0 ? usuarios[0].id : null;
}
