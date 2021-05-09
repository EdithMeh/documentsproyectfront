import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '..';

describe('components/ProgressBar', () => {
	describe('Html structure', () => {
		it('Should render Progress Bar', () => {
			const { container } = render(<ProgressBar />);
			expect(container.firstChild).toBeInstanceOf(HTMLElement);
		});
	});
});
