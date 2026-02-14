export const ALLOWED_CLIENT_URLS = Object.freeze([
	"https://ui-ape-padel-league.vercel.app",
	"http://localhost:3000",
	"http://localhost:3001"
]);

export const MATCH_STATUS = Object.freeze({
	SCHEDULED: 'scheduled',
	COMPLETED: 'completed',
	CANCELED: 'canceled',
	POSTPONED: 'postponed'
});

export const USER_ROLES = Object.freeze({
	ADMIN: 'admin',
	SUBMITTER: 'submitter',
	PLAYER: 'player'
});

export const ERROR_CODES = Object.freeze({
	USERNAME_EXISTS: 'USERNAME_EXISTS',
	INVALID_CREDENTIALS: 'INVALID_CREDENTIALS'
});

export const AUTH_CONDITIONS = Object.freeze({
	SUBMITTER: 'submitter'
});