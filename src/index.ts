import { HaGmapCard } from "./card";

if (!customElements.get("ha-gmap-card")) {
  customElements.define("ha-gmap-card", HaGmapCard);
}

// Register with Home Assistant Lovelace Card Picker
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "ha-gmap-card",
  name: "Google Maps Card (Modern)",
  description: "High-performance, lightweight vector Google Maps card with transit motion and custom filters.",
  preview: true
});

console.info(
  "%c HA-GMAP-CARD %c v1.0.0 ",
  "color: white; background: #1a73e8; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #1a73e8; background: #e8f0fe; font-weight: 700; border-radius: 0 3px 3px 0;"
);

export { HaGmapCard };
