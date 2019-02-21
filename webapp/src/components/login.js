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
  login
} from '../actions/auth/index'

// Forms
import { renderField } from './forms/index'

class Login extends Component {
  onSubmit = (values) => {
    return this.props.login(values, this.props.history);
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <div className="Login">
        <Container fluid>
          <Row>
            <Col xs="12" sm="4" className="mx-auto">
              <h3 className="text-center">Se connecter</h3>
              <br />
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <Container fluid>
                  <Row>
                    <Col xs="12">
                      <Field
                        name="login"
                        type="text"
                        component={renderField}
                        label="Nom d'utilisateur / Email"
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
                      <Button disabled={submitting} type="submit" color="primary" block>
                        Connexion
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
              <br />
              <p className="text-center">
                Vous n'êtes pas inscris ? <Link to="/signup">inscrivez-vous ici</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Login = connect(null, { login })(reduxForm({
  form: 'loginForm'
})(Login))

export default Login;
