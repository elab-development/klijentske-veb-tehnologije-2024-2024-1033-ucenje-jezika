import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import { ContextProvider } from '../context/Context';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <ContextProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ContextProvider>
  );
};

describe('Header Component', () => {
  test('Renders logo', () => {
    renderWithRouter(<Header />);

    const logoElement = screen.getByText(/Duolingo/i);
    expect(logoElement).toBeInTheDocument();
  });
});
