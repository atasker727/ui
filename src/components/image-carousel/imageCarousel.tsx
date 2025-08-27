import type { JSX } from 'react';
import './style.scss';

import ImageView from '@/components/image-view/imageView';
import { useEffect, useState } from 'react';

import nextId from 'react-id-generator';

import type { ALLOWED_PHOTO_TYPES, MarsPhoto, PhotoOfTheDay } from '@/common/types/photoTypes.js';

interface imageCarouselProps {
  images: PhotoOfTheDay[] | MarsPhoto[] | null;
  className?: string;
  photoType: ALLOWED_PHOTO_TYPES;
  sizeType: 'fullsize' | 'preview';
  // I've tried every combination of unions of arg types, union of functions with types I can think of
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onImageClick?: (image: any) => void;
}

export default function ImageCarousel({ images, sizeType, onImageClick }: imageCarouselProps): JSX.Element {
  const sizeClass = sizeType === 'preview' ? 'image-carousel-container--preview' : 'image-carousel-container--fullsize';

  const carouselId = nextId('carousel-');
  const [shownImageId, setShownImageId] = useState<string | number | null>(images?.[0]?.id || null);

  useEffect(() => {
    if (!shownImageId && images?.length) {
      setShownImageId(images[0].id);
    }
  }, [images, shownImageId]);

  const handleCarouselClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target?.id === carouselId) {
      const { left, width } = target.getBoundingClientRect();

      const direction = e.clientX < left + width / 2 ? 'left' : 'right';

      showNewImage(direction);
    } else if (target?.getAttribute('data-element-type') === 'image') {
      const foundImage = images?.find(({ id }) => id === shownImageId);
      if (foundImage) {
        onImageClick?.(foundImage);
      }
    }
  };

  function getImageClass(imageId: string | number): string {
    if (!images || images.length === 0) return 'image--hidden';

    const currentIndex = images.findIndex(({ id }) => id === shownImageId);
    if (currentIndex === -1) return 'image--hidden';

    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;

    const prevId = images[prevIndex].id;
    const nextId = images[nextIndex].id;

    if (imageId === shownImageId) return 'image--visible';
    if (imageId === prevId || imageId === nextId) return 'image--part-visible';
    return 'image--hidden';
  }

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
    <>
      {images?.length === 0 && <div>nothing found</div>}
      {images?.length && images.length > 0 && (
        <div id={carouselId} className={`image-carousel-container d-flex ${sizeClass}`} onClick={handleCarouselClick}>
          {images?.map((image) => (
            <ImageView key={image.id} src={image.imageURL} sizeType={sizeType} className={getImageClass(image.id)} />
          ))}
        </div>
      )}
    </>
  );
}
