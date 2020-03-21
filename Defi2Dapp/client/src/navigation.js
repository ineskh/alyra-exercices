import React from "react";
import Defi2Contract from "./contracts/Defi2.json";
import getWeb3 from "./getWeb3";
import { Button, Form, FormGroup, Label, Input, Navbar, Container, ButtonToolbar } from 'reactstrap';
import Image from 'react-bootstrap/Image';


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
   

   
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">DEFI-2</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Accueil <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onClick={this.handleOnClickDemande}>Demande</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onClick={this.handleOnClickOffres}>Offres</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onClick={this.handleOnClickUtilisateur}>Utilisateur</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="https://github.com/ineskh/alyra-exercices">Github</a>
      </li>
    </ul>
  </div>
</nav>
<div className="jumbotron text-center">
   <h1>Place de Marché d’Illustrateurs Indépendants</h1>   
</div>

        </>
      );
    }
  }
  
