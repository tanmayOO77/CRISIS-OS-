import { CrisisOutput } from '../types/crisis';

export function parseCrisisOutput(text: string): CrisisOutput {
  let cleaned = text.trim();
  
  // Strip markdown backticks if they are returned despite instructions
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(json)?/i, '');
    cleaned = cleaned.replace(/```$/m, '');
    cleaned = cleaned.trim();
  }
  
  // Sometimes models prepend or append some text before/after json
  const jsonStart = cleaned.indexOf('{');
  const jsonEnd = cleaned.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
  }

  return JSON.parse(cleaned) as CrisisOutput;
}
