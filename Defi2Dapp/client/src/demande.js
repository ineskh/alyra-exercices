import React, { Component, useState } from "react";
//import Defi2Contract from "./contracts/Defi2.json";
//import getWeb3 from "./getWeb3";
import { Button, Form, FormGroup, Label, Input, select, textarea } from 'reactstrap';

//import "./App.css";

export default class Demande extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
          renumeration : "",
          delais : "",
          minreputation : "",
          etatdemande : "",
          description :""
        };

        this.handleOnClickAjouterDemande = this.handleOnClickAjouterDemande.bind(this);

        this.handleChangeRenumeration = this.handleChangeRenumeration.bind(this);
        this.handleChangeDelais = this.handleChangeDelais.bind(this);
        this.handleChangeMinReputation = this.handleChangeMinReputation.bind(this);
        this.handleChangeEtatDemande = this.handleChangeEtatDemande.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);

      }

    
    handleOnClickAjouterDemande(event) {
      this.props.callBack(this.state.renumeration,this.state.delais, this.state.description,  this.state.minreputation);
      event.preventDefault();
    }

    handleChangeRenumeration(event) {
      this.setState({ renumeration : event.target.value});
    }
    handleChangeDelais(event) {
      this.setState({ delais : event.target.value});
    }

    handleChangeDescription(event) {
      this.setState({ description : event.target.value});
    }

    handleChangeEtatDemande(event) {
      this.setState({ etatdemande : event.target.value});
    }

    handleChangeMinReputation(event) {
      this.setState({ minreputation : event.target.value});
    }



    render() {
      return (
        
        <Form>
            <FormGroup>
                <Label for="renumeration">Rénumeration</Label>
                <Input type="number" value={this.state.renumeration} onChange={this.handleChangeRenumeration} placeholder="Saisir rénumeration"/>           
                <Label for="delais">Délais de la Demande</Label>
                <Input type="number" value={this.state.delais} onChange={this.handleChangeDelais} placeholder="Délais en semaine" />
                <Label for="minreputation">Reputation minimale</Label>
                <Input type="number" value={this.state.minreputation} onChange={this.handleChangeMinReputation} placeholder="Saisir rénumeration"/>                          
            </FormGroup>
            
            <FormGroup>
                <Label for="description">Description des tâches</Label>
                <br></br>
                <textarea type="text" value={this.state.description} onChange={this.handleChangeDescription} placeholder="Saisir la description des tâches" rows="4" cols="50"/>              
            </FormGroup>
            <Button onClick={this.handleOnClickAjouterDemande}>Ajouter</Button>
        </Form>
      
      
      );
  }
}