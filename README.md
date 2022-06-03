## Hosting Apps with Custom CDK Resources

This is a github repository that allows small dockerized applications to be deployed using custom cdk constructs.

The following links are 2 docker images from DockerHub hosted on App Runner instances using the cdk constructs.

https://zn4png9mpd.us-east-1.awsapprunner.com/
(credits to [crccheck](https://hub.docker.com/r/crccheck/hello-world/) for the docker image)

https://qbvrtihtap.us-east-1.awsapprunner.com/
(credits to [yeasy](https://hub.docker.com/r/yeasy/simple-web/) for the docker image)


### Want to test drive or deploy an image to your own AWS account?

1. Clone the repository on your local machine
2. Run `npm i` to install all dependencies
3. Ensure you have the AWS CLI and AWS CDK installed with the correct credentials. More details for that can be found [here.](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)
4. Run `cdk deploy HelloWorldStickyStack` to deploy a private ECR repository to store and pull docker images
5. Follow the instructions under the "View Push Commands" button in AWS ECR to push images to your ECR repository. 
NOTE: the image must be configured to run on PORT 80. 
6. Run `cdk deploy HelloWorldServiceStack` to deploy an App Runner instance

Voila! Your app is now hosted on AWS.
