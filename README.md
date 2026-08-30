# Punyakart - Nepal Flood Relief 2026

A modern, mobile-first, high-conversion, bilingual (English / Hindi) emergency relief web platform for **Punyakart Foundation** responding to catastrophic flash flooding in Nepal.

## 📱 Mobile-First & Key Features

- **Mobile Navigation Drawer**: Smooth slide-over navigation overlay with full section links, language selector, and quick CTA.
- **Sticky Mobile Bottom Action Bar**: Fixed quick-action bar (`< md` screens) featuring 1-tap `COPY UPI` and pulse-animated `DONATE NOW` button.
- **1-Tap Direct UPI App Launcher**: Native `upi://pay` deep-links for Google Pay, PhonePe, Paytm, and BHIM payment apps.
- **Bilingual Support (EN / हिंदी)**: Instant language switching without page reloads using HTML data attributes and Noto Sans Devanagari font rendering.
- **Visual Assets**:
  - `image_83b435.jpg`: Documentary field photography of rescue operations in Nepal flood zone.
  - `qr_code.jpg`: Official scannable UPI payment QR code card.
- **Interactive Donation Packs**: Preset selection pills (₹1,000, ₹2,500, ₹5,000, ₹10,000) for Ration Kits, Medical Supplies, and Emergency Shelter.
- **Touch-Friendly Accordion FAQs**: Collapsible FAQ section with smooth height animation for fast mobile scannability.
- **Transparency Progress Tracker**: Real-time fund progress bar (₹42.5L / ₹50L target) with impact metric cards.
- **Instant 80G Tax Receipt Generator**: Interactive tax certificate popup modal for donors.

## 📁 File Structure

```
punyakart-flood-relief/
├── index.html        # Mobile-first HTML structure with English/Hindi dual content
├── styles.css        # Mobile design system, touch targets, drawer & accordion CSS
├── script.js          # Interactive JavaScript (Mobile drawer, UPI launcher, Receipt modal)
├── image_83b435.jpg  # Disaster relief hero field photo
├── qr_code.jpg       # Scannable payment QR code card
├── .gitignore        # Repository ignore rules
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
