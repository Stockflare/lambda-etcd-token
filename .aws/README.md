# AWS Cloudformation

Launches a Lambda function to retrieve Etcd Tokens

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
