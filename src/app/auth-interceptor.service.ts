//define custom headers
// / interceptors are like middleware code that we implement in Backend API'
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
export class AuthInterceptorService implements HttpInterceptor {
    //intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       intercept (req: HttpRequest<any>, next: HttpHandler) {
        console.log("req is on its way")
       return next.handle(req); //return the result tant next yields
    }
}