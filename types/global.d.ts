export {};

declare global {
    interface CustomJwtSessionClaims {
        timezone?: string;
        onboarded?: boolean;
    }
}
