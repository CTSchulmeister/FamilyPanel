import React, { Component} from './node_modules/react';
import './CreateNoteForm.scss';

class CreateNoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatorId: null,
            title: '',
            body: '',
            createdAt: null
        }

        this.handleTitleChange.bind(this);
        this.handleBodyChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };

    handleBodyChange = (event) => {
        this.setState({
            body: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            createdAt: Date.now()
        });

        alert(`${this.state.title}: ${this.state.body}`);
    };

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <div>
                    <h2>New Note</h2>
                </div>
                <div>
                    <label>Title</label>
                    <input 
                        type="text" 
                        value={ this.state.title } 
                        onChange={ this.handleTitleChange } 
                    />
                </div>
                <div>
                    <label>Body</label>
                    <textarea 
                        value={ this.state.body }
                        onChange={ this.handleBodyChange }
                    />
                </div>
                <div>
                    <input 
                        type="submit"
                        value="Create Note"
                    />
                </div>
            </form>
        );
    }
}

export default CreateNoteForm;