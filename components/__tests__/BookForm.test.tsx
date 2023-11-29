import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import BookForm from '../BookForm';

global.fetch = jest.fn(() =>
Promise.resolve({
  json: () => Promise.resolve({}),
})
) as jest.Mock;

describe('BookForm Tests', () => {

  it('renders correctly', async () => {

    render(<BookForm formName='borrow' formValue='Oliver Twist' disabled={false} reload={false} setReload={() => {}}></BookForm>);
        
    await waitFor(() => {
      expect(screen.getByRole('button', {name: 'submit'})).toBeDefined();
    })
  })

  it('responds to click event correctly', async () => {
    const user = userEvent.setup();

    render(<BookForm formName='borrow' formValue='Oliver Twist' disabled={false} reload={false} setReload={() => { reload = true }}></BookForm>);

    let reload = false;
    await user.click(screen.getByRole('button', {name: 'submit'}));
    expect(reload).toBe(true);
  })

});