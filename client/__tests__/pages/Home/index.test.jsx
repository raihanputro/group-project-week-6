import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import RouterDom from 'react-router-dom';
import Language from '@containers/Language';

import Home from '@pages/Home';
import store from '../../../src/configureStore';

let wrapper;

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: jest.fn(),
}));

jest.mock('react-intl', () => ({
    ...jest.requireActual('react-intl'),
}));

const ParentComponent = (children) => (
    <Provider store={store}>
        <Language>{children}</Language>
    </Provider>
);


describe('Home Test', () => {
    beforeEach(() => {
        wrapper = render(ParentComponent(<Home />));
    });

    test('should render correctly', () => {
        const { getByTestId } = wrapper;
        expect(getByTestId('container-home')).toBeInTheDocument();
    });

    test('Should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

});