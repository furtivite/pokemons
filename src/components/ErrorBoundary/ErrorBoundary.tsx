import React from 'react';
import { Container, Button } from 'react-bootstrap';

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<unknown>, State> {
  constructor(props: React.PropsWithChildren<unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5 text-center">
          <h1>Something went wrong.</h1>
          <p>We&apos;re sorry — an unexpected error occurred.</p>
          <Button variant="primary" onClick={this.handleReload}>
            Try again
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}