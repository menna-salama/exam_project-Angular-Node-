import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  console.log('AuthInterceptor called for URL:', req.url);

  // الحصول على التوكن من localStorage
  const token = localStorage.getItem('auth_token');
  console.log(
    'Token from localStorage:',
    token ? 'Token exists' : 'No token found'
  );

  if (token) {
    console.log('AuthInterceptor adding token to request for URL:', req.url);
    console.log(
      'Token being added (first 10 chars):',
      token.substring(0, 10) + '...'
    );

    // إنشاء نسخة جديدة من الطلب مع إضافة رمز المصادقة
    // تجربة تنسيقات مختلفة للتوكن
    const authReq = req.clone({
      setHeaders: {
        // تجربة بدون كلمة Bearer
        Authorization: token,
      },
    });

    // طباعة الرؤوس للتحقق
    console.log('Headers after interceptor:', authReq.headers.keys());
    console.log('Authorization header:', authReq.headers.get('Authorization'));

    return next(authReq);
  }

  // إذا لم يكن هناك توكن، إرسال الطلب كما هو
  console.log('No token found, sending request without Authorization header');
  return next(req);
};
