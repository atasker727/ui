import ImageCarousel from '@/components/image-carousel/imageCarousel';
import ImageView from '@/components/image-view/imageView';
import { cancellableRequestGet } from '@/common/utils/requestsCore';
import type { MarsPhoto } from '@/common/types/photoTypes';

import { useState, useEffect } from 'react';

import Toast from '@/components/toast/Toast';

export default function MarsPhotos() {
  const photoType = 'MarsPhotos';

  const [images, setImages] = useState<MarsPhoto[] | null>(null);
  const [fullSizeImage, setFullSizeImage] = useState<MarsPhoto | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      .catch((err) => {
        console.error(err);
        setImages([]);
        setShowErrorToast(true);
        setErrorMessage('Something went wrong fetching the images, please refresh');
      });

    return photosRequest;
  }

  useEffect(() => {
    const photosRequest = fetchMarsPhotos();
    return () => photosRequest.cancelRequest('component unmounted');
  }, []);

  return (
    <>
      <ImageCarousel images={images} sizeType="preview" photoType={photoType} onImageClick={setFullSizeImage} />
      {fullSizeImage && <ImageView sizeType="fullsize" key={fullSizeImage.id} src={fullSizeImage.imageURL} />}
      <Toast isOpen={showErrorToast} type="error" onClose={() => setShowErrorToast(false)} text={errorMessage} />
    </>
  );
}
