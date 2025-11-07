# GTA VI Countdown Timer ⏱️

A minimal, fast, and accessible static website that displays a live countdown to the Grand Theft Auto VI release date.

## Features

- **Live Countdown**: Real-time countdown timer showing days, hours, minutes, and seconds
- **Timezone Aware**: Automatically adjusts to user's local timezone
- **Accessible**: ARIA live regions for screen readers, semantic HTML
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Light/Dark Mode**: Theme toggle with system preference detection
- **Offline Support**: Service worker enables offline functionality
- **SEO Optimized**: Complete meta tags and OpenGraph/Twitter cards
- **Zero Dependencies**: Pure HTML, CSS, and JavaScript - no external libraries
- **Fast**: Lightweight and optimized for performance

## Usage

### Viewing the Site

Simply open `public/index.html` in a web browser, or serve the `public` directory with any static web server.

#### Using Python:
```bash
cd public
python -m http.server 8000
```

#### Using Node.js (http-server):
```bash
npx http-server public -p 8000
```

Then visit `http://localhost:8000` in your browser.

### Configuration

Edit `public/config.json` to change the release date:

```json
{
  "releaseDate": "2026-11-19T00:00:00-05:00",
  "title": "GTA VI Countdown",
  "description": "Live countdown to the Grand Theft Auto VI release date"
}
```

The `releaseDate` should be in ISO 8601 format with timezone offset.

## Project Structure

```
gta6timer/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Styles with light/dark theme
│   ├── app.js             # Countdown logic and theme toggle
│   ├── service-worker.js  # Offline support
│   ├── manifest.json      # PWA manifest
│   └── config.json        # Release date configuration
├── .gitignore
└── README.md
```

## Browser Support

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Custom Properties
- Service Workers (for offline mode)

## Accessibility

- Semantic HTML structure
- ARIA live regions for countdown updates
- Keyboard navigable theme toggle
- Respects `prefers-reduced-motion`
- Screen reader friendly

## License

This is an unofficial fan project. Grand Theft Auto and GTA are trademarks of Take-Two Interactive Software Inc.

## Disclaimer

**Unofficial fan countdown.** Release date subject to change. This project is not affiliated with, endorsed by, or connected to Rockstar Games or Take-Two Interactive.