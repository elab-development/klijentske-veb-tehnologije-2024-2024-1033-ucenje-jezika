import { render, screen } from '@testing-library/react';
import App from '../App';
import ContextWrapper from '../context/ContextWrapper';

describe('Rendering', () => {
  test('renders App component', () => {
    render(
      <ContextWrapper>
        <App />
      </ContextWrapper>
    );

    const appContainer = screen.getByTestId('app-container');
    expect(appContainer).toBeInTheDocument();
  });
});
