import React from 'react';
import PropTypes from 'prop-types';

import AppContainer from '../containers/AppContainer';
import FormErrorBoundary from './FormErrorBoundary';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import SubHeading from './SubHeading';
import SectionHeader from './SectionHeader';
import ToggleableHomeSetting from './ToggleableHomeSetting';
import Divider from './Divider';
import Paragraph from './Paragraph';
import Heading from './Heading';

const CreateHouseholdForm = ({
    handleChange,
    handleToggleChange,
    handleSubmit,
    className,
    allowSubmit,
    name,
    allMembersCanInvite,
    allMembersCanCreateEvents,
    allMembersCanCreateTasks,
    allMembersCanCreateNotes
}) => {
    return (
        <AppContainer activeLink={ null }>
            <section className="create-household">
                <SectionHeader title="Create Household" />
                <div className="create-household__form-wrapper">
                    <FormErrorBoundary formName="Create Household">
                        <form className={ `form ${ className }` } onSubmit={ handleSubmit }>
                            <Divider size="large" color="colored" />
                            <TextInput
                                type="text"
                                name="name"
                                value={ name }
                                onChange={ handleChange }
                                label="Household Name"
                                maxLength={ 50 }
                            />
                            <SubHeading light={ false }>
                                Settings:
                            </SubHeading>
                            <ToggleableHomeSetting
                                label="Allow all members to invite:"
                                isOn={ allMembersCanInvite }
                                onClick={ () => handleToggleChange('allMembersCanInvite') }
                                disabled={ false }
                                light={ false }
                            />
                            <ToggleableHomeSetting
                                label="Allow all members to create events:"
                                isOn={ allMembersCanCreateEvents }
                                onClick={ () => handleToggleChange('allMembersCanCreateEvents') }
                                disabled={ false }
                                light={ false }
                            />
                            <ToggleableHomeSetting
                                label="Allow all members to create tasks:"
                                isOn={ allMembersCanCreateTasks }
                                onClick={ () => handleToggleChange('allMembersCanCreateTasks') }
                                disabled={ false }
                                light={ false }
                            />
                            <ToggleableHomeSetting
                                label="Allow all members to create notes:"
                                isOn={ allMembersCanCreateNotes }
                                onClick={ () => handleToggleChange('allMembersCanCreateNotes') }
                                disabled={ false }
                                light={ false }
                            />
                            <Divider
                                size="small"
                                color="dark"
                            />
                            <SubmitButton 
                                text="Create"
                                disabled={ !allowSubmit } 
                            />
                        </form>
                    </FormErrorBoundary>
                    <div className="create-household__info-wrapper">
                        <div className="create-household__info">
                            <Heading light={ true } divider="colored">
                                Welcome
                            </Heading>
                            <Paragraph light={ true }>
                                You're about to create a household.
                                A household is the main unit of FamilyPanel and is where you and the household's other members can coordinate with notes, tasks, and events.
                            </Paragraph>
                            <Paragraph light={ true }>
                                As the household creator, you are also the owner and act as the moderator for this household.
                                Don't worry, you can always change the household owner, as well as edit these settings, at any time.
                            </Paragraph>
                            <Paragraph light={ true }>
                                Once you've created this household, you'll be able to invite others to join your household.
                            </Paragraph>
                        </div>
                    </div>
                </div>
            </section>
        </AppContainer>
    );
};

CreateHouseholdForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default CreateHouseholdForm;