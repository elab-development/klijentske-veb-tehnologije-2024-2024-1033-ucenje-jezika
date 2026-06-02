import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';
import Navbar from '../components/Navbar';
import * as useLoggedInHook from '../hooks/useLoggedIn';
import { ContextProvider } from '../context/ContextProvider';

describe('Navbar component', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  test('renders the logo and title', () => {
    sandbox
      .stub(useLoggedInHook, 'useLoggedIn')
      .returns({ loggedIn: false, setLoggedIn: () => {} });

    render(
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ContextProvider>
    );

    expect(screen.getByText('Tripadvisor')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test('displays user greeting when user is logged in', () => {
    localStorage.setItem('user', 'John Doe');
    sandbox
      .stub(useLoggedInHook, 'useLoggedIn')
      .returns({ loggedIn: true, setLoggedIn: () => {} });

    render(
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ContextProvider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('calls setLoggedIn(false) and removes user from localStorage on logout click', () => {
    const setLoggedInStub = sandbox.stub();
    sandbox
      .stub(useLoggedInHook, 'useLoggedIn')
      .returns({ loggedIn: true, setLoggedIn: setLoggedInStub });
    localStorage.setItem('user', 'John Doe');

    render(
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ContextProvider>
    );

    fireEvent.click(screen.getByText('Logout'));

    expect(localStorage.getItem('user')).toBeNull();
  });
});
