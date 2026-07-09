const infotickets = JSON.parse(localStorage.getItem('pesquisaInfo'));

const from = document.getElementById('from')
from.textContent = infotickets.fromName;

const destiny = document.getElementById('to')
destiny.textContent = infotickets.toName;

function converterFormatoData(dataString) {
  // Divida a string em partes usando o delimitador "-"
  var partes = dataString.split("-");

  // Reorganize as partes para o formato desejado "dd-mm-yyyy"
  var dataFormatada = partes[2] + "-" + partes[1] + "-" + partes[0];

  return dataFormatada;
}

var dataDefault = infotickets.dateIdaName;
var dataConvert = converterFormatoData(dataDefault);

const departure = document.getElementById('departure')
departure.textContent = dataConvert;

var dataOriginal = infotickets.dateVoltaName;
var dataConvertida = converterFormatoData(dataOriginal);

const arrival = document.getElementById('arrival')
arrival.textContent = dataConvertida;

const dataValue = infotickets.idaEVoltaName

if(dataValue === "-1"){
  var dataOriginal = infotickets.dateVoltaName;
  var dataOriginal = converterFormatoData(dataOriginal);

  const datavolta = document.getElementById('arrival')
  datavolta.innerText = "Somente Ida" 
}else{
  const datavolta = document.getElementById('arrival')
  datavolta.innerText= dataConvertida;
}

const classe = infotickets.classeName;

if (classe === "1") {
  const classeViagem = document.getElementById('tripClass');
  classeViagem.textContent = "Econômico";
} else {
  const classeViagem = document.getElementById('tripClass');
  classeViagem.textContent = "Executiva";
}

const empresa = infotickets.cardID;

const companhias = document.getElementById('company')
companhias.textContent = empresa

fetch('/horarios')
  .then(res => res.json())
  .then(dataArray => {
    // Check if the array is not empty
    if (dataArray.length > 0) {
      const firstElement = dataArray[0];
      const time = firstElement.Time;

      document.getElementById('time').innerText = time;
    } else {
      console.log('Array is empty. Unable to retrieve "Time" property.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

fetch('/siglas')
  .then(res => res.json())
  .then(siglaArray => {
    console.log('Sigla Array:', siglaArray);

    // Ensure that the localStorage retrieval is correct
    const localFrom = localStorage.getItem('pesquisaInfo');
    const origem = localFrom ? JSON.parse(localFrom).fromName : null;
    const destino = localFrom ? JSON.parse(localFrom).toName : null;

    if (origem) {
      // Find the matching object in the array based on the "local" property (case-insensitive)
      const matchingObject = siglaArray.find(obj => obj.local.toLowerCase() === origem.toLowerCase());

      console.log('Matching Object:', matchingObject);

      if (matchingObject) {
        const from = document.getElementById('from-abev');
        from.textContent = matchingObject.sigla;
      } else {
        console.log('No matching object found for origem:', origem);
      }
    } else {
      console.log('No "fromName" found in localStorage.');
    }

    if (destino) {
      // Find the matching object in the array based on the "local" property (case-insensitive)
      const matchingObject = siglaArray.find(obj => obj.local.toLowerCase() === destino.toLowerCase());

      console.log('Matching Object:', matchingObject);

      if (matchingObject) {
        const from = document.getElementById('to-abev');
        from.textContent = matchingObject.sigla;
      } else {
        console.log('No matching object found for destino:', destino);
      }
    } else {
      console.log('No "toName" found in localStorage.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


function generateRandomCode() {
  // Gera um número aleatório com 4 dígitos
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  
  // Constrói o código adicionando "YR" à frente dos dígitos
  const randomCode = `YR${randomDigits}`;
  
  return randomCode;
}
  
// Obtém o elemento com o ID "varCode"
const varCodeElement = document.getElementById('varCode');
  
// Gera o código aleatório e preenche o elemento HTML
const randomCode = generateRandomCode();
varCodeElement.textContent = randomCode;
  
fetch('/passageiros')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Verifica se a propriedade 'passageiros' existe e é um array
        if (data && Array.isArray(data)) {
            // Verifica se o array não está vazio
            if (data.length > 0) {
                const infotickets = localStorage.getItem('pesquisaInfo');
                const passName = infotickets ? JSON.parse(infotickets).passName : null;
            
                if (passName !== null && typeof passName !== 'undefined') {
                    console.log('Valor de passName:', passName);
      
                    // Pega os últimos passageiros no array com base no valor de passName
                    const ultimosPassageiros = data.slice(-passName);
                    console.log('Últimos passageiros:', ultimosPassageiros);
            
                    // Itera sobre os últimos passageiros e realiza as operações desejadas
                    ultimosPassageiros.forEach((passageiro, index) => {
                        console.log(`Nome do Último Passageiro ${index + 1}:`, passageiro.nome);
                        console.log(`Sobrenome do Último Passageiro ${index + 1}:`, passageiro.sobrenome);
                    });
            
                    // Se houver mais de um passageiro, preenche o elemento HTML geral
                    if (passName > 1) {
                        const passengerGeneralElement = document.getElementById(`passenger`);
                        const passageirosNomesCompletos = ultimosPassageiros.map(passageiro => `${passageiro.nome} ${passageiro.sobrenome}`);
                        passengerGeneralElement.textContent = passageirosNomesCompletos.join(', ');
                    }
                } else {
                    console.log('passName não está definido ou é nulo.');
                }
            } else {
                console.log('O array de passageiros está vazio.');
            }            
        }    
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });


