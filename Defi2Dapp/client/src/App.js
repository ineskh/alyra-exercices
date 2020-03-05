import React, { Component, useState, Fragment } from "react";
import Defi2Contract from "./contracts/Defi2.json";
import getWeb3 from "./getWeb3";
import { Button, Form, FormGroup, Label, Input,  DropdownItem, DropdownMenu } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  NavbarText,
  ButtonToolbar
  
} from 'reactstrap';

import "./App.css";
import Navigation from "./navigation.js"
import Register from "./register.js";
import Demande from "./demande.js";
import Offre from "./offre.js";
import Utilisateur from "./utilisateur.js";
export default class App extends Component {
  
  state = { storageValue: 0, web3: null, accounts: null, contract: null,
            showComposantName : "Inscription"  };

  constructor(props) {
    super(props);
    this.handleCallBack = this.handleCallBack.bind(this);
    this.handleInscription = this.handleInscription.bind(this);
    this.handleAjouterDemande = this.handleAjouterDemande.bind(this);  
//    this.handlePostuler = this.handlePostuler.bind(this);    
}

  componentDidMount = async () => {
    try {
      
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Defi2Contract.networks[networkId];
      if(deployedNetwork === undefined) {
        alert("Contrat non deployé");
        return;
      }
      const contract = new web3.eth.Contract(Defi2Contract.abi, deployedNetwork && deployedNetwork.address);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account : accounts[0], contract }); //, this.runExample);
      this.gestionUtilisateurMetamask();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    
  };
  
  gestionUtilisateurMetamask() {
    setInterval( async ()=>{
      const accounts = await this.state.web3.eth.getAccounts();
      if (accounts[0] !== this.state.account) {
        const account = accounts[0];
        this.setState({account});
      }
    }, 100);

  }
 

  //runExample = async () => {
    //const { accounts, contract } = this.state;
    //const [isOpen, setIsOpen] = useState(false);

    //const toggle = () => setIsOpen(!isOpen);

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
   // const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ storageValue: response });
  //};

  handleCallBack(name) {
    this.setState ( { showComposantName : name } );
  }

  async handleInscription(nom, prenom) {

    try {
      if (nom ==="" || prenom === ""){
        alert("nom ou prenom invalide");
      }else {
        const {web3, account, contract} = this.state;
        await contract.methods.inscription(nom,prenom).send({from: account});  
      }   
    }
    catch(error) {
      alert("Handle inscription ", error);
    }
  }


  async handleAjouterDemande (renumeration, delais, description, minreputation) {
    try {
      if (renumeration === "" || delais  === "" || description  === "" || minreputation  === "") {
        alert ("Il faut saisir tous les champs");
      } else {
        const {web3, account, contract} = this.state;
        const val = Number(renumeration)+2*Number(renumeration)/100;
        
        await contract.methods.ajouterDemande(Number(renumeration), Number(delais), description, 0, Number(minreputation)).send({from: account, value:val});

      }

    }
    catch(error) {
      alert("Handle ajouter demande", error);
    }
    }
/*
    async handlePostuler(indice) {
    try { 
        const {web3, account, contract} = this.state;
        await contract.methods.postuler(Number(indice)).send({from: account});           
    }
    catch(error) {
      alert("Handle Postuler ", error);
    }
  }
*/
  

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    
    return (
    <>
      <Navigation callBack={this.handleCallBack}> hello </Navigation>
      <div className="container">
        <div className="row">
          <div> 
            {
                      this.state.showComposantName === "Inscription"
                      ? <Register callBack={this.handleInscription}></Register>
                      : this.state.showComposantName === "Demande"
                      ? <Demande callBack={this.handleAjouterDemande}></Demande>
                      : this.state.showComposantName === "Offres"
                      ? <Offre callBack={this.handlePostuler} 
                               web3 = {this.state.web3}
                               contract = {this.state.contract}
                               account = {this.state.account}></Offre>
                               : this.state.showComposantName === "Utilisateur"
                      ? <Utilisateur callBack={this.handleUtilisateur} 
                               web3 = {this.state.web3}
                               contract = {this.state.contract}
                               account = {this.state.account}></Utilisateur>
                      : this.state.showComposantName === "Undefined"
                        ? <></>
                        : <> {this.state.showComposantName}</>              
              }
          </div>
        </div>
      </div>
    </>           
    );
  }
}


