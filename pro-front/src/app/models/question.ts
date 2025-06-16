export interface Question {
  _id?: string; // اختياري عند الإنشاء، مطلوب عند التعديل
  exam_id: string; // معرف الامتحان الذي ينتمي إليه السؤال (مطلوب)
  question: string; // نص السؤال (مطلوب)
  options: string[]; // خيارات الإجابة (مطلوب)
  correct_answer: number; // رقم الإجابة الصحيحة (مطلوب)
  points: number; // عدد النقاط (مطلوب)
  createdAt?: string; // تاريخ الإنشاء (اختياري، يتم إنشاؤه تلقائيًا من قبل الخادم)
  updatedAt?: string; // تاريخ التعديل (اختياري، يتم تحديثه تلقائيًا من قبل الخادم)
}
