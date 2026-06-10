const COLOR_HEX: Record<string, string> = {
  "Preto": "#111111",
  "Preta": "#111111",
  "Branco": "#f5f5f5",
  "Branca": "#f5f5f5",
  "Cinza": "#9ca3af",
  "Cinza Mescla": "#b0b7c0",
  "Chumbo": "#4b5563",
  "Azul": "#3b82f6",
  "Azul Royal": "#1a3fb5",
  "Azul Marinho": "#1e3a5f",
  "Navy": "#1e3a5f",
  "Azul Serenity": "#93c5fd",
  "Amarelo": "#facc15",
  "Verde": "#16a34a",
  "Verde Folha": "#3a7d44",
  "Verde Água": "#2aa39a",
  "Verde Militar": "#4d5e3a",
  "Vermelho": "#dc2626",
  "Vinho": "#7f1d1d",
  "Rosa": "#f9a8d4",
  "Rosê": "#f9a8d4",
  "Nude": "#c8956c",
  "Caramelo": "#c08040",
  "Bege": "#c8a87a",
  "Champagne": "#e8d5b0",
  "Preto/Branco/Cinza": "#555555",
  "Azul/Preto/Cinza": "#334466",
  "Cores variadas": "linear-gradient(135deg, #f87171, #facc15, #4ade80, #60a5fa)",
};

export function getColorHex(name: string): string {
  return COLOR_HEX[name] ?? "#888888";
}
