import { useState, useEffect } from 'react';
import { type PhotoOfTheDay } from '@/common/types/photoOfTheDay.d';
// import { type cancellableRequestClassType } from '@/common/types/cancellableRequests';
import { cancellableRequestGet } from '@/common/utils/requestsCore';


export function useHooks() {
  const [shownImageId, setShownImageId] = useState('');
  const [images, setImages] = useState<PhotoOfTheDay[] | null>(null);

  useEffect(() => {
    // const params = { date: '2025-01-01' };
    const params = { start_date: '2025-01-01', end_date: '2025-01-02' };

    const photosRequest = cancellableRequestGet('/api/photo-of-the-day', params)
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
