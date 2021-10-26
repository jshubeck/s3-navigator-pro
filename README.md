S3 Navigator Pro 
================

S3 Bucket Browser, not hardwired to AWS S3, suitable for exploring a generic S3 bucket on premesis or as a cloud service.

Base on a fork of : https://github.com/rgrp/s3-bucket-browser and inspired on the current S3 Browser from Amazon.

Intented for public or private usage, you can deploy this files on any web site, or in an S3 bucket that supports "Bucket Website".

## Usage (under construction)

**Notes** I recommend create specific user or roles to access bucket to browse, then generate their access key, for now this code is intent only for browse, then no need to create a user with other privileges just use ListObjects. Check this link http://docs.aws.amazon.com/IAM/latest/UserGuide/PoliciesOverview.html

1) Copy the files on your web site. Could be based on Apache or IIS.

2) Modify the setting in file js/config.js

	- var AWS_AccessKeyId = ''; //Your credentials for specific user and privileges
	- var AWS_SecretAccessKey = ''; //Your credentials for specific user and privileges
	- var AWS_Region = 'us-east-1';
	- var AWS_BucketName = '';
	- var AWS_MaxKeys = 500; //How many objects will retrive (include folders and items)
	- var AWS_Prefix = ''; //Stating folder, by default start on root of bucket
	- var AWS_SignedUrl_Expires = 900; //This is the default value for expires getSignedUrl (value in seconds, 15 mins set)
	//Check this parameter in http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
	- var TITLE = 'S3 Bucket browser';

	**Notes:** You can leave the `AccessKeyId` and `SecretAccessKey` as empty strings to avoid exposing AWS credentials publicly. 
	In this case the S3 Bucket Browser will prompt user for credentials via WEB form.

3) Navigate to index.html and start browsing...

## Bucket Configuration

Need to establish this CORS configurations on your bucket to works correctly:
```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```
## Copyright and License

Copyright 2017 Juvenal Guzman.

## Contributors

Special thanks to:

Joseph Chereshnovsky (webdevbyjoss)
Jouni Kaplas (kaplas)

## License

Licensed under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


