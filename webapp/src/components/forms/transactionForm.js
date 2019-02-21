import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {
    Label,
    ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';

// Forms
import { SelectField, renderField } from '../forms/index'

const slot_values = [
    { value: 'food', label: 'Nourriture' },
    { value: 'energy', label: 'Énergie' },
    { value: 'materials', label: 'Matière première' },
]

class TransactionForm extends Component {
    onSubmit = (values) => {
        console.log(values)
    }
    render() {
        const { handleSubmit, submitting, toggle } = this.props
        return (
            <div className="TransactionForm">
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <ModalHeader toggle={toggle}>Ajouter une transaction</ModalHeader>
                    <ModalBody>
                        <Label>Nom du produit</Label>
                        <Field
                            name="product"
                            isSearchable={false}
                            component={SelectField}
                            placeholder={"Choisir le produit"}
                            closeOnSelect={true}
                            options={slot_values}
                            multi={false}
                        />
                        <Field
                            name="quantity"
                            component={renderField}
                            type="number"
                            label="Quantité"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button block type="submit" disabled={submitting} color="primary">Ajouter</Button>{' '}
                    </ModalFooter>
                </form>
            </div>
        )
    }
}

TransactionForm = connect(null, {})(reduxForm({
    form: 'transactionForm'
})(TransactionForm))

export default TransactionForm;
