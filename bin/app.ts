#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { HelloWorldServiceStack, HelloWorldStickyStack } from '../apps/hello-world/main-stack';
import { LinuxTweetServiceStack, LinuxTweetStickyStack } from '../apps/linux-tweet/main-stack';

const props = {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION 
  },
}

const app = new App();

new HelloWorldServiceStack(app, 'HelloWorldServiceStack', props);
new HelloWorldStickyStack(app, 'HelloWorldStickyStack', props);
new LinuxTweetServiceStack(app, 'LinuxTweetServiceStack', props);
new LinuxTweetStickyStack(app, 'LinuxTweetStickyStack', props);
