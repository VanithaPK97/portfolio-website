"use client";

import { motion, type Variants } from "motion/react";
import { stack, type StackItem } from "@/content/profile";
import { LogoPill } from "./logo-pill";
import { Reveal } from "./reveal";
import { RevealHeading } from "./reveal-heading";
import { SpotlightCard } from "./spotlight-card";

const snippet = `@Service
@RequiredArgsConstructor
public class AccountSummaryService {

    private final AccountRepository accounts;

    @Cacheable(value = "summaries", key = "#participantId")
    @Transactional(readOnly = true)
    public AccountSummaryDto summaryFor(Long participantId) {
        return accounts.findSummary(participantId)
            .map(AccountSummaryDto::from)
            .orElseThrow(() -> new ParticipantNotFound(participantId));
    }
}`;

const KEYWORDS = new Set(["public", "private", "final", "class", "return", "new", "true", "false"]);

const lineVariant: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

// Tiny Java highlighter: enough for one static snippet, no runtime library.
// Each line is a motion span so the block types itself in on scroll.
function highlight(code: string) {
  const pattern = /(@\w+)|("[^"]*")|(\b[A-Za-z_]\w*\b)|(\s+)|([^\sA-Za-z_@"]+)/g;
  return code.split("\n").map((line, li) => (
    <motion.span key={li} variants={lineVariant} className="block">
      {Array.from(line.matchAll(pattern)).map((m, ti) => {
        const [text, annotation, string, word] = m;
        let cls = "text-[#7f8898]";
        if (annotation) cls = "text-[#93a8ff]";
        else if (string) cls = "text-[#c9d3ff]";
        else if (word && KEYWORDS.has(word)) cls = "text-[#b4bccb] font-semibold";
        else if (word && /^[A-Z]/.test(word)) cls = "text-[#f1f3f7]";
        else if (word) cls = "text-[#d7dce5]";
        return (
          <span key={ti} className={cls}>
            {text}
          </span>
        );
      })}
      {line.length === 0 && " "}
    </motion.span>
  ));
}

function Pills({ items }: { items: StackItem[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li key={i}>
          {"brand" in item ? (
            <LogoPill brand={item.brand} size="sm" />
          ) : (
            <span className="inline-flex rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-ink-2">
              {item.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
    >
      <div className="max-w-2xl">
        <RevealHeading id="stack-title" className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
          My technical stack
        </RevealHeading>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Java on the server, React in the browser, and the tooling that gets both to production.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <figure className="rounded-3xl border border-line bg-surface p-6 shadow-soft lg:sticky lg:top-28">
            <figcaption className="mb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">From interface to production</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">How the pieces connect</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">The technologies I use across a full stack application.</p>
            </figcaption>
            <ol>
              {[
                { label: "User interface", detail: "React · Redux · TypeScript", note: "Components and microfrontends" },
                { label: "Application services", detail: "Java · Spring Boot", note: "REST APIs and business logic" },
                { label: "Data and caching", detail: "PostgreSQL · MongoDB · Redis", note: "Persistent records and faster reads" },
                { label: "Cloud and delivery", detail: "AWS · Docker · GitLab CI/CD", note: "Deployments and automated pipelines" },
              ].map((layer, i) => (
                <li key={layer.label}>
                  {i > 0 && <div aria-hidden className="py-2 text-center text-accent">↓</div>}
                  <div className="rounded-xl border border-line bg-bg p-4">
                    <p className="flex items-center gap-3 text-sm font-semibold"><span className="font-mono text-[10px] text-accent">0{i + 1}</span>{layer.label}</p>
                    <p className="mt-2 text-[13px] font-medium text-ink-2">{layer.detail}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{layer.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </figure>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-7">
          {stack.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <SpotlightCard className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-7">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{group.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-2">{group.desc}</p>
                </div>
                <Pills items={group.items} />
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal className="overflow-hidden rounded-3xl bg-code-bg p-7 text-[#e9ecf1]">
            <figure>
              <div className="overflow-x-auto rounded-2xl border border-white/8 bg-white/3 p-5">
                <pre className="font-mono text-[12.5px] leading-[1.7]">
                  <motion.code
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ staggerChildren: 0.06 }}
                  >
                    {highlight(snippet)}
                  </motion.code>
                </pre>
              </div>
              <figcaption className="mt-3 text-[13px] text-[#8e97a6]">
                An illustrative sketch of read-through caching, the approach behind the 40% faster APIs.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
