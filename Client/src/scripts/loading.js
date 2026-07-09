// Envia a passagem digital por e-mail para o primeiro passageiro da compra.
// As credenciais SMTP ficam no servidor (.env) — o cliente só informa o destinatário.
const infoticket = JSON.parse(localStorage.getItem('infoticket')) || {};
const passageiros = infoticket.passageiros || [];

if (passageiros.length > 0 && passageiros[0].email) {
  fetch('/passagens/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      para: passageiros[0].email,
      nome: passageiros[0].nome
    })
  }).catch((error) => console.error('Erro ao enviar e-mail da passagem:', error));
}

setTimeout(function() {
  window.location.href = "congratulations.html";
}, 7000);
