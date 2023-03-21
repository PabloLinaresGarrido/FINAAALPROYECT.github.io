const Web3 = require('web3');
import * as CryptoJS from 'crypto-js';
import * as Mnemonic from "bitcore-mnemonic";
import { hdkey } from 'ethereumjs-wallet';
import * as util from 'ethereumjs-util';
  const bip39 = require('bip39');
  const Tx = require('ethereumjs-tx').Transaction;
  
  
  // o también: import bip39 from 'bip39';

// Obtener los elementos del DOM
const walletSeedInput = document.getElementById('wallet-seed');
const walletIdInput = document.getElementById('wallet-id');
const addWalletButton = document.getElementById('add-wallet');
const walletList = document.getElementById('wallet-list');
const toWalletSelect = document.getElementById('to-wallet');
const toRecipientInput = document.getElementById('to-recipient');
const amountInput = document.getElementById('amount');
const sendMoneyButton = document.getElementById('send-money');
const transactionListHTML = document.getElementById('transaction-list'); 
const transactionStatus = document.getElementById('transaction-status'); 




const web3 = new Web3('https://goerli.infura.io/v3/5e57f447d7f0441dbc41806f145c0446');

// Definir una función para validar el address
async function validateAddress(address) {
  // Verificar si el address es válido
  if (!web3.utils.isAddress(address)) {
    alert('Address inválido');
  }
  // Obtener el balance del address
  const balance = await web3.eth.getBalance(address);

  // Si el balance es cero, entonces el address no existe
  if (balance === '0') {
    alert('Address no encontrado');
  }

  // Si llegamos aquí, el address es válido y existe en la blockchain
  return true;
}

// Función para añadir una wallet a la lista
function addWalletToList(walletAddress, walletName) {
  const walletListItem = document.createElement('li');
  walletListItem.innerText = walletName;

  // Crear el botón para eliminar la wallet
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Eliminar';
  deleteButton.addEventListener('click', () => {
    // Eliminar la wallet del localStorage
    const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
    const updatedWallets = wallets.filter(wallet => wallet.address !== walletAddress);
    localStorage.setItem('wallets', JSON.stringify(updatedWallets));

    // Eliminar la wallet de la lista
    walletList.removeChild(walletListItem);
  });

  // Añadir el botón de eliminar a la lista
  walletListItem.appendChild(deleteButton);
  walletList.appendChild(walletListItem);

  const option = document.createElement('option');
  option.value = walletAddress;
  option.text = `${walletName}`;
  toWalletSelect.add(option);
}

// Función para guardar una wallet en el local storage
function saveWallet(walletAddress, walletName) {
  const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
  wallets.push({ address: walletAddress, name: walletName });
  localStorage.setItem('wallets', JSON.stringify(wallets));
}

// Función para cargar las wallets desde el local storage
function loadWallets() {
  const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
  wallets.forEach(wallet => {
    addWalletToList(wallet.address, wallet.name);
  });
}

// Añadir un listener para el botón de añadir wallet
addWalletButton.addEventListener('click', e => {
  e.preventDefault();
  const walletSeed = walletSeedInput.value.trim();
  const walletId = walletIdInput.value.trim();

  // Verificar si el campo de semilla está vacío
  if (!walletSeed) {
    alert('El campo de semilla está vacío');
    return;
  }

  // Verificar si el campo de nombre está vacío
  if (!walletId) {
    alert('El campo de nombre está vacío');
    return;
  }

  const walletAddress = walletSeed;

  // Recorrer la lista de wallets existentes y verificar si el nombre ya existe
  const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
  for (let i = 0; i < wallets.length; i++) {
    if (wallets[i].name === walletId) {
      alert('El nombre del propietario ya existe en la lista');
      return;
    }
  }

  validateAddress(walletAddress).then(() => {
    console.log('Address válido');
    const walletName = walletId;
    addWalletToList(walletAddress, walletName);
    saveWallet(walletAddress, walletName)

    });
});
    // Cargar las wallets guardadas en el local storage
    loadWallets();



//flat fat bounce donor guitar casino mule car suffer humor jewel purchase


// Obtener los elementos del DOM
const walletSeedInput2 = document.getElementById('wallet-seed2');
const walletIdInput2 = document.getElementById('wallet-id2');
const addWalletButton2 = document.getElementById('add-wallet2');
const walletList2 = document.getElementById('wallet-list2');
const toWalletSelect2 = document.getElementById('to-wallet2');

// Función para encriptar la semilla
function encryptSeed(seed) {
  const password = "password";
  return CryptoJS.AES.encrypt(seed, password).toString();
}

// Función para desencriptar la semilla
function decryptSeed(seed) {
  const password = "password";
  const bytes = CryptoJS.AES.decrypt(seed, password);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Función para añadir una wallet a la lista
function addWalletToList2(walletAddress, walletName) {
  const walletListItem = document.createElement('li');
  walletListItem.innerText = walletName;
  walletListItem.setAttribute('data-address', walletAddress); // Agregar atributo data-address

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Eliminar';
  deleteButton.addEventListener('click', () => {
    // Maneja la eliminación de la wallet
    removeWalletFromList2(walletAddress);
  });

  walletListItem.appendChild(deleteButton);
  walletList2.appendChild(walletListItem);

  const option = document.createElement('option');
  option.value = walletAddress;
  option.text = `${walletName}`;
  toWalletSelect2.add(option);

}


function removeWalletFromList2(walletAddress) {
  const wallets = JSON.parse(localStorage.getItem('wallets2') || '[]');
  const index = wallets.findIndex(wallet => wallet.address === walletAddress);
  if (index !== -1) {
    // Elimina la wallet de la lista
    const walletListItem = walletList2.querySelector(`li[data-address="${walletAddress}"]`); // Buscar elemento li por el atributo data-address
    if (walletListItem) {
      walletList2.removeChild(walletListItem);
    }

    // Elimina la wallet del selector de wallets
    const option = toWalletSelect2.querySelector(`option[value="${walletAddress}"]`);
    if (option) {
      toWalletSelect2.removeChild(option);
    }

    // Elimina la wallet del array de wallets en el local storage
    wallets.splice(index, 1);
    localStorage.setItem('wallets2', JSON.stringify(wallets));
  }
}


// Función para guardar una wallet en el local storage
function saveWallet2(walletAddress, walletName) {
  const wallets = JSON.parse(localStorage.getItem('wallets2') || '[]');
  wallets.push({ address: encryptSeed(walletAddress), name: walletName });
  localStorage.setItem('wallets2', JSON.stringify(wallets));
}

// Función para cargar las wallets desde el local storage
function loadWallets2() {
  const wallets = JSON.parse(localStorage.getItem('wallets2') || '[]');
  wallets.forEach(wallet => {
    addWalletToList2(wallet.address, wallet.name);
  });
}

// Añadir un listener para el botón de añadir wallet
addWalletButton2.addEventListener('click', e => {
  e.preventDefault();
  const walletSeed = walletSeedInput2.value.trim();
  const walletId = walletIdInput2.value.trim();
  const wallets = JSON.parse(localStorage.getItem('wallets2') || '[]');
  
  // Validar si los campos están vacíos
  if (!walletSeed || !walletId) {
    alert('Ambos campos son obligatorios');
    return;
  }
  
  // Validar si el nombre del propietario de la wallet ya existe
  for (let i = 0; i < wallets.length; i++) {
    if (wallets[i].name === walletId) {
      alert('El nombre del propietario ya existe en la lista');
      return;
    }
  }
  
  // Validar si existe una wallet con las mismas semillas
  for (let i = 0; i < wallets.length; i++) {
    if (wallets[i].address === walletSeed) {
      alert('Ya existe una wallet con esas semillas');
      return;
    }
  }
  
 
  
  // Suponemos que la semilla es la dirección de la wallet
  const walletAddress = walletSeed;
  const walletName = walletId;
  addWalletToList2(walletAddress, walletName);
  saveWallet2(walletAddress, walletName);
  window.location.reload(true);
  walletSeedInput2.value = '';
  walletIdInput2.value = '';

});
// Cargar las wallets desde el local storage
loadWallets2();

// Función para enviar dinero
async function sendMoney(e) {
  

  e.preventDefault();
  const fromselectedOption = Array.from(toWalletSelect2.options).find(option => option.value === toWalletSelect2.value);
  const fromAddressName = fromselectedOption.text;


  const toselectedOption = Array.from(toWalletSelect.options).find(option => option.value === toWalletSelect.value);
  const toAddressName = toselectedOption.text;


console.log(toAddressName);
console.log(fromAddressName);


  const toAddress = toWalletSelect.value;
  const amount = amountInput.value;
  const encryptedFromAddress = toWalletSelect2.value;
 
  // Desencriptar la semilla antes de usarla
  const decryptedWallet = JSON.parse(localStorage.getItem('wallets2')).find(wallet => wallet.address === encryptedFromAddress);
  const fromAddress = decryptSeed(decryptedWallet.address);
  console.log(`Enviando ${amount} desde ${fromAddress} a ${toAddress}`);
  // Hacer lo que sea necesario con toAddress y amount


  try {
    var mnemonic = new Mnemonic(fromAddress);
  } catch (error) {
    console.error('Error al crear objeto Mnemonic:', error);
    alert('Las semillas introducidas no son correctas');
  }
  

  
  async function enviarTransaccion() {
    
    


    var privateKey;
    var address_sender;
    let checksumAddress;
    bip39.mnemonicToSeed(mnemonic.toString()).then(async seed => {
  
      var path = "m/44'/60'/0'/0/0";
      var wallet = hdkey.fromMasterSeed(seed).derivePath(path).getWallet();
      privateKey = wallet.getPrivateKey();
      var publicKey = util.privateToPublic(privateKey);
      address_sender = '0x' + util.pubToAddress(publicKey).toString('hex');
      console.log(1, privateKey);
      console.log(2, address_sender);
      checksumAddress = web3.utils.toChecksumAddress(address_sender);
      console.log(3,`Checksum address: ${checksumAddress}`);
  
      // Clave privada de la cuenta emisora (debe ser manejada con precaución)
      privateKey = Buffer.from(privateKey, 'hex');
  
      // Obtener el nonce (número de transacciones enviadas desde la cuenta emisora)
      const nonce = await web3.eth.getTransactionCount(checksumAddress);
  
      // Valor a enviar (en wei)
      const value = web3.utils.toWei(amount, 'ether');
  
      async function getAdjustedGasPrice(additionalGas) {
        const gasPrice = await web3.eth.getGasPrice();
        const adjustedGasPrice = web3.utils.toBN(gasPrice).mul(web3.utils.toBN(additionalGas)).div(web3.utils.toBN(100)).add(web3.utils.toBN(gasPrice));
        return adjustedGasPrice;
      }
      
      // Gas price (en wei)
      const gasPrice = await getAdjustedGasPrice(30);

  
      // Gas limit
      var gasLimit = 21000;
  

      var balance = await web3.eth.getBalance(checksumAddress);
      balance = web3.utils.fromWei(balance, 'ether');
      var value2 = web3.utils.fromWei(value, 'ether');
      

      console.log(balance);
      console.log(value2);
   


      if(value2 <= 0){
        alert("La cantidad de ethers que envíes debe de ser positiva");
        sendMoneyButton.disabled = false;
        return false;
      }
     
      if(value2 >= balance){
        alert(`${fromAddressName} no tiene suficientes fondos para llevar a cabo la transacción`);
        sendMoneyButton.disabled = false;
        return false;
        
      } 
      sendMoneyButton.textContent ="Enviando transacción ...";
      transactionStatus.style.display = 'flex';
      sendMoneyButton.setAttribute('disabled', 'true');
      

      // Crear el objeto de transacción
      const txObject = {
        nonce: web3.utils.toHex(nonce),
        to: toAddress,
        value: web3.utils.toHex(value),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasLimit)
      };
  
      // Crear la transacción
      const tx = new Tx(txObject, { 'chain': 'goerli' });
  
      // Firmar la transacción con la clave privada
      tx.sign(privateKey);
  
      // Serializar la transacción
      const serializedTx = tx.serialize();
  
      // Enviar la transacción
      const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  
      // Imprimir el hash de la transacción
      console.log('Transacción enviada: ', receipt.transactionHash);
      // Crear un nuevo elemento li para la transacción



// Obtener la lista de transacciones del almacenamiento local
let transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];

// Función para agregar una transacción a la lista y guardarla en el almacenamiento local
function agregarTransaccionALaLista(transaccion) {
  // Agregar el hash de la transacción al objeto transaccion
  transaccion.hash = `https://goerli.etherscan.io/tx/${receipt.transactionHash}`;

  // Agregar la transacción a la lista
  transactionList.push(transaccion);

  // Guardar la lista actualizada en el almacenamiento local
  localStorage.setItem('transactionList', JSON.stringify(transactionList));
}

// Función para cargar la lista de transacciones en la página

var tiempo = new Date().toLocaleTimeString();
var fecha = new Date().toLocaleDateString();

// Ejemplo de uso:
// Agregar una transacción a la lista y cargar la lista actualizada en la página
let transaccion = {
  hash: receipt.transactionHash,
  valor: amount,
  de: fromAddressName,
  para: toAddressName,
  hora: tiempo,
  date: fecha,
};
sendMoneyButton.textContent ="Enviar tokens";
transactionStatus.style.display = 'none';
sendMoneyButton.disabled = false;
agregarTransaccionALaLista(transaccion);
cargarListaDeTransacciones();





alert(`La transacción desde la wallet: ${transaccion.de} con el valor de: ${transaccion.valor}ETH hacia: ${transaccion.para} ha sido completada con éxito`);


    });
  }


  enviarTransaccion();


  
   
  
  
 



}

// Añadir un listener para el botón de enviar dinero
sendMoneyButton.addEventListener('click', sendMoney);




function cargarListaDeTransacciones() {
  // Obtener la lista de transacciones del almacenamiento local
  let transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];

  // Limpiar la lista HTML
  transactionListHTML.innerHTML = '';

  transactionList.forEach(transaccion => {
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.textContent = 'Ver transacción en Etherscan';
    button.addEventListener('click', () => {
      window.open(`${transaccion.hash}`, '_blank');
      console.log(`${transaccion.hash}`);
    });
    li.textContent = `${transaccion.de} envió ${transaccion.valor}ETH a ${transaccion.para},  Hora: ${transaccion.hora} Día: ${transaccion.date} `;
    li.appendChild(button);
    transactionListHTML.insertBefore(li, transactionListHTML.firstChild);
   
  });
}





let historialVisible = false;

mostrarHistorial.onclick = () => {
  if (!historialVisible) {
    cargarListaDeTransacciones();
    transactionListHTML.style.display = "block";
    historialVisible = true;
  } else {
    transactionListHTML.style.display = "none";
    historialVisible = false;
  }
};




const openButton = document.getElementById('openButton');
const popup = document.querySelector('.popup');
const closeButton = document.getElementById('close-btn');

openButton.addEventListener('click', function() {
  popup.style.display = 'flex';
  
});

closeButton.addEventListener('click', function() {
  popup.style.display = 'none';
});


const openButton2 = document.getElementById('openButton2');
const popup2 = document.querySelector('.popup2');
const closeButton2 = document.getElementById('close-btn2');

openButton2.addEventListener('click', function() {
  popup2.style.display = 'flex';
  
});

closeButton2.addEventListener('click', function() {
  popup2.style.display = 'none';
});



