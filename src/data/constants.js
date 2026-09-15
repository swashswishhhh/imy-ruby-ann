/**
 * Shared constants & copy for the whole app.
 * Edit wording / options here — no need to touch component logic.
 */

/* ---------- Act 1 · The Question ---------- */

export const NO_TEXTS = ['No', 'Are you sure?', 'Really sure?', 'Think again!', 'Wrong button! 😉']

export const TEASE_NOTES = [
  'The NO button is purely decorative 💅',
  'It seems to have a mind of its own…',
  'The universe is trying to tell you something ✨',
  'That button is legally not clickable 💜',
  'Just click YES already, Rubby Ann 🥺',
]

/** Random-coordinate padding (px) kept clear of screen edges when NO dodges. */
export const VIEWPORT_PADDING = 60

/** YES! button growth per dodge. */
export const SCALE_STEP = 0.3
export const MAX_SCALE = 3.5

/* ---------- Act 2 · The Planner ---------- */

export const FULL_SURPRISE = '🎲 You Plan It (Full Surprise)'

export const CATEGORIES = [
  {
    key: 'vibe',
    title: 'The Opening Vibe',
    hint: 'How should the evening begin?',
    options: ['☕ Cozy Coffee', '🍵 Sunset Matcha', '🍸 Cocktails & Drinks', '🎲 Surprise Me!'],
  },
  {
    key: 'mainEvent',
    title: 'The Main Event',
    hint: 'Pick the centerpiece of our date.',
    options: ['🕹️ Arcade & Games', '🎨 Art Gallery / Museum', '📚 Bookstore Browsing', '🎲 Surprise Me!'],
  },
  {
    key: 'food',
    title: 'Food & Drinks',
    hint: 'Fuel for the perfect evening.',
    options: ['🍜 Cozy Ramen', '🌮 Tacos & Bites', '🍨 Dessert & Cafe', '🎲 Surprise Me!'],
  },
]

/** Initial shape of the planner state (see ActTwo.jsx). */
export const EMPTY_SELECTION = {
  vibe: null,
  mainEvent: null,
  food: null,
  timeSlot: '',
  notes: '',
  isFullSurprise: false,
}