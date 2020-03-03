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

import "./register.js";


export default class Layout extends React.Component {
  
    constructor(props) {
        super(props);
    }
 
    render() {

      return (

        <div className = "container">
         
        <Navbar fixed = "top" variant = "dark" >
          <NavbarBrand href="/">Defi2 </NavbarBrand>        
            <Nav className="mr-auto" navbar>
              <NavItem>             
                <NavLink href="/register">Inscription</NavLink>
              </NavItem>
              <NavItem>             
                <NavLink href="/demande">Demande</NavLink>
              </NavItem>
              <NavItem>             
                <NavLink href="/livraison">Livraison</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/ineskh/alyra-exercices">GitHub</NavLink>
              </NavItem>            
            </Nav>
        </Navbar>
        
        {this.props.children}

      </div>
            
      );
    }
  }
  