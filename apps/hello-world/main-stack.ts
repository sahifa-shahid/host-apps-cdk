import { Environment, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppRunnerAsCompute } from '../../customConstructs/app-runner-construct';
import { ECRProjectRepository } from '../../customConstructs/ecr-construct';

const projectConfig = (environment: Environment) => ({
  projectName: "HelloWorld",
  repositoryName: "hello-world-repo",
  environment
})

export class HelloWorldStickyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new ECRProjectRepository(this, "ECRRepository", projectConfig(props.env!))

  }
}

export class HelloWorldServiceStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new AppRunnerAsCompute(this, "AppRunnerInstance", projectConfig(props.env!)) 

  }
}