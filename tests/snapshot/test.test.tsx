import React from 'react';
import {
    Button,
    ButtonSize,
    IconProfile,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { render } from '@testing-library/react';

describe('Home', () => {
    it('renders a heading', () => {
        const button = render(
            <Button label="Login with Zitadel" Icon={IconProfile} size={ButtonSize.M} />,
        );

        // expect('hey').toBeInTheDocument();

        expect(button).toMatchSnapshot();
    });
});
