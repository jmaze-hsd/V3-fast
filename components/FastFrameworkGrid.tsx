import React from 'react';
import { LessonPlan, LessonRow, RowKey, ColKey, LessonType } from '../types';
import { ICON_MAP } from '../constants';
import { Edit2, Sparkles, Wand2 } from 'lucide-react';

interface Props {
  plan: LessonPlan;
  onCellClick: (rowKey: RowKey, colKey: ColKey, currentContent: string, rowTitle: string) => void;
  onSpiceUp: (rowKey: RowKey) => void;
  onRefineRow: (rowKey: RowKey) => void;
}

const FastFrameworkGrid: React.FC<Props> = ({ plan, onCellClick, onSpiceUp, onRefineRow }) => {
  
  const renderCell = (rowKey: RowKey, colKey: ColKey, content: string, rowTitle: string) => (
    <div 
      onClick={() => onCellClick(rowKey, colKey, content, rowTitle)}
      className="border-b border-r border-gray-300 p-3 min-h-[100px] relative group hover:bg-blue-50 cursor-pointer transition-colors bg-white text-gray-800 text-sm"
    >
      <div className="whitespace-pre-wrap">{content || <span className="text-gray-400 italic">Click to add content...</span>}</div>
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex gap-1">
        <Edit2 className="w-3.5 h-3.5 text-blue-400" />
      </div>
    </div>
  );

  const SPICEABLE_ROWS: RowKey[] = ['review', 'keyIdeas', 'guidedPractice', 'independentPractice'];

  const renderRow = (rowKey: RowKey) => {
    const row = plan.rows[rowKey];
    const Icon = ICON_MAP[row.icon];
    const isSpiceable = SPICEABLE_ROWS.includes(rowKey);

    return (
      <React.Fragment key={rowKey}>
        {/* Lesson Component Column */}
        <div className="border-b border-r border-gray-300 p-2 bg-gray-100 text-gray-800 flex flex-col items-center justify-center text-center relative group">
          <div className="font-bold text-xs uppercase text-gray-700 mb-1">{row.title}</div>
          <Icon className="w-8 h-8 text-gray-500 mb-1" strokeWidth={1.5} />
          <div className="text-[10px] text-gray-600 leading-tight mb-2">{row.description}</div>
          
          <div className="flex flex-col gap-1 w-full max-w-[120px]">
            <button 
              onClick={(e) => { e.stopPropagation(); onRefineRow(rowKey); }}
              className="flex items-center justify-center gap-1 text-[9px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200 hover:bg-purple-200 transition-colors"
            >
              <Wand2 className="w-2.5 h-2.5" /> REFINE
            </button>

            {isSpiceable && (
              <button 
                onClick={(e) => { e.stopPropagation(); onSpiceUp(rowKey); }}
                className="flex items-center justify-center gap-1 text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 hover:bg-amber-200 transition-colors"
              >
                <Sparkles className="w-2.5 h-2.5" /> SPICE UP
              </button>
            )}
          </div>
        </div>

        {/* Action Columns */}
        {renderCell(rowKey, 'teacherAction', row.teacherAction.content, row.title)}
        {renderCell(rowKey, 'languageStrategy', row.languageStrategy.content, row.title)}
        {renderCell(rowKey, 'checkForUnderstanding', row.checkForUnderstanding.content, row.title)}
      </React.Fragment>
    );
  };

  return (
    <div className="w-full bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-300">
        
      {/* Header Info */}
      <div className="bg-gray-50 p-4 border-b border-gray-300 flex justify-between items-start">
        <div className="flex items-start gap-4">
           <img 
               src="https://drive.google.com/uc?export=view&id=1r4vvfnodDJZLxl8eElgobmBTWP_6hTgY" 
               alt="FAST Framework Logo" 
               className="h-16 w-auto object-contain" 
               referrerPolicy="no-referrer"
            />
            <div>
               <h1 className="text-2xl font-bold text-gray-800">FAST Framework</h1>
               <div className="text-sm text-gray-600 mt-1">
                 <span className="font-semibold text-gray-700">Grade:</span> {plan.meta.grade} | 
                 <span className="font-semibold ml-2 text-gray-700">Subject:</span> {plan.meta.subject || 'N/A'}
               </div>
               <div className="text-sm text-gray-600">
                 <span className="font-semibold text-gray-700">Standard:</span> {plan.meta.standard}
               </div>
               <div className="text-sm text-gray-600 mt-1">
                 <span className="font-semibold text-gray-700">Type:</span> 
                 <span className={`ml-1 px-2 py-0.5 rounded text-xs font-bold ${plan.meta.lessonType === LessonType.DECLARATIVE ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {plan.meta.lessonType}
                 </span>
               </div>
            </div>
        </div>
        <div className="text-right print:hidden">
            <div className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded inline-block mb-1 font-semibold">Guiding Question</div>
            <div className="text-xs text-gray-500 max-w-xs">Is this something to know (Declarative) or do (Procedural)?</div>
        </div>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-[140px_1fr_1fr_1fr] bg-gray-800 text-white font-bold text-xs text-center">
        <div className="p-3 border-r border-gray-600 flex items-center justify-center">LESSON COMPONENT</div>
        <div className="p-3 border-r border-gray-600 flex items-center justify-center">TEACHER ACTION</div>
        <div className="p-3 border-r border-gray-600 flex items-center justify-center">LANGUAGE STRATEGY / PROTOCOL</div>
        <div className="p-3 flex items-center justify-center">CHECK FOR UNDERSTANDING</div>
      </div>

      {/* Grid Body */}
      <div className="grid grid-cols-[140px_1fr_1fr_1fr]">
        <div className="col-span-4 bg-gray-200 text-xs font-bold text-gray-600 px-2 py-1 uppercase tracking-wide border-b border-gray-300">
            Introduction to Lesson
        </div>
        {renderRow('preview')}
        {renderRow('objective')}
        {renderRow('review')}

        <div className="col-span-4 bg-gray-200 text-xs font-bold text-gray-600 px-2 py-1 uppercase tracking-wide border-b border-gray-300 flex justify-between">
            <span>Teach - (Provide Input) OWL 1</span>
        </div>
        {renderRow('keyIdeas')}
        {renderRow('expertThinking')}

        <div className="col-span-4 bg-gray-200 text-xs font-bold text-gray-600 px-2 py-1 uppercase tracking-wide border-b border-gray-300">
            Inline Synthesis
        </div>
        {renderRow('guidedPractice')}

        <div className="col-span-4 bg-gray-200 text-xs font-bold text-gray-600 px-2 py-1 uppercase tracking-wide border-b border-gray-300">
            End of Line Synthesis - OWL 2
        </div>
        {renderRow('closure')}
        {renderRow('independentPractice')}
      </div>
      
      <div className="p-2 text-[10px] text-gray-400 text-center bg-gray-50">
        Based on TESS Total Educational Systems Support | FAST Framework
      </div>
    </div>
  );
};

export default FastFrameworkGrid;