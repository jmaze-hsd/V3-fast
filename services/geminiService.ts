import { GoogleGenAI, Type, Schema } from "@google/genai";
import { LessonContext, LessonPlan, LessonType, StandardOption, StandardCategory } from "../types";
import { getLocalStandards } from "../standardsData";

const SYSTEM_INSTRUCTION = `
You are an expert instructional coach specializing in the FAST Framework (Focused, Adaptable, Structured, Teaching) by Gene Tavernetti. 
Your goal is to generate lesson plan components that strictly adhere to the cognitive science and strategies outlined in the "Teach FAST" book.

PEDAGOGICAL RULES:
1. PREVIEW: Non-academic. Anchor to student experience.
2. OBJECTIVE: One verb, one content.
3. REVIEW: Only prerequisite skills for this lesson.
4. KEY IDEAS: Rule of 3 (Definition, Steps, Examples).
5. EXPERT THINKING: Scripted "Think Aloud" monologue.
6. GUIDED PRACTICE: Gradual release "I do/We do".
7. CLOSURE: VERBAL reiteration of Key Ideas. Students must orally summarize the "What" and "How" to prove readiness. Do not ask for written work here.
8. INDEPENDENT PRACTICE: 100% objective alignment.
`;

const LESSON_RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    rows: {
      type: Type.OBJECT,
      properties: {
        preview: {
          type: Type.OBJECT,
          properties: {
            teacherAction: { type: Type.STRING },
            languageStrategy: { type: Type.STRING },
            checkForUnderstanding: { type: Type.STRING },
          },
          required: ["teacherAction", "languageStrategy", "checkForUnderstanding"],
        },
        objective: {
          type: Type.OBJECT,
          properties: {
            teacherAction: { type: Type.STRING },
            languageStrategy: { type: Type.STRING },
            checkForUnderstanding: { type: Type.STRING },
          },
          required: ["teacherAction", "languageStrategy", "checkForUnderstanding"],
        },
        review: {
          type: Type.OBJECT,
          properties: {
            teacherAction: { type: Type.STRING },
            languageStrategy: { type: Type.STRING },
            checkForUnderstanding: { type: Type.STRING },
          },
          required: ["teacherAction", "languageStrategy", "checkForUnderstanding"],
        },
        keyIdeas: {
          type: Type.OBJECT,
          properties: {
            teacherAction: { type: Type.STRING },
            languageStrategy: { type: Type.STRING },
            checkForUnderstanding: { type: Type.STRING },
          },
          required: ["teacherAction", "languageStrategy", "checkForUnderstanding"],
        },
        expertThinking: {
          type: Type.OBJECT,
          properties: {
            teacherAction: { type: Type.STRING },
            languageStrategy: { type: Type.STRING },
            checkForUnderstanding: { type: Type.STRING },
          },
          required: ["teacherAction", "languageStrategy", "checkForUnderstanding"],
        },
        guidedPractice: {
          type: Type.OBJECT,
          properties: {
            teacherAction: { type: Type.STRING },
            languageStrategy: { type: Type.STRING },
            checkForUnderstanding: { type: Type.STRING },
          },
          required: ["teacherAction", "languageStrategy", "checkForUnderstanding"],
        },
        closure: {
          type: Type.OBJECT,
          properties: {
            teacherAction: { type: Type.STRING },
            languageStrategy: { type: Type.STRING },
            checkForUnderstanding: { type: Type.STRING },
          },
          required: ["teacherAction", "languageStrategy", "checkForUnderstanding"],
        },
        independentPractice: {
          type: Type.OBJECT,
          properties: {
            teacherAction: { type: Type.STRING },
            languageStrategy: { type: Type.STRING },
            checkForUnderstanding: { type: Type.STRING },
          },
          required: ["teacherAction", "languageStrategy", "checkForUnderstanding"],
        },
      },
      required: ["preview", "objective", "review", "keyIdeas", "expertThinking", "guidedPractice", "closure", "independentPractice"],
    },
  },
};

const ROW_RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    teacherAction: { type: Type.STRING },
    languageStrategy: { type: Type.STRING },
    checkForUnderstanding: { type: Type.STRING },
  },
  required: ["teacherAction", "languageStrategy", "checkForUnderstanding"],
};

const RANDOM_CONTEXT_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    grade: { type: Type.STRING },
    standard: { type: Type.STRING },
    topic: { type: Type.STRING },
    lessonType: { type: Type.STRING, enum: ["DECLARATIVE", "PROCEDURAL"] },
    objectiveRaw: { type: Type.STRING },
    previewIdea: { type: Type.STRING },
  },
  required: ["grade", "standard", "topic", "lessonType", "objectiveRaw", "previewIdea"],
};

const STANDARDS_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    categories: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          domain: { type: Type.STRING, description: "The domain or strand (e.g. 'Geometry' or 'Reading Literature')" },
          standards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                code: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ["code", "description"],
            }
          }
        },
        required: ["domain", "standards"]
      }
    }
  },
  required: ["categories"]
};

const sanitizeJson = (text: string) => {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};

export const generateLessonPlan = async (
  context: LessonContext
): Promise<any> => {
  if (!process.env.API_KEY) throw new Error("API_KEY is missing.");

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Create a FAST lesson plan for: Grade ${context.grade}, Subject ${context.subject || 'General'}, Topic ${context.topic}, Type ${context.lessonType}, Objective: ${context.objectiveRaw}, Hook: ${context.previewIdea}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: LESSON_RESPONSE_SCHEMA,
        maxOutputTokens: 8000,
        thinkingConfig: { thinkingBudget: 2000 },
      },
    });

    if (response.text) {
      const parsed = JSON.parse(sanitizeJson(response.text));
      const rowsRaw = parsed.rows;
      const transformedRows: any = {};
      const rowKeys = ["preview", "objective", "review", "keyIdeas", "expertThinking", "guidedPractice", "closure", "independentPractice"];

      rowKeys.forEach(key => {
        if (rowsRaw[key]) {
          transformedRows[key] = {
            teacherAction: { content: rowsRaw[key].teacherAction || '' },
            languageStrategy: { content: rowsRaw[key].languageStrategy || '' },
            checkForUnderstanding: { content: rowsRaw[key].checkForUnderstanding || '' }
          };
        }
      });
      return transformedRows;
    }
    throw new Error("API returned no content");
  } catch (error) {
    console.error("Framework Generation Error:", error);
    throw error;
  }
};

export const generateRandomContext = async (grade?: string): Promise<LessonContext> => {
  if (!process.env.API_KEY) throw new Error("API_KEY is missing.");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Generate a random creative lesson topic for FAST framework. ${grade ? `Grade: ${grade}` : 'Random Grade K-12'}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: RANDOM_CONTEXT_SCHEMA,
      },
    });
    // Add default subject if missing
    const ctx = JSON.parse(sanitizeJson(response.text || "{}"));
    return { ...ctx, subject: ctx.subject || 'General' };
  } catch (error) {
    console.error("Random Context Error", error);
    throw error;
  }
};

export const refineRow = async (
  rowTitle: string,
  instruction: string,
  currentRowData: { teacherAction: string, languageStrategy: string, checkForUnderstanding: string },
  lessonContext: LessonContext
): Promise<{ teacherAction: string, languageStrategy: string, checkForUnderstanding: string }> => {
  if (!process.env.API_KEY) throw new Error("API_KEY is missing.");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Refine ${rowTitle}. Instruction: ${instruction}. Context: Grade ${lessonContext.grade}, Topic ${lessonContext.topic}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: ROW_RESPONSE_SCHEMA,
        thinkingConfig: { thinkingBudget: 1000 }
      },
    });
    return JSON.parse(sanitizeJson(response.text || "{}"));
  } catch (error) {
    console.error("Refine Row Error", error);
    return currentRowData;
  }
};

export const generatePreviewHooks = async (context: LessonContext, count: number): Promise<string[]> => {
  if (!process.env.API_KEY) throw new Error("API_KEY is missing.");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Generate ${count} non-academic hooks for ${context.topic}. Output JSON array of strings in 'hooks'.`;
  try {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            systemInstruction: SYSTEM_INSTRUCTION
        }
    });
    const parsed = JSON.parse(sanitizeJson(response.text || "{}"));
    return parsed.hooks || [];
  } catch (error) { return []; }
};

export const generateActivitySuggestions = async (context: LessonContext, section: string, currentContent: string): Promise<any[]> => {
  if (!process.env.API_KEY) throw new Error("API_KEY is missing.");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Suggest 3 FAST activities for ${section} on ${context.topic}. Output JSON suggestions array with title, description, whyFast.`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });
    const parsed = JSON.parse(sanitizeJson(response.text || "{}"));
    return parsed.suggestions || [];
  } catch (error) { return []; }
};

export const fetchStandards = async (grade: string, subject: string): Promise<StandardCategory[]> => {
  // 1. Try Local Lookup First
  const localStandards = getLocalStandards(grade, subject);
  if (localStandards.length > 0) {
    // Return immediately without API call
    return localStandards;
  }

  // 2. Fallback to API if not found in local data (e.g. specialized subjects)
  if (!process.env.API_KEY) throw new Error("API_KEY is missing.");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `List 20+ representative California State Standards for Grade ${grade} ${subject}. 
  Group them by Domain/Strand (e.g., 'Geometry', 'Reading: Literature', 'Physical Science').
  If Subject is Math or ELA, use Common Core State Standards (CCSS). 
  If Subject is Science, use Next Generation Science Standards (NGSS).
  If Subject is History/Social Studies, use CA History-Social Science Framework.
  
  Return valid JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: STANDARDS_SCHEMA,
      }
    });
    const parsed = JSON.parse(sanitizeJson(response.text || "{}"));
    return parsed.categories || [];
  } catch (error) {
    console.error("Fetch Standards Error", error);
    return [];
  }
};