import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createNote } from '../../actions/householdActions';

class CreateNoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            householdId: this.props.currentHouseholdId,
            title: '',
            body: ''
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

        if(event.target.name === 'body') {
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
            let noteBody = {...this.state};

            if(noteBody.body === '') {
                noteBody.body = null;
            }

            this.props.createNote(noteBody);

            this.props.history.push('/notes');
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <div className="form__header">
                    <h2 className="form__title">Create Note</h2>
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
                <div className="form__input-group form__input-group--text-area" onClick={ this.focusTextarea }>
                    <textarea
                        className="form__text-area"
                        name="body"
                        onChange={ this.handleChange }
                        value={ this.state.body }
                    >
                    </textarea>
                    <label className="form__label--text-area" htmlFor="body">Body</label>
                </div>
                <div className="form__submit-group">
                    <input
                        className="button button--med"
                        type="submit"
                        value="Create"
                    />
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        householdId: state.households.currentHousehold._id
    };
}

export default connect(mapStateToProps, { createNote })(CreateNoteForm);