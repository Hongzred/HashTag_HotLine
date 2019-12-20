# <center>HashTag HotLine</center>

## Table of Contents  
[Introduction](#headers) 
[Usage & Core Features](#core)
[Installation](#install) 

<a name="introduction"/>
## Introduction

HashTag Hotline is an online, location-based communications application for NGO's in the [Global South](https://en.wikipedia.org/wiki/Global_South).  The idea is simple: during emergencies,  disaster victims [already turn to Twitter](https://blog.twitter.com/en_in/a/2016/twitter-for-crisis-and-disaster-relief-in.html) to report emergencies during hurricanes, earthquakes, and other natural disasters. Hastag Hotline is a purpose-built  twitter client for NGO's  that helps them easily locate problems using location data, and  keep constant communication with victims over twitter.

![[speed output image]](images/ezgif-1-22fae63c1f7c.gif)

<a name="core"/>
## Usage & Core Features

The project is hosted [here](https://master.d2nb81n0vt6kb5.amplifyapp.com/). We present a brief overview of our core features in this readme; for additional information, refer to the [user documentation](https://master.d2nb81n0vt6kb5.amplifyapp.com/feed) within the application itself.

### Map, Feed, Filter


<a name="install"/>
## Installation

After cloning this repository, reach out to one of the project maintainers, who should provide you with the following necessary configuration and keyfiles. All files, except the IAM credentials file,  should be copied into the directories in which they belong. The contents of the IAM credentials file will just be copy-pasted during the amplify setup process. Here are the files you should receive:
- an `aws-exports` file, which belongs in `/src/aws-exports`
- a `.env` file that belongs in the root folder of this project.
- a credentials file with an IAM username, access key, secret key id which you will copy and paste into the  terminal in the amplify setup section.

To install the project for yourself, you'll need a node development server. Install node with one of the installers listed [here](https://nodejs.org/en/download/). After that, you'll need to install and configure the [AWS Amplify Framework](https://aws.amazon.com/amplify/framework/).

### Amplify Setup

1. First, globally install the amplify command line utiltiy using `npm`, which comes with any node installation. 
   ```
   npm install -g @aws-amplify/cli
   ```

2. After amplify is installed
   
   - run `amplify configure` 
   - select your region (in our case, `us-east-1`) 
   - input the credentials (username, access key, secret key id) that have been provided to you by other project maintainers into the terminal.
   run 

3. Now, run `amplify init` and select the `development` environment;  this is the environment.

4. Finally run `amplify env pull` to ensure you have the right environmental settings on your local machine. 

### Start the server
After Amplify has been set up, you can finally start the development server. Before beginning, however, make sure that you have the latest chagnes from the github repo by running `git pull`. Also, make sure your node packages are up-to-date by running `npm install` in the root of the project directory. Finally, you can run `npm start` and the application should be accessible in the browser at url `localhost://3000.


