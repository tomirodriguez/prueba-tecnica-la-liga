import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, put, takeLatest } from 'redux-saga/effects';
import {
  loginFailed,
  loginRequest,
  loginSucceded,
} from '../../../../redux/slices/auth';
import { TestingLayout } from '../../../../testing';
import { Authentication } from '../Authentication';
import { INVALID_USER_ERROR } from '../../../../services/constants';

describe('<Authentication>', () => {
  it('should dissapear if the credentials were correct', async () => {
    function* loginUser() {
      yield delay(200);
      yield put(loginSucceded({ user: {} }));
    }

    function* loginSaga() {
      yield takeLatest(loginRequest, loginUser);
    }
    const { container } = render(
      <TestingLayout sagas={loginSaga}>
        <Authentication />
      </TestingLayout>
    );

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
    function* loginUser() {
      yield delay(200);
      yield put(loginFailed({ error: INVALID_USER_ERROR }));
    }

    function* loginSaga() {
      yield takeLatest(loginRequest, loginUser);
    }
    render(
      <TestingLayout sagas={loginSaga}>
        <Authentication />
      </TestingLayout>
    );

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
