import React from "react";
import Defi2Contract from "./contracts/Defi2.json";
import getWeb3 from "./getWeb3";
import { Button, Form, FormGroup, Label, Input, Navbar, Container, ButtonToolbar } from 'reactstrap';

import "./App.css";

import Register from "./register.js";
import Demande from "./demande.js";
export default class Navigation extends React.Component {
  
    constructor(props) {
        super(props);
        this.handleOnClickInsciption = this.handleOnClickInsciption.bind(this);
        this.handleOnClickDemande = this.handleOnClickDemande.bind(this);
        this.handleOnClickOffres = this.handleOnClickOffres.bind(this);
        this.handleOnClickUtilisateur = this.handleOnClickUtilisateur.bind(this);
    }
 
    handleOnClickInsciption(event) {
      this.props.callBack("Inscription");
      event.preventDefault();
    }

    handleOnClickDemande(event) {
      this.props.callBack("Demande");
      event.preventDefault();
    }

    handleOnClickOffres(event) {
      this.props.callBack("Offres");
      event.preventDefault();
    }

    handleOnClickUtilisateur(event) {
      this.props.callBack("Utilisateur");
      event.preventDefault();
    }
    render() {

      return (
        
        <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

   <div className="jumbotron text-center">
   <h1>Defi2 : Dapp place du marché</h1>
  
    <ButtonToolbar>
      <Button  href="/">Accueil</Button>
      <Button  onClick={this.handleOnClickDemande}> Ajouter Demande</Button>
      <Button  onClick={this.handleOnClickOffres}> Offres</Button>
      <Button  onClick={this.handleOnClickUtilisateur}> Mon Espace</Button>
      <Button  href="https://github.com/ineskh/alyra-exercices">Github</Button>
    </ButtonToolbar>
  </div>
        
        </>
      );
    }
  }
  
