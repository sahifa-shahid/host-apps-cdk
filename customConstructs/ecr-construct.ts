import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RemovalPolicy, Duration } from 'aws-cdk-lib';
import { Repository, TagMutability, TagStatus, RepositoryEncryption } from 'aws-cdk-lib/aws-ecr';

export interface ECRProjectRepositoryProps {
  repositoryName: string;
}

export class ECRProjectRepository extends Construct {
  constructor(scope: Construct, id: string, props: ECRProjectRepositoryProps) {
    super(scope, id);

    new Repository(this, "ECRRepository", {
      repositoryName: props.repositoryName,
      removalPolicy:  RemovalPolicy.RETAIN,
      imageTagMutability: TagMutability.MUTABLE,
      lifecycleRules: [{
        description: "Expire previous image tagged 'latest' when new image tagged 'latest' is pushed.",
        rulePriority: 1,
        maxImageCount: 1,
        tagPrefixList: ["latest"]
      }, {
        description: "Remove untagged images after 3 months.",
        rulePriority: 2,
        maxImageAge: Duration.days(90),
        tagStatus: TagStatus.UNTAGGED
      }],
      encryption: RepositoryEncryption.AES_256
    })
  }
}
