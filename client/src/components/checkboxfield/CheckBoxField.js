import React, { Component } from 'react';
import './CheckBoxField.scss';

class CheckBoxField extends Component {
    constructor(props) {
        super(props);

        this.checkboxes = props.checkboxes.map(checkbox => {
            return (
                <div className="checkbox-field__item-group" key={ checkbox.value }>
                    <input className="checkbox-field__checkbox" type="checkbox" name={ checkbox.name } value={ checkbox.value } />
                    <span className="checkbox-field__custom-checkbox"></span>
                    <label className="checkbox-field__label">{ checkbox.label || checkbox.value }</label>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="checkbox-field__container">
                <h3 className="checkbox-field__header">{ this.props.groupLabel }</h3>
                { this.checkboxes }
            </div> 
        );
    }
}

export default CheckBoxField;