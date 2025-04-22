import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';
import { addPhotoToHoliday } from '../services/resortService';

const getImageSize = (photoCount) => {
    if (photoCount <= 1) return 'h-24 w-24 sm:h-48 sm:w-48';
    if (photoCount <= 2) return 'h-20 w-20 sm:h-40 sm:w-40';
    if (photoCount <= 3) return 'h-16 w-16 sm:h-32 sm:w-32';
    return 'h-14 w-14 sm:h-32 sm:w-32'; 
};
  

export default function PhotoGallery({ photos, holidayId, onPhotoAdded }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (selectedPhoto) {
      const img = new Image();
      img.src = selectedPhoto.url;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.9;
        
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }
        
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        setDimensions({ width, height });
      };
    }
  }, [selectedPhoto]);


  const handleAddPhoto = () => {
    // Create hidden file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          // Create a temporary URL for the selected file
          const fileUrl = URL.createObjectURL(file);
          
          // Add the photo through the service
          const newPhoto = await addPhotoToHoliday(holidayId, {
            url: fileUrl, // In a real app, you'd upload to a server first
            caption: file.name
          });

          // Notify parent component to refresh photos
          if (onPhotoAdded) {
            onPhotoAdded(newPhoto);
          }
        } catch (error) {
          console.error('Error adding photo:', error);
          // You might want to show an error message to the user here
        }
      }
    };

    input.click();
  };

  if (!photos?.length) return null;
  const imageSize = getImageSize(photos.length);

  return (
    <>
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex gap-1 sm:gap-4 mt-6 pb-4 overflow-x-auto snap-x snap-mandatory no-scrollbar justify-center">
            {photos.map((photo) => (
            <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`${imageSize} flex-shrink-0 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow`}
            >
                <img
                src={photo.url}
                alt=""
                className="h-full w-full object-cover"
                />
            </button>
            ))}

            {photos.length < 5 && (
              <button
                onClick={handleAddPhoto}
                className={`${imageSize} flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center bg-gray-50 hover:bg-gray-100`}
              >
                <div className="flex flex-col items-center text-gray-500">
                  <Plus className="w-6 h-6" />
                  <span className="text-xs mt-1">Add Photo</span>
                </div>
              </button>
            )}
        </div>
        </div>
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative rounded-lg"
            style={{ 
              width: dimensions.width || 'auto',
              height: dimensions.height || 'auto'
            }}
          >
            <img
              src={selectedPhoto.url}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}

PhotoGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  holidayId: PropTypes.string.isRequired,
  onPhotoAdded: PropTypes.func
};