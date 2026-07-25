import React, { Component, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

interface RootProps {
  children: ReactNode;
}
interface RootState {
  hasError: boolean;
  error?: Error;
}

class RootBoundary extends Component<RootProps, RootState> {
  state: RootState = { hasError: false };
  static getDerivedStateFromError(error: Error): RootState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error) {
    console.error("Root crash:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-space-bg p-6">
          <div className="glass-panel p-6 max-w-lg text-center">
            <div className="text-sm text-status-critical font-semibold mb-2">Application Error</div>
            <pre className="text-xs text-slate-400 text-left whitespace-pre-wrap break-words mt-2">
              {this.state.error?.message}
              {"\n\n"}
              {this.state.error?.stack}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootBoundary>
      <App />
    </RootBoundary>
  </React.StrictMode>
);
