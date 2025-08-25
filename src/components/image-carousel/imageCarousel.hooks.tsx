import { useState, useEffect } from 'react';
import type { PhotoOfTheDay, ALLOWED_PHOTO_TYPES } from '@/common/types/photoTypes';
import { cancellableRequestGet } from '@/common/utils/requestsCore';
// const backend_url = import.meta.env.VITE_BACKEND_URL
// console.log(import.meta);

export function useHooks(type: ALLOWED_PHOTO_TYPES) {
  const [shownImageId, setShownImageId] = useState('');
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
          setShownImageId(typedResponse.photos[0].imageURL);
        }
      })
      .catch(console.error);

    return () => photosRequest.cancelRequest('component unmounted');
  }, []);

  return { shownImageId, setShownImageId, images };
}
