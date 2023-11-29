import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import NavBar from '../NavBar';

describe('NavBar Tests', () => {
  it('renders correctly', async () => {
    render(<NavBar />);
    
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeDefined();
    })
  })
});