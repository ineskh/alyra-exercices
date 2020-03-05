import React, { Component, useState } from "react";
//import Defi2Contract from "./contracts/Defi2.json";
//import getWeb3 from "./getWeb3";
import { Button, Form, FormGroup, Label, Input, select, textarea, Table } from 'reactstrap';

//import "./App.css";

export default class Utilisateur extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = { rows : new Array(),
                       rowsUser : new Array(),
                       showDemandes : false,
                       showCandidat : false,
                       showLivraison : false,
                       showRenumeration : false,
                       indiceDemande : "",
                       link : ""
                     };
        this.handleOnClickCandidat = this.handleOnClickCandidat.bind(this);
        this.handleOnClickAccepter = this.handleOnClickAccepter.bind(this);
        this.handleOnClickRendu = this.handleOnClickRendu.bind(this);
        this.handleOnClickLivraison = this.handleOnClickLivraison.bind(this);
        this.handleOnClickComfirmeLivraison = this.handleOnClickComfirmeLivraison.bind(this);
        this.handleChangeLink = this.handleChangeLink.bind(this);
        this.handleOnClickRenumeration = this.handleOnClickRenumeration.bind(this);
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
                let j=0;
                let candidat=false;
                let candidatAccepte=false;
                while (j<dem.candidatsAddress.length && !candidat){
                    if (dem.candidatsAddress[j] == account){
                        candidat = true;
                    }
                    j++;
                }
                
                if(dem.candidatAccepte == account){
                    candidatAccepte = true;
                }

                let boutonVariable;
                
                if (dem.entrepriseAddress == account){                   
                    if (dem.etat == 0) {
                        boutonVariable = <button type="button" 
                                     className="btn btn-outline-secondary" 
                                     value={i} 
                                     onClick={this.handleOnClickCandidat} 
                                >Voir candidats</button>
                    }else if (dem.etat == 2)  {
                            boutonVariable = <button type="button" 
                                        className="btn btn-outline-secondary" 
                                        value={i} 
                                        onClick={this.handleOnClickRendu} 
                                    >Travail livré</button>
                    }
                } else if (candidat) {
                        if (dem.etat == 0) {
                            boutonVariable = "En attente"
                            }else if (candidatAccepte && dem.etat == 1) {
                                boutonVariable = <button type="button" 
                                                    className="btn btn-outline-secondary" 
                                                    value={i} 
                                                    onClick={this.handleOnClickLivraison} 
                                                >Livraison</button>
                            }else if (dem.etat == 1 && !candidatAccepte){
                                boutonVariable = "Candidature refusée";

                            }
                        }
                if (candidat || dem.entrepriseAddress == account) {
                    this.state.showDemandes = true;
                        rows.push(
                            <tr key = {i}> 
                            <td> {et} </td>
                            <td> {dem.renumeration} </td>
                            <td> {dem.minReputation} </td>
                            <td> {dem.delais} </td>
                            <td> {dem.decrireTache} </td>
                            <td> {boutonVariable}  </td>
                        </tr>);
                }
                
                  
            }
            this.setState({rows});
        }
        catch (error) {
            alert(error);
        }
    }

     async  handleOnClickCandidat(event) {
        try { 
            const {web3, account, contract} = this.props;
            const indice = Number(event.target.value);
            const demandes = await contract.methods.getAllDemandes().call({from: account});
            const rowsUser = Array();
            const listUser = demandes[indice].candidatsAddress;
            const length = listUser.length;
            for (let i=0; i<length; i++){
                let  users =  await contract.methods.getUtilisateur(listUser[i]).call({from: account});;
                this.state.showCandidat = true;
                rowsUser.push(
                            <tr key = {i}> 
                                <td> {users.nom} </td>
                                <td> {users.prenom} </td>
                                <td> {users.reputation} </td>
                                <td> <button type="button" 
                                                        className="btn btn-outline-secondary" 
                                                        value={users.adr} 
                                                        name ={indice}
                                                        onClick={this.handleOnClickAccepter} 
                                                    >Accepter</button></td>
                            
                           </tr>);                 
            }
            this.setState({rowsUser});
                     
        }
        catch(error) {
            alert("Handle Voir Candidats " + error);
        }
        event.preventDefault();
    }
 
  async  handleOnClickAccepter(event) {
        try { 
            const {web3, account, contract} = this.props;
            const address = event.target.value;
            const indice = Number(event.target.name);
            await contract.methods.accepterOffre(indice, address).send({from: account});           
        }
        catch(error) {
            alert("Handle Accepter Offre " + error);
        }
        event.preventDefault();
    }

  async  handleOnClickRendu(event) {
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

    handleChangeLink(event) {
      this.setState({ link : event.target.value});
    }
    handleOnClickLivraison(event) {
        this.setState({showLivraison : true});
        this.state.indiceDemande = event.target.value;
        event.preventDefault();
    
    }
     async  handleOnClickComfirmeLivraison(event) {
        try { 
            const {web3, account, contract} = this.props;
            const indice = Number(this.state.indiceDemandee);
            const lienGithub = await contract.methods.hashDepot("Lien").send({from: account});   
            await contract.methods.livraison(indice, lienGithub); 
            this.setState({showRenumeration : true});      
        }
        catch(error) {
            alert("Confirme Livraison" + error);
        }
        event.preventDefault();
    }

    async handleOnClickRenumeration(event){
        try { 
            const {web3, account, contract} = this.props;
            const indice = Number(this.state.indiceDemandee);  
            await contract.methods.renumeration(indice); 
            this.setState({showLivraison : false}); 
            this.setState({showRenumeration : false});     
        }
        catch(error) {
            alert("Handle renumeration" + error);
        }

        this.preventDefault();
    }
    render() {
      return (       
        <> 
        {
            this.state.showDemandes === true

            ?<Table striped  bordered size = "xl"> 
            <thead>
                <tr> 
                    <th> Etat </th>
                    <th> Rénumeration </th>
                    <th> Réputation minimale </th>
                    <th> Delais (en semaine) </th>
                    <th> Description </th>
                    <th> Action </th>
                </tr>

            </thead>
            <tbody> 
                {
                    this.state.rows
                }
            </tbody>
            </Table> 
            : <></>
    }
    {
            this.state.showCandidat === true
            ?<Table striped  bordered size = "xl"> 
            <thead>
                <tr> 
                    <th> Nom </th>
                    <th> Prenom </th>
                    <th> Reputation</th>
                    <th> Action</th>

                </tr>

            </thead>
            <tbody> 
                {
                    this.state.rowsUser
                }
            </tbody>
            </Table>
            : <></> 
    }
    {
            this.state.showLivraison === true
            ?<Form>
                <FormGroup>
                    <Label for="depot">Votre Depot Github</Label>
                    <Input type="text" value={this.state.link} onChange={this.handleChangeLink} placeholder="Saisir votre depot Github"/>
                </FormGroup>
                
                <Button onClick={this.handleOnClickComfirmeLivraison}>Soumettre</Button>
            </Form>
            :<></>
    }
    {
            this.state.showRenumeration === true
            ?<Form>
                <FormGroup>
                    <Label for="renum">Votre renumeration est disponible </Label>
                    <Button onClick={this.handleOnClickRenumeration}>Renumeration</Button>
                </FormGroup>
            </Form>
            :<></>
    }

        </>
      );
  }
}