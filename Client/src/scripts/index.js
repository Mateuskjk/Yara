//Esconde menu hamburger que é ativado na responsividade==
function eventBtn() {
  const navBar = document.getElementById("loginButton");
  navBar.classList.toggle("hidemenu");
}
//========================================================


//botão do final leva pro topo da página=================
var startButton = document.querySelector('.start-btn');
startButton.addEventListener('click', function() {
  window.scrollTo(0, 0, {
    duration: 3000,
  });
});
//======================================================
// Obtenha a data atual em formato ISO (YYYY-MM-DD)
const hoje = new Date().toISOString().split('T')[0];

// Defina a data mínima inicialmente para a ida
document.getElementById('date1').min = hoje;

// Adicione um ouvinte de evento para o elemento de entrada de data para a ida
document.getElementById('date1').addEventListener('change', function() {
  // Obtém a data selecionada para a ida pelo usuário
  const dataIdaSelecionada = this.value;

  // Atualiza a data mínima dinamicamente para a volta com a data selecionada para a ida
  document.getElementById('volta').min = dataIdaSelecionada;
});


// Defina a data mínima inicialmente para a volta
document.getElementById('volta').min = hoje;

// Adicione um ouvinte de evento para o elemento de entrada de data para a volta
document.getElementById('volta').addEventListener('change', function() {
  // Obtém a data selecionada para a volta pelo usuário
  const dataVoltaSelecionada = this.value;

  // Atualiza a data mínima dinamicamente para a volta com a data selecionada para a volta
  document.getElementById('volta').min = dataVoltaSelecionada;
});



//link 1 leva a uma seção do site ====================
function scrollActive1() {
  const sections1 = document.querySelectorAll("section");

  sections1.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const link = document.querySelector(`a[href="#${section.id}"]`);

    if (link && rect.top >= 0 && rect.bottom <= window.innerHeight) {
      link.classList.add("active");
    } else if (link) {
      link.classList.remove("active");
    }
  });
}
//======================================================



//link 2 leva a uma seção do site ====================
function scrollActive2() {
  const sections2 = document.querySelectorAll("section");

  sections2.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const link = document.querySelector(`a[href="#${section.id}"]`);

    if (link && rect.top >= 0 && rect.bottom <= window.innerHeight) {
      link.classList.add("active");
    } else if (link) {
      link.classList.remove("active");
    }
  });
}
//======================================================


//link 3 leva a uma seção do site ====================
function scrollActive3() {
  const sections3 = document.querySelectorAll("section");

  sections3.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const link = document.querySelector(`a[href="#${section.id}"]`);

    if (link && rect.top >= 0 && rect.bottom <= window.innerHeight) {
      link.classList.add("active");
    } else if (link) {
      link.classList.remove("active");
    }
  });
}

//======================================================
// Supondo que você já definiu a variável pesquisaInfo antes
let excecaoDetectada = false;

document.getElementById('select').addEventListener('change', function () {
    var selectValue = parseInt(this.value);
    var input = document.getElementById('volta');

    if (selectValue < 0) {
      input.disabled = true;
    } else {
      input.disabled = false;
    }
});

const btn = document.querySelector("#send");

btn.addEventListener("click", function (e) {
    e.preventDefault();

    // Verifique se a exceção foi detectada
    if (excecaoDetectada) {
      console.log('Exceção detectada! Redirecionando...');
      window.location.href = "ticket.html";
      return;
    }

    const inputOrigem = document.querySelector("#from");
    const inputDestino = document.querySelector("#to");
    const inputData1 = document.querySelector("#date1");
    const inputData2 = document.querySelector("#volta");
    const inputIdaEVolta = document.querySelector("#select");
    const inputClasse = document.querySelector("#classe");
    const inputPass = document.querySelector("#pass");

    const fromName = inputOrigem.value;
    const toName = inputDestino.value;
    const dateIdaName = inputData1.value;
    const dateVoltaName = inputData2.value;
    const idaEVoltaName = inputIdaEVolta.value;
    const classeName = inputClasse.value;
    const passName = inputPass.value;

    // Criando um objeto com as informações capturadas na Search Input
    const pesquisaInfo = {
      fromName,
      toName,
      dateIdaName,
      dateVoltaName,
      idaEVoltaName,
      classeName,
      passName
    };

    // Verifique se os valores não estão vazios e não são null, none, undefined ou NaN
    if (
      fromName &&
      toName &&
      dateIdaName &&
      dateVoltaName &&
      idaEVoltaName &&
      classeName &&
      passName
    ) {
        // Converte o objeto em JSON
      const pesquisaInfoJSON = JSON.stringify(pesquisaInfo);

        // Define o JSON no localStorage
      localStorage.setItem('pesquisaInfo', pesquisaInfoJSON);

        // Redireciona para a próxima página
      window.location.href = "ticket.html";
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }



});

// Realiza a solicitação para obter os destinos da URL
fetch('/destinos')
  .then(res => res.json())
  .then((json) => {
    console.log(json);
    const ul = document.getElementById('listarDestinos');
    json.forEach((destino) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="#">
          <span class="destino-name">${destino.destino}</span>
        </a>
      `;
      ul.appendChild(li);

      // Adiciona um ouvinte de evento de clique a cada LI
      li.addEventListener("click", function() {
        const destinoName = this.querySelector(".destino-name").textContent;
        const input = document.getElementById('from');
        input.value = destinoName.trim();

        // Volta o estilo display para "none" e remove a margem
        this.style.display = "none";
        this.style.margin = "0";
      });
    });
  });

//INPUT DO ORIGEM:
document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById('from');
  input.addEventListener("keyup", filtro);
});
  
// Função para filtrar destinos
function filtro() {
  var input, filter, ul, li, a, i, txtValue, span, count = 0;

  input = document.getElementById('from');
  ul = document.getElementById('listarDestinos');

  filter = input.value.toUpperCase();

  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];

    txtValue = a.textContent || a.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";

      count++;

      span = li[i].querySelector(".destino-name");

      if (span) {
        span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
          return "<strong>" + match + "</strong>";
        });
      }
    } else {
      li[i].style.display = "none";
    }
  }

  if (count === 0) {
    ul.style.display = "none";
		ul.style.margin = 0
  } else {
    ul.style.display = "block";
		ul.style.margin = 0
  }

	if (count === 1) {
    ul.style.display = "block";
		ul.style.margin = 0
  } else {
    ul.style.display = "none";
		ul.style.margin = 0
  }
}




//INPUT DO DESTINO:
fetch('/destinos')
  .then(res => res.json())
  .then((json) => {
    console.log(json);
    const ul = document.getElementById('listarDestinosVolta');
    json.forEach((destino) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="#">
          <span class="destino-name">${destino.destino}</span>
        </a>
      `;
      ul.appendChild(li);

      // Adiciona um ouvinte de evento de clique a cada LI
      li.addEventListener("click", function() {
        const destinoName = this.querySelector(".destino-name").textContent;
        const input = document.getElementById('to');
        input.value = destinoName.trim();

        // Volta o estilo display para "none" e remove a margem
        this.style.display = "none";
        this.style.margin = "0";
      });
    });
  });

//INPUT DO ORIGEM:
document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById('to');
  input.addEventListener("keyup", filtroDestino);
});
  
// Função para filtrar destinos
function filtroDestino() {
  var input, filter, ul, li, a, i, txtValue, span, count = 0;

  input = document.getElementById('to');
  ul = document.getElementById('listarDestinosVolta');

  filter = input.value.toUpperCase();

  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];

    txtValue = a.textContent || a.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";

      count++;

      span = li[i].querySelector(".destino-name");

      if (span) {
        span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
          return "<strong>" + match + "</strong>";
        });
      }
    } else {
      li[i].style.display = "none";
    }
  }

  if (count === 0) {
    ul.style.display = "none";
		ul.style.margin = 0
  } else {
    ul.style.display = "block";
		ul.style.margin = 0
  }

	if (count === 1) {
    ul.style.display = "block";
		ul.style.margin = 0
  } else {
    ul.style.display = "none";
		ul.style.margin = 0
  }
}