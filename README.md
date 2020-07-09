# Connect vue with FireStore

## The Case Study
This repo allows user to fill data in a form and auto sync it with Google Cloud Firestore. On successful update Google Fire Function calculates form completion progress which get synched with front-end Client as well.

## Test Assignment

### Problem Statement & Requirements
Build a form with 5 fields with auto save ability and show the percentage of form completion to the user. Assume each field accounts for 20% of the form.

### Technical requirements

* - [TailwindCSS]( https://tailwindcss.com/) for design and UI
* - Cloud [Firestore]( https://firebase.google.com/docs/firestore) as database
* - [Vue](https://vuejs.org/) and [Vuexfire](https://vuefire.vuejs.org/vuexfire/) to save data in the database

## Approach & Reasons

#### Setup
Easiest way to setup Vue application is to use Vue Cli so I used npm and Vue CLI to install required package.

##### Commands
Install Vue CLI
```
npm install -g @vue/cli
```

Install Firebase, Tailwind, and vuefire
```
npm install vuefire firebase tailwindcss
```
#### Vuefireplugin setup
VuefirePlugin is setup using firebase SDK. For two way declarative data binding Firestore callback is used.  

#### Database setup
Created Collection on Fire Store (Google Cloud) in test mode. Test mode allows to perform read/write activities without auth credentials. (It is not recommended to use it in production.) 

#### Auto save
Storing data on cloud is costly operation. Google limits the number of operations/sec and charge for write operations. Write a method the handles changes to the form. Debounce the call to Firestore to prevent excessive writes to the database that could cost money and/or exceed Firestore’s rate limits.

#### Google Cloud Function
Written Google cloud onWrite trigger function to calculate completion percentage and deployed it on cloud using firebase CLI.

## Local setup
Follow these steps to setup this project on local machine after cloning this repo. 

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```