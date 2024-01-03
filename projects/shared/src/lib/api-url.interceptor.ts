import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const apiUrlInterceptor = (apiUrl: string): HttpInterceptorFn => {
  return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if (req.url.startsWith('/api')) {
      return next(
        req.clone({
          url: `${apiUrl}${req.url.replace('/api', '')}`,
        }),
      );
    }
    return next(req);
  };
};
