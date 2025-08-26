import ImageCarousel from '@/components/image-carousel/imageCarousel';
import ImageView from '@/components/image-view/imageView';
import { cancellableRequestGet } from '@/common/utils/requestsCore';
import type { PhotoOfTheDay } from '@/common/types/photoTypes';

import { useState, useEffect } from 'react';

export default function PhotoOfTheDay() {
  const photoType = 'POTD';

  const [images, setImages] = useState<PhotoOfTheDay[] | null>(null);
  const [fullSizeImage, setFullSizeImage] = useState<PhotoOfTheDay | null>(null);

  function fetchPhotosOfTheDay() {
    const url = `/api/photo-of-the-day`;
    const params = { start_date: '2025-01-01', end_date: '2025-01-07' };

    const photosRequest = cancellableRequestGet(url, params);

    photosRequest
      .then((response) => {
        const typedResponse = response as { photos: PhotoOfTheDay[] };
        if (typedResponse && typedResponse.photos) {
          setImages(typedResponse.photos);
        }
      })
      .catch(console.error);

    return photosRequest;
  }

  useEffect(() => {
    const photosRequest = fetchPhotosOfTheDay();
    return () => photosRequest.cancelRequest('component unmounted');
  }, []);

  function onImageClick(image: PhotoOfTheDay) {
    setFullSizeImage(image);
  }

  return (
    <>
      <ImageCarousel images={images} sizeType="preview" photoType={photoType} onImageClick={onImageClick} />
      {fullSizeImage && <ImageView sizeType="fullsize" key={fullSizeImage.id} src={fullSizeImage.imageURL} />}
    </>
  );
}
