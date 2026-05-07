// ─────────────────────────────────────────────────────────────────────────────
// App-wide constants. Single source of truth — never hardcode these in components.
// Business rules enforced server-side; these values are for UI logic only.
// ─────────────────────────────────────────────────────────────────────────────

/** Percent paid required to unlock the renewal flow (server enforces this too) */
export const RENEWAL_ELIGIBILITY_THRESHOLD = 40;

/** Max failed login attempts before account lockout */
export const LOGIN_MAX_ATTEMPTS = 5;

/** Max file size for bank statement uploads */
export const MAX_UPLOAD_SIZE_MB = 10;
export const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;

/** Accepted MIME types for bank statement uploads */
export const ALLOWED_UPLOAD_TYPES = ['application/pdf', 'image/jpeg', 'image/png'] as const;
export const ALLOWED_UPLOAD_EXTENSIONS = '.pdf, .jpg, .jpeg, .png';

/** Number of bank statements required for a renewal request */
export const RENEWAL_REQUIRED_DOCUMENTS = 3;

/** Number of upcoming scheduled payments shown on Deal page */
export const SCHEDULE_PREVIEW_COUNT = 5;

/** Recent payments shown on Dashboard */
export const DASHBOARD_RECENT_PAYMENTS_COUNT = 3;

/** Invite link / password reset token expiry */
export const INVITE_EXPIRY_HOURS = 48;
export const RESET_TOKEN_EXPIRY_MINUTES = 30;

/** Session idle timeout */
export const SESSION_TIMEOUT_MINUTES = 30;
