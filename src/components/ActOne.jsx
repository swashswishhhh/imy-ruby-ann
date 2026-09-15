import { useRef, useState } from 'react'
import {
  NO_TEXTS,
  TEASE_NOTES,
  VIEWPORT_PADDING,
  MAX_SCALE,
  SCALE_STEP,
} from '../data/constants.js'

export default function ActOne({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [yesScale, setYesScale] = useState(1)
  const [noPos, setNoPos] = useState(null) // { x, y } fixed coords once dodging
  const [leaving, setLeaving] = useState(false)

  const noRef = useRef(null)
  const yesRef = useRef(null)

  const noLabel = NO_TEXTS[Math.min(noCount, NO_TEXTS.length - 1)]
  const teaseNote = noCount > 0 ? TEASE_NOTES[Math.min(noCount - 1, TEASE_NOTES.length - 1)] : null

  /**
   * Dodge logic — fires on hover AND touch.
   * 1. Pick random coordinates inside the viewport (60px padding),
   *    accounting for the NO button's own dimensions.
   * 2. CSS handles the spring glide:
   *    transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)
   * 3. YES! grows by +0.3x per dodge (capped at 3.5x).
   * 4. NO cycles through witty labels.
   */
  const dodgeNo = (e) => {
    if (leaving) return

    const btn = noRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const width = rect.width || btn.offsetWidth || 140
    const height = rect.height || btn.offsetHeight || 56

    const minX = VIEWPORT_PADDING
    const maxX = Math.max(minX, window.innerWidth - width - VIEWPORT_PADDING)
    const minY = VIEWPORT_PADDING
    const maxY = Math.max(minY, window.innerHeight - height - VIEWPORT_PADDING)

    setNoPos({
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY),
    })
    setYesScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE))
    setNoCount((c) => c + 1)
  }

  const handleYes = () => {
    setLeaving(true)
    // let the outro animation play, then hand off to Act 2
    setTimeout(onYes, 450)
  }

  const noStyle = noPos
    ? {
        position: 'fixed',
        left: `${noPos.x}px`,
        top: `${noPos.y}px`,
        transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    : undefined

  return (
    <section className={`act ${leaving ? 'act--leaving' : ''}`} aria-label="The question">
      <header className="hero">
        <span className="hero__eyebrow">A Very Important Message</span>
        <h1 className="hero__title">
          Hey <em>Rubby Ann</em>
        </h1>
        <p className="hero__sub">I have a very special question for you…</p>
      </header>

      <div className="card">
        <h2 className="card__question">
          Will you go out on a <span className="accent">date</span> with me?
        </h2>
        <div className="card__divider" aria-hidden="true">
          <span className="card__divider-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="9"  r="6" fill="#f7dde6"/>
              <circle cx="20" cy="14" r="6" fill="#f7dde6"/>
              <circle cx="14" cy="19" r="6" fill="#f7dde6"/>
              <circle cx="8"  cy="14" r="6" fill="#f7dde6"/>
              <circle cx="14" cy="14" r="5" fill="#d4889e"/>
              <circle cx="14" cy="14" r="2.5" fill="#b85c78"/>
            </svg>
          </span>
        </div>

        <div className="button-row">
          <button
            ref={yesRef}
            type="button"
            className="btn btn--yes"
            style={{ '--yes-scale': yesScale, transform: `scale(${yesScale})` }}
            onClick={handleYes}
          >
            YES!
          </button>

          <button
            ref={noRef}
            type="button"
            className={`btn btn--no ${noPos ? 'btn--no--dodging' : ''}`}
            style={noStyle}
            onMouseEnter={dodgeNo}
            onMouseDown={dodgeNo}
            onClick={(e) => {
              e.preventDefault()
              dodgeNo(e)
            }}
            onTouchStart={(e) => {
              e.preventDefault()
              dodgeNo(e)
            }}
            onTouchMove={(e) => {
              e.preventDefault()
              dodgeNo(e)
            }}
            onFocus={dodgeNo}
            aria-label={noLabel}
          >
            {noLabel}
          </button>
        </div>

        <p className={`tease-note ${teaseNote ? 'tease-note--show' : ''}`} aria-live="polite">
          {teaseNote ?? ' '}
        </p>
      </div>
    </section>
  )
}