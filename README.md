## RESTful API test-automation framework

This repository contains a collection of sample scripts designed to perform end to end test automation on JSON REST endpoints. It uses Mocha as test runner and support ES6 (via babel-register). It generate Spec, JUNIT, JSON reporters as well.

## Installation

This project is tested on ***Node@6.10.0 , request@2.81.0*** and up.  While earlier versions of node may be compatible, they have not been tested or verified.

Install Node.JS from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally. Recommended version is 6.10.0. OR  If you have nvm installed globally, you run `nvm install` to get the latest version of node specified in the`.nvmrc` file [here](/.nvmrc).  If you don't use nvm, be sure that you are using a compatible version. Further details on nvm can be found on the official [github page](https://github.com/creationix/nvm). MAC OSX users are best suited to install nvm with homebrew `brew install nvm`.

Now open a terminal (OSX) / command prompt (windows), navigate to the framework's package.json folder and run `npm install` to grab all dependencies.

## Run Some Sample Tests

To execute the entire test suite in local development, on shell `npm run tests`

## Config Files

Mocha config/opts files can be found in the `/test` directory end with `mocha.opts`. Options mentioned in the .opts files is common to all test types.

## Reporters

This framework generates below standard  reports. to generate reports execute below command `npm run report`

##### Spec

Test reporter, that prints detailed results to console.

##### junit/xunit

The `JUnit` reporter helps you to create xml reports for your CI server. Add it to the reports array in the config file and define the directory where the xml files should get stored.

##### JSON

The `JSON` reporter is especially versatile. Since it produces a literal in a key : value pair, help to read, translate execution results to any custom reporter / it can be used to transport reporter events to another process and format them there, or to store the execution results back to any standard RDBMS or to NoSQL like mongodb with very minimal effort.

## The key elements of a RESTful implementation are as follows:

#### Resources –

The first key element is the resource itself. Let assume that a web application on a server has records of several employees. Let's assume the URL of the web application is http://demo.mybank.com. Now in order to access an employee record resource via REST, one can issue the command http://demo.mybank.com/employee/1 - This command tells the web server to provide the details of the employee whose employee number is 1.

#### Request Verbs -

These describe what you want to do with the resource. A browser issues a GET verb to instruct the endpoint it wants to get data. However there are many other verbs available including things like POST, PUT, and DELETE. So in the case of the example http://demo.mybank.com/employee/1 , the web browser is actually issuing a GET Verb because it wants to get the details of the employee record.

#### Request Headers –

These are additional instructions sent with the request. These might define the type of response required or the authorization details.

#### Request Body -

Data is sent with the request. Data is normally sent in the request when a POST request is made to the REST web service. In a POST call, the client actually tells the web service that it wants to add a resource to the server. Hence, the request body would have the details of the resource which is required to be added to the server.

#### Response Body –

This is the main body of the response. So in our example, if we were to query the web server via the request http://demo.mybank.com/employee/1 , the web server might return an XML document with all the details of the employee in the Response Body.

#### Response Status codes –

These codes are the general codes which are returned along with the response from the web server. An example is the code 200 which is normally returned if there is no error when returning a response to the client.

## Making HTTP Requests using node and request module

##### For complete set of API's refer to NPM's request's [README](https://www.npmjs.com/package/request)

While there are quite a few options available to you in `request` (many of which we'll cover throughout this article), it can be pretty simple to use as well. The below examples for this library is as easy as passing a URL and a callback:
```
const request = require('request');

request('http://google.com', function(err, res, body) {  
    console.log(body);
});
```
The code above submits an HTTP GET request to google.com and then prints the returned HTML to the screen. This type of request works for any HTTP endpoint, whether it returns HTML, JSON, an image, or just about anything else. The first argument to request can either be a URL string, or an object of options. Here are some of the more common options you'll encounter in your applications:

url: The destination URL of the HTTP request

method: The HTTP method to be used (GET, POST, DELETE, etc)

headers: An object of HTTP headers (key-value) to be set in the request

form: An object containing key-value form data

```
const request = require('request');
const options = {  
    url: 'https://www.reddit.com/r/funny.json',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
};

request(options, function(err, res, body) {  
    let json = JSON.parse(body);
    console.log(json);
});
```
Using the options object, this request uses the GET method to retrieve JSON data directly from Reddit, which is returned as a string in the body field. From here, you can use JSON.parse and use the data as a normal JavaScript object.

This same request format can be used for any type of HTTP method, whether it's DELETE, PUT, POST, or OPTIONS. Although, not all methods are used exactly the same. Some, like the POST method, can include data within the request. There are a few ways this data can be sent, some of which are:

body: A Buffer, String, or Stream object (can be an object if json option is set to true)

form: An object of key-value pair data (we'll go over this later)

multipart: An array of objects that can contain their own headers and body attributes

Each fulfills a different need (and there are even more ways to send data, which can be found in this section of NPM's request's [README](https://www.npmjs.com/package/request#requestoptions-callback)). The request module does contain some convenience methods that make these a bit easier to work with, however, so be sure to read the full docs to avoid making your code more difficult than it has to be.

Speaking of helper methods, a much more succinct way of calling the different HTTP methods is to use the respective helper methods provided. Here are a few of the more commonly used ones:

```
request.get(options, callback)
request.post(options, callback)
request.head(options, callback)
request.delete(options, callback)
```
While this won't save you a ton of lines of code, it will at least make your code a bit easier to understand by allowing you to just look at the method being called and not having to parse through all of the various options to find it.

## Forms

Whether you're interfacing with a REST API or creating a bot to crawl and submit data on websites, at some point you'll need to submit data for a form. As always with request, this is can be done a few different ways, depending on your needs.

For regular forms (URL-encoded, with a `MIME` type of application/x-www-form-urlencoded), you're best off using the `.post()` convenience method with the form object:
```
let options = {  
    url: 'http://http://mockbin.com/request',
    form: {
        email: 'me@example.com',
        password: 'myPassword'
    }
};
request.post(options, callback);
// or
request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err, httpResponse, body){ /* ... */ })
```
This will upload data just like an HTML form would, with the only limitation being that you can't upload files this way. In order to do that, you need to use the `formData` option instead, which uses the form-data library underneath.

`Using formData` instead, we can now pass file data to the server via Buffers, Streams, or even non-file data (as before) with simple key-value pairs.

```
let formData = {  
    // Pass single file with a key
    profile_pic: fs.createReadStream(__dirname + '/me.jpg'),

    // Pass multiple files in an array
    attachments: [
        fs.readFileSync(__dirname + '/cover-letter.docx'),  // Buffer
        fs.createReadStream(__dirname + '/resume.docx'),    // Stream
    ],

    // Pass extra meta-data with your files
    detailed_file: {
        value: fs.createReadStream(__dirname + '/my-special-file.txt'),
        options: {
            filename: 'data.json',
            contentType: 'application/json'
        }
    },

    // Simple key-value pairs
    username: 'yourUserName'
};

request.post('http://http://mockbin.com/request', {formData: formData}, callback);
```  
This will send your files with a MIME type of `multipart/form-data`, which is a multipart form upload.

While this will be more than sufficient for most users' use-cases, there are times where you need even more fine-grained control, like pre/post CLRFs (new-lines), chunking, or specifying your own multiparts. For more info on these extra options, check out this section of the request [README](https://www.npmjs.com/package/request#multipartrelated).

## Misc. Configurations

There is a lot more to HTTP requests than just specifying a URL and downloading the data. For larger applications, and especially those that have to support a wider range of environments, your requests may need to handle quite a few configuration parameters, like proxies or special SSL trust certificates.

One important misc. feature to point out is the `request.defaults()` method, which lets you specify default parameters so you don't have to give them for every request you make.

```
let req = request.defaults({  
    headers: {
        'x-access-token': '123abc',
        'User-Agent': 'my-reddit-client'
    }
});

req('http://your-api.com', function(err, res, body) {  
    console.log(body);
});
```
Now, in the example above, all requests made with req will always have the headers `x-access-token` and `User-Agent` set. This is ideal for setting headers like these, proxy servers, or TLS/SSL configurations.

Throughout the rest of this section, we'll take a look at some more common features you'll come across:

## Proxies

Whether your computer is behind a corporate proxy or you want to redirect your traffic to another country, at some point you may need to specify a `proxy` address. The simplest way to achieve this is to use the `proxy option`, which takes an address in which the traffic is proxied through:

```
let options = {  
    url: 'https://www.google.com',
    proxy: 'http://myproxy.com'
};

request(options, callback);
```
The  `options` object is one way to specify a proxy, but `request` also uses the following environment variables to configure a proxy connection:

HTTPPROXY / httpproxy

HTTPSPROXY / httpsproxy

NOPROXY / noproxy

This gives you quite a bit more control, like setting which sites shouldn't be proxied via the `NO_PROXY` variable.

## TLS/SSL

Sometimes an API needs to have some extra security and therefore requires a client certificate. This is actually fairly common with private corporate APIs, so it's worth knowing how to do this.

Another possible scenario is that you want your HTTP requests to explicitly trust certain `certificate authorities`, which could include certificates self-signed by you or your company.

As with all of the other configurations we've seen so far, these are set in the  `options` object:

```
const fs = require('fs');  
const request = require('request');

let myCertFile = fs.readFileSync(__dirname + '/ssl/client.crt')  
let myKeyFile = fs.readFileSync(__dirname + '/ssl/client.key')  
let myCaFile = fs.readFileSync(__dirname + '/ssl/ca.cert.pem')

var options = {  
    url: 'https://mockbin.com/request',
    cert: myCertFile,
    key: myKeyFile,
    passphrase: 'myPassword',
    ca: myCaFile
};
request.get(options);
```
## Basic Authentication

Sites that use basic access authentication can still be accessed using the auth option:

```
const request = require('request');
var options = {  
    url: 'https://mockbin.com/request',
    auth: {
        username: 'yourUserName',
        password: 'yourPassword'
    }
};

request.get(options);
```

This option sets one of the HTTP headers as "authorization": "Basic c2NvdHQ6cGFzc3dvcmQh". The 'Basic' string in the 'authorization' header declares this to be a Basic Auth request and the alphanumeric string that follows is a `RFC2045-MIME` encoding (a variant of Base64) of our username and password.

### Redirects

I've found that in some applications, like web scraping, there are quite a few cases where you need to follow redirects in order for your request to be successful. As you probably guessed, there is an option to specify whether to follow redirects by default, but request goes even one step further and will let you provide a function that can be used to conditionally determine if the redirect should be followed.

#### A few of the redirect options are:

followRedirect: If true, then follow all HTTP 3xx redirects. Or submit a function(res) {} that is used to determine whether or not to follow the redirect
followAllRedirects: Follow all non-GET HTTP 3xx redirects
maxRedirects: The maximum number of times to follow chained redirects (defaults to 10)

## Tests using `Mocha` Javascript framework

Tests are written in the Mocha framework. More about Mocha can be found [here](https://mochajs.org/)

Tests are place in `*.js` files in the `/test/specs/` directory. A typical test will look similar to this:

//example.js

```
const request = require('request');

describe('REST API testing using node.js/javascript', function() {
    it('does a get request', function(done) {
        const options = {  
          url: 'https://www.reddit.com/r/funny.json',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
          }
        };

        request(options, function(err, res, body) {  
          let json = JSON.parse(body);
          console.log(json);
          done();
        });
    });
});
```
## Conclusion

No doubt `request` is a powerful module, and likely one that you'll use often. Given all of the features it provides along with `Mocha` JavaScript framework, it can act as a great starting point for `automating anything from a web crawler to a client library for your API`.

## Contribution

Create a fork of the project into your own repository. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it.

## Licensing

MIT
