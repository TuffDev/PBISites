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
          return data.json();
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

  getSites() {
    return (
      this.getData('https://pbisite.azure-api.net/sites')
        .then(data => {
          console.log("data: " + JSON.stringify(data));
          if (data.ok) {
            return data.json();
          } else {
            throw new Error('Something went wrong retrieving sites');
          }
        })
        .catch(error => {
          console.error(error);
          return null;
        })
    )
  }

  addSiteUser(UserKey, SiteKey) {
    return (
      this.putData('https://pbisite.azure-api.net/sites/users', {sitekey: SiteKey, userkey: UserKey})
        .then(data => {
          console.log("data: " + JSON.stringify(data));
          if (data.ok) {
            return true;
          } else {
            throw new Error('Something went wrong adding site user');
          }
        })
        .catch(error => {
          console.error(error);
          return false;
        })
    )
  }

  removeSiteUser(UserKey, SiteKey) {
    return (
      this.deleteData('https://pbisite.azure-api.net/SITEUSER', {SiteKey: SiteKey, UserKey: UserKey})
        .then(data => {
          console.log("data: " + JSON.stringify(data));
          if (data.ok) {
            return true;
          } else {
            throw new Error('Something went wrong removing site user');
          }
        })
        .catch(error => {
          console.error(error);
          return false;
        })
    )
  }

  getEmbedToken(SiteKey) {
    return (
      this.postData('https://pbisite.azure-api.net/embed', {SiteKey: SiteKey})
        .then(data => {
          console.log("data: " + JSON.stringify(data));
          if (data.ok) {
            return data.json();
          } else {
            throw new Error('Something went wrong retrieving embed token');
          }
        })
        .catch(error => {
          console.error(error);
          return null;
        })
    )
  }

  removeSite(SiteKey) {
    return (
      this.deleteData('https://pbisite.azure-api.net/sites', {SiteKey: SiteKey})
        .then(data => {
          if (data.ok) {
            return true;
          } else {
            throw new Error('Something went wrong removing the site');
          }
        })
        .catch(error => {
          console.error(error);
          return false;
        })
    )
  }

  createApp(tenant, clientId, clientSecret) {
    let data = {
      tenant: tenant,
      clientid: clientId,
      clientsecret: clientSecret
    };
    return (
      this.putData('https://pbisite.azure-api.net/apps', data)
        .then(data => {
          if (data.ok) {
            return true;
          } else {
            throw new Error('Something went wrong creating the App');
          }
        })
        .catch(error => {
          console.error(error);
          return false;
        })
    )
  }

  getApp() {
    return (
      this.getData('https://pbisite.azure-api.net/apps')
        .then(data => {
          console.log("data: " + JSON.stringify(data));
          if (data.ok) {
            return data.json();
          } else {
            throw new Error('Something went wrong retrieving sites');
          }
        })
        .catch(error => {
          console.error(error);
          return null;
        })
    )
  }

  uploadFile(file) {
    let url = "https://pbisite.azure-api.net/sites/files";
    let data = new FormData();
    data.append('file', file);
    return fetch(url, {
      method: 'POST',
      contentType: 'multipart/form-data',
      mimeType: 'multipart/form-data',
      processData: false,
      headers: {
        'Authorization': 'Bearer ' + this.auth.getToken(),
      },
      body: data,
    })
  }



}

export default API;
