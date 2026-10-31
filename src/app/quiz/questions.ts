export type Question = {
  question: string;
  explanation: string;
  options: { label: string; sub: string }[];
  answer: number; // index into options
};

export const questions: Question[] = [
  {
    question: "What's the minimum age to vote in India?",
    explanation: "The 61st Amendment (1988) lowered the voting age from 21 to 18 for Lok Sabha and state assembly elections.",
    options: [
      { label: "16", sub: "Proposed in some debates, never adopted." },
      { label: "18", sub: "The national standard since 1989." },
      { label: "21", sub: "The original age before 1988." },
      { label: "25", sub: "The minimum age to contest the Lok Sabha." },
    ],
    answer: 1,
  },
  {
    question: "How long is a normal Lok Sabha term?",
    explanation: "The Lok Sabha runs for five years from its first sitting, unless it's dissolved earlier.",
    options: [
      { label: "4 years", sub: "Common for some local bodies abroad." },
      { label: "5 years", sub: "Standard for Lok Sabha and Vidhan Sabhas." },
      { label: "6 years", sub: "The term of a Rajya Sabha member." },
      { label: "No fixed term", sub: "Elections must be held regularly." },
    ],
    answer: 1,
  },
  {
    question: "Who conducts elections to Parliament and state assemblies?",
    explanation: "The Election Commission of India is an independent constitutional body set up under Article 324.",
    options: [
      { label: "Supreme Court", sub: "Hears election disputes, doesn't run polls." },
      { label: "Election Commission of India", sub: "Runs Lok Sabha and Vidhan Sabha polls." },
      { label: "NITI Aayog", sub: "A policy think tank." },
      { label: "Home Ministry", sub: "Helps with security only." },
    ],
    answer: 1,
  },
  {
    question: "What does EVM stand for?",
    explanation: "EVM means Electronic Voting Machine: a ballot unit you press, linked by cable to a control unit with the officer.",
    options: [
      { label: "Electronic Voter Management", sub: "Not a real term." },
      { label: "Electronic Verification Method", sub: "Not related." },
      { label: "Electronic Voting Machine", sub: "Used across India since 2004." },
      { label: "Electoral Verification Module", sub: "Doesn't exist." },
    ],
    answer: 2,
  },
  {
    question: "What is NOTA?",
    explanation: "NOTA means None of the Above. A 2013 Supreme Court ruling added it so you can reject every candidate.",
    options: [
      { label: "National Order of Total Abstention", sub: "Not an official term." },
      { label: "None of the Above", sub: "The last button on every EVM." },
      { label: "New Opposition Tally Act", sub: "Made up." },
      { label: "National Opposition Tracking Agency", sub: "Doesn't exist." },
    ],
    answer: 1,
  },
  {
    question: "What does the VVPAT do?",
    explanation: "VVPAT prints a slip with the serial number, name and symbol of your candidate, visible behind glass for 7 seconds.",
    options: [
      { label: "Counts the votes", sub: "The control unit does that." },
      { label: "Shows a paper slip so you can check your vote", sub: "Visible for 7 seconds." },
      { label: "Stores your fingerprint", sub: "No biometrics are taken." },
      { label: "Sends votes over the internet", sub: "EVMs aren't networked." },
    ],
    answer: 1,
  },
  {
    question: "Which document is the main voter ID at the booth?",
    explanation: "The EPIC (Elector's Photo Identity Card) is the main ID. ECI also accepts 12 alternative photo IDs.",
    options: [
      { label: "Aadhaar card", sub: "Accepted as an alternative." },
      { label: "PAN card", sub: "Accepted as an alternative." },
      { label: "EPIC (voter ID card)", sub: "Issued by ECI to every elector." },
      { label: "Passport", sub: "Accepted as an alternative." },
    ],
    answer: 2,
  },
  {
    question: "How are Lok Sabha members elected?",
    explanation: "India uses first-past-the-post: whoever gets the most votes in a constituency wins the seat.",
    options: [
      { label: "Proportional representation", sub: "Used elsewhere, not for Lok Sabha." },
      { label: "Single transferable vote", sub: "Used for Rajya Sabha." },
      { label: "First-past-the-post", sub: "Most votes wins." },
      { label: "Two-round system", sub: "Not used in India." },
    ],
    answer: 2,
  },
  {
    question: "What is the Model Code of Conduct?",
    explanation: "It's a set of ECI guidelines for parties and candidates that kicks in when elections are announced.",
    options: [
      { label: "A law passed by Parliament", sub: "It isn't a statute." },
      { label: "ECI guidelines for parties and candidates", sub: "Enforced from announcement to results." },
      { label: "Voter registration rules", sub: "Those are separate." },
      { label: "Vote counting rules", sub: "Those are separate too." },
    ],
    answer: 1,
  },
  {
    question: "Who appoints the Chief Election Commissioner?",
    explanation: "The President of India appoints the Chief Election Commissioner under Article 324.",
    options: [
      { label: "Prime Minister", sub: "Part of the selection process." },
      { label: "Chief Justice of India", sub: "Doesn't appoint the CEC." },
      { label: "President of India", sub: "Under Article 324." },
      { label: "Parliament", sub: "Doesn't make the appointment." },
    ],
    answer: 2,
  },
];
