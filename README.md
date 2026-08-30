# Punyakart - Nepal Flood Relief 2026

A modern, high-conversion, bilingual (English / Hindi) emergency relief website for **Punyakart Foundation** responding to catastrophic flash flooding in Nepal.

## 🚀 Features

- **Bilingual Support (EN / हिंदी)**: Seamless instant language switching without page reloads using HTML data attributes and Devanagari typography.
- **Generated High-Res Visual Assets**:
  - `image_83b435.jpg`: Documentary photography of rescue operations in Nepal flood zone.
  - `qr_code.jpg`: Scannable UPI payment QR code card asset.
- **Interactive Donation Packs**: Preset buttons for Ration Kits, Medical Supplies, Family Survival Packs, and Community Care.
- **Copy-to-Clipboard UPI VPA**: Instant copy button for `donate@punyakart` with localized feedback.
- **Transparency Progress Meter**: Live fund progress bar (₹42.5L / ₹50L target) with impact counters.
- **80G Tax Receipt Modal**: Instant receipt generator popup for donors.
- **Responsive & Accessible**: Tailwind CSS styling with glassmorphism and smooth scroll animations.

## 📁 File Structure

```
punyakart-flood-relief/
├── index.html        # Main HTML structure with English/Hindi dual content
├── styles.css        # Custom CSS rules and animations
├── script.js          # Interactive JavaScript (Language toggle, UPI copy, Modal, Presets)
├── image_83b435.jpg  # Disaster relief hero image
├── qr_code.jpg       # Scannable payment QR code card
└── README.md         # Documentation
```

## 🛠️ How to Run Locally

You can serve this project using any local web server.

### Option 1: Python HTTP Server (Built-in)
```bash
python -m http.server 8085
```
Then open `http://localhost:8085` in your browser.

### Option 2: Live Server (VS Code Extension)
Open `index.html` in VS Code and click **Go Live**.
