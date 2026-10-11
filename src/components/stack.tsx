"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useScroll } from "motion/react";
import { stack, type StackItem } from "@/content/profile";
import { LogoPill } from "./logo-pill";
import { Reveal } from "./reveal";
import { ThreeSlot } from "./three/three-slot";
import { TowerFallback } from "./tower-fallback";

const StackTower = dynamic(() => import("./three/scenes/stack-tower").then((m) => m.StackTower), {
  ssr: false,
});

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

// Tiny Java highlighter: enough for one static snippet, no runtime library.
function highlight(code: string) {
  const pattern = /(@\w+)|("[^"]*")|(\b[A-Za-z_]\w*\b)|(\s+)|([^\sA-Za-z_@"]+)/g;
  return code.split("\n").map((line, li) => (
    <span key={li} className="block">
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
    </span>
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section
      id="stack"
      ref={ref}
      aria-labelledby="stack-title"
      className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
    >
      <Reveal className="max-w-2xl">
        <h2 id="stack-title" className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
          The stack
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Java on the server, React in the browser, and the tooling that gets both to production.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <ThreeSlot
            name="tower"
            scope="section"
            fallback={<TowerFallback />}
            className="bg-dots relative aspect-square rounded-3xl border border-line bg-surface-2 lg:sticky lg:top-28"
          >
            <StackTower progress={scrollYProgress} />
          </ThreeSlot>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-7">
          {stack.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 0.05}
              className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-7"
            >
              <div>
                <h3 className="text-xl font-bold tracking-tight">{group.title}</h3>
                <p className="mt-1 leading-relaxed text-ink-2">{group.desc}</p>
              </div>
              <Pills items={group.items} />
            </Reveal>
          ))}

          <Reveal className="overflow-hidden rounded-3xl bg-code-bg p-7 text-[#e9ecf1]">
            <figure>
              <div className="overflow-x-auto rounded-2xl border border-white/8 bg-white/3 p-5">
                <pre className="font-mono text-[12.5px] leading-[1.7]">
                  <code>{highlight(snippet)}</code>
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
