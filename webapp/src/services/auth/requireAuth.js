import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent, Auth = true) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentWillMount() {
            if (this.props.Auth) {
                if (!this.props.authenticated) {
                    this.context.router.history.push('/');
                }
            } else {
                if (this.props.authenticated) {
                    this.context.router.history.push('/users/home');
                }
            }
        }

        componentWillUpdate(nextProps) {
            if (this.props.Auth) {
                if (!nextProps.authenticated) {
                    this.context.router.history.push('/');
                }
            } else {
                if (nextProps.authenticated) {
                    this.context.router.history.push('/users/home');
                }
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated, Auth: Auth };
    }

    return connect(mapStateToProps)(Authentication);
}
