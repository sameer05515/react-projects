import { render, screen } from '@testing-library/react';
import App from './App';
import {test,expect} from 'vitest';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});