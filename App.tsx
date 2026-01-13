import React, { useState, useEffect } from 'react';
import LessonWizard from './components/LessonWizard';
import FastFrameworkGrid from './components/FastFrameworkGrid';
import EditModal from './components/EditModal';
import ActivityModal from './components/ActivityModal';
import RowRefineModal from './components/RowRefineModal';
import SavedLessonsList from './components/SavedLessonsList';
import { LessonPlan, LessonContext, RowKey, ColKey, SavedLesson } from './types';
import { INITIAL_LESSON_PLAN, DEMO_LESSONS } from './constants';
import { generateLessonPlan, refineRow, generateActivitySuggestions } from './services/geminiService';
import { Printer, AlertCircle, Save, FolderOpen, Plus } from 'lucide-react';

const App: React.FC = () => {
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(INITIAL_LESSON_PLAN);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Persistence State
  const [savedLessons, setSavedLessons] = useState<SavedLesson[]>([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  // Edit Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCell, setEditingCell] = useState<{row: RowKey, col: ColKey, title: string} | null>(null);
  const [modalContent, setModalContent] = useState('');

  // Row Refine Modal State
  const [rowRefineOpen, setRowRefineOpen] = useState(false);
  const [refiningRowKey, setRefiningRowKey] = useState<RowKey | null>(null);
  const [isRefiningRow, setIsRefiningRow] = useState(false);

  // Activity/Spice State
  const [spiceModalOpen, setSpiceModalOpen] = useState(false);
  const [spiceSuggestions, setSpiceSuggestions] = useState<any[]>([]);
  const [isSpicing, setIsSpicing] = useState(false);
  const [spicingRow, setSpicingRow] = useState<RowKey | null>(null);

  // Load saved lessons on mount
  useEffect(() => {
    const saved = localStorage.getItem('fast_framework_saved_lessons');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedLessons(parsed);
        } else {
          // If empty list in storage, load demos
          setSavedLessons(DEMO_LESSONS);
        }
      } catch (e) {
        console.error("Failed to parse saved lessons", e);
        setSavedLessons(DEMO_LESSONS);
      }
    } else {
      // First time user: populate with demos
      setSavedLessons(DEMO_LESSONS);
    }
  }, []);

  // Save to localStorage whenever savedLessons changes
  useEffect(() => {
    if (savedLessons.length > 0) {
      localStorage.setItem('fast_framework_saved_lessons', JSON.stringify(savedLessons));
    }
  }, [savedLessons]);

  const handleWizardComplete = async (context: LessonContext) => {
    setIsGenerating(true);
    setError(null);
    setLessonPlan(prev => ({ ...prev, meta: context }));

    try {
      const generatedRows = await generateLessonPlan(context);
      
      const newPlan = {
        ...INITIAL_LESSON_PLAN,
        meta: context,
        rows: {
          preview: { ...INITIAL_LESSON_PLAN.rows.preview, ...generatedRows.preview },
          objective: { ...INITIAL_LESSON_PLAN.rows.objective, ...generatedRows.objective },
          review: { ...INITIAL_LESSON_PLAN.rows.review, ...generatedRows.review },
          keyIdeas: { ...INITIAL_LESSON_PLAN.rows.keyIdeas, ...generatedRows.keyIdeas },
          expertThinking: { ...INITIAL_LESSON_PLAN.rows.expertThinking, ...generatedRows.expertThinking },
          guidedPractice: { ...INITIAL_LESSON_PLAN.rows.guidedPractice, ...generatedRows.guidedPractice },
          closure: { ...INITIAL_LESSON_PLAN.rows.closure, ...generatedRows.closure },
          independentPractice: { ...INITIAL_LESSON_PLAN.rows.independentPractice, ...generatedRows.independentPractice },
        }
      };
      
      setLessonPlan(newPlan);
      setCurrentLessonId(null); // It's a new generation
      setIsGenerated(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while generating the framework.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToLibrary = () => {
    if (currentLessonId) {
      // Update existing
      setSavedLessons(prev => prev.map(l => 
        l.id === currentLessonId 
          ? { ...l, plan: lessonPlan, timestamp: Date.now() } 
          : l
      ));
      alert("Lesson updated successfully!");
    } else {
      // New save
      const name = prompt("Enter a name for this lesson framework:", lessonPlan.meta.topic || "My FAST Lesson");
      if (!name) return;

      const newId = Date.now().toString();
      const newSaved: SavedLesson = {
        id: newId,
        name: name,
        timestamp: Date.now(),
        plan: lessonPlan
      };
      setSavedLessons(prev => [...prev, newSaved]);
      setCurrentLessonId(newId);
      alert("Lesson saved to library!");
    }
  };

  const handleLoadSaved = (saved: SavedLesson) => {
    setLessonPlan(saved.plan);
    setCurrentLessonId(saved.id);
    setIsGenerated(true);
    setShowSavedList(false);
    setError(null);
  };

  const handleDeleteSaved = (id: string) => {
    if (window.confirm("Are you sure you want to delete this saved framework?")) {
      const updated = savedLessons.filter(l => l.id !== id);
      setSavedLessons(updated);
      // Sync to localstorage immediately on delete so user doesn't see it after refresh
      localStorage.setItem('fast_framework_saved_lessons', JSON.stringify(updated));
      if (currentLessonId === id) {
        setCurrentLessonId(null);
      }
    }
  };

  const handleCellClick = (row: RowKey, col: ColKey, content: string, title: string) => {
    setEditingCell({ row, col, title });
    setModalContent(content);
    setModalOpen(true);
  };

  const handleSaveCell = (newContent: string) => {
    if (!editingCell) return;
    updateRowCell(editingCell.row, editingCell.col, newContent);
    setModalOpen(false);
  };

  const updateRowCell = (row: RowKey, col: ColKey, content: string) => {
    setLessonPlan(prev => ({
      ...prev,
      rows: {
        ...prev.rows,
        [row]: {
          ...prev.rows[row],
          [col]: { content: content }
        }
      }
    }));
  };

  const handleRowRefineRequest = async (instruction: string) => {
    if (!refiningRowKey) return;
    
    setIsRefiningRow(true);
    const currentRow = lessonPlan.rows[refiningRowKey];
    
    try {
      const refinedData = await refineRow(
        currentRow.title,
        instruction,
        {
          teacherAction: currentRow.teacherAction.content,
          languageStrategy: currentRow.languageStrategy.content,
          checkForUnderstanding: currentRow.checkForUnderstanding.content
        },
        lessonPlan.meta
      );

      setLessonPlan(prev => ({
        ...prev,
        rows: {
          ...prev.rows,
          [refiningRowKey]: {
            ...prev.rows[refiningRowKey],
            teacherAction: { content: refinedData.teacherAction },
            languageStrategy: { content: refinedData.languageStrategy },
            checkForUnderstanding: { content: refinedData.checkForUnderstanding }
          }
        }
      }));
      setRowRefineOpen(false);
    } catch (e) {
      console.error(e);
      alert("Failed to refine section. Please try again.");
    } finally {
      setIsRefiningRow(false);
    }
  };

  const handleSpiceUp = async (rowKey: RowKey) => {
    setSpicingRow(rowKey);
    setSpiceSuggestions([]);
    setSpiceModalOpen(true);
    setIsSpicing(true);
    try {
      const suggestions = await generateActivitySuggestions(
        lessonPlan.meta, 
        lessonPlan.rows[rowKey].title, 
        lessonPlan.rows[rowKey].teacherAction.content
      );
      setSpiceSuggestions(suggestions);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSpicing(false);
    }
  };

  const handleUseSuggestion = (suggestion: string) => {
    if (!spicingRow) return;
    const current = lessonPlan.rows[spicingRow].teacherAction.content;
    const updated = `${current}\n\n[SPICY ACTIVITY]:\n${suggestion}`;
    updateRowCell(spicingRow, 'teacherAction', updated);
    setSpiceModalOpen(false);
  };

  const handlePrint = () => {
      window.print();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {showSavedList ? (
        <SavedLessonsList 
          lessons={savedLessons} 
          onLoad={handleLoadSaved} 
          onDelete={handleDeleteSaved} 
          onBack={() => setShowSavedList(false)} 
        />
      ) : !isGenerated ? (
        <div className="container mx-auto mt-10">
           <div className="text-center mb-10 flex flex-col items-center">
             <img 
               src="https://drive.google.com/uc?export=view&id=1r4vvfnodDJZLxl8eElgobmBTWP_6hTgY" 
               alt="FAST Framework Logo" 
               className="h-32 w-auto mb-6 object-contain" 
               referrerPolicy="no-referrer"
             />
             <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight">FAST Framework Planner</h1>
             <p className="text-gray-600 mb-8">Automated lesson planning based on Teach FAST strategies.</p>
             
             <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => setShowSavedList(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-sm"
                >
                  <FolderOpen className="w-5 h-5" /> My Saved Frameworks ({savedLessons.length})
                </button>
             </div>

             {error && (
               <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center max-w-2xl animate-in fade-in slide-in-from-top-2">
                 <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
                 <span className="text-sm font-medium">{error}</span>
                 <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600 font-bold">✕</button>
               </div>
             )}
           </div>
           <LessonWizard onComplete={handleWizardComplete} isLoading={isGenerating} />
        </div>
      ) : (
        <div className="container mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center mb-6 print:hidden">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { setIsGenerated(false); setError(null); setCurrentLessonId(null); }}
                className="text-blue-600 hover:underline font-bold flex items-center"
              >
                <Plus className="w-4 h-4 mr-1"/> New
              </button>
              <button 
                onClick={() => setShowSavedList(true)}
                className="text-gray-600 hover:text-blue-600 font-bold flex items-center"
              >
                <FolderOpen className="w-4 h-4 mr-1"/> Library
              </button>
            </div>
            
            <div className="flex gap-3">
                <button 
                    onClick={handleSaveToLibrary}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center hover:bg-blue-700 transition-all shadow-md font-bold"
                >
                    <Save className="w-4 h-4 mr-2"/> {currentLessonId ? 'Update Library' : 'Save to Library'}
                </button>
                <button 
                    onClick={handlePrint}
                    className="bg-gray-800 text-white px-5 py-2.5 rounded-xl flex items-center hover:bg-gray-700 transition-all shadow-md font-bold"
                >
                    <Printer className="w-4 h-4 mr-2"/> Print / PDF
                </button>
            </div>
          </div>
          
          <FastFrameworkGrid 
            plan={lessonPlan} 
            onCellClick={handleCellClick} 
            onSpiceUp={handleSpiceUp}
            onRefineRow={(rowKey) => {
              setRefiningRowKey(rowKey);
              setRowRefineOpen(true);
            }}
          />
        </div>
      )}

      <EditModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCell ? `${editingCell.title} - ${editingCell.col === 'teacherAction' ? 'Action' : 'Strategy'}` : ''}
        initialContent={modalContent}
        onSave={handleSaveCell}
      />

      <RowRefineModal 
        isOpen={rowRefineOpen}
        onClose={() => setRowRefineOpen(false)}
        sectionTitle={refiningRowKey ? lessonPlan.rows[refiningRowKey].title : ''}
        onRefine={handleRowRefineRequest}
        isLoading={isRefiningRow}
      />

      <ActivityModal 
        isOpen={spiceModalOpen}
        onClose={() => setSpiceModalOpen(false)}
        sectionTitle={spicingRow ? lessonPlan.rows[spicingRow].title : ''}
        suggestions={spiceSuggestions}
        isLoading={isSpicing}
        onUseSuggestion={handleUseSuggestion}
      />
    </div>
  );
};

export default App;