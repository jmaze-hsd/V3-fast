import React from 'react';
import { SavedLesson, LessonType } from '../types';
import { Calendar, BookOpen, Trash2, FileText, ChevronRight } from 'lucide-react';

interface Props {
  lessons: SavedLesson[];
  onLoad: (lesson: SavedLesson) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const SavedLessonsList: React.FC<Props> = ({ lessons, onLoad, onDelete, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-blue-900">My Saved Frameworks</h2>
          <p className="text-gray-500 mt-1">Revisit and modify your pedagogical plans.</p>
        </div>
        <button 
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
        >
          &larr; Create New
        </button>
      </div>

      {lessons.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Saved Lessons Yet</h3>
          <p className="text-gray-500 mb-6">Create your first lesson framework using the wizard!</p>
          <button 
            onClick={onBack}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
          >
            Start Planning
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.sort((a, b) => b.timestamp - a.timestamp).map((lesson) => (
            <div 
              key={lesson.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all group relative cursor-pointer"
              onClick={() => onLoad(lesson)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(lesson.id); }}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition-colors truncate pr-4">
                {lesson.name}
              </h3>
              
              <div className="space-y-1.5">
                <div className="flex items-center text-xs text-gray-500">
                  <span className="font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded mr-2 uppercase">
                    {lesson.plan.meta.grade || 'No Grade'}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${lesson.plan.meta.lessonType === LessonType.DECLARATIVE ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {lesson.plan.meta.lessonType}
                  </span>
                </div>
                <div className="text-sm text-gray-600 line-clamp-1 italic">
                  "{lesson.plan.meta.topic}"
                </div>
                <div className="flex items-center text-[10px] text-gray-400 pt-2 border-t mt-3">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(lesson.timestamp).toLocaleDateString()} at {new Date(lesson.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <ChevronRight className="absolute bottom-5 right-5 w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-all group-hover:translate-x-1" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLessonsList;