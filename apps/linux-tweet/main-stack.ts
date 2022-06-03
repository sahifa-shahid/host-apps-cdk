import { Environment, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppRunnerAsCompute } from '../../customConstructs/app-runner-construct';
import { ECRProjectRepository } from '../../customConstructs/ecr-construct';

const projectConfig = (environment: Environment) => ({
  projectName: "LinuxTweet",
  repositoryName: "linux-tweet-repo",
  environment
})

export class LinuxTweetStickyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new ECRProjectRepository(this, "ECRProjectRepository", projectConfig(props.env!))

  }
}

export class LinuxTweetServiceStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new AppRunnerAsCompute(this, "LinuxTweetInstance", projectConfig(props.env!)) 

  }
}