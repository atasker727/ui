import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import './style.scss';
import { cancellableRequestGet } from '@/common/utils/requestsCore';
import ImageCarousel from '@/components/image-carousel/imageCarousel';
import ImageView from '@/components/image-view/imageView';
import Toast from '@/components/toast/Toast';
import type { MarsPhoto, ALLOWED_CAMERA_TYPES } from '@/common/types/photoTypes';

const cameraOptions: ALLOWED_CAMERA_TYPES[] = ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'];

export default function MarsPhotos() {
  const photoType = 'MarsPhotos';

  const [images, setImages] = useState<MarsPhoto[] | null>(null);
  const [fullSizeImage, setFullSizeImage] = useState<MarsPhoto | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sol, setSol] = useState(1000);
  const [camera, setCamera] = useState<ALLOWED_CAMERA_TYPES>('FHAZ');

  function fetchMarsPhotos(sol?: number, camera?: ALLOWED_CAMERA_TYPES) {
    const url = `/api/mars-photos`;

    const params = { sol, camera };

    const photosRequest = cancellableRequestGet(url, params);

    photosRequest
      .then((response) => {
        const typedResponse = response as { photos: MarsPhoto[] };
        if (typedResponse && typedResponse.photos) {
          setImages(typedResponse.photos);
          if (typedResponse.photos.length) {
            setFullSizeImage(typedResponse.photos[0]);
          }
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
    const photosRequest = fetchMarsPhotos(sol, camera);
    return () => photosRequest.cancelRequest('component unmounted');
  }, [sol, camera]);

  return (
    <>
      <div className="action-bar">
        <ImageCarousel images={images} sizeType="preview" photoType={photoType} onImageClick={setFullSizeImage} />
        <div className="search-controls">
          <label htmlFor="sol-input" className="mars-photos__label">
            Sol
          </label>
          <input
            id="sol-input"
            className="mars-photos__input"
            type="number"
            min={0}
            value={sol}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSol(parseInt(e.target.value, 10) || 0)}
          />
          <label htmlFor="camera-select" className="mars-photos__label">
            Camera
          </label>
          <select
            id="camera-select"
            className="mars-photos__select"
            value={camera}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCamera(e.target.value as ALLOWED_CAMERA_TYPES)}
          >
            {cameraOptions.map((cam) => (
              <option key={cam} value={cam}>
                {cam}
              </option>
            ))}
          </select>
        </div>
      </div>
      {fullSizeImage && (
        <div className="mars-fullsize-content">
          <ImageView sizeType="fullsize" src={fullSizeImage.imageURL} />
        </div>
      )}
      <Toast isOpen={showErrorToast} type="error" onClose={() => setShowErrorToast(false)} text={errorMessage} />
    </>
  );
}
