# AWS Cloudformation

Launches a Lambda function to retrieve Etcd Tokens.

### Requirements

At Stockflare, we test & deploy via Drone. The Drone configuration for this repository creates an asset for us inside an S3 Resources Bucket specific to the build environment. *If you're looking at this and not from Stockflare, basically the Cloudformation expects a resource at the following location:*

`s3://<S3Bucket>.s3.amazonaws.com/lambda/<FunctionPackage>_<FunctionVersion>.zip`

### Dependencies

This cloudformation has no other dependencies.

---

### Parameters

Should be configured from the appropriate configuration file within this folder.

| Parameter       | Default | Description                                                          |
|-----------------|---------|----------------------------------------------------------------------|
| FunctionPackage | `null`  | Prefix of the package name residing within the resources S3 bucket.  |
| FunctionVersion | `null`  | Package key suffix of the version that will be deployed to lambda.   |
| S3Bucket | `null` | The S3 Bucket with the code inside, in the same region as the Cloudformation |
