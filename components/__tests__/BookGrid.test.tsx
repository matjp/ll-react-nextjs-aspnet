import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import BookGrid from '../BookGrid';

global.fetch = jest.fn(() =>
  Promise.resolve(
    { ok: true, json: () => Promise.resolve([{"title":"Alice's Adventures in Wonderland","author":"Lewis Carrol","cover_image":"","borrowed":0}]) }
  )
) as jest.Mock;

describe('BookGrid Tests', () => {
  it('renders correctly', async () => {
    render(<BookGrid formName='borrow'></BookGrid>);
    
    await waitFor(() => {
      expect(screen.getByAltText(/Adventures/)).toBeDefined();
    })
  })
});
