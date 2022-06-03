import { Environment, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { Service, Source, Cpu, Memory } from '@aws-cdk/aws-apprunner-alpha';
import { Role, PolicyStatement, Effect, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export interface AppRunnerAsComputeProps {
  projectName: string;
  repositoryName: string;
  environment: Environment;
}

export class AppRunnerAsCompute extends Construct {
  constructor(scope: Construct, id: string, props: AppRunnerAsComputeProps) {
    super(scope, id);

    const { account, region } = props.environment

    const accessRole = new Role(this, "AppRunnerAccessRole", {
      roleName: `ApprunnerAccessRole-${props.projectName}`,
      assumedBy: new ServicePrincipal('build.apprunner.amazonaws.com'),
      description: "Allows Apprunner to access AWS resources when deploying the service."
    })

    accessRole.addToPolicy(new PolicyStatement({
      actions: ["ecr:GetAuthorizationToken"],
      effect: Effect.ALLOW,
      resources: ["*"]
    }))

    accessRole.addToPolicy(new PolicyStatement({
      actions: [
        "ecr:DescribeImages",
        "ecr:BatchCheckLayerAvailability",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer" ],
      effect: Effect.ALLOW,
      resources: [`arn:aws:ecr:${region}:${account}:repository/${props.repositoryName}`]
    }))

    new Service(this, 'AppRunnerService', {
      serviceName: props.projectName,
      source: Source.fromEcr({
        imageConfiguration: { port: 80 },
        repository: Repository.fromRepositoryName(this, 'ECRProjectRepo', props.repositoryName),
        tagOrDigest: "latest",
      }),
      cpu: Cpu.ONE_VCPU,
      memory: Memory.TWO_GB,
      accessRole
    });
  }
}