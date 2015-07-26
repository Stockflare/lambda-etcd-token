# Etcd Token

| Staging | Production |
|:-:|:-:|
|[![Build Status](http://drone.stocktio.com/api/badge/github.com/Stockflare/lambda-etcd-token/status.svg?branch=master)](http://drone.stocktio.com/github.com/Stockflare/lambda-etcd-token)| --- |

At Stockflare, we use CoreOS for everything. We find ourselves launching and tearing down clusters all the time. After launching the *Nth* cluster, it becomes a bit tedious having to *think* about retrieving a new Etcd token.

This lambda function is designed to integrate with AWS Cloudformations, enabling you to forget about the burden of retrieving a token. *"Ahh, bliss."*

After launching this cloudformation, you can integrate a token into your Cloudformation with a resource similar to the one below:

**Note:** The parameter `RetrieveEtcdTokenArn` has been declared elsewhere in the template. Or in our case, we use the [launcher gem](http://github.com/Stockflare/launcher) to automatically discover it.

```
"EtcdToken": {
  "Type": "Custom::RetrieveEtcdToken",
  "Properties": {
    "ServiceToken": { "Ref" : "RetrieveEtcdTokenArn" }
  }
}
```

Easily retrieve your token like:

```
{ "Fn::GetAtt": [ "EtcdToken", "Token" ] }
```
