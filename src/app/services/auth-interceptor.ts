import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest,HttpHandler,HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
 class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");
        const exp = localStorage.getItem("expires_at");

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });
            console.log("token:",idToken,"expire:",exp)
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }

 
}
export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];