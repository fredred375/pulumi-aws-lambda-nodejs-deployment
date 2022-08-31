import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const currentStack = pulumi.getStack();

const role = new aws.iam.Role("lambda-express-example-role", {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: "lambda.amazonaws.com",
  }),
  managedPolicyArns: [aws.iam.ManagedPolicies.AWSLambdaBasicExecutionRole],
});

const lambda = new aws.lambda.Function("express-hello", {
  packageType: "Image",
  imageUri:
    process.env.LAMBDA_IMAGE ||
    `233704588990.dkr.ecr.ap-northeast-1.amazonaws.com/lambda-express-example:${process.env.ENV}-latest`,
  role: role.arn,
  timeout: 900,
  publish: true,
});

const lambdaAlias =
  currentStack === "prod-0"
    ? new aws.lambda.Alias("PROD", {
        name: "PROD",
        functionName: lambda.arn,
        functionVersion: process.env.VERSION || process.env.PREV_VERSION!,
      })
    : new aws.lambda.Alias("DEV", {
        name: "DEV",
        functionName: lambda.arn,
        functionVersion: lambda.version,
      });

const lambdaUrl = new aws.lambda.FunctionUrl("lambda-express-url", {
  functionName: lambda.arn,
  authorizationType: "NONE",
  qualifier: lambdaAlias.name,
});

export const url = lambdaUrl.functionUrl;
export const aliasVersion = lambdaAlias.functionVersion;
export const imageTag = process.env.CI_IMAGE_TAG!;
