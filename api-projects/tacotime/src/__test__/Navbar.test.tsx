import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Navbar Component', () => {
  test('renders logo', () => {
    renderWithRouter(<Navbar />);

    const logoElement = screen.getByText(/TacoTime/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithRouter(<Navbar />);

    const homeLinks = screen.getAllByText(/Home/i);
    const recipesLinks = screen.getAllByText(/Recipes/i);
    const aboutLinks = screen.getAllByText(/About us/i);
    const favoritesLinks = screen.getAllByText(/Favorites/i);

    // Ensure there are at least two of each, one in the navbar and one in the sidebar
    expect(homeLinks.length).toBeGreaterThan(1);
    expect(recipesLinks.length).toBeGreaterThan(1);
    expect(aboutLinks.length).toBeGreaterThan(1);
    expect(favoritesLinks.length).toBeGreaterThan(1);
  });

  test('toggles sidebar when hamburger menu is clicked', () => {
    renderWithRouter(<Navbar />);
    const toggleMenu = screen.getByTestId('toggle-menu');
    fireEvent.click(toggleMenu);

    const sidebar = screen.getByRole('navigation', { name: /sidebar/i });
    expect(sidebar).toHaveClass('open');

    fireEvent.click(toggleMenu);
    expect(sidebar).not.toHaveClass('open');
  });

  test('closes sidebar when a link is clicked', () => {
    renderWithRouter(<Navbar />);
    const toggleMenu = screen.getByTestId('toggle-menu');
    fireEvent.click(toggleMenu);

    const sidebarLinks = screen.getAllByText(/Recipes/i);
    const sidebarLink = sidebarLinks[1];
    fireEvent.click(sidebarLink);

    const sidebar = screen.getByRole('navigation', { name: /sidebar/i });
    expect(sidebar).not.toHaveClass('open');
  });
});
