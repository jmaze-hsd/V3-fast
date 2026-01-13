import React, { useState, useEffect } from 'react';
import { LessonContext, LessonType, StandardCategory } from '../types';
import { ArrowRight, BookOpen, Brain, Target, Anchor, Wand2, Lightbulb, Loader2, Dices, Sparkles, ChevronDown, Check } from 'lucide-react';
import { generatePreviewHooks, generateRandomContext, fetchStandards } from '../services/geminiService';

interface Props {
  onComplete: (ctx: LessonContext) => void;
  isLoading: boolean;
}

const REASSURING_MESSAGES = [
  "Consulting the FAST pedagogical guides...",
  "Analyzing objective alignment...",
  "Constructing non-academic hooks...",
  "Drafting Expert Thinking scripts...",
  "Synthesizing checking strategies...",
  "Finalizing independent practice tasks...",
  "Ensuring cognitive science alignment...",
];

const SUBJECTS = [
  "English Language Arts (ELA)",
  "Mathematics",
  "Science (NGSS)",
  "History / Social Studies",
  "Visual & Performing Arts",
  "Physical Education",
  "World Languages",
  "Computer Science",
  "Other"
];

const LessonWizard: React.FC<Props> = ({ onComplete, isLoading }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LessonContext>({
    grade: '',
    subject: '',
    standard: '',
    topic: '',
    lessonType: LessonType.UNSET,
    objectiveRaw: '',
    previewIdea: ''
  });

  const [hookIdeas, setHookIdeas] = useState<string[]>([]);
  const [isHookLoading, setIsHookLoading] = useState(false);
  const [isWildCardLoading, setIsWildCardLoading] = useState(false);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);

  // Standards Lookup State
  const [availableCategories, setAvailableCategories] = useState<StandardCategory[]>([]);
  const [isLoadingStandards, setIsLoadingStandards] = useState(false);
  const [standardsError, setStandardsError] = useState('');

  // Rotate loading messages
  useEffect(() => {
    let interval: any;
    if (isLoading || isWildCardLoading) {
      interval = setInterval(() => {
        setLoadingMessageIdx(prev => (prev + 1) % REASSURING_MESSAGES.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading, isWildCardLoading]);

  // Auto-fetch standards when Grade AND Subject are set
  useEffect(() => {
    const fetch = async () => {
      if (!data.grade || !data.subject || data.subject === 'Other') return;
      
      setIsLoadingStandards(true);
      setStandardsError('');
      setAvailableCategories([]); // Clear previous
      
      try {
        const categories = await fetchStandards(data.grade, data.subject);
        setAvailableCategories(categories);
        if (categories.length === 0) setStandardsError('No standards found.');
      } catch (e) {
        setStandardsError('Failed to fetch standards.');
      } finally {
        setIsLoadingStandards(false);
      }
    };

    // Debounce simple check: only fetch if length > 0
    const timeoutId = setTimeout(() => {
       fetch();
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [data.grade, data.subject]);

  const handleChange = (field: keyof LessonContext, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeSelect = (type: LessonType) => {
    setData(prev => ({ ...prev, lessonType: type }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleWildCard = async () => {
    setIsWildCardLoading(true);
    try {
      const randomCtx = await generateRandomContext(data.grade || undefined);
      setData(randomCtx);
      // Ensure we see what was generated
      setTimeout(() => {
        onComplete(randomCtx);
        setIsWildCardLoading(false);
      }, 1000);
    } catch (e) {
      console.error(e);
      alert("Failed to dream up a lesson. Please try again.");
      setIsWildCardLoading(false);
    }
  };

  const handleStandardSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    // Find the standard description from categories
    let desc = '';
    for (const cat of availableCategories) {
      const found = cat.standards.find(s => s.code === code);
      if (found) {
        desc = found.description;
        break;
      }
    }
    
    if (code) {
      handleChange('standard', `${code}: ${desc}`);
    }
  };

  const handleFindHook = async () => {
    setIsHookLoading(true);
    setHookIdeas([]);
    try {
      const hooks = await generatePreviewHooks(data, 1);
      if (hooks.length > 0) {
        handleChange('previewIdea', hooks[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsHookLoading(false);
    }
  };

  const handleBrainstorm = async () => {
    setIsHookLoading(true);
    setHookIdeas([]);
    try {
      const hooks = await generatePreviewHooks(data, 4);
      setHookIdeas(hooks);
    } catch (e) {
      console.error(e);
    } finally {
      setIsHookLoading(false);
    }
  };

  const handleSelectHook = (hook: string) => {
    handleChange('previewIdea', hook);
    setHookIdeas([]);
  };

  if (isLoading || isWildCardLoading) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-12 flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-300">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          {isWildCardLoading ? (
             <Dices className="absolute inset-0 m-auto w-8 h-8 text-purple-600 animate-bounce" />
          ) : (
            <Brain className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-pulse" />
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {isWildCardLoading ? "Dreaming up a Lesson..." : "Generating Your Framework"}
        </h3>
        <p className="text-blue-600 font-medium text-center h-6 animate-in fade-in duration-500 key={loadingMessageIdx}">
          {isWildCardLoading ? "Choosing a creative topic..." : REASSURING_MESSAGES[loadingMessageIdx]}
        </p>
        <div className="mt-8 flex gap-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
        <p className="text-xs text-gray-400 mt-6 text-center max-w-xs">
          This usually takes about 10-15 seconds.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <BookOpen className="mr-2 text-blue-600" />
        Build Your FAST Lesson
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
        <div className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${(step / 4) * 100}%` }}></div>
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex justify-between items-center mb-1">
             <h3 className="text-lg font-semibold text-gray-700">The Basics</h3>
             <button
               onClick={handleWildCard}
               className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 overflow-hidden"
             >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors"></div>
                <Dices className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Wild Card
                <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
             </button>
          </div>
          
          {/* Part 1: Grade & Subject */}
          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 shadow-sm">
            <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-4 flex items-center">
               <span className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs mr-2 border border-blue-300">1</span>
               Grade Level & Subject
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Grade Level</label>
                  <input 
                    type="text" 
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-400"
                    placeholder="e.g. 5th Grade"
                    value={data.grade}
                    onChange={(e) => handleChange('grade', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Subject</label>
                  <div className="relative">
                    <select
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white text-gray-900 cursor-pointer"
                      value={data.subject}
                      onChange={(e) => {
                        handleChange('subject', e.target.value);
                      }}
                    >
                      <option value="">Select Subject...</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
            </div>
          </div>

          {/* Part 2: Standard */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm relative">
             <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                   <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs mr-2 border border-gray-300">2</span>
                   Standard
                </h4>
               
                {/* Status Indicator */}
                {isLoadingStandards ? (
                   <div className="flex items-center text-xs text-blue-600 font-bold animate-pulse bg-blue-50 px-2 py-1 rounded-full">
                     <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Fetching Standards...
                   </div>
                 ) : availableCategories.length > 0 ? (
                   <div className="flex items-center text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">
                     <Check className="w-3 h-3 mr-1" /> Ready to select
                   </div>
                 ) : null}
             </div>

            {/* Helper Text */}
            <p className="text-xs text-gray-500 mb-3 pl-8">
              Select from the dropdown (requires Part 1) or type manually below.
            </p>

            <div className="pl-0 md:pl-8 space-y-3">
               {standardsError && <p className="text-xs text-red-500">{standardsError}</p>}
            
               {/* Dropdown */}
               <div className="relative">
                  <select 
                    className={`w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer transition-colors ${availableCategories.length > 0 ? 'bg-white border-blue-200 text-blue-900 font-medium' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
                    onChange={handleStandardSelect}
                    defaultValue=""
                    disabled={availableCategories.length === 0}
                  >
                    <option value="" disabled>
                        {(!data.grade || !data.subject) 
                            ? "Complete Step 1 above to browse standards..." 
                            : availableCategories.length === 0 
                                ? (isLoadingStandards ? "Loading standards..." : "No standards found (Type manually below)")
                                : "✨ Click here to select a standard..."
                        }
                    </option>
                    {availableCategories.map(cat => (
                      <optgroup label={cat.domain} key={cat.domain} className="font-bold text-gray-700">
                        {cat.standards.map(s => (
                          <option key={s.code} value={s.code} className="text-gray-600 font-normal">
                             {s.code}: {s.description.length > 80 ? s.description.substring(0, 80) + '...' : s.description}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-3 top-3 w-4 h-4 pointer-events-none ${availableCategories.length > 0 ? 'text-blue-500' : 'text-gray-300'}`} />
                </div>

                {/* Manual Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-400 text-[10px] font-bold">OR</span>
                    </div>
                    <textarea 
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-sm min-h-[60px] text-gray-900 placeholder-gray-400"
                      placeholder="Type any standard code or description here manually..."
                      value={data.standard}
                      onChange={(e) => handleChange('standard', e.target.value)}
                    />
                </div>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Topic Name</label>
             <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-gray-900 placeholder-gray-400"
              placeholder="e.g. Theme vs Main Idea"
              value={data.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
            />
          </div>
          
          <div className="pt-4 flex justify-between items-center">
            <p className="text-[10px] text-gray-400 italic">Try the Wild Card if you're stuck!</p>
            <button 
              onClick={nextStep}
              disabled={!data.grade || !data.standard}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center shadow-sm font-medium transition-all"
            >
              Next <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-semibold text-gray-700">Declarative vs. Procedural</h3>
          <p className="text-gray-600 text-sm italic">
            "Is this lesson about something to <strong>know</strong> (Declarative) or something to <strong>do</strong> (Procedural)?"
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => handleTypeSelect(LessonType.DECLARATIVE)}
              className={`p-4 border-2 rounded-xl text-left transition-all ${data.lessonType === LessonType.DECLARATIVE ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
            >
              <div className="font-bold text-blue-800 mb-2">Declarative</div>
              <p className="text-sm text-gray-600">Concepts, Definitions, Facts. <br/>Example: The Cycle of Poverty, Parts of a Cell.</p>
            </button>

            <button 
              onClick={() => handleTypeSelect(LessonType.PROCEDURAL)}
              className={`p-4 border-2 rounded-xl text-left transition-all ${data.lessonType === LessonType.PROCEDURAL ? 'border-green-600 bg-green-50 ring-2 ring-green-200' : 'border-gray-200 hover:border-green-300'}`}
            >
              <div className="font-bold text-green-800 mb-2">Procedural</div>
              <p className="text-sm text-gray-600">Skills, Algorithms, Steps. <br/>Example: Subtracting with Regrouping.</p>
            </button>
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={prevStep} className="text-gray-600 hover:text-gray-800">Back</button>
            <button 
              onClick={nextStep}
              disabled={data.lessonType === LessonType.UNSET}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center shadow-sm font-medium"
            >
              Next <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <Target className="w-5 h-5 mr-2 text-red-500"/> Learning Objective
          </h3>
          <p className="text-sm text-gray-600">
            What will students do by the end? One verb, one content.
          </p>
          <textarea 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
            placeholder="Students will..."
            rows={3}
            value={data.objectiveRaw}
            onChange={(e) => handleChange('objectiveRaw', e.target.value)}
          />

          <div className="pt-4 flex justify-between">
            <button onClick={prevStep} className="text-gray-600 hover:text-gray-800">Back</button>
            <button 
              onClick={nextStep}
              disabled={!data.objectiveRaw}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center shadow-sm font-medium"
            >
              Next <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <Anchor className="w-5 h-5 mr-2 text-indigo-500"/> The Preview (Anchor)
          </h3>
          <p className="text-sm text-gray-600">
            Connect this to students' prior <strong>non-academic</strong> experience.
          </p>
          
          <div className="relative">
             <textarea 
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none pr-12 text-gray-900 placeholder-gray-400"
                placeholder="A real-world analogy..."
                rows={4}
                value={data.previewIdea}
                onChange={(e) => handleChange('previewIdea', e.target.value)}
              />
              {isHookLoading && (
                  <div className="absolute top-3 right-3 text-blue-500 animate-spin">
                      <Loader2 className="w-5 h-5" />
                  </div>
              )}
          </div>

          <div className="flex gap-3 mb-4">
             <button
               onClick={handleFindHook}
               disabled={isHookLoading}
               className="flex-1 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center text-xs font-bold border border-purple-200"
             >
                <Wand2 className="w-3.5 h-3.5 mr-2" />
                Find Hook
             </button>
             <button
               onClick={handleBrainstorm}
               disabled={isHookLoading}
               className="flex-1 bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors flex items-center justify-center text-xs font-bold border border-amber-200"
             >
                <Lightbulb className="w-3.5 h-3.5 mr-2" />
                Brainstorm
             </button>
          </div>

          {hookIdeas.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Select an idea:</div>
                  {hookIdeas.map((idea, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectHook(idea)}
                        className="w-full text-left text-xs p-2 bg-white border border-gray-200 rounded hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm text-gray-800"
                      >
                        {idea}
                      </button>
                  ))}
              </div>
          )}

          <div className="pt-4 flex justify-between">
            <button onClick={prevStep} className="text-gray-600 hover:text-gray-800">Back</button>
            <button 
              onClick={() => onComplete(data)}
              disabled={isLoading || !data.previewIdea}
              className="bg-green-600 text-white px-8 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center shadow-lg transition-transform active:scale-95 font-bold"
            >
              {isLoading ? 'Processing...' : 'Generate Framework'} <Brain className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonWizard;