const kilo = 1e3;
const mega = 1e6;
const giga = 1e9;
const tera = 1e12;
const peta = 1e15;

const prefixes = [
	{ m: 1e15, p: 'P' },
	{ m: 1e12, p: 'T' },
	{ m: 1e9, p: 'G' },
	{ m: 1e6, p: 'M' },
	{ m: 1e3, p: 'k' },
];

export function prefixSI(n: number, unit: string): string {
	let prefix = '';
	for(const { m, p } of prefixes) {
		if(n > m) {
			n /= m;
			prefix = p;
			break;
		}
	}

	return `${Math.round(n)}${prefix}${unit}`;
}
