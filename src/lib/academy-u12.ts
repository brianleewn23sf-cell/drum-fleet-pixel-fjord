/** Indicative U12 / age 11 bands, aligned with typical academy speed and ball-efficiency work. */
export const TEST_AGE = 11;

export const U12_ACADEMY = {
  age: 11,
  label: "Age 11 · Under 12",
  note:
    "Scores are age-related for 11-year-olds, in line with how pro academies look at speed and ball efficiency at U12. They are a guide, not a pass or fail.",
  s30: [
    { band: "Academy pace", time: "under 5.2s" },
    { band: "Strong", time: "5.2–5.8s" },
    { band: "Developing", time: "over 5.8s" },
  ],
  zz50: [
    { band: "Academy COD", time: "under 16s" },
    { band: "Strong", time: "16–20s" },
    { band: "Developing", time: "over 20s" },
  ],
  turns: [
    { band: "Sharp with the ball", time: "under 7s" },
    { band: "Strong", time: "7–9s" },
    { band: "Developing", time: "over 9s" },
  ],
  efficiency: [
    { band: "Academy", time: "95%+" },
    { band: "Strong", time: "88–94%" },
    { band: "Developing", time: "80–87%" },
    { band: "Needs work", time: "under 80%" },
  ],
};
