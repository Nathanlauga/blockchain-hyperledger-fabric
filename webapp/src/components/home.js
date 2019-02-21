import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Navbar, NavbarBrand, NavItem, Collapse, NavbarToggler, Nav,
  Container, Row, Col, Modal,
  Button
} from 'reactstrap';

import {
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

// Components
import TransactionForm from './forms/transactionForm'

class home extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      modalTransaction: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleModalTransaction = () => {
    this.setState({
      modalTransaction: !this.state.modalTransaction
    })
  }

  render() {
    return (
      <div className="Home">
        <Navbar color="primary" light expand="md" className="shadow navbar-home">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="#">
                  Se déconnecter
                {'  '}
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Container fluid className="mt-3">
          <Row>
            <Col xs="12">
              <Button onClick={this.toggleModalTransaction} color="danger">
                Ajouter une ressource
              </Button>
            </Col>
            <Col xs="12" className="mt-3">
              <h3>Toutes mes transactions</h3>
            </Col>
          </Row>
        </Container>
        <Modal fade={false} centered={true} isOpen={this.state.modalTransaction} toggle={this.toggleModalTransaction} className={this.props.className}>
          <TransactionForm history={this.props.history} toggle={this.toggleModalTransaction} />
        </Modal>
      </div>
    )
  }
}

export default home;
