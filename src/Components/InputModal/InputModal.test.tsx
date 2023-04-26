import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import InputModal from './InputModal';
import * as requests from '../../requests/requests';
import { createCardsModalLabels } from '../../data/labels';

describe('<InputModal />', () => {
  const generateCardsSpy = vi
    .spyOn(requests, 'generateCards')
    .mockImplementation(() =>
      Promise.resolve({
        data: { choices: [{ text: '' }] },
        // FIXME: Open AI return type casues problems
      } as any)
    );

  const mockSetCards = vi.fn();

  it('should start request and set the cards when clicked on "Generate Pack" button', async () => {
    render(<InputModal onClose={vi.fn()} isOpen setCards={mockSetCards} />);

    changeTopicValue('mocking in ui tests');
    clickOnGenerateCardsButton();

    await waitFor(() => {
      expect(generateCardsSpy).toHaveBeenCalled();
      expect(mockSetCards).toHaveBeenCalled();
    });
  });
});

const changeTopicValue = (text: string) => {
  const topicInput = screen.getByPlaceholderText('A very interesting topic');
  fireEvent.change(topicInput, text);
};

const clickOnGenerateCardsButton = () => {
  fireEvent.click(screen.getByText(createCardsModalLabels.generatePack));
};
