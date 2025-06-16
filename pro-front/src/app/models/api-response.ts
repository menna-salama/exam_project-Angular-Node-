export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
  exams?: T;
  questions?: T;
  exam?: T;
  question?: T;
  updated?: T;
}
