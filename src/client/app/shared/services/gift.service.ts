import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/gift.model';

@Injectable()
export class UserService {

    private useresUrl = 'app/useres';  // URL to web api

    constructor(private http: Http) { }

    getUseres(): Promise<User[]> {
        return this.http.get(this.useresUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getUser(id: number) {
        return this.getUseres()
            .then(useres => useres.filter(user => user.id === id)[0]);
    }

    save(user: User): Promise<User>  {
        if (user.id) {
            return this.put(user);
        }
        return this.post(user);
    }

    delete(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.useresUrl}/${user.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    // Add new User
    private post(user: User): Promise<User> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.useresUrl, JSON.stringify(user), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing User
    private put(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.useresUrl}/${user.id}`;

        return this.http
            .put(url, JSON.stringify(user), {headers: headers})
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */