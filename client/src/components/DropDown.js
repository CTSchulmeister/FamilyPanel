import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropDownPanel from './DropDownPanel';

class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggleIsOpen.bind(this);
    }

    toggleIsOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isOpen } = this.state;
        const { children } = this.props;

        return (
            <div className="drop-down">
                <span
                    className="drop-down__trigger"
                    onClick={ this.toggleIsOpen }
                    role="button"
                    tabIndex="0"
                >
                    { children[0] }
                </span>
                { isOpen
                    ? (
                        <DropDownPanel
                            toggleIsOpen={ this.toggleIsOpen }
                        >
                            { children[1] }
                        </DropDownPanel>
                    ) 
                    : null
                }
            </div>
        );
    }
}

DropDown.propTypes = {
    children: PropTypes.node.isRequired
};

export default DropDown;
