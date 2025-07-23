import React, { Component } from 'react';
class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(err, info) { console.error(err, info) }
  render() {
    if (this.state.hasError) return <div className="text-red-600 mt-5">Something went wrong.</div>;
    return this.props.children;
  }
}
export default ErrorBoundary;
