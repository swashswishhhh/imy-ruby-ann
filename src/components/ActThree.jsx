import { useEffect, useRef, useState } from 'react'

const FULL_PLACEHOLDERS = {
  vibe: '🎲 You Plan It (Full Surprise)',
  mainEvent: '🎲 You Plan It (Full Surprise)',
  food: '🎲 You Plan It (Full Surprise)',
  timeSlot: 'The moment you say yes',
}

/**
 * Act 3 — The Digital Ticket.
 * A retro event-ticket receipt of her choices. No email — the intent is
 * that she screenshots this ticket and sends it to her lover 💜
 */
export default function ActThree({ selection }) {
  const canvasRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [ticketNo] = useState(
    () => `RA-${String(Math.floor(1000 + Math.random() * 9000))}`,
  )

  const vibe = selection?.vibe || FULL_PLACEHOLDERS.vibe
  const mainEvent = selection?.mainEvent || FULL_PLACEHOLDERS.mainEvent
  const food = selection?.food || FULL_PLACEHOLDERS.food
  const timeSlot = selection?.timeSlot?.trim() || FULL_PLACEHOLDERS.timeSlot
  const notes = selection?.notes?.trim() || 'None'
  const issued = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  /* ---- Canvas confetti particle celebration ---- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let raf
    let particles = []
    const COLORS = ['#6B3FA0', '#B39DDB', '#E58FA2', '#F3C6DA', '#8E6FC1', '#FFD9A0']

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = () => {
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -20 - Math.random() * canvas.height * 0.4,
          w: 5 + Math.random() * 7,
          h: 8 + Math.random() * 8,
          vx: (Math.random() - 0.5) * 1.6,
          vy: 2 + Math.random() * 3.2,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.18,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          wobble: Math.random() * Math.PI * 2,
        })
      }
    }

    // initial burst (~120 particles)
    spawn()
    spawn()
    spawn()

    let elapsed = 0
    let last = performance.now()
    const tick = (now) => {
      const dt = (now - last) / 1000
      last = now
      elapsed += dt

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.wobble += 0.08
        p.x += p.vx + Math.sin(p.wobble) * 0.6
        p.y += p.vy
        p.rot += p.vr

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, 1 - elapsed / 6.5)
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })

      particles = particles.filter((p) => p.y < canvas.height + 30)

      if (elapsed < 3 && particles.length < 90 && Math.random() < 0.35) {
        spawn()
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const stop = setTimeout(() => {
      cancelAnimationFrame(raf)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }, 7000)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(stop)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /** Copy the plan as pretty text — handy for pasting into a chat. */
  const handleCopy = async () => {
    const text = [
      '🎟️ OFFICIAL DATE TICKET 💜',
      '────────────────────────',
      'GUEST OF HONOR: Rubby Ann',
      `OPENING VIBE:   ${vibe}`,
      `MAIN EVENT:     ${mainEvent}`,
      `DINING:         ${food}`,
      `SCHEDULE:       ${timeSlot}`,
      `NOTES:          ${notes}`,
      `TICKET NO.      ${ticketNo}`,
      '────────────────────────',
      '— Kenneth ♡ Rubby Ann',
    ].join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard blocked — no-op, screenshot is the primary path anyway
    }
  }

  return (
    <section className="act" aria-label="Date ticket confirmation">
      <canvas ref={canvasRef} className="ticket-canvas" aria-hidden="true" />

      <div className="ticket" role="article" aria-label="Your date ticket">
        {/* Ticket header */}
        <div className="ticket__top">
          <div className="ticket__icon-wrap" aria-hidden="true">
            <svg className="ticket__svg-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C24 4 8 14 8 26a16 16 0 0 0 32 0C40 14 24 4 24 4Z" fill="url(#heartGrad)"/>
              <defs>
                <linearGradient id="heartGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a78bfa"/>
                  <stop offset="100%" stopColor="#f472b6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="ticket__badge">ADMIT TWO · ONE PERFECT EVENING</span>
          <h1 className="ticket__title">It's a Date, Rubby Ann!</h1>
          <p className="ticket__sub">
            Screenshot this ticket and send it to your lover
          </p>
        </div>

        {/* Perforated divider */}
        <div className="ticket__perf" aria-hidden="true">
          <span className="ticket__notch ticket__notch--left" />
          <div className="ticket__dash" />
          <span className="ticket__notch ticket__notch--right" />
        </div>

        {/* Itemized breakdown */}
        <div className="ticket__body">
          <div className="ticket__row">
            <span className="ticket__key">GUEST OF HONOR</span>
            <span className="ticket__val">Rubby Ann</span>
          </div>
          <div className="ticket__row">
            <span className="ticket__key">OPENING VIBE</span>
            <span className="ticket__val">{vibe}</span>
          </div>
          <div className="ticket__row">
            <span className="ticket__key">MAIN EVENT</span>
            <span className="ticket__val">{mainEvent}</span>
          </div>
          <div className="ticket__row">
            <span className="ticket__key">DINING</span>
            <span className="ticket__val">{food}</span>
          </div>
          <div className="ticket__row">
            <span className="ticket__key">SCHEDULE</span>
            <span className="ticket__val">{timeSlot}</span>
          </div>
          <div className="ticket__row">
            <span className="ticket__key">NOTES</span>
            <span className="ticket__val">{notes}</span>
          </div>
        </div>

        {/* Ticket stub footer */}
        <div className="ticket__stub">
          <span>TICKET NO. {ticketNo}</span>
          <span>ISSUED {issued.toUpperCase()}</span>
          <span>KENNETH ♡ RUBBY ANN</span>
        </div>
      </div>

      {/* Share actions */}
      <div className="ticket-actions">
        <button type="button" className="share-btn" onClick={handleCopy}>
          {copied ? 'Copied to clipboard!' : 'Copy Plan as Text'}
        </button>
        <p className="ticket__footnote">
          Screenshot the ticket above (or copy the text) and send it his way —
          it's valid forever.
        </p>
      </div>
    </section>
  )
}