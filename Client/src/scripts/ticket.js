// Verifique se há dados no localStorage
if (localStorage.getItem('pesquisaInfo')) {
  // Recupere a string JSON dos dados do localStorage
  const pesquisaInfoJSON = localStorage.getItem('pesquisaInfo');
  
  // Converta a string JSON de volta para um objeto
  const pesquisaInfo = JSON.parse(pesquisaInfoJSON);

  //recupera os dados do input salvos no localStorage e sobre escreve os elementos no HTML.
  const h2Origem = document.getElementById('origem'); 
  h2Origem.textContent = pesquisaInfo.fromName;

  const h2Origem2 = document.getElementById('origem2'); 
  h2Origem2.textContent = pesquisaInfo.fromName;

  const h2Origem3 = document.getElementById('origem3'); 
  h2Origem3.textContent = pesquisaInfo.fromName;

  const h2Destino = document.getElementById('destino');
  h2Destino.textContent = pesquisaInfo.toName;

  const h2Destino2 = document.getElementById('destino2');
  h2Destino2.textContent = pesquisaInfo.toName;

  const h2Destino3 = document.getElementById('destino3');
  h2Destino3.textContent = pesquisaInfo.toName;

  function converterFormatoData(dataString) {
    // Divida a string em partes usando o delimitador "-"
    var partes = dataString.split("-");

    // Reorganize as partes para o formato desejado "dd-mm-yyyy"
    var dataFormatada = partes[2] + "-" + partes[1] + "-" + partes[0];

    return dataFormatada;
  }

  var dataOri = pesquisaInfo.dateIdaName;
  var dataconvert = converterFormatoData(dataOri)

  // Use a função para converter e exibir a data no formato "dd/mm/yyyy"
  const dataida = document.getElementById('data-ida');
  dataida.innerHTML = dataconvert;

  var dataOriginal = pesquisaInfo.dateVoltaName;
  var dataConvertida = converterFormatoData(dataOriginal);

  // Use a função para converter e exibir a data no formato "dd/mm/yyyy"
  const datavolta = document.getElementById('data-volta');
  datavolta.innerHTML = dataConvertida;

  //faz uma verificação de a seleção de ida de volta na index é sim ou não
  const dataid = pesquisaInfo.idaEVoltaName

  if(dataid === "-1") {
    const dataOriginal = pesquisaInfo.dateVoltaName;
    const dataConvertida = converterFormatoData(dataOriginal);

    const datavolta = document.getElementById('data-volta')
    datavolta.innerText = "Somente Ida" 
  }
  else{
    const datavolta = document.getElementById('data-volta')
    datavolta.innerText= dataConvertida;
  }
  //
    var dataOriginal = pesquisaInfo.dateIdaName;
    var dataConvertida = converterFormatoData(dataOriginal);

    // Use a função para converter e exibir a data no formato "dd/mm/yyyy"
    const dataida2 = document.getElementById('data-ida2');
    dataida2.innerHTML = dataConvertida;
  
    var dataOriginal = pesquisaInfo.dateVoltaName;
    var dataConvertida = converterFormatoData(dataOriginal);
  
    // Use a função para converter e exibir a data no formato "dd/mm/yyyy"
    const datavolta2 = document.getElementById('data-volta2');
    datavolta2.innerHTML = dataConvertida;
  
    //faz uma verificação de a seleção de ida de volta na index é sim ou não
    const dataid2 = pesquisaInfo.idaEVoltaName
  
    if(dataid2 === "-1") {
      const dataOriginal = pesquisaInfo.dateVoltaName;
      const dataConvertida = converterFormatoData(dataOriginal);
  
      const datavolta = document.getElementById('data-volta2')
      datavolta.innerText = "Somente Ida" 
    }
    else{
      const datavolta = document.getElementById('data-volta2')
      datavolta.innerText= dataConvertida;
    }
  //
  var dataO = pesquisaInfo.dateIdaName;
  var dataCon = converterFormatoData(dataO);

  // Use a função para converter e exibir a data no formato "dd/mm/yyyy"
  const dataida3 = document.getElementById('data-ida3');
  dataida3.innerHTML = dataCon;

  var dataO = pesquisaInfo.dateVoltaName;
  var dataCon = converterFormatoData(dataO);

  // Use a função para converter e exibir a data no formato "dd/mm/yyyy"
  const datavolta3 = document.getElementById('data-volta3');
  datavolta3.innerHTML = dataCon;

  //faz uma verificação de a seleção de ida de volta na index é sim ou não
  const dataid3 = pesquisaInfo.idaEVoltaName

  if(dataid3 === "-1") {
    const dataOriginal = pesquisaInfo.dateVoltaName;
    const dataConvertida = converterFormatoData(dataOriginal);

    const datavolta = document.getElementById('data-volta3')
    datavolta.innerText = "Somente Ida" 
  }
  else{
    const datavolta = document.getElementById('data-volta3')
    datavolta.innerText= dataConvertida;
  }
  //
  const classe = pesquisaInfo.classeName;

  if (classe === "1") {
    const classeViagem = document.getElementById('class');
    classeViagem.textContent = "Econômico";
  } else {
    const classeViagem = document.getElementById('class');
    classeViagem.textContent = "Executiva";
  }

  const classes = ["Econômico", "Executiva"];

  let classe2;
  do {
    classe2 = classes[Math.floor(Math.random() * classes.length)];
  } while (classe2 === classe); // Ensure classe2 is not the same as btn1's class

  const classeViagem2 = document.getElementById('class2');
  classeViagem2.textContent = classe2;

  let classe3;
  do {
    classe3 = classes[Math.floor(Math.random() * classes.length)];
  } while (classe3 === classe || classe3 === classe2); // Ensure classe3 is different from btn1's class and classe2

  const classeViagem3 = document.getElementById('class3');
  classeViagem3.textContent = classe3;

  const h2Passageiro = document.getElementById('qtd-pass');
  h2Passageiro.textContent = pesquisaInfo.passName + " - Passageiro";

  const h2Passageiro2 = document.getElementById('qtd-pass2');
  h2Passageiro2.textContent = pesquisaInfo.passName + " - Passageiro";

  const h2Passageiro3 = document.getElementById('qtd-pass3');
  h2Passageiro3.textContent = pesquisaInfo.passName + " - Passageiro";

  function gerarValorAleatorioComDuasCasasDecimais() {
    const valorAleatorio = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    const valorFormatado = valorAleatorio.toFixed(2);
  
    return "R$" + valorFormatado;
  }
  
  function preencherCampoEAtualizar(valor, elemento) {
    elemento.textContent = valor;
  }

  // Gerar e preencher valor para o campo principal
  const inputPassagem = document.querySelector("#valor-passagem");
  const passagem = gerarValorAleatorioComDuasCasasDecimais();
  preencherCampoEAtualizar(passagem, inputPassagem);
  passagem.innerText = passagem;

  // Gerar e preencher valor para o campo principal
  const inputPassagem2 = document.querySelector("#valor-passCard2");
  const passagem2 = gerarValorAleatorioComDuasCasasDecimais();
  preencherCampoEAtualizar(passagem2, inputPassagem2);
  passagem2.innerText = passagem2;

  // Gerar e preencher valor para o campo principal
  const inputPassagem3 = document.querySelector("#valor-passCard3");
  const passagem3 = gerarValorAleatorioComDuasCasasDecimais();
  preencherCampoEAtualizar(passagem3, inputPassagem3);
  passagem3.innerText = passagem3;

  function handleClick(event, passagem, classeName, cardID, cardText) {
    const storedData = localStorage.getItem('pesquisaInfo');
    const storedObject = JSON.parse(storedData) || {};
      
    storedObject.botao = event.target.innerText;
    storedObject.dataAtivo = event.target.getAttribute('data-ativo');
    storedObject.passagem = passagem;
    storedObject.classeName = classeName;
    storedObject.cardID = cardID;
    storedObject.cardID = cardText;
    storedObject.fromName = pesquisaInfo.fromName;
    storedObject.toName = pesquisaInfo.toName;
    storedObject.dateIdaName = pesquisaInfo.dateIdaName;
    storedObject.dateVoltaName = pesquisaInfo.dateVoltaName;
    storedObject.idaEVoltaName = pesquisaInfo.idaEVoltaName;
    storedObject.passName = pesquisaInfo.passName;
  
    // Recuperar ou inicializar a matriz de infotickets
    let infotickets = JSON.parse(localStorage.getItem('infotickets')) || [];
  
    // Criar o novo objeto infoticket
    const infoticket = {
      valorPassagem: passagem,
      classViagem: classeName,
      origem: pesquisaInfo.fromName,
      destino: pesquisaInfo.toName,
      dateIda: pesquisaInfo.dateIdaName,
      dateVolta: pesquisaInfo.dateVoltaName,
      idaEVoltaName: pesquisaInfo.idaEVoltaName,
      passageiros: pesquisaInfo.passName
    };
  
    // Adicionar o novo objeto à matriz
    infotickets.push(infoticket);
  
    // Armazenar a matriz atualizada de infotickets
    localStorage.setItem('infotickets', JSON.stringify(infotickets));
  
    console.log(storedObject);
    console.log(infoticket);
  
    localStorage.setItem('pesquisaInfo', JSON.stringify(storedObject));
    window.location.href = 'infoPassenger.html';
  }
  // URL do banco de dados
  const url = '/companhias';
  
  // Variáveis para armazenar os dados
  let company_name = "";
  let company_name2 = "";
  let company_name3 = "";
  
  // Função para obter dados aleatórios
  function getRandomCompany(data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex].empresa;
  }

  let cardOne, cardTwo, cardThree;
  
  // Função para realizar o fetch no banco de dados
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Atribuir dados aleatórios às variáveis
      company_name = getRandomCompany(data);
      company_name2 = getRandomCompany(data);
      company_name3 = getRandomCompany(data);
  
      cardOne = document.querySelector('#company-name')
      cardOne.textContent = company_name;
  
      cardTwo = document.querySelector('#company-name2')
      cardTwo.textContent = company_name2;
  
      cardThree = document.querySelector('#company-name3')
      cardThree.textContent = company_name3;
  
      // Aqui você pode realizar qualquer outra ação com os dados
      console.log("company_name:", company_name);
      console.log("company_name2:", company_name2);
      console.log("company_name3:", company_name3);
    })
    .catch(error => console.error('Erro ao obter dados:', error));
  
  // Adicionar listeners para os botões
  document.getElementById('btn1').addEventListener('click', (event) => handleClick(event, passagem, pesquisaInfo.classeName, 'cardOne', cardOne.textContent));
  document.getElementById('btn2').addEventListener('click', (event) => handleClick(event, passagem2, classe2, 'cardTwo', cardTwo.textContent));
  document.getElementById('btn3').addEventListener('click', (event) => handleClick(event, passagem3, classe3, 'cardThree', cardThree.textContent));
  
  // Gerar e preencher valores para os cards
  function gerarValoresAleatoriosParaTresCards() {
    const valores = [];
    for (let i = 0; i < 3; i++) {
      valores.push(gerarValorAleatorioComDuasCasasDecimais());
    }
    return valores;
  }
  
  const valoresAleatorios = gerarValoresAleatoriosParaTresCards();
  
  const cards = document.querySelectorAll(".card");
  
  for (let i = 0; i < cards.length; i++) {
    preencherCampoEAtualizar(valoresAleatorios[i], cards[i]);
  }
}