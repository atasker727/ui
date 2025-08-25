import ImageCarousel from '@/components/image-carousel/imageCarousel';
import ImageView from '@/components/image-view/imageView';
import { cancellableRequestGet } from '@/common/utils/requestsCore';
import type { MarsPhoto } from '@/common/types/photoTypes';

import { useState, useEffect } from 'react';

export default function MarsPhotos() {
  const photoType = 'MarsPhotos';

  const [images, setImages] = useState<MarsPhoto[] | null>(null);
  const [fullSizeImage, setFullSizeImage] = useState<MarsPhoto | null>(null);

  function fetchMarsPhotos() {
    const url = `/api/mars-photos`;

    const photosRequest = cancellableRequestGet(url);

    photosRequest
      .then((response) => {
        const typedResponse = response as { photos: MarsPhoto[] };
        if (typedResponse && typedResponse.photos) {
          setImages(typedResponse.photos);
        }
      })
      .catch(console.error);

    return photosRequest;
  }

  useEffect(() => {
    const photosRequest = fetchMarsPhotos();
    return () => photosRequest.cancelRequest('component unmounted');
  }, []);

  function onImageClick(image: MarsPhoto) {
    setFullSizeImage(image);
  }

  return (
    <>
      <ImageCarousel images={images} sizeType="preview" photoType={photoType} onImageClick={onImageClick} />
      {fullSizeImage && (
        <ImageView
          sizeType="fullsize"
          key={fullSizeImage.id}
          src={fullSizeImage.imageURL}
          // className={shownImageId === src.imageURL ? 'image--visible' : 'image--hidden'}
          // onClick={() => setShownImageId(idx)}
        />
      )}
    </>
  );
}
