import React, { Component, useState } from "react";
//import Defi2Contract from "./contracts/Defi2.json";
//import getWeb3 from "./getWeb3";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//import "./App.css";

export default class Register extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
          nom : "",
          prenom : ""
        };

        this.handleOnClickInsciption = this.handleOnClickInsciption.bind(this);

        this.handleChangeNom = this.handleChangeNom.bind(this);
        this.handleChangePrenom = this.handleChangePrenom.bind(this);
      }

    
    handleOnClickInsciption(event) {
      this.props.callBack(this.state.nom,this.state.prenom);
      event.preventDefault();
    }

    handleChangeNom(event) {
      this.setState({ nom : event.target.value});
    }
    handleChangePrenom(event) {
      this.setState({ prenom : event.target.value});
    }

    render() {
      return (
        <Form>
              <FormGroup>
                <Label for="nom">Nom</Label>
                <Input type="text" value={this.state.nom} onChange={this.handleChangeNom} placeholder="Saisir votre nom"/>
              </FormGroup>
              <FormGroup>
                <Label for="prenom">Prenom</Label>
                <Input type="text" value={this.state.prenom} onChange={this.handleChangePrenom} placeholder="Saisir votre prénom" />
              </FormGroup>
              <Button onClick={this.handleOnClickInsciption}>Inscription</Button>
        </Form>
      
      
      );
  }
}