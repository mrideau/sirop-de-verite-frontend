import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const apiUrlInterceptor = (apiUrl: string): HttpInterceptorFn => {
  return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    console.log('req.headers', req.headers);
    if (req.url.startsWith('api')) {
      const clone = req.clone({
        url: `${apiUrl}${req.url.replace('api', '')}`,
        withCredentials: true,
      });
      console.log('req.headers', clone.headers);
      return next(clone);
    }
    return next(req);
  };
};
