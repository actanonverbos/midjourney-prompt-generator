export interface PromptData {
  subject: string;
  setting: string;
  action: string;
  lighting: string;
  artDirection: string;
  extras: string;
  aspectRatio: string;
  stylize: number;
  chaos: number;
  raw: boolean;
  styleWeight?: number;
  seed?: string;
  stripQueryStrings: boolean;
  styleRefs: string[];
  profileIds: string[];
}

/**
 * Strips query strings from a URL if needed
 */
function cleanUrl(url: string, stripQuery: boolean): string {
  if (!stripQuery || !url) return url;
  try {
    const urlObj = new URL(url);
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch {
    // If not a valid URL, return as-is
    return url;
  }
}

/**
 * Assembles a Midjourney prompt from structured fields
 */
export function buildPrompt(data: PromptData): string {
  // Collect text fields in order
  const textParts: string[] = [];
  
  if (data.subject.trim()) textParts.push(data.subject.trim());
  if (data.setting.trim()) textParts.push(data.setting.trim());
  if (data.action.trim()) textParts.push(data.action.trim());
  if (data.lighting.trim()) textParts.push(data.lighting.trim());
  if (data.artDirection.trim()) textParts.push(data.artDirection.trim());
  if (data.extras.trim()) textParts.push(data.extras.trim());
  
  // Join text parts with commas
  let prompt = textParts.join(", ");
  
  // Add parameters in the correct order
  const params: string[] = [];
  
  // --ar (aspect ratio)
  if (data.aspectRatio) {
    params.push(`--ar ${data.aspectRatio}`);
  }
  
  // --stylize
  if (data.stylize !== undefined && data.stylize !== 100) {
    params.push(`--stylize ${data.stylize}`);
  }
  
  // --chaos
  if (data.chaos > 0) {
    params.push(`--chaos ${data.chaos}`);
  }
  
  // --raw
  if (data.raw) {
    params.push("--raw");
  }
  
  // --profile (if present)
  if (data.profileIds && data.profileIds.length > 0) {
    data.profileIds.forEach(profileId => {
      if (profileId.trim()) {
        params.push(`--profile ${profileId.trim()}`);
      }
    });
  }
  
  // --sref (style references)
  if (data.styleRefs && data.styleRefs.length > 0) {
    const cleanedRefs = data.styleRefs
      .filter(ref => ref.trim())
      .map(ref => cleanUrl(ref.trim(), data.stripQueryStrings))
      .slice(0, 3); // Limit to 3 as per Midjourney guidelines
    
    if (cleanedRefs.length > 0) {
      params.push(`--sref ${cleanedRefs.join(" ")}`);
    }
  }
  
  // --sw (style weight)
  if (data.styleWeight !== undefined && data.styleWeight !== null) {
    params.push(`--sw ${data.styleWeight}`);
  }
  
  // --seed
  if (data.seed && data.seed.trim()) {
    params.push(`--seed ${data.seed.trim()}`);
  }
  
  // Combine prompt text with parameters
  if (params.length > 0) {
    prompt = `${prompt} ${params.join(" ")}`;
  }
  
  // Final cleanup: replace em-dash and en-dash with double hyphens, normalize spaces
  prompt = prompt
    .replace(/\u2013|\u2014/g, "--") // em-dash and en-dash to --
    .replace(/\s+/g, " ") // normalize multiple spaces
    .trim();
  
  return prompt;
}

/**
 * Counts tokens/words in the prompt for display
 */
export function countTokens(prompt: string): { words: number; chars: number } {
  const words = prompt.split(/\s+/).filter(w => w.length > 0).length;
  const chars = prompt.length;
  return { words, chars };
}

