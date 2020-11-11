/**
 * This interface is for the initial state of the feature slice
 */
export interface Petitions {
  // Write your type declerations here
  petitions: Petition[];
}

interface Petition {
  type: string;

  course: string;

  course2?: string;

  status: string;
}
