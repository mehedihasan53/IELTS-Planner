# IELTS Study Companion

A React app for creating an IELTS study schedule, tracking daily tasks, and adjusting study slots.

## Development

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, or serve the build with `npm run preview`.

## Project structure

- `src/components/` contains the reusable setup, navigation, dashboard, routine, and roadmap UI.
- `src/data/` contains the study plan presets, colors, and roadmap curriculum.
- `src/utils/` contains schedule generation, time/date helpers, and local progress persistence.
- `src/styles.css` contains the original theme tokens and component styles plus Tailwind utilities.
