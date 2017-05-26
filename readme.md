Resumable Google Cloud Storage Upload
Via Firebase SDK

Setup:

1) Create a firebase app & get the web credentials: https://firebase.google.com/docs/web/setup

2) Put credentials into views/index.ejs (todo: move these to env props)

3) Setup bucket to allow unauthenticated uploads:

// https://firebase.google.com/docs/storage/security/start#sample-rules
// Anyone can read or write to the bucket, even non-users of your app.
// Because it is shared with Google App Engine, this will also make
// files uploaded via GAE public.
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}

(Obviously this should become more secure eventually)
