import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders particular section', () => {
  render(<App />);
  const threePillarSection = screen.getByTestId('3pillar-global-section');
  const githubSection = screen.getByTestId(
    'github-starting-repository-section'
  );

  expect(threePillarSection).toBeInTheDocument();
  expect(githubSection).toBeInTheDocument();
});

test('3pillar section has right title', () => {
  render(<App />);
  const threePillarSection = screen.getByTestId('3pillar-global-section');

  expect(threePillarSection.querySelector('h2')).toHaveTextContent(
    'Official websites'
  );
});

test('3pillar section has right description', () => {
  render(<App />);
  const threePillarSection = screen.getByTestId('3pillar-global-section');

  expect(threePillarSection.querySelector('p')).toHaveTextContent(
    `3Pillar Global builds breakthrough software products that power digital businesses. 
     Trusted services. Tested results. Innovations that scale.`
  );
});

test('3pillar section has right link', () => {
  render(<App />);
  const threePillarSection = screen.getByTestId('3pillar-global-section');
  const link = threePillarSection.querySelector('button');

  expect(link).toHaveTextContent(`More >`);

  window.open = jest.fn();
  link?.click();

  expect(window.open).toHaveBeenCalled();
});
