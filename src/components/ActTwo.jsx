import { useEffect, useState } from 'react'
import { CATEGORIES, FULL_SURPRISE, EMPTY_SELECTION } from '../data/constants.js'

const CONFETTI_COLORS = ['#7c3aed', '#a78bfa', '#f472b6', '#e879f9', '#818cf8', '#c084fc']

export default function ActTwo({ onSubmitted }) {
  const [confetti, setConfetti] = useState([])
  const [isLocking, setIsLocking] = useState(false)

  const [dateSelection, setDateSelection] = useState(EMPTY_SELECTION)

  // celebratory confetti burst on arrival
  useEffect(() => {
    const burst = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      left: Math.random() * 100,
      duration: 2.4 + Math.random() * 2.2,
      delay: Math.random() * 0.6,
      size: 6 + Math.random() * 8,
      round: Math.random() > 0.5,
    }))
    setConfetti(burst)
    const t = setTimeout(() => setConfetti([]), 5500)
    return () => clearTimeout(t)
  }, [])

  const update = (field, value) =>
    setDateSelection((prev) => ({ ...prev, [field]: value }))

  /**
   * Master "Surprise Me" toggle.
   * ON  → all three choice categories become "You Plan It (Full Surprise)".
   * OFF → categories that were auto-set by the toggle go back to empty.
   */
  const toggleFullSurprise = () =>
    setDateSelection((prev) => {
      const on = !prev.isFullSurprise
      const resolve = (val) =>
        on ? FULL_SURPRISE : val === FULL_SURPRISE ? null : val
      return {
        ...prev,
        isFullSurprise: on,
        vibe: resolve(prev.vibe),
        mainEvent: resolve(prev.mainEvent),
        food: resolve(prev.food),
      }
    })

  const canLockIn = dateSelection.timeSlot.trim().length > 0 && !isLocking

  /**
   * Final step — no email needed. Play a short "sealing" animation,
   * then hand the plan over to Act 3 (the shareable ticket).
   */
  const handleLockIn = () => {
    if (!dateSelection.timeSlot.trim() || isLocking) return

    setIsLocking(true)
    setTimeout(() => onSubmitted(dateSelection), 700)
  }

  /* ---------------- Planner screen ---------------- */

  return (
    <section className="act" aria-label="The date planner">
      {confetti.map((c) => (
        <span
          key={c.id}
          className="confetti"
          style={{
            left: `${c.left}%`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            background: c.color,
            borderRadius: c.round ? '50%' : '2px',
            fontSize: 0,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="card">
        <div style={{ textAlign: 'center' }}>
          <span className="planner__badge">Act 2 · The Date Planner</span>
          <h1 className="planner__title">
            Let's Plan Our Date, <em>Ruby Ann</em>
          </h1>
          <p className="planner__text">
            Pick whatever makes you happiest — every choice is the right one.
          </p>
        </div>

        {/* Master "Surprise Me" card */}
        <label className={`surprise-card ${dateSelection.isFullSurprise ? 'surprise-card--on' : ''}`}>
          <input
            type="checkbox"
            className="surprise-card__input"
            checked={dateSelection.isFullSurprise}
            onChange={toggleFullSurprise}
          />
          <span className="surprise-card__box" aria-hidden="true">
            {dateSelection.isFullSurprise ? '✓' : ''}
          </span>
          <span>
            <span className="surprise-card__title">Want me to plan everything?</span>
            <br />
            <span className="surprise-card__sub">
              {dateSelection.isFullSurprise
                ? 'Full surprise mode engaged — leave it all to me. 🎲'
                : 'Check this and I’ll handle every detail myself.'}
            </span>
          </span>
        </label>

        {/* Categories 1–3 */}
        {CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            className={`category ${dateSelection.isFullSurprise ? 'category--dimmed' : ''}`}
          >
            <h2 className="category__title">{cat.title}</h2>
            <p className="category__hint">{cat.hint}</p>
            <div className="option-grid" role="group" aria-label={cat.title}>
              {cat.options.map((opt) => {
                const active = dateSelection[cat.key] === opt
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`option-card ${active ? 'option-card--active' : ''}`}
                    aria-pressed={active}
                    disabled={dateSelection.isFullSurprise}
                    onClick={() => update(cat.key, active ? null : opt)}
                  >
                    {opt}
                    {active && (
                      <span className="option-card__check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Category 4 · Availability */}
        <div className="field">
          <label className="field__label" htmlFor="timeSlot">
            Availability &amp; Schedule
          </label>
          <input
            id="timeSlot"
            type="text"
            className="field__input"
            placeholder="e.g., Friday after 6 PM or Saturday afternoon!"
            value={dateSelection.timeSlot}
            onChange={(e) => update('timeSlot', e.target.value)}
          />
        </div>

        {/* Special requests */}
        <div className="field">
          <label className="field__label" htmlFor="notes">
            Special Requests
          </label>
          <textarea
            id="notes"
            className="field__textarea"
            placeholder="Any food allergies or special requests?"
            value={dateSelection.notes}
            onChange={(e) => update('notes', e.target.value)}
          />
        </div>

        {/* Final CTA — gated on timeSlot */}
        <button
          type="button"
          className={`cta ${isLocking ? 'cta--loading' : ''}`}
          disabled={!canLockIn}
          onClick={handleLockIn}
        >
          {isLocking ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Sealing the plan…
            </>
          ) : (
            'Lock In Our Date!'
          )}
        </button>

        <p className="cta-hint">
          {isLocking
            ? 'Rolling out the red carpet…'
            : canLockIn
              ? 'One tap and it\'s official.'
              : 'Add your availability above to unlock the magic.'}
        </p>
      </div>
    </section>
  )
}