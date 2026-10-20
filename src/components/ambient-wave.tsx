
/** Decorative wave columns inspired by the reference's flowing light field. */
export function AmbientWave() {
  return (
    <div aria-hidden="true" className="ambient-wave-field">
      <div className="ambient-wave-halo" />
      <div className="ambient-wave-columns">
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} className="ambient-wave-column" style={{ animationDelay: `${i * -0.65}s` }} />
        ))}
      </div>
    </div>
  );
}
