import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[75vh] bg-[#000000] flex items-center justify-center p-4 text-white">
          <div className="max-w-md w-full bg-[#0A0A0A] border border-white/10 rounded-[24px] p-12 text-center shadow-2xl">
            <div className="w-20 h-20 bg-red-900/30 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <AlertTriangle size={40} />
            </div>
            <h1 className="text-3xl font-sans font-bold text-white mb-4">Structural Anomaly Detected</h1>
            <p className="text-white/60 mb-10 leading-relaxed font-mono text-sm break-words">
              {this.state.error?.message || this.state.error?.toString()} 
            </p>
            <div className="space-y-4">
              <Button 
                variant="primary" 
                className="w-full h-14 rounded-2xl flex items-center justify-center gap-2"
                onClick={() => window.location.reload()}
              >
                <RefreshCw size={20} /> Re-Initialize Domain
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 border-white/10 text-white"
                onClick={() => window.location.href = '/'}
              >
                <Home size={20} /> Return to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
