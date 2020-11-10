/**
 * This interface is for the initial state of the feature slice
 */
export interface Login {
  /** User's email */
  email: string;

  /** Login status */
  isLoggedIn: boolean;
}
