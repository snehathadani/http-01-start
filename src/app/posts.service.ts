import {Injectable} from '@angular/core'
import { Post } from './post.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class PostsService{
    error = new Subject<string>();

    constructor(private http:HttpClient){}

    createAndStorePost(title:string, content:string) {
        const postData: Post={title:title, content:content}
        this.http.post<{name: string}>('https://angular-guide-85315-default-rtdb.firebaseio.com/posts.json', postData)
        .subscribe(responseData => {
            console.log("response.name", responseData.name)
                console.log("responseData:",responseData)
              }, error => {
                this.error.next(error.message)
              });
                  console.log("postData",postData)
    }

    fetchPosts(){
        //add multiple query params
        let searchParams = new HttpParams()
        searchParams = searchParams.append('print', 'pretty')
        searchParams = searchParams.append('custom', 'key')
   return this.http
    .get<{[key:string]: Post }>('https://angular-guide-85315-default-rtdb.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders ({"Custom-Header": "Hello"}),
            params: new HttpParams().set('print', 'pretty')
        })
    .pipe(map(responseData  => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if(responseData.hasOwnProperty(key))
         postsArray.push({...responseData[key], id: key})
      }
      return postsArray;
    }
    ), catchError(errorRes => {
        //send to analytics general error handling task
        return throwError(errorRes)

    }))
    // .subscribe(posts=>{
      
    //   console.log("subscribe postss",posts)
     
    // })
    }
    deletePosts(){
      return this.http.delete('https://angular-guide-85315-default-rtdb.firebaseio.com/posts.json')
    }
}