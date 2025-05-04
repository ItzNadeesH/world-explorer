export type Country = {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  region: string;
  subregion?: string;
  area?: number;
  borders?: string[];
  flags: {
    png?: string;
    svg?: string;
  };
  capital?: string[];
  timezones?: string[];
  population: number;
  languages?: {
    [key: string]: string; // e.g., "en": "English"
  };
  currencies?: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
  car: {
    side: string;
  };
  independent: boolean;
  startOfWeek: string;
  isFavorite: boolean;
};
