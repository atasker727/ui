import type { JSX } from 'react';
import './style.scss';

import ImageView from '../image-view/imageView';
import { useHooks } from './imageCarousel.hooks.tsx';
import nextId from 'react-id-generator';
import type { ALLOWED_PHOTO_TYPES } from '@/common/types/photoTypes.js';

export default function ImageCarousel({
  photoType,
  sizeType,
  onImageClick,
}: {
  className?: string;
  photoType: ALLOWED_PHOTO_TYPES;
  sizeType: 'fullsize' | 'preview';
  onImageClick?: (image: unknown) => void;
}): JSX.Element {
  const sizeClass = sizeType === 'preview' ? 'image-carousel-container--preview' : 'image-carousel-container--fullsize';

  const carouselId = nextId('carousel-');
  const { shownImageId, setShownImageId, images } = useHooks(photoType);

  const handleCarouselClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target?.id === carouselId) {
      const { left, width } = target.getBoundingClientRect();

      const direction = e.clientX < left + width / 2 ? 'left' : 'right';

      showNewImage(direction);
    } else if (target?.getAttribute('data-element-type') === 'image') {
      onImageClick?.(images?.find(({ id }) => id === shownImageId));
    }
  };

  const showNewImage = (direction: string) => {
    if (images === null) return;

    let newIndex = 0;
    const oldIndex = images.findIndex(({ id }) => shownImageId === id);

    if (direction === 'right') {
      newIndex = (oldIndex + 1) % images.length;
    } else if (direction === 'left') {
      newIndex = (oldIndex - 1 + images.length) % images.length;
    }

    setShownImageId(images[newIndex].id);
  };

  return (
    <div id={carouselId} className={`image-carousel-container d-flex ${sizeClass}`} onClick={handleCarouselClick}>
      {images?.map((image) => (
        <ImageView
          key={image.id}
          src={image.imageURL}
          sizeType={sizeType}
          className={shownImageId === image.id ? 'image--visible' : 'image--hidden'}
        />
      ))}
    </div>
  );
}
