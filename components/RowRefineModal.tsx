import React, { useState } from 'react';
import { X, Wand2, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sectionTitle: string;
  onRefine: (instruction: string) => void;
  isLoading: boolean;
}

const RowRefineModal: React.FC<Props> = ({ isOpen, onClose, sectionTitle, onRefine, isLoading }) => {
  const [instruction, setInstruction] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (instruction.trim()) {
      onRefine(instruction);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-purple-50 border-b border-purple-100">
          <div>
            <h3 className="text-xl font-bold text-purple-900 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-purple-600" /> 
              Refine Section: {sectionTitle}
            </h3>
            <p className="text-sm text-purple-700 mt-1">Holistically update this lesson component.</p>
          </div>
          <button onClick={onClose} className="text-purple-400 hover:text-purple-600 transition-colors">
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What would you like to change about this whole section?
            </label>
            <textarea
              className="w-full p-4 border-2 border-purple-50 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-300 outline-none resize-none h-32 transition-all text-gray-900 placeholder:text-gray-300"
              placeholder="e.g. 'Make this more rigorous', 'Include more student movement', 'Simplify the language strategies'..."
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !instruction.trim()}
              className="px-8 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 flex items-center shadow-lg shadow-purple-200 transition-all active:scale-95 font-bold"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" /> Refining...
                </>
              ) : (
                'Refine All Columns'
              )}
            </button>
          </div>
        </form>

        <div className="p-4 border-t bg-gray-50 flex justify-center">
           <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest flex items-center">
             Focused • Adaptable • Structured • Teaching
           </p>
        </div>
      </div>
    </div>
  );
};

export default RowRefineModal;