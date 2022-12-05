import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subscription} from 'rxjs'

import { Post } from './post.model';
import { PostsService } from './posts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = []; //type is arrays of Post
  isFetching = false;
  error = null;
  private errorsub: Subscription

  constructor(private http: HttpClient,
              private postsService: PostsService) {}

  ngOnInit() {
    this.errorsub = this.postsService.error.subscribe(errorMessage => this.error = errorMessage)
    this.isFetching = true
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching=false
      this.loadedPosts= posts
    }, error=> {
      this.isFetching = false;
      this.error = error.message;
      console.log(error)
    })
  }

  onHandleError(){
    this.error = null;
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
    // Send Http request
//     this.http.post<{name: string}>('https://angular-guide-85315-default-rtdb.firebaseio.com/posts.json', postData)
// .subscribe(responseData => {
//         console.log(responseData)
//       });
//           console.log("postData",postData)
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts
    }, error=> {
      this.isFetching = false;
      this.error = error.message;
    })
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(()=> {
      this.loadedPosts = [];
    })
  }

  // private fetchPosts() {
  //   this.isFetching= true
  //   // this.http
  //   // .get<{[key:string]: Post }>('https://angular-guide-85315-default-rtdb.firebaseio.com/posts.json')
  //   // .pipe(map(responseData  => {
  //   //   const postsArray: Post[] = [];
  //   //   for (const key in responseData) {
  //   //     if(responseData.hasOwnProperty(key))
  //   //      postsArray.push({...responseData[key], id: key})
  //   //   }
  //   //   return postsArray;
  //   // }
  //   // ))
  //   // .subscribe(posts=>{
  //   //   this.isFetching = false
  //   //   console.log("subscribe postss",posts)
  //   //   this.loadedPosts = posts
  //   // })
  
  // }

  ngOnDestroy(): void {
    this.errorsub.unsubscribe()
  }
}
