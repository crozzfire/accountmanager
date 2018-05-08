# Account Manager

A simple grails app to do CRUD operations on Account.

Overview
--------
* A domain class `Account` is created with the necessary fields and constrains.
* The domain is annotated with `@Resource` to create a REST controller during runtime
* The frontend uses React and Webpack to generate the views, manage states and package the assets.
* The files of interest in the frontend are `src/main/webapp/App.js`
* The DB is default Grails in-memory H2 DB, which reduces any further config changes and works out of the box
for testing

Steps to run
------------

`grails run-app` and open `localhost:8080`




