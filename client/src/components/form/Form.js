import React, { Component } from 'react';
import './Form.scss';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(this.props.action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        });

        this.setState({});
    }

    render() {
        return (
            <div className="form__wrapper">
                <form onSubmit={ this.handleSubmit } onChange={ this.handleChange }>
                    <h2 className="form__header">{ this.props.formName }</h2>
                    <hr className="form__divider" />
                    { this.props.children }
                    <input className="form__submit" type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}

export default Form;