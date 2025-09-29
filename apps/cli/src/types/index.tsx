
export enum AuthState {
    // Attemtping to authenticate or re-authenticate
    Unauthenticated = "unauthenticated",
    // Auth dialog is open for user to select auth method
    Updating = "updating",
    // Successfully authenticated
    Authenticated = "authenticated",
}
