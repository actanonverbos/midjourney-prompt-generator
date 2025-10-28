export interface PromptState {
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
  styleWeight: number;
  seed: string;
  stripQueryStrings: boolean;
  styleRefs: string[];
  profileIds: string[];
}

export interface PresetData extends PromptState {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_PROMPT_STATE: PromptState = {
  subject: "",
  setting: "",
  action: "",
  lighting: "",
  artDirection: "",
  extras: "",
  aspectRatio: "16:9",
  stylize: 700,
  chaos: 0,
  raw: false,
  styleWeight: 100,
  seed: "",
  stripQueryStrings: true,
  styleRefs: [],
  profileIds: [],
};

export const ASPECT_RATIOS = [
  { value: "1:1", label: "1:1 (Square)" },
  { value: "3:2", label: "3:2" },
  { value: "2:3", label: "2:3" },
  { value: "4:3", label: "4:3" },
  { value: "3:4", label: "3:4" },
  { value: "16:9", label: "16:9 (Wide)" },
  { value: "9:16", label: "9:16 (Tall)" },
  { value: "21:9", label: "21:9 (Ultrawide)" },
];

