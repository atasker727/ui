import type { JSX } from 'react';
import './style.scss';

import ImageView from '../image-view/imageView';
import { useHooks } from './imageCarousel.hooks.tsx';
import nextId from 'react-id-generator';

export default function ImageCarousel({
  sizeType,
}: {
  className?: string;
  sizeType: 'fullsize' | 'preview';
}): JSX.Element {
  const sizeClass = sizeType === 'preview' ? 'image-carousel-container--preview' : 'image-carousel-container--fullsize';

  const carouselId = nextId('carousel-');
  const { shownImageId, setShownImageId, images } = useHooks();

  const handleCarouselArrowClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target?.id === carouselId) {
      const { left, width } = target.getBoundingClientRect();

      const direction = e.clientX < left + width / 2 ? 'left' : 'right';

      showNewImage(direction);
    }
  };

  const showNewImage = (direction: string) => {
    if (images === null) return;

    let newIndex = 0;
    const oldIndex = images.findIndex(({ imageURL }) => shownImageId === imageURL);

    if (direction === 'right') {
      newIndex = (oldIndex + 1) % images.length;
    } else if (direction === 'left') {
      newIndex = (oldIndex - 1 + images.length) % images.length;
    }

    setShownImageId(images[newIndex].imageURL);
  };

  return (
    <div id={carouselId} className={`image-carousel-container d-flex ${sizeClass}`} onClick={handleCarouselArrowClick}>
      {images?.map((src) => (
        <ImageView
          key={src.imageURL}
          src={src.imageURL}
          sizeType={sizeType}
          className={shownImageId === src.imageURL ? 'image--visible' : 'image--hidden'}
          // onClick={() => setShownImageId(idx)}
        />
      ))}
    </div>
  );
}
