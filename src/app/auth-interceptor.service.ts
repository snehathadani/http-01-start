//define custom headers
// / interceptors are like middleware code that we implement in Backend API'
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEventType} from '@angular/common/http';
import {tap} from 'rxjs/operators'
export class AuthInterceptorService implements HttpInterceptor {
    //intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       intercept (req: HttpRequest<any>, next: HttpHandler) {
        console.log("req is on its way")
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')})
        //intercept responses
       return next.handle(modifiedRequest).pipe(tap(event => {
        console.log("event", event)
            if(event.type === HttpEventType.Response) {
                console.log('Response Arrived, Body data:')
                console.log(event.body)
            }
       })); //return the result tant next yields
    }
}