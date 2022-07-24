import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { INVALID_USER_ERROR } from '../../../../services/constants';
import { axiosMock } from '../../../../testing/utils';
import { renderWithProviders } from '../../../../testing/utils/redux-utils';
import { Authentication } from '../Authentication';

describe('<Authentication>', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should dissapear if the credentials were correct', async () => {
    axiosMock
      .onPost('/login', { email: 'fake.user@fake.com', password: '123' })
      .reply(200, { token: 'un_token' });

    const { container } = renderWithProviders(<Authentication />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const enterButton = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, 'fake.user@fake.com');
    userEvent.type(passwordInput, '123');
    fireEvent.click(enterButton);

    expect(enterButton).toBeDisabled();

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it('should show an error if the credentials were not correct', async () => {
    axiosMock
      .onPost('/login', { email: 'fake.user@fake.com', password: '1234' })
      .reply(401, { message: INVALID_USER_ERROR });

    renderWithProviders(<Authentication />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const enterButton = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, 'fake.user@fake.com');
    userEvent.type(passwordInput, '1234');
    fireEvent.click(enterButton);

    expect(enterButton).toBeDisabled();

    await waitFor(() => {
      expect(passwordInput).toHaveErrorMessage('Usuario invalido.');
    });
  });
});
