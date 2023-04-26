import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Navbar from './Navbar';

describe('<Navbar />', () => {
  it("should call 'onOpen' when clicked on '+ New Pack' button", () => {
    const onOpenSpy = vi.fn();

    render(<Navbar onOpen={onOpenSpy} />);

    const newPackButton = screen.getByRole('button', { name: 'New pack' });

    expect(newPackButton).toBeInTheDocument();

    fireEvent.click(newPackButton);

    expect(onOpenSpy).toHaveBeenCalled();
  });
});
