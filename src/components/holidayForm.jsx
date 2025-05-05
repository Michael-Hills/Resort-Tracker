import { useState } from 'react';
import Button from './button';
import PropTypes from 'prop-types';
import { Plus, X } from 'lucide-react';

export default function HolidayForm({resorts, onSubmit, onCancel,
  initialResortId = '', hideResortSelector = false}) {
  const [formData, setFormData] = useState({
    resortId: initialResortId,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    notes: '',
    photos: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, {
            id: crypto.randomUUID(),
            url: fileUrl,
            caption: file.name
          }]
        }));
      }
    };

    input.click();
  };

  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Holiday</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!hideResortSelector && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resort
              </label>
              <select
                value={formData.resortId}
                onChange={(e) => setFormData(prev => ({ ...prev, resortId: e.target.value }))}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select a resort</option>
                {resorts.map(resort => (
                  <option key={resort.id} value={resort.id}>
                    {resort.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full border rounded-md p-2"
              rows="3"
            />
          </div>

          {/* New photo upload section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos
            </label>
            <div className="grid grid-cols-3 gap-2">
              {formData.photos.map(photo => (
                <div key={photo.id} className="relative group">
                  <img 
                    src={photo.url} 
                    alt="" 
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {formData.photos.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Holiday
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

HolidayForm.propTypes = {
  resorts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialResortId: PropTypes.string,
  hideResortSelector: PropTypes.bool
};