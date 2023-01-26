export function generateCalendarDays(year: number, monthIndex: number): Date[][] {
	const date = new Date(year, monthIndex);
	const startOfWeek = getWeekStart(date);
	const y = startOfWeek.getFullYear();
	const m = startOfWeek.getMonth();
	const d = startOfWeek.getDate();
	const res = [];
	let current = new Date(y, m, d);
	for(let week = 0; week < 6; week += 1) {
		const weekDates = [];
		for(let day = 0; day < 7; day += 1) {
			current = new Date(y, m, d + week * 7 + day);
			weekDates.push(current);
		}

		res.push(weekDates);
	}

	return res;
}

export function getWeekStart(date: Date): Date {
	while(date.getDay() > 0) {
		date.setDate(date.getDate() - 1);
	}

	return date;
}

export function toSqlDate(date: Date): string {
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}
