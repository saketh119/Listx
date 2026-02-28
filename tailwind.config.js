/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '16px',
				'2xl': '20px',
				'3xl': '24px',
				full: '9999px',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				brand: {
					jade: '#42D49C',
					cedar: '#00A68A',
					spruce: '#007978',
					lake: '#004963',
					nocturn: '#012B3A',
					saffron: '#FF4C46',
					tea: '#DFFFDE',
					mint: '#B2FFC6',
					spring: '#87F8AE',
					deep: '#01202b',
					dark: '#011922',
				},
			},
			fontFamily: {
				display: ['Sora', ...fontFamily.sans],
				body: ['DM Sans', ...fontFamily.sans],
				mono: ['JetBrains Mono', ...fontFamily.mono],
				sans: ['DM Sans', ...fontFamily.sans],
			},
			fontSize: {
				'display-2xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
				'display-xl': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
				'display-lg': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
				'display-md': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
				'h1': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
				'h2': ['1.375rem', { lineHeight: '1.35', fontWeight: '600' }],
				'h3': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
				'h4': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
				'body-lg': ['1rem', { lineHeight: '1.6' }],
				'body-md': ['0.9375rem', { lineHeight: '1.55' }],
				'body-sm': ['0.875rem', { lineHeight: '1.5' }],
				'body-xs': ['0.8125rem', { lineHeight: '1.5' }],
				'label-lg': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
				'label-md': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
				'label-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.05em' }],
				'mono-md': ['0.875rem', { lineHeight: '1.5' }],
				'mono-sm': ['0.8125rem', { lineHeight: '1.4' }],
				'mono-xs': ['0.75rem', { lineHeight: '1.4' }],
			},
			boxShadow: {
				sm: '0 1px 2px rgba(1,43,58,0.04), 0 1px 4px rgba(1,43,58,0.06)',
				md: '0 2px 4px rgba(1,43,58,0.05), 0 4px 12px rgba(1,43,58,0.08)',
				lg: '0 4px 8px rgba(1,43,58,0.06), 0 8px 24px rgba(1,43,58,0.12)',
				xl: '0 8px 16px rgba(1,43,58,0.08), 0 16px 40px rgba(1,43,58,0.14)',
				'2xl': '0 16px 32px rgba(1,43,58,0.10), 0 32px 64px rgba(1,43,58,0.18)',
				'brand-glow': '0 0 0 3px rgba(66,212,156,0.25)',
				'error-glow': '0 0 0 3px rgba(255,76,70,0.20)',
				'jade-card': '0 4px 20px rgba(66,212,156,0.20), 0 1px 4px rgba(1,43,58,0.06)',
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' },
				},
				fadeUp: {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				slideInRight: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideUp: {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				pulseJade: {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(66,212,156,0)', opacity: '1' },
					'50%': { boxShadow: '0 0 0 12px rgba(66,212,156,0.15)', opacity: '0.85' },
				},
				gradientShift: {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
				syncPulse: {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.4', transform: 'scale(0.85)' },
				},
			},
			animation: {
				shimmer: 'shimmer 1.5s linear infinite',
				fadeUp: 'fadeUp 0.2s cubic-bezier(0.16,1,0.3,1) both',
				fadeIn: 'fadeIn 0.2s ease-out both',
				scaleIn: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
				slideInRight: 'slideInRight 0.3s cubic-bezier(0.45,0,0.55,1) both',
				slideUp: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
				pulseJade: 'pulseJade 2s ease-in-out infinite',
				gradientShift: 'gradientShift 2s ease infinite',
				syncPulse: 'syncPulse 2s ease-in-out infinite',
				spin: 'spin 0.75s linear infinite',
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

