import type { CompanyKey } from "../Company";

/**
 * Lists nouns, adjectives, etc. for each trait,
 * used for dynamic text generation.
 */
export interface TraitTexts {
  description?: string;
  descriptionslave?: string;
  descriptionslaver?: string;

  flavor?: string;
  flavorslave?: string;
  flavorslaver?: string;

  noun?: string;
  noungood?: string[];
  noungoodmale?: string[];
  noungoodfemale?: string[];
  nounbad?: string[];
  nounbadmale?: string[];
  nounbadfemale?: string[];
  noun_extra?: string[];
  hobby?: string[];

  adjective?: string[];
  size_adjective?: string[];
  adjbad?: string[];
  adjgood?: string[];
  adj_extra?: string[];

  adverbs?: string[];

  decrease?: string;
  increase?: string;

  care?: boolean;
  abuse?: boolean;

  title?: string;

  /** Used for race traits */
  region?: string;

  /** Used for race traits */
  company_key?: CompanyKey;
}
