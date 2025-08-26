import type { JSX, ReactNode } from 'react';
import './style.scss';

interface ToastProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  text: ReactNode;
  type?: 'default' | 'error' | 'success';
}

export default function Toast({
  className = '',
  isOpen,
  onClose,
  text,
  type = 'default',
}: ToastProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className={`toast-container toast--${type} ${className} ${isOpen ? 'toast-show' : 'toast-hide'}`}>
      <div className="toast-content">{text}</div>
      <button className="toast-close-button" onClick={onClose}>
        X
      </button>
    </div>
  );
}
