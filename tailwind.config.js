const plugin = require('tailwindcss/plugin')

// Rotate Y custom utility
const rotateY = plugin(function({addUtilities}){
  addUtilities({
    '.rotate-y-90':{
      transform: 'rotateY(90deg)'
    }
  })
})

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins:[rotateY],
}
