import { render, screen } from '@testing-library/react';
import App from '../App';
import { ContextProvider } from '../context/Context';

describe('Rendering', () => {
  test('Renders App component with ContextProvider', () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    const appContainer = screen.getByTestId('duolingo');
    expect(appContainer).toBeInTheDocument();
  });
});
