import Auth from './Auth';

class API {
  constructor() {
    this.auth = new Auth();
  }

  getData(url = '') {
    return fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer ' + this.auth.getToken(),
      },
    })
      .then(response => response.json());
  }

  postData(url = '', data = {}) {
    return fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer ' + this.auth.getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  putData(url = '', data = {}) {
    return fetch(url, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer ' + this.auth.getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  deleteData(url = '', data = {}) {
    return fetch(url, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer ' + this.auth.getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  getUsers() {
    this.auth.currentUser();
    return (
      this.getData('https://pbisite.azure-api.net/users')
        .then((data) => {
          return data;
        })
        .catch(error => console.error(error))
    )
  }

  getDetails(UserKey) { // returns a Promise
    return (
      this.postData('https://pbisite.azure-api.net/sites', {"UserKey": UserKey})
        .then(data => {
          if (data.ok) {
            return data.json();
          } else {
            throw new Error('Something went wrong getting User Sites');
          }
        })
        .catch((error) => {
          console.error("get details error" + error);
          const empty = [{}];
          return (empty);
        })
    )
  }

  getUser() {
    this.auth.currentUser();
    // return (
    //   this.postData('https://pbisite.azure-api.net/users', {"email": })
    // )
  }

  addUser(userData) { // returns a boolean
    return (
      this.putData('https://pbisite.azure-api.net/users', userData)
        .then(data => {
          if (data.ok) {
            return true;
          } else {
            throw new Error('Something went wrong adding the user');
          }
        })
        .catch(error => {
          console.error(error);
          return false;
        })
    )
  }

  removeUser(userKey) {
    return (
      this.deleteData('https://pbisite.azure-api.net/users', {"UserKey": userKey})
        .then(data => {
          if (data.ok) {
            return true;
          } else {
            throw new Error('Something went wrong removing the user');
          }
        })
        .catch(error => {
          console.error(error);
          return false;
        })
    )
  }
}

export default API;
