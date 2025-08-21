import { useState, useEffect } from 'react';
import { type PhotoOfTheDay } from 'common-files';
import { cancellableRequestGet } from '@/utils/cancellable-requests';

// const testData = [
//   {
//     date: '2025-08-18',
//     explanation:
//       "This galaxy is not only pretty -- it's useful.  A gorgeous spiral some 100 million light-years distant, NGC 1309 lies on the banks of the constellation of the River (Eridanus). NGC 1309 spans about 60,000 light-years, making it about two-thirds the size of our larger Milky Way galaxy. Bluish clusters of young stars and dust lanes are seen to trace out NGC 1309's spiral arms as they wind around an older yellowish star population at its core. Not just another pretty face-on spiral galaxy, observations of NGC 1309's two recent supernovas and multiple  Cepheid variable stars contribute to the calibration of the expansion of the Universe. Still, after you get over this beautiful galaxy's grand design, check out the array of more distant background galaxies also recorded in this sharp image from the  Hubble Space Telescope.",
//     HDURL: 'https://apod.nasa.gov/apod/image/2508/Spiral1309_HubbleGalbany_4000.jpg',
//     title: 'NGC 1309: A Useful Spiral Galaxy',
//     imageURL: 'https://apod.nasa.gov/apod/image/2508/Spiral1309_HubbleGalbany_960.jpg',
//   },
// ];

export function useHooks() {
  const [shownImageId, setShownImageId] = useState('');
  const [images, setImages] = useState<PhotoOfTheDay[] | null>(null);

  useEffect(() => {
    // const params = { date: '2025-01-01' };
    const params = { start_date: '2025-01-01', end_date: '2025-01-02' };

    const { responsePromise, cancelRequest } = cancellableRequestGet('/photo-of-the-day', params);

    responsePromise.then((response => {
      const typedResponse = response as { photos: PhotoOfTheDay[] };
      if (typedResponse && typedResponse.photos) {
        setImages(typedResponse.photos);
        setShownImageId(typedResponse.photos[0].imageURL);
      }
    }))

    return cancelRequest;
  }, []);

  return { shownImageId, setShownImageId, images };
}
