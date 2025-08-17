interface SexgenderDefinition {
  gender_trait_key: BuiltinTraitKey;
  name: string;
  dick: boolean;
  vagina: boolean;
  breast: boolean;
}

export const SEXGENDERS = {
  male: {
    gender_trait_key: "gender_male",
    name: "Male",
    dick: true,
    vagina: false,
    breast: false,
  },
  female: {
    gender_trait_key: "gender_female",
    name: "Female",
    dick: false,
    vagina: true,
    breast: true,
  },
  futa: {
    gender_trait_key: "gender_female",
    name: "Dickgirl",
    dick: true,
    vagina: false,
    breast: true,
  },
  cuntboy: {
    gender_trait_key: "gender_male",
    name: "Cuntboy",
    dick: false,
    vagina: true,
    breast: false,
  },
  herm_m: {
    gender_trait_key: "gender_male",
    name: "Herm (M)",
    dick: true,
    vagina: true,
    breast: false,
  },
  herm_f: {
    gender_trait_key: "gender_female",
    name: "Herm (F)",
    dick: true,
    vagina: true,
    breast: true,
  },
} satisfies Record<string, SexgenderDefinition>;
