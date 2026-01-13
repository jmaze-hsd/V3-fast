import React from 'react';
import { X, Sparkles, Plus, CheckCircle2 } from 'lucide-react';

interface Suggestion {
  title: string;
  description: string;
  whyFast: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sectionTitle: string;
  suggestions: Suggestion[];
  isLoading: boolean;
  onUseSuggestion: (suggestion: string) => void;
}

const ActivityModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  sectionTitle, 
  suggestions, 
  isLoading,
  onUseSuggestion
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-amber-50 border-b border-amber-100">
          <div>
            <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" /> 
              Spice Up: {sectionTitle}
            </h3>
            <p className="text-sm text-amber-700 mt-1">FAST-aligned student exercises and engagement strategies.</p>
          </div>
          <button onClick={onClose} className="text-amber-400 hover:text-amber-600 transition-colors">
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium animate-pulse">Consulting the FAST pedagogical guides...</p>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-12 text-gray-500 italic">
              No suggestions found. Try adjusting your lesson objective or topic.
            </div>
          ) : (
            <div className="grid gap-6">
              {suggestions.map((s, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-amber-300 transition-all hover:shadow-md group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-gray-800">{s.title}</h4>
                    <button 
                      onClick={() => onUseSuggestion(s.description)}
                      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <Plus className="w-3 h-3" /> USE THIS
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-lg border border-green-100">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-green-800 italic">
                      <span className="font-bold uppercase tracking-tighter mr-1">Why it fits FAST:</span> 
                      {s.whyFast}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-center rounded-b-xl">
           <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
             Engagement + Rigor = Results
           </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
