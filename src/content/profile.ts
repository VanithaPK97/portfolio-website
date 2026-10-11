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

export type Employer = {
  brand: BrandKey;
  company: string;
  period: string;
  roles: { title: string; period: string }[];
  projects: { name: string; context: string; outcome?: string }[];
};

export const career: Employer[] = [
  {
    brand: "opentext",
    company: "OpenText",
    period: "Oct 2025 - Present",
    roles: [{ title: "Senior Software Engineer", period: "Oct 2025 - Present" }],
    projects: [
      {
        name: "Experience Central",
        context:
          "React microfrontend features and reusable components from Figma designs, with Java and Spring Boot REST APIs for the frontend and analytics workflows.",
        outcome: "Real-time behavioural alerts on a live engagement platform",
      },
      {
        name: "AI hackathon prototype",
        context: "A weather-alert prototype built with Python and LLaMA during an internal AI hackathon.",
      },
    ],
  },
  {
    brand: "oracle",
    company: "Oracle Tech Hub",
    period: "Aug 2024 - Oct 2025",
    roles: [{ title: "Senior Applications Engineer", period: "Aug 2024 - Oct 2025" }],
    projects: [
      {
        name: "Oracle Permit and License Application (OPAL)",
        context:
          "VBCS applications and pages built from Figma for public-sector workflows, with optimized Oracle JET code and Mocha, Chai and Selenium tests.",
        outcome: "Java data models updated across 100+ tables",
      },
    ],
  },
  {
    brand: "fis",
    company: "FIS Global",
    period: "Feb 2022 - Jul 2024",
    roles: [{ title: "Software Engineer", period: "Feb 2022 - Jul 2024" }],
    projects: [
      {
        name: "T. Rowe Price workplace retirement",
        context:
          "Retirement applications across React, Redux, Java, Spring Boot and PostgreSQL, deployed on AWS with GitLab CI/CD and Docker.",
        outcome: "40% faster API responses through Redis caching and JPA tuning",
      },
    ],
  },
  {
    brand: "infosys",
    company: "Infosys",
    period: "Dec 2018 - Feb 2022",
    roles: [
      { title: "Senior System Engineer", period: "Aug 2019 - Feb 2022" },
      { title: "Intern", period: "Dec 2018 - Apr 2019" },
    ],
    projects: [
      {
        name: "HSBC customer onboarding",
        context:
          "An international onboarding application with Camunda workflow automation, PostgreSQL audit history and React screens for fraud review and approvals.",
        outcome: "Onboarding, fraud review and approvals in one flow",
      },
      {
        name: "Test-case generation framework",
        context:
          "A framework built with Node.js, Express, Mocha, Chai and MongoDB, with an Angular results interface.",
        outcome: "Adopted by the Infosys training team for test evaluation",
      },
    ],
  },
];

export const tower = [
  { tech: "React", layer: "Interface" },
  { tech: "Spring Boot", layer: "API" },
  { tech: "PostgreSQL", layer: "Data" },
] as const;

export type StackItem = { brand: BrandKey } | { text: string };

const b = (brand: BrandKey): StackItem => ({ brand });
const t = (text: string): StackItem => ({ text });

export const stack: { title: string; desc: string; items: StackItem[] }[] = [
  {
    title: "Backend",
    desc: "REST APIs, data models and workflow automation in Java and Spring.",
    items: [b("java"), b("springboot"), t("Spring REST"), t("Spring Data JPA"), b("camunda")],
  },
  {
    title: "Frontend",
    desc: "Figma designs turned into reusable React components, microfrontends included.",
    items: [b("react"), b("redux"), b("typescript"), t("JavaScript"), t("HTML"), t("CSS"), t("Microfrontends")],
  },
  {
    title: "Data",
    desc: "Relational and document stores, with caching where reads run hot.",
    items: [b("postgresql"), b("mongodb"), b("redis")],
  },
  {
    title: "Cloud and delivery",
    desc: "AWS deployments with containerised builds and automated pipelines.",
    items: [b("aws"), b("docker"), b("gitlab"), b("jenkins"), b("git")],
  },
  {
    title: "Testing and quality",
    desc: "Unit and browser tests, with static analysis in the pipeline.",
    items: [b("junit"), t("Mockito"), b("mocha"), b("chai"), b("selenium"), t("SonarQube")],
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
