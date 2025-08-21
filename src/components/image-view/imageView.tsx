import type { JSX } from 'react';
import './style.scss';

interface ImageType {
  className?: string;
  src?: string;
  alt?: string;
  sizeType?: 'fullsize' | 'preview';
}

export default function ImageView({ className = '', src, alt, sizeType = 'preview' }: ImageType): JSX.Element {
  const sizeClass = `size-${sizeType}`;

  return (
    <div className={`image-view-container d-flex ${sizeClass} ${className}`}>
      <img
        src={src || 'https://apod.nasa.gov/apod/image/2508/NGC6872_block1024.jpg'}
        alt={(alt && src) || 'Giant Galaxies in Pavo'}
      />
    </div>
  );
}
