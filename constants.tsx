
import { Chapter } from './types';

export const SYSTEM_PROMPT = `
You are StatTutor, an expert AI tutor specializing exclusively in college-level Introductory Statistics based on "OpenStax – Introductory Statistics, 2nd Edition".

CORE GUIDELINES:
1. ACCURACY IS NON-NEGOTIABLE. Verify arithmetic internally.
2. TEACH, DON'T JUST ANSWER. Explain the "why" behind each step.
3. SCAFFOLD COMPLEX PROBLEMS. Use numbered steps (Step 0 to Step 6).
4. LATEX NOTATION: Use single $ for inline math (e.g. $x$) and double $$ for block equations.
5. OPENSTAX ALIGNMENT: Reference specific Chapters and Sections (e.g., Section 8.2).

STEP-BY-STEP PROTOCOL:
STEP 0 — CLASSIFY THE PROBLEM (Identify type and assumptions)
STEP 1 — IDENTIFY GIVEN INFORMATION (List notation)
STEP 2 — STATE THE FORMULA
STEP 3 — SUBSTITUTE AND SIMPLIFY
STEP 4 — COMPUTE THE RESULT (Round probabilities to 4 decimals, others to 2)
STEP 5 — INTERPRET IN CONTEXT
STEP 6 — SANITY CHECK

HYPOTHESIS TEST STRUCTURE:
1. State H0 and Ha.
2. Identify distribution/test type.
3. State alpha.
4. Compute test statistic.
5. Determine p-value.
6. Decision rule & interpretation.

TONE: Encouraging, patient, professional. Never talk down.
`;

export const CHAPTERS: Chapter[] = [
  { id: 1, title: "Sampling and Data", sections: ["1.1 Definitions", "1.2 Data & Sampling", "1.3 Frequency Tables", "1.4 Experimental Design"] },
  { id: 2, title: "Descriptive Statistics", sections: ["2.1 Graphs", "2.2 Histograms", "2.3 Percentiles", "2.4 Box Plots", "2.5 Center", "2.6 Skewness", "2.7 Spread"] },
  { id: 3, title: "Probability Topics", sections: ["3.1 Terminology", "3.2 Independence", "3.3 Rules", "3.4 Contingency Tables", "3.5 Diagrams"] },
  { id: 4, title: "Discrete Random Variables", sections: ["4.1 PDF", "4.2 Expected Value", "4.3 Binomial", "4.4 Geometric", "4.5 Hypergeometric", "4.6 Poisson"] },
  { id: 5, title: "Continuous Random Variables", sections: ["5.1 Functions", "5.2 Uniform", "5.3 Exponential"] },
  { id: 6, title: "The Normal Distribution", sections: ["6.1 Standard Normal", "6.2 Applications", "6.3 Empirical Rule"] },
  { id: 7, title: "The Central Limit Theorem", sections: ["7.1 Sample Means", "7.2 Sums", "7.3 Using CLT"] },
  { id: 8, title: "Confidence Intervals", sections: ["8.1 Mean (sigma known)", "8.2 Mean (sigma unknown)", "8.3 Proportion", "8.4 Sample Size"] },
  { id: 9, title: "Hypothesis Testing (One Sample)", sections: ["9.1 Null/Alt", "9.2 Errors", "9.3 Distributions", "9.4 Decision", "9.6 Single Mean/Prop"] },
  { id: 10, title: "Hypothesis Testing (Two Samples)", sections: ["10.1 Two Means (Unknown sigma)", "10.2 Two Means (Known sigma)", "10.3 Two Proportions", "10.4 Paired Samples"] },
  { id: 11, title: "The Chi-Square Distribution", sections: ["11.2 Goodness-of-Fit", "11.3 Independence", "11.4 Homogeneity"] },
  { id: 12, title: "Linear Regression", sections: ["12.1 Equations", "12.3 Regression Line", "12.4 Significance", "12.5 Prediction"] },
  { id: 13, title: "ANOVA", sections: ["13.1 One-Way ANOVA", "13.2 F Distribution"] }
];
