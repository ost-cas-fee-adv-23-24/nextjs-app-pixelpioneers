import React from 'react';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { render } from '@testing-library/react';

describe('Home', () => {
    it('renders a heading', () => {
        const button = render(<Button label="hey" />);

        // expect('hey').toBeInTheDocument();

        expect(button).toMatchSnapshot();
    });
});
