import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';

import {
  Link
} from 'react-router-dom'

import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap'

// Actions
import {
  signup
} from '../actions/auth/index'

// Forms
import { renderField } from './forms/index'

class Signup extends Component {

  onSubmit = (values) => {
    return this.props.signup(values, this.props.history);
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <div className="Signup">
        <Container fluid>
          <Row>
            <Col xs="12" sm="4" className="mx-auto">
              <h3 className="text-center">Inscription d'un habitant</h3>
              <br />
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <Container fluid>
                  <Row>
                    <Col xs="12">
                      <Field
                        name="username"
                        type="text"
                        component={renderField}
                        label="Nom d'utilisateur"
                      />
                    </Col>
                    <Col xs="12">
                      <Field
                        name="email"
                        component={renderField}
                        type="text"
                        label="Email"
                      />
                    </Col>
                    <Col xs="12">
                      <Field
                        name="password"
                        type="password"
                        label="Mot de passe"
                        component={renderField}
                      />
                    </Col>
                    <Col xs="12">
                      <Field
                        name="confirm_password"
                        type="password"
                        label="Confirmer mot de passe"
                        component={renderField}
                      />
                    </Col>
                    <Col xs="12">
                      <Button disabled={submitting} type="submit" color="primary" block>
                        S'inscrire
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
              <br />
              <p className="text-center">
                Vous êtes déjà inscris ? <Link to="/login">Connectez-vous ici</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Signup = connect(null, { signup })(reduxForm({
  form: 'signupForm'
})(Signup))

export default Signup;
