import React, { Component, useState } from "react";
//import Defi2Contract from "./contracts/Defi2.json";
//import getWeb3 from "./getWeb3";
import { Button, Form, FormGroup, Label, Input, select, textarea, Table } from 'reactstrap';

//import "./App.css";

export default class Offre extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = { rows : new Array() };
        this.handleOnClickPostuler = this.handleOnClickPostuler.bind(this);
    }

    componentDidMount = async () => {
        try {
            const {web3, account, contract} = this.props;
            const demandes = await contract.methods.getAllDemandes().call({from: account});
            const rows = Array();
            const length = demandes.length;
            for (let i=0;i<length; i++){
                const dem = demandes[i];
                let et = "";
                if (dem.etat == 0){
                    et = "OUVERTE";
                }else if (dem.etat == 1) {
                    et = "ENCOURS";
                }else if (dem.etat == 2) {
                    et = "FERMEE";
                }
                let boutonVariable;
                if (dem.etat == 0){
                    boutonVariable = <button type="button" 
                                     className="btn btn-outline-secondary" 
                                     value={i} 
                                     onClick={this.handleOnClickPostuler} 
                                     >Postuler</button>
                }else {
                    boutonVariable = <button type="button" 
                                     className="btn btn-outline-secondary" 
                                     disabled
                                     >Postuler</button>

                }
                rows.push(
                    <tr key = {i}> 
                        <td> {et} </td>
                        <td> {dem.renumeration} </td>
                        <td> {dem.minReputation} </td>
                        <td> {dem.delais} </td>
                        <td> {dem.decrireTache} </td>
                        <td> {boutonVariable}</td>
                    </tr>);
            }
            this.setState({rows});
        }
        catch (error) {
            alert(error);
        }
    }

     async  handleOnClickPostuler(event) {
        try { 
            const {web3, account, contract} = this.props;
            const indice = Number(event.target.value);
            await contract.methods.postuler(indice).send({from: account});           
        }
        catch(error) {
            alert("Handle Postuler " + error);
        }
        event.preventDefault();
    }
 
    render() {
      return (       
        <> 
        <Table striped  bordered size = "xl"> 
        <thead>
            <tr> 
                <th> Etat </th>
                <th> Rénumeration </th>
                <th> Réputation minimale </th>
                <th> Delais (en semaine) </th>
                <th> Description </th>
                <th> Postuler </th>
            </tr>

        </thead>
        <tbody> 
            {
                this.state.rows
            }
        </tbody>
        </Table>   
        </>
      );
  }
}