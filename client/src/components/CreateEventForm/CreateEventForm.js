import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createEvent } from '../../actions/eventActions';

import './CreateEventForm.scss';

class CreateEventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            time: '',
            description: '',
            xCoord: null,
            yCoord: null
        };

        this.focusInput.bind(this);
        this.focusTextarea.bind(this);
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
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

    focusTextarea = (event) => {
        if(event.target.classList.contains('form__input-group')) {
            event.target.querySelector('.form__text-area').focus();
        } else {
            event.target.parentElement.querySelector('.form__text-area').focus();
        }
    }

    handleChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;

        this.setState({
            [key]: value
        });

        if(event.target.name === 'description') {
            if(event.target.value !== '') {
                let label = event.target.parentElement.querySelector('.form__label--text-area');
                label.classList.add('form__label--text-area--not-empty');
            } else {
                let label = event.target.parentElement.querySelector('.form__label--text-area');
                label.classList.remove('form__label--text-area--not-empty');
            }
            
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await this.props.createEvent(this.state);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <div className="form__header">
                    <h2 className="form__title">Create Event</h2>
                </div>
                <div className="form__input-group" onClick={ this.focusInput }>
                    <input
                        className="form__text-input"
                        type="text"
                        name="title"
                        value={ this.state.title }
                        onChange={ this.handleChange }
                    />
                    <label className="form__label" htmlFor="title">Title</label>
                </div>
                <div className="form__input-group" onClick={ this.focusInput }>
                    <input
                        className="form__text-input"
                        type="datetime-local"
                        name="time"
                        value={ this.state.time }
                        onChange={ this.handleChange }
                    />
                    <label className="form__label" htmlFor="time">When</label>
                </div>
                <div className="form__input-group form__input-group--text-area" onClick={ this.focusTextarea }>
                    <textarea
                        className="form__text-area"
                        name="description"
                        onChange={ this.handleChange }
                        value={ this.state.description }
                    >
                    </textarea>
                    <label className="form__label--text-area" htmlFor="description">Description</label>
                </div>
                <div className="form__submit-group">
                    <input
                        className="button button--med"
                        type="submit"
                        value="Create"
                    />
                </div>
            </form>
        );
    }
}

export default connect(null, { createEvent })(CreateEventForm);