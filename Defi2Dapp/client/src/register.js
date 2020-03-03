import React, { Component, useState } from "react";
import Defi2Contract from "./contracts/Defi2.json";
import getWeb3 from "./getWeb3";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
  NavbarText
} from 'reactstrap';

import "./App.css";


class Register extends React.Component {
    
    state = { };
  
    constructor(props) {
        super(props);

    }

    componentDidMount = async () => {
    };
  
    
  
    render() {

      
      return (
        <div className = "container">
    
        <Form>
              <FormGroup>
                <Label for="nom">Nom</Label>
                <Input type="text" name="nom" id="nom" placeholder="nom placeholder"/>
              </FormGroup>
              <FormGroup>
                <Label for="prenom">Prenom</Label>
                <Input type="text" name="prenom" id="prenom" placeholder="prenom placeholder" />
              </FormGroup>
              <Button>Submit</Button>
        </Form>
      
      </div>
  
            
      );
    }
  }
  
  export default App;
  