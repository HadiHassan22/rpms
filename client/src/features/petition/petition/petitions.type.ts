/**
 * This interface is for the initial state of the feature slice
 */
export interface Petitions {
  // Write your type declerations here
  petitions: Petition[];
}

interface Petition {
  _id: string;

  type: string;

  course: string;

  course2?: string;

  status: string;

  requirements?: string;

  note?: string;

  description: string;

  student_name: string;

  student_id: string;
}
