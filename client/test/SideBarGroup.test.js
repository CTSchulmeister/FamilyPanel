import React from 'react';
import { shallow } from 'enzyme';
import SideBarGroup from '../src/components/SideBarGroup/SideBarGroup';

describe('SideBarGroup', () => {
    test('Throws error if rendered with invalid type prop', () => {
        let error = null;

        try {
            shallow(<SideBarGroup type="blahblahblah" />);
        } catch (err) {
            error = err;
        }

        expect(error).not.toBeNull();
    });
});