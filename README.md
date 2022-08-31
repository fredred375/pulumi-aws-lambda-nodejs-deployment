# pulumi-aws-lambda-webapp

Example deploy code for express server on AWS Lambda.

## Development

### Requirements

- Pulumi
- AWS CLI

### Instruction

#### Clone Code

```bash
git clone git@gitlab.com:moxa/ibg/software/platform/cloud/public/examples/nodejs-express-webapp-example/deployments/pulumi-aws-tspulumi-aws-lambda-webapp.git
```

#### Setup Local Environment

```bash
# setup aws cli
aws configure

# setup pulumi
pulumi login
```

#### Deployment

```bash
pulumi up -C deployments/pulumi
```
# pulumi-aws-lambda-nodejs-deployment
