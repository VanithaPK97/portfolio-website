import { stack } from "@/content/profile";
import { Reveal } from "./reveal";
import { Probe } from "./three/probe";

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
      {line.length === 0 && " "}
    </span>
  ));
}

function Chips({ items, tone = "default" }: { items: string[]; tone?: "default" | "dark" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={
            tone === "dark"
              ? "rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[13px] font-medium text-[#d7dce5]"
              : "rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-ink-2"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="max-w-2xl">
        <h2 id="stack-title" className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
          The stack
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Java on the server, React in the browser, and the tooling that gets both to production.
        </p>
      </Reveal>

      <Probe />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
        <Reveal className="flex flex-col gap-6 overflow-hidden rounded-3xl bg-code-bg p-7 text-[#e9ecf1] md:col-span-4 md:row-span-2 md:p-9">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold tracking-tight">Backend</h3>
            <p className="max-w-[46ch] leading-relaxed text-[#aab2c0]">
              REST APIs, data models and workflow automation in Java and Spring.
            </p>
            <Chips items={stack.backend} tone="dark" />
          </div>
          <figure className="mt-auto">
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

        <Reveal delay={0.08} className="flex flex-col gap-4 rounded-3xl bg-accent-soft p-7 md:col-span-2">
          <h3 className="text-2xl font-bold tracking-tight">Frontend</h3>
          <p className="leading-relaxed text-ink-2">
            Figma designs turned into reusable React components, microfrontends included.
          </p>
          <Chips items={stack.frontend} />
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-7 md:col-span-2">
          <h3 className="text-2xl font-bold tracking-tight">Data</h3>
          <p className="leading-relaxed text-ink-2">
            Relational and document stores, with caching where reads run hot.
          </p>
          <Chips items={stack.data} />
        </Reveal>

        <Reveal className="bg-dots flex flex-col gap-4 rounded-3xl border border-line bg-surface-2 p-7 md:col-span-3">
          <h3 className="text-2xl font-bold tracking-tight">Cloud and delivery</h3>
          <p className="leading-relaxed text-ink-2">
            AWS deployments with containerised builds and automated pipelines.
          </p>
          <Chips items={stack.cloud} />
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-7 md:col-span-3">
          <h3 className="text-2xl font-bold tracking-tight">Testing and quality</h3>
          <p className="leading-relaxed text-ink-2">
            Unit and browser tests, with static analysis in the pipeline.
          </p>
          <Chips items={stack.quality} />
        </Reveal>
      </div>
    </section>
  );
}
