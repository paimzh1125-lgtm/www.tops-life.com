/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 1. 定义品牌颜色
      colors: {
        tops: {
          blue: "#0ea5e9", // 对应 sky-500
          dark: "#0f172a", // 对应 slate-900
          light: "#e0f2fe", 
        }
      },
      // 2. 定义字体
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      // 3. 定义动画效果 (首页必须)
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up-fade': 'slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ken-burns': 'ken-burns 20s ease-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        }
      }
    },
  },
  plugins: [],
}
