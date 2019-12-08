# HashTag_HotLine
 A general-purpose public reporting platform


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

After cloning this repository, reach out to one of the project maintainers, who should provide you with the following necessary configuration and keyfiles. All files, except the IAM credentials file,  should be copied into the directories in which they belong. The contents of the IAM credentials file will just be copy-pasted during the amplify setup process. Here are the files you should receive:
	- an `aws-exports` file, which belongs in `/src/aws-exports`
	- a `.env` file that belongs in the root folder.
	- a credentials file with an IAM username, access key, secret key id for setting up amplify.

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


