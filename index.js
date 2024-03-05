const plugin = require('tailwindcss/plugin')

const safeArea = plugin(({ addUtilities, matchUtilities, theme }) => {
	const baseUtilities = {
		'.m-safe': {
			marginTop: 'var(--safe-area-inset-top)',
			marginRight: 'var(--safe-area-inset-right)',
			marginBottom: 'var(--safe-area-inset-bottom)',
			marginLeft: 'var(--safe-area-inset-left)',
		},
		'.mx-safe': {
			marginRight: 'var(--safe-area-inset-right)',
			marginLeft: 'var(--safe-area-inset-left)',
		},
		'.my-safe': {
			marginTop: 'var(--safe-area-inset-top)',
			marginBottom: 'var(--safe-area-inset-bottom)',
		},
		'.mt-safe': {
			marginTop: 'var(--safe-area-inset-top)',
		},
		'.mr-safe': {
			marginRight: 'var(--safe-area-inset-right)',
		},
		'.mb-safe': {
			marginBottom: 'var(--safe-area-inset-bottom)',
		},
		'.ml-safe': {
			marginLeft: 'var(--safe-area-inset-left)',
		},
		'.p-safe': {
			paddingTop: 'var(--safe-area-inset-top)',
			paddingRight: 'var(--safe-area-inset-right)',
			paddingBottom: 'var(--safe-area-inset-bottom)',
			paddingLeft: 'var(--safe-area-inset-left)',
		},
		'.px-safe': {
			paddingRight: 'var(--safe-area-inset-right)',
			paddingLeft: 'var(--safe-area-inset-left)',
		},
		'.py-safe': {
			paddingTop: 'var(--safe-area-inset-top)',
			paddingBottom: 'var(--safe-area-inset-bottom)',
		},
		'.pt-safe': {
			paddingTop: 'var(--safe-area-inset-top)',
		},
		'.pr-safe': {
			paddingRight: 'var(--safe-area-inset-right)',
		},
		'.pb-safe': {
			paddingBottom: 'var(--safe-area-inset-bottom)',
		},
		'.pl-safe': {
			paddingLeft: 'var(--safe-area-inset-left)',
		},
		'.top-safe': {
			top: 'var(--safe-area-inset-top)',
		},
		'.right-safe': {
			right: 'var(--safe-area-inset-right)',
		},
		'.bottom-safe': {
			bottom: 'var(--safe-area-inset-bottom)',
		},
		'.left-safe': {
			left: 'var(--safe-area-inset-left)',
		},
		'.min-h-screen-safe': {
			minHeight: [
				'calc(100vh - (var(--safe-area-inset-top) + var(--safe-area-inset-bottom)))',
				'-webkit-fill-available',
			],
		},
		'.max-h-screen-safe': {
			maxHeight: [
				'calc(100vh - (var(--safe-area-inset-top) + var(--safe-area-inset-bottom)))',
				'-webkit-fill-available',
			],
		},
		'.h-screen-safe': {
			height: [
				'calc(100vh - (var(--safe-area-inset-top) + var(--safe-area-inset-bottom)))',
				'-webkit-fill-available',
			],
		},
	}
	addUtilities(baseUtilities)

	const offsetUtilities = Object.entries(baseUtilities).reduce(
		(accu, [selector, propertyValue]) => {
			const className = selector.slice(1)
			accu[`${className}-offset`] = (x) =>
				Object.entries(propertyValue).reduce((accu, [property, value]) => {
					if (Array.isArray(value)) {
						accu[property] = value.map((v) =>
							v === '-webkit-fill-available' ? v : `calc(${v} + ${x})`
						)
					} else {
						accu[property] = `calc(${value} + ${x})`
					}
					return accu
				}, {})
			return accu
		},
		{}
	)
	matchUtilities(offsetUtilities, {
		values: theme('spacing'),
		supportsNegativeValues: true,
	})

	const orUtilities = Object.entries(baseUtilities).reduce(
		(accu, [selector, propertyValue]) => {
			const className = selector.slice(1)
			accu[`${className}-or`] = (x) =>
				Object.entries(propertyValue).reduce((accu, [property, value]) => {
					if (Array.isArray(value)) {
						accu[property] = value.map((v, i) =>
							v === '-webkit-fill-available' ? v : `max(${v}, ${x})`
						)
					} else {
						accu[property] = `max(${value}, ${x})`
					}
					return accu
				}, {})
			return accu
		},
		{}
	)
	matchUtilities(orUtilities, {
		values: theme('spacing'),
		supportsNegativeValues: true,
	})
})

module.exports = safeArea
