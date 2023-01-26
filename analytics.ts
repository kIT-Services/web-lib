import { browser } from "$app/environment";
import { afterNavigate, beforeNavigate } from "$app/navigation";
import * as requests from './requests';

export async function init(): Promise<void> {
	if(!browser) return;

	if(!localStorage.getItem('uid')) {
		const uid = await requests.get('/analytics/uid', {}) as string;
		localStorage.setItem('uid', uid);
	}

	afterNavigate(() => viewPage(document.referrer || null));
	beforeNavigate(() => leavePage());
}

export function conversion(amount: string): Promise<void> {
	return record('conversion', { amount });
}

export function interaction(elementId: string): Promise<void> {
	return record('interaction', { element_id: elementId });
}

export function leavePage(): Promise<void> {
	return record('leave_page', null);
}

export function viewPage(referrer: string|null): Promise<void> {
	return record('view_page', { referrer });
}

async function record(action: string, data: any): Promise<void> {
	if(!browser) return;

	const uid = localStorage.getItem('uid');
	const payload = {
		kind: action,
		uid,
		path: window.location.pathname,
		data,
	};

	try {
		await requests.post('/analytics/action', payload);
	} catch(e: any) {
		console.error(e.toString());
	}
}
