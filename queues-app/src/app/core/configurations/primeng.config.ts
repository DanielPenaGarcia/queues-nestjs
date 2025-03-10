import { PrimeNGConfigType } from 'primeng/config';
import { MyPreset } from '@core/presets';

export const PrimeNGConfiguration: PrimeNGConfigType = {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: false || 'none',
    },
  },
};
