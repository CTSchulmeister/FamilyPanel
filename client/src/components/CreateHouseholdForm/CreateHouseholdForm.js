import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createHousehold } from '../../actions/householdActions';
import { hideHouseholdCreationForm } from '../../actions/viewActions';
import './CreateHouseholdForm.scss';

class CreateHouseholdForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };

        this.focusInput.bind(this);
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);

        this.nameRef = React.createRef();
    }

    focusInput = (event) => {
        if(event.target.classList.contains('form__input-group')) {
            event.target.querySelector('.form__text-input').focus();
        } else if(event.target.parentElement.classList.contains('form__hint')) {
            event.target.parentElement.parentElement.querySelector('.form__text-input').focus();
        } else {
            event.target.parentElement.querySelector('.form__text-input').focus();
        }
    }

    handleChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;

        this.setState({
            [key]: value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            this.props.createHousehold(this.state);
            this.props.hideHouseholdCreationForm();
        } catch (err) {
            alert(`Error encountered: ${ err }`);
        }
    }

    componentDidMount() {
        this.nameRef.current.focus();
    }

    render() {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <div className="form__header">
                    <h2 className="form__title">Create a Household</h2>
                </div>
                <div className="form__input-group" onClick={ this.focusInput }>
                    <input
                        className="form__text-input"
                        type="text"
                        name="name"
                        value={ this.state.name }
                        onChange={ this.handleChange }
                        ref={ this.nameRef }
                    />
                    <label className="form__label" htmlFor="name">Household Name</label>
                </div>
                <div className="form__submit-group">
                    <input
                        className="form__submit-button"
                        type="submit"
                        value="Create"
                    />
                </div>
            </form>
        );
    }
}

export default connect(null, { createHousehold, hideHouseholdCreationForm })(CreateHouseholdForm);