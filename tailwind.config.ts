import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {container: {
        center: true,
        padding: '2rem', // отступы по бокам на мобилках
        screens: {
          '2xl': '1200px', // фиксируем макс. ширину
        },
      },
      colors: {
        'renome-title': '#0A4436',
      },
      backgroundImage: {
        'renome-gradient': 'linear-gradient(135deg, #034432 0%, #0F654D 50%, #023B2B 100%)',
      }
    }
  },
  plugins: [],
}
