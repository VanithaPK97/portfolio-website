import type { CaseStudy } from "@/content/profile";

// Editorial illustrations of the engineering work, not client product screenshots.
export function ProjectVisual({ study }: { study: CaseStudy }) {
  return (
    <div className={`project-visual visual-${study.id}`} aria-label={`Illustration of ${study.title}`} role="img">
      <div className="visual-caption"><span>{study.client}</span><span>ENGINEERING / 0{study.id === "cache" ? 1 : study.id === "workflow" ? 2 : 3}</span></div>
      {study.id === "cache" ? (
        <div className="visual-console">
          <div className="console-toolbar"><i /><i /><i /><span>performance / API</span></div>
          <div className="console-body"><span className="console-label">OPTIMIZED RESPONSE TIME</span><strong>40<span>% faster</span></strong><div className="latency-row"><span>Before</span><b style={{ width: "100%" }} /></div><div className="latency-row optimized"><span>After</span><b style={{ width: "60%" }} /></div><p><span>●</span> Redis cache + JPA query tuning</p></div>
        </div>
      ) : study.id === "workflow" ? (
        <div className="workflow-scene"><div className="workflow-node">01 <strong>Application</strong><span>Received ✓</span></div><div className="workflow-connector" /><div className="workflow-node">02 <strong>Fraud review</strong><span>Verified ✓</span></div><div className="workflow-connector" /><div className="workflow-node final-node">03 <strong>Account approval</strong><span>Workflow complete ↗</span></div></div>
      ) : (
        <div className="modules-scene"><div className="module-shell"><div className="module-header"><span>Experience Central</span><i>LIVE</i></div><div className="module-grid"><div><span>01 / INTERFACE</span><strong>React</strong><small>Reusable components</small></div><div><span>02 / SERVICES</span><strong>Spring Boot</strong><small>Connected REST APIs</small></div></div><div className="module-alert"><span className="live-dot" /> Behavioural alert detected <span>↗</span></div></div></div>
      )}
      <span className="visual-footnote">{study.paperPhrase.mark} / {study.paperPhrase.after.trim()}</span>
    </div>
  );
}
