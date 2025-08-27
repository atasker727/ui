import ImageCarousel from '@/components/image-carousel/imageCarousel';
import ImageView from '@/components/image-view/imageView';
import Toast from '@/components/toast/Toast';
import { cancellableRequestGet } from '@/common/utils/requestsCore';
import type { PhotoOfTheDay } from '@/common/types/photoTypes';
import type { cancellableRequestClassType } from '@/common/types/cancellableRequests';
import type { JSX } from 'react';

import { useState, useEffect, useRef } from 'react';
import './style.scss';
import DateRange, { type DateRangeValue } from '@/components/date-range/DateRange';

export default function PhotoOfTheDay(): JSX.Element {
  const photoType = 'POTD';

  const [images, setImages] = useState<PhotoOfTheDay[] | null>(null);
  const [fullSizeImage, setFullSizeImage] = useState<PhotoOfTheDay | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dateRange, setDateRange] = useState<DateRangeValue>({ startDate: '2025-01-08', endDate: '2025-01-14' });
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const activeRequestRef = useRef<cancellableRequestClassType | null>(null);

  function fetchPhotosOfTheDay(startDate: string, endDate: string) {
    if (activeRequestRef.current) {
      try {
        activeRequestRef.current.cancelRequest('superseded by new request');
      } catch (err) {
        console.error(err);
      }
    }

    const url = `/api/photo-of-the-day`;
    const params = { start_date: startDate, end_date: endDate };

    const photosRequest = cancellableRequestGet(url, params);
    activeRequestRef.current = photosRequest;

    photosRequest
      .then((response) => {
        const typedResponse = response as { photos: PhotoOfTheDay[] };
        if (typedResponse && typedResponse.photos) {
          setImages(typedResponse.photos);
          if (typedResponse.photos.length) {
            setFullSizeImage(typedResponse.photos[0]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setImages([]);
        setShowErrorToast(true);
        setErrorMessage('Something went wrong fetching the images, please refresh');
      })
      .finally(() => {
        activeRequestRef.current = null;
      });

    return photosRequest;
  }

  useEffect(() => {
    if (activeRequestRef.current) activeRequestRef.current.cancelRequest();
    const req = fetchPhotosOfTheDay(dateRange.startDate, dateRange.endDate);
    activeRequestRef.current = req;

    return () => req.cancelRequest('component unmounted');
  }, []);

  return (
    <>
      <div className="action-bar">
        <ImageCarousel images={images} sizeType="preview" photoType={photoType} onImageClick={setFullSizeImage} />
        <div className="search-controls">
          <DateRange value={dateRange} onChange={setDateRange} onValidityChange={setIsDateRangeValid} />
          <button
            className="search-button"
            disabled={!isDateRangeValid}
            onClick={() => fetchPhotosOfTheDay(dateRange.startDate, dateRange.endDate)}
          >
            search
          </button>
        </div>
      </div>
      {fullSizeImage && (
        <div className="POTD-fullsize-content">
          <div className="POTD-image-pane">
            <ImageView sizeType="fullsize" src={fullSizeImage.HDURL} />
          </div>
          <div className="POTD-details-pane">
            <div className="POTD-header">
              <h2 className="POTD-title">{fullSizeImage.title}</h2>
              <div className="POTD-date">{fullSizeImage.date}</div>
            </div>
            <div className="POTD-explanation">{fullSizeImage.explanation}</div>
            {fullSizeImage.copyright && (
              <div className="POTD-copyright">
                <span>© {fullSizeImage.copyright}</span>
              </div>
            )}
          </div>
        </div>
      )}
      <Toast isOpen={showErrorToast} type="error" onClose={() => setShowErrorToast(false)} text={errorMessage} />
    </>
  );
}
