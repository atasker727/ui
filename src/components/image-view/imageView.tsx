import type { JSX } from 'react';
import { useState } from 'react';
import './style.scss';
import errorImage from '@/constants/image-not-found';

interface imageViewProps {
  className?: string;
  src?: string;
  alt?: string;
  sizeType?: 'fullsize' | 'preview';
}

export default function ImageView({ className = '', src, alt, sizeType = 'preview' }: imageViewProps): JSX.Element {
  const sizeClass = `size-${sizeType}`;
  const [isLoading, setIsLoading] = useState(true);

  function onError(ev: React.SyntheticEvent<HTMLImageElement, Event>): void {
    const currentTarget = ev.currentTarget as HTMLImageElement;
    currentTarget.src = errorImage.src;
    currentTarget.alt = errorImage.alt;
    setIsLoading(false);
  }

  function onLoad(val: boolean) {
    setIsLoading(val);
  }

  function getAlt() {
    if (!src) return errorImage.alt;

    return alt || 'no alt text found';
  }

  return (
    <div className={`image-view-container d-flex ${sizeClass} ${className}`}>
      {isLoading && (
        <div className="image-loading" role="status" aria-live="polite" aria-busy="true">
          Loading...
        </div>
      )}
      <img
        data-element-type="image"
        src={src || errorImage.src}
        alt={getAlt()}
        loading="lazy"
        onLoad={() => onLoad(false)}
        onError={onError}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      />
    </div>
  );
}
