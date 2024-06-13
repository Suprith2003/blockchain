// src/Association.js
import web3 from './web3';
import AssociationABI from './AssociationABI.json';

const address = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address

const contract = new web3.eth.Contract(AssociationABI, address);

export default contract;
