import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialContent: string;
  onSave: (content: string) => void;
}

const EditModal: React.FC<Props> = ({ isOpen, onClose, title, initialContent, onSave }) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">Edit: {title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            className="w-full h-80 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none font-sans text-gray-700 leading-relaxed"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(content)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center shadow-sm transition-transform active:scale-95"
          >
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
