import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary component', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => null);

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>All good</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('renders fallback UI when a child throws', () => {
    const Problem = () => {
      throw new Error('Test error');
    };
    render(
      <ErrorBoundary>
        <Problem />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText("We're sorry — an unexpected error occurred.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('resets and re-renders children after clicking Try again', () => {
    let shouldThrow = true;
    const Problem = () => {
      if (shouldThrow) throw new Error('Fail');
      return <div>Recovered OK</div>;
    };

    render(
      <ErrorBoundary>
        <Problem />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    shouldThrow = false;

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(screen.getByText('Recovered OK')).toBeInTheDocument();
  });
});
