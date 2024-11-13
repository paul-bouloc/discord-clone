/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
			screens: {
				xs: '480px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
			fontFamily: {
				sans: ['gg-sans', 'Noto Sans', 'Helvetica', 'Arial', 'sans-serif']
			},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
			boxShadow: {
				sm: "0 1px 5px 0 hsl(0 calc(1 * 0%) 0% / 0.3)",
				lg: "0 2px 10px 0 hsl(0 calc(1 * 0%) 0% / 0.2)"
			},
  		colors: {
				black: {
					100: "hsl(0, 0%, 94.9%)",
					130: "hsl(0, 0%, 91%)",
					160: "hsl(0, 0%, 85.5%)",
					200: "hsl(0, 0%, 80%)",
					230: "hsl(0, 0%, 74.1%)",
					260: "hsl(0, 0%, 67.5%)",
					300: "hsl(0, 0%, 60%)",
					330: "hsl(0, 0%, 47.8%)",
					345: "hsl(0, 0%, 40%)",
					360: "hsl(0, 0%, 36.1%)",
					400: "hsl(0, 0%, 20%)",
					430: "hsl(0, 0%, 14.5%)",
					460: "hsl(0, 0%, 7.8%)",
					500: "hsl(0, 0%, 0%)",
					530: "hsl(0, 0%, 0%)",
					560: "hsl(0, 0%, 0%)",
					600: "hsl(0, 0%, 0%)",
					630: "hsl(0, 0%, 0%)",
					660: "hsl(0, 0%, 0%)",
					700: "hsl(0, 0%, 0%)",
					730: "hsl(0, 0%, 0%)",
					760: "hsl(0, 0%, 0%)",
					800: "hsl(0, 0%, 0%)",
					830: "hsl(0, 0%, 0%)",
					860: "hsl(0, 0%, 0%)",
					900: "hsl(0, 0%, 0%)"
				},
				gray: {
					100: "hsl(0, 0%, 97.6%)",
					130: "hsl(220, 13%, 95.5%)",
					160: "hsl(210, 11.1%, 92.9%)",
					200: "hsl(216, 9.8%, 90%)",
					230: "hsl(210, 9.1%, 87.1%)",
					260: "hsl(214, 8.4%, 83.7%)",
					300: "hsl(210, 9.3%, 78.8%)",
					330: "hsl(215, 8.8%, 73.3%)",
					345: "hsl(214, 8.4%, 67.5%)",
					360: "hsl(214, 8.1%, 61.2%)",
					400: "hsl(223, 5.8%, 52.9%)",
					430: "hsl(229, 4.8%, 44.9%)",
					460: "hsl(228, 5.2%, 38%)",
					500: "hsl(228, 6%, 32.5%)",
					530: "hsl(227, 6.5%, 27.3%)",
					560: "hsl(225, 6.7%, 23.5%)",
					600: "hsl(223, 6.7%, 20.6%)",
					630: "hsl(220, 6.5%, 18%)",
					645: "hsl(220, 7%, 16.9%)",
					660: "hsl(228, 6.7%, 14.7%)",
					700: "hsl(225, 6.3%, 12.5%)",
					730: "hsl(225, 7.1%, 11%)",
					760: "hsl(220, 6.4%, 9.2%)",
					800: "hsl(220, 8.1%, 7.3%)",
					830: "hsl(240, 4%, 4.9%)",
					860: "hsl(240, 7.7%, 2.5%)",
					900: "hsl(0, 0%, 0.8%)"
				},
				blue: {
					100: "hsl(210, 80%, 98%)",
					130: "hsl(210, 87.5%, 96.9%)",
					160: "hsl(209, 87.1%, 93.9%)",
					200: "hsl(206, 92.3%, 89.8%)",
					230: "hsl(205, 92.5%, 84.3%)",
					260: "hsl(204, 94.5%, 78.4%)",
					300: "hsl(203, 97.4%, 69.6%)",
					330: "hsl(201, 100%, 59%)",
					345: "hsl(200, 100%, 49.4%)",
					360: "hsl(203, 100%, 47.5%)",
					400: "hsl(207, 100%, 46.1%)",
					430: "hsl(212, 100%, 45.3%)",
					460: "hsl(214, 100%, 41%)",
					500: "hsl(213, 100%, 35.7%)",
					530: "hsl(212, 100%, 30.4%)",
					560: "hsl(212, 100%, 26.7%)",
					600: "hsl(211, 100%, 23.1%)",
					630: "hsl(211, 100%, 20.8%)",
					660: "hsl(212, 100%, 18.6%)",
					700: "hsl(212, 100%, 16.7%)",
					730: "hsl(211, 100%, 14.1%)",
					760: "hsl(211, 100%, 12.4%)",
					800: "hsl(211, 100%, 10.6%)",
					830: "hsl(213, 100%, 9.4%)",
					860: "hsl(213, 100%, 8.4%)",
					900: "hsl(213, 100%, 7.1%)"
				},
				brand: {
					100: "hsl(240, 77.8%, 98.2%)",
					130: "hsl(236, 87.5%, 96.9%)",
					160: "hsl(235, 84.6%, 94.9%)",
					200: "hsl(236, 83.3%, 92.9%)",
					230: "hsl(236, 87%, 91%)",
					260: "hsl(235, 86.2%, 88.6%)",
					300: "hsl(235, 86.1%, 85.9%)",
					330: "hsl(235, 85.1%, 81.6%)",
					345: "hsl(235, 85.2%, 78.8%)",
					360: "hsl(235, 86.1%, 77.5%)",
					400: "hsl(235, 86.1%, 71.8%)",
					430: "hsl(235, 85.7%, 69.8%)",
					460: "hsl(235, 85.5%, 67.5%)",
					500: "hsl(235, 85.6%, 64.7%)",
					530: "hsl(235, 66.7%, 58.8%)",
					560: "hsl(235, 51.4%, 52.4%)",
					600: "hsl(235, 46.7%, 44.1%)",
					630: "hsl(235, 46.7%, 38.2%)",
					660: "hsl(235, 47.1%, 33.3%)",
					700: "hsl(235, 47%, 25.9%)",
					730: "hsl(235, 46.8%, 24.3%)",
					760: "hsl(234, 46.9%, 22.2%)",
					800: "hsl(235, 47.5%, 19.4%)",
					830: "hsl(235, 47.4%, 14.9%)",
					860: "hsl(235, 46.9%, 9.6%)",
					900: "hsl(233, 50%, 3.1%)"
				}
			}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

