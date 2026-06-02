import { render, screen, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import Button from '../components/Button';

describe('ButtonComponent', () => {
  test('calls onButtonClick when button is clicked', () => {
    const mockHandleButtonClick = sinon.spy();
    render(<Button onButtonClick={mockHandleButtonClick} />);

    const button = screen.getByText(/click here/i);
    fireEvent.click(button);

    sinon.assert.calledOnce(mockHandleButtonClick);
  });
});
