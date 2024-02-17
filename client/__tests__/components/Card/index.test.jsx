import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import RouterDom from 'react-router-dom';

import Card from '@components/Card';
import store from '../../../src/configureStore';

let wrapper;

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('reselect', () => ({
    ...jest.requireActual('reselect'),
}));

const ParentComponent = (children) => (
    <Provider store={store}>
        {children}
    </Provider>
);


const mockProps = {
    Task: {
        name: 'Bowo',
        User: {
            name: 'Tono'
        },
        start_date: '15-02-2024',
        end_date: '18-02-2024',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores odit soluta laboriosam nisi repellat eum maiores blanditiis dicta facere hic maxime, est et aliquam, dolorem, consequuntur nobis adipisci consequatur sequi?'
    }
};


describe('Card Test', () => {
    beforeEach(() => {
        wrapper = render(ParentComponent(<Card data={mockProps} />));
    });

    test('should render correctly', () => {
        const { getByTestId } = wrapper;
        expect(getByTestId('card')).toBeInTheDocument();
    });

    test('Card clicked', () => {
        const { getByTestId } = wrapper;
        expect(getByTestId('card')).toBeInTheDocument();
        fireEvent.click(getByTestId('card'))
    });

    test('Should match with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

});