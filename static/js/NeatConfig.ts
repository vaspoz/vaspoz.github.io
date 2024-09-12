import { NeatConfig } from "@firecms/neat";

// Define your config
export const config: NeatConfig = {
  colors: [
    {
      color: "#cdb4db",
      enabled: true,
    },
    {
      color: "#ffc8dd",
      enabled: true,
    },
    {
      color: "#ffafcc",
      enabled: true,
    },
    {
      color: "#bde0fe",
      enabled: true,
    },
    {
      color: "#a2d2ff",
      enabled: false,
    },
  ],
  speed: 4,
  horizontalPressure: 3,
  verticalPressure: 3,
  waveFrequencyX: 2,
  waveFrequencyY: 4,
  waveAmplitude: 5,
  shadows: 0,
  highlights: 2,
  colorBrightness: 1,
  colorSaturation: 3,
  wireframe: false,
  colorBlending: 5,
  backgroundColor: "#003FFF",
  backgroundAlpha: 1,
  resolution: 0.95,
};

// you can change the config at any time
// neat.speed = 6;

// you can also destroy the gradient for cleanup
// e.g. returning from a useEffect hook in React
// neat.destroy();
