import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				ocean: {
					50: '#e0f7fa',
					100: '#b2ebf2',
					200: '#80deea',
					300: '#4dd0e1',
					400: '#26c6da',
					500: '#0EA5E9', // Deep ocean blue
					600: '#0F766E', // Darker teal
					700: '#0e7490',
					800: '#155e75',
					900: '#164e63',
				},
				sunset: {
					50: '#fff8f1',
					100: '#feecdc',
					200: '#fcd9bd',
					300: '#fdba8c',
					400: '#ff8a4c',
					500: '#F97316', // Sunset orange
					600: '#ea580c',
					700: '#c2410c',
					800: '#9a3412',
					900: '#7c2d12',
				},
				terra: {
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#2DD4BF', // Vibrant teal
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b',
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['"Clash Display"', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 15px rgba(14, 165, 233, 0.6)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(14, 165, 233, 0.9)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'count-up': {
					'0%': {
						transform: 'translateY(10px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'parallax-slow': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-5%)' },
				},
				'parallax-medium': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-10%)' },
				},
				'parallax-fast': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-15%)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'pulse-glow': 'pulse-glow 2s infinite',
				'float': 'float 6s ease-in-out infinite',
				'count-up': 'count-up 1.5s ease-out forwards',
				'parallax-slow': 'parallax-slow 15s ease-in-out infinite alternate',
				'parallax-medium': 'parallax-medium 12s ease-in-out infinite alternate',
				'parallax-fast': 'parallax-fast 10s ease-in-out infinite alternate',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
