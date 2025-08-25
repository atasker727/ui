import { useState, useEffect } from 'react';
import type { PhotoOfTheDay, ALLOWED_PHOTO_TYPES } from '@/common/types/photoTypes';
import { cancellableRequestGet } from '@/common/utils/requestsCore';

export function useHooks(type: ALLOWED_PHOTO_TYPES) {
  const [shownImageId, setShownImageId] = useState<string | number>();
  const [images, setImages] = useState<PhotoOfTheDay[] | null>(null);

  useEffect(() => {
    // const params = { date: '2025-01-01' };
    let params = {};
    let url;

    if (type === 'POTD') {
      url = `/api/photo-of-the-day`;
      params = { start_date: '2025-01-01', end_date: '2025-01-07' };
    } else if (type === 'MarsPhotos') {
      url = `/api/mars-photos`;
      params = {};
    } else {
      Promise.reject({ message: 'no type specified' });
      return;
    }

    const photosRequest = cancellableRequestGet(url, params);

    photosRequest
      .then((response) => {
        const typedResponse = response as { photos: PhotoOfTheDay[] };
        if (typedResponse && typedResponse.photos) {
          setImages(typedResponse.photos);
          setShownImageId(typedResponse.photos[0].id);
        }
      })
      .catch(console.error);

    return () => photosRequest.cancelRequest('component unmounted');
  }, [type]);

  return { shownImageId, setShownImageId, images };
}
