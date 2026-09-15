import { useEffect, useRef, useState } from 'react'
import ActOne from './components/ActOne.jsx'
import ActTwo from './components/ActTwo.jsx'
import ActThree from './components/ActThree.jsx'
import loverSrc from './music/lover.mp3'

/* ---- Reusable floral corner SVG ---- */
function FloralCorner() {
  return (
    <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main stem */}
      <path d="M10 250 Q60 180 90 130 Q120 80 150 50" stroke="#8fab8e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Left branch */}
      <path d="M70 180 Q40 155 20 145" stroke="#8fab8e" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Right branch */}
      <path d="M110 140 Q130 120 140 100" stroke="#8fab8e" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Flower 1 — large */}
      <g transform="translate(148,46)">
        <circle cx="0" cy="-14" r="10" fill="#f7dde6"/>
        <circle cx="10" cy="-8" r="10" fill="#f7dde6"/>
        <circle cx="10" cy="5"  r="10" fill="#f7dde6"/>
        <circle cx="0"  cy="11" r="10" fill="#f7dde6"/>
        <circle cx="-10" cy="5" r="10" fill="#f7dde6"/>
        <circle cx="-10" cy="-8" r="10" fill="#f7dde6"/>
        <circle cx="0" cy="0" r="9" fill="#d4889e"/>
        <circle cx="0" cy="0" r="4" fill="#b85c78"/>
      </g>
      {/* Flower 2 — medium */}
      <g transform="translate(68,177)">
        <circle cx="0"  cy="-10" r="8" fill="#eebece"/>
        <circle cx="9"  cy="-5"  r="8" fill="#eebece"/>
        <circle cx="9"  cy="5"   r="8" fill="#eebece"/>
        <circle cx="0"  cy="10"  r="8" fill="#eebece"/>
        <circle cx="-9" cy="5"   r="8" fill="#eebece"/>
        <circle cx="-9" cy="-5"  r="8" fill="#eebece"/>
        <circle cx="0"  cy="0"   r="7" fill="#d4889e"/>
        <circle cx="0"  cy="0"   r="3" fill="#b85c78"/>
      </g>
      {/* Flower 3 — small bud */}
      <g transform="translate(108,136)">
        <circle cx="0"  cy="-7" r="6" fill="#f7dde6"/>
        <circle cx="6"  cy="-3" r="6" fill="#f7dde6"/>
        <circle cx="6"  cy="3"  r="6" fill="#f7dde6"/>
        <circle cx="0"  cy="7"  r="6" fill="#f7dde6"/>
        <circle cx="-6" cy="3"  r="6" fill="#f7dde6"/>
        <circle cx="-6" cy="-3" r="6" fill="#f7dde6"/>
        <circle cx="0"  cy="0"  r="5" fill="#eebece"/>
        <circle cx="0"  cy="0"  r="2.5" fill="#b85c78"/>
      </g>
      {/* Leaves */}
      <ellipse cx="50" cy="200" rx="12" ry="6" fill="#8fab8e" transform="rotate(-30 50 200)" opacity="0.7"/>
      <ellipse cx="125" cy="110" rx="10" ry="5" fill="#8fab8e" transform="rotate(20 125 110)" opacity="0.7"/>
      <ellipse cx="165" cy="75"  rx="9"  ry="4" fill="#8fab8e" transform="rotate(-50 165 75)" opacity="0.6"/>
      {/* Tiny buds */}
      <circle cx="20" cy="145" r="5" fill="#d4889e" opacity="0.7"/>
      <circle cx="140" cy="100" r="4" fill="#eebece" opacity="0.8"/>
    </svg>
  )
}

/* ---- Floating petal shape ---- */
function Petal({ style }) {
  return (
    <svg style={style} className="petal-float" width="22" height="28" viewBox="0 0 22 28" fill="none">
      <ellipse cx="11" cy="14" rx="9" ry="13" fill="#f7dde6" opacity="0.7" transform="rotate(-20 11 14)"/>
    </svg>
  )
}

export default function App() {
  const [act, setAct] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [selection, setSelection] = useState(null)
  const audioRef = useRef(null)
  const [musicStarted, setMusicStarted] = useState(false)
  const [muted, setMuted] = useState(false)

  // Attempt autoplay on mount; browsers may block until user interaction
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.45
    audio.loop = true

    const tryPlay = () => {
      audio
        .play()
        .then(() => setMusicStarted(true))
        .catch(() => {
          const handler = () => {
            audio.play().then(() => setMusicStarted(true)).catch(() => {})
            document.removeEventListener('pointerdown', handler)
            document.removeEventListener('keydown', handler)
          }
          document.addEventListener('pointerdown', handler, { once: true })
          document.addEventListener('keydown', handler, { once: true })
        })
    }
    tryPlay()
  }, [])

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted((m) => !m)
    if (!musicStarted) {
      audio.play().then(() => setMusicStarted(true)).catch(() => {})
    }
  }

  return (
    <main className="app">
      {/* Floral corners */}
      <div className="floral-corner floral-corner--tl" aria-hidden="true"><FloralCorner /></div>
      <div className="floral-corner floral-corner--tr" aria-hidden="true"><FloralCorner /></div>
      <div className="floral-corner floral-corner--bl" aria-hidden="true"><FloralCorner /></div>
      <div className="floral-corner floral-corner--br" aria-hidden="true"><FloralCorner /></div>

      {/* Floating petals */}
      <Petal style={{ top: '18%', left: '12%', animationDelay: '0s',    animationDuration: '9s'  }} />
      <Petal style={{ top: '35%', left: '88%', animationDelay: '1.5s',  animationDuration: '11s' }} />
      <Petal style={{ top: '65%', left: '7%',  animationDelay: '3s',    animationDuration: '8s'  }} />
      <Petal style={{ top: '72%', left: '82%', animationDelay: '2.2s',  animationDuration: '13s' }} />
      <Petal style={{ top: '52%', left: '93%', animationDelay: '0.8s',  animationDuration: '10s' }} />
      <Petal style={{ top: '10%', left: '55%', animationDelay: '4s',    animationDuration: '12s' }} />

      {/* Music player */}
      <audio ref={audioRef} src={loverSrc} preload="auto" />
      <button
        type="button"
        className={`music-btn ${muted ? 'music-btn--muted' : ''}`}
        onClick={toggleMute}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
        <span className="music-btn__label">{muted ? 'Music Off' : 'Now Playing'}</span>
        {!muted && <span className="music-btn__bars"><i/><i/><i/><i/></span>}
      </button>

      {act === 1 && <ActOne onYes={() => setAct(2)} />}
      {act === 2 && (
        <ActTwo
          onSubmitted={(choices) => {
            setSelection(choices)
            setSubmitted(true)
            setAct(3)
          }}
        />
      )}
      {act === 3 && submitted && <ActThree selection={selection} />}
    </main>
  )
}
