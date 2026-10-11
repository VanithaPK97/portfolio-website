// Every piece of copy on the site lives here, so updating the CV
// never means touching a component.

import type { BrandKey } from "./brands";

// A line of copy mixing plain text with inline brand pills.
export type Rich = (string | { brand: BrandKey })[];

export const profile = {
  name: "Vanitha P K",
  role: "Senior Java Full Stack Developer",
  location: "Bengaluru, India",
  email: "vanithapkrishnamurthy@gmail.com",
  linkedin: "https://www.linkedin.com/in/vanitha-pk-719096115",
  resume: "/Vanitha_PK_Resume.pdf",
  portrait: "/portrait/vanitha.jpg",
  headline: ["I build Java and React systems,", "from the database to the button."] as const,
  intro:
    "Seven years shipping Java, Spring Boot and React for HSBC, T. Rowe Price, Oracle and OpenText.",
  summary:
    "Full stack developer building scalable products with Java, Spring Boot, React and PostgreSQL. Skilled in REST APIs, frontend development, workflow automation and performance optimization.",
};

export const heroStory: Rich[] = [
  [
    "I’m Vanitha, a Senior Java Full Stack Developer in Bengaluru. Over seven years I’ve built for ",
    { brand: "hsbc" },
    " at ",
    { brand: "infosys" },
    ", for ",
    { brand: "troweprice" },
    " at ",
    { brand: "fis" },
    ", and on a public-sector platform at ",
    { brand: "oracle" },
    ". Today I build React microfrontends at ",
    { brand: "opentext" },
    ".",
  ],
  [
    "My everyday stack is ",
    { brand: "java" },
    " ",
    { brand: "springboot" },
    " ",
    { brand: "react" },
    " ",
    { brand: "postgresql" },
    " ",
    { brand: "redis" },
    " and ",
    { brand: "aws" },
    ". I published a guide to Spring Boot and MongoDB on ",
    { brand: "dzone" },
    ".",
  ],
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Career", href: "#career" },
  { label: "Stack", href: "#stack" },
  { label: "Writing", href: "#writing" },
];

export const impact = [
  { value: 7, suffix: "+", label: "years", detail: "Building production Java and React software since 2019." },
  { value: 40, suffix: "%", label: "faster APIs", detail: "Redis caching and JPA query tuning on a retirement platform." },
  { value: 100, suffix: "+", label: "tables", detail: "Java data models updated for Oracle's permit and license platform." },
  { value: 5, suffix: "", label: "awards", detail: "Recognised at OpenText and Infosys for delivery and innovation." },
];

export type CaseStudy = {
  id: "cache" | "workflow" | "microfrontends";
  brand: BrandKey;
  client: string;
  employer: string;
  period: string;
  title: string;
  headline: string;
  paperPhrase: { before?: string; mark: string; after: string };
  summary: string;
  contributions: string[];
  flow: { layer: string; tech: string }[];
  outcome: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "cache",
    brand: "troweprice",
    client: "T. Rowe Price",
    employer: "FIS Global",
    period: "2022 - 2024",
    title: "Workplace retirement platform",
    headline: "40% faster API responses",
    paperPhrase: { mark: "Full stack", after: " engineer" },
    summary:
      "Retirement applications for plan participants, built across a React front end and Spring Boot services.",
    contributions: [
      "REST APIs with Spring Data JPA, DTOs and centralized exception handling",
      "Redis caching and JPA query optimization on read-heavy endpoints",
      "React and Redux performance work, JUnit and Mockito coverage, SLF4J logging",
      "AWS S3, Lambda and EC2 deployments with GitLab CI/CD and Docker",
    ],
    flow: [
      { layer: "Interface", tech: "React + Redux" },
      { layer: "API", tech: "Spring Boot REST" },
      { layer: "Cache", tech: "Redis" },
      { layer: "Data", tech: "PostgreSQL" },
    ],
    outcome: { value: "40%", label: "faster API response time" },
  },
  {
    id: "workflow",
    brand: "hsbc",
    client: "HSBC",
    employer: "Infosys",
    period: "2019 - 2022",
    title: "International customer onboarding",
    headline: "Onboarding, fraud review and approvals in one flow",
    paperPhrase: { mark: "Workflow", after: " automation" },
    summary:
      "A back-office application that takes HSBC customers from application to approved account across countries.",
    contributions: [
      "Onboarding workflows automated with Camunda and Spring REST APIs",
      "Customer records and audit history in PostgreSQL with Spring Data JPA",
      "React screens for fraud reviews and account-opening approvals",
      "Scheduled analytical reports and downloads with Java and Spring Boot",
    ],
    flow: [
      { layer: "Interface", tech: "React review screens" },
      { layer: "API", tech: "Spring REST" },
      { layer: "Workflow", tech: "Camunda BPM" },
      { layer: "Data", tech: "PostgreSQL + audit" },
    ],
    outcome: { value: "End to end", label: "onboarding, fraud review and approvals in one flow" },
  },
  {
    id: "microfrontends",
    brand: "opentext",
    client: "OpenText",
    employer: "OpenText",
    period: "2025 - now",
    title: "Experience Central engagement platform",
    headline: "Real-time behavioural alerts",
    paperPhrase: { mark: "Microfrontend", after: " features" },
    summary:
      "A user engagement platform that raises real-time behavioural alerts, built as React microfrontends.",
    contributions: [
      "React microfrontend features and production issue resolution",
      "Reusable components built from Figma designs",
      "Java and Spring Boot REST APIs for frontend and analytics workflows",
      "Stability through framework upgrades and dependency migrations",
    ],
    flow: [
      { layer: "Design", tech: "Figma" },
      { layer: "Interface", tech: "React microfrontends" },
      { layer: "API", tech: "Spring Boot REST" },
      { layer: "Insight", tech: "Analytics workflows" },
    ],
    outcome: { value: "Real time", label: "behavioural alerts for a live engagement platform" },
  },
];

export const stack = {
  backend: ["Java", "Spring Boot", "Spring REST", "Spring Data JPA", "Camunda"],
  frontend: ["React", "Redux", "TypeScript", "JavaScript", "HTML", "CSS", "Microfrontends"],
  data: ["PostgreSQL", "MongoDB", "Redis"],
  cloud: ["AWS", "Docker", "GitLab CI/CD", "Jenkins", "Git"],
  quality: ["JUnit", "Mockito", "Mocha", "Chai", "Selenium", "SonarQube"],
};

export type Role = {
  id: string;
  title: string;
  company: string;
  navLabel?: string;
  period: string;
  context: string;
  points: string[];
};

export const experience: Role[] = [
  {
    id: "opentext",
    title: "Senior Software Engineer",
    company: "OpenText",
    period: "Oct 2025 - Present",
    context: "Experience Central, Digital Engineering",
    points: [
      "Develop React microfrontend features and resolve production issues for a user engagement platform with real-time behavioural alerts.",
      "Build reusable React components from Figma designs and Java/Spring Boot REST APIs for frontend and analytics workflows.",
      "Keep the application stable through framework upgrades and dependency migrations.",
      "Built a Python and LLaMA weather-alert prototype during an internal AI hackathon.",
    ],
  },
  {
    id: "oracle",
    title: "Senior Applications Engineer",
    company: "Oracle Tech Hub",
    period: "Aug 2024 - Oct 2025",
    context: "Oracle Permit and License Application (OPAL)",
    points: [
      "Updated Java data models across 100+ tables, including View Objects and Entity Objects.",
      "Built VBCS applications and pages from Figma designs for public-sector workflows.",
      "Optimized Oracle JET code and wrote Mocha/Chai and Selenium tests.",
    ],
  },
  {
    id: "fis",
    title: "Software Engineer",
    company: "FIS Global",
    period: "Feb 2022 - Jul 2024",
    context: "T. Rowe Price, Workplace Retirement",
    points: [
      "Built retirement applications using React, Redux, Java, Spring Boot and PostgreSQL.",
      "Reduced API response time by 40% through Redis caching and JPA query optimization.",
      "Deployed on AWS S3, Lambda and EC2; automated CI/CD with GitLab and Docker.",
    ],
  },
  {
    id: "infosys",
    title: "Senior System Engineer",
    company: "Infosys",
    period: "Aug 2019 - Feb 2022",
    context: "HSBC, Banking",
    points: [
      "Built an international customer onboarding application for HSBC back-office teams.",
      "Automated onboarding workflows with Camunda and Spring REST APIs.",
      "Deployed Camunda workflows to AWS EC2 for testing; used Git, Jenkins, SonarQube and Jira for Agile delivery.",
    ],
  },
  {
    id: "infosys-intern",
    title: "Intern",
    company: "Infosys",
    navLabel: "Infosys internship",
    period: "Dec 2018 - Apr 2019",
    context: "Training platform",
    points: [
      "Built a test-case generation framework with Node.js, Express, Mocha, Chai and MongoDB, with an Angular results interface.",
      "The Infosys training team later adopted the framework for test evaluation.",
    ],
  },
];

export const awards = [
  { name: "Thumbs Up Award", org: "OpenText", reason: "Rapid onboarding and strong contributions" },
  { name: "Insta Award, twice", org: "Infosys", reason: "Quality client deliverables" },
  { name: "IWD Reward", org: "Infosys", reason: "Technical expertise" },
  { name: "RISE Award", org: "Infosys", reason: "Project growth and innovation" },
];

export const certifications = [
  { name: "AWS Certified Cloud Practitioner", org: "Amazon Web Services" },
  { name: "Spring Microservices Professional", org: "Infosys" },
  { name: "Java (Basic)", org: "HackerRank" },
  { name: "React (Basic)", org: "HackerRank" },
];

export const publication = {
  title: "Spring Boot Application With Spring REST and Spring Data MongoDB",
  outlet: "DZone",
  date: "April 2024",
  blurb: "A step-by-step guide to building CRUD REST APIs with Spring Boot, Spring REST and MongoDB.",
  href: "https://dzone.com/articles/spring-boot-mongodb-integration",
};

export const education = {
  degree: "B.E. Computer Science Engineering",
  school: "Sri Ramakrishna Engineering College, Coimbatore",
  period: "2015 - 2019",
};
