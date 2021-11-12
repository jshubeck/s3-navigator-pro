S3 Navigator Pro 
================

An S3 Bucket Browser, not hardwired to AWS S3, suitable for exploring a generic S3 bucket on premesis or as a cloud service.

Based on a fork of https://github.com/juvs/s3-bucket-browser and influenced by the AWS JavaScript S3 Browser.

This script works with off-prem (cloud object storage as a service) or on-prem (cloud object storage as a system).
You can deploy these files on any web server, or in an S3 bucket that supports "Bucket Website".

## Usage

We recommend creating specific a storage account with an access key and secret key with read only access to the bucket. Because
this code is designed for bucket listing (i.e. ListObjects) and GET object, we do not recommend a storage account with read/write access. 

1) Copy all files into your web site. No specific web service is required.

2) Modify the settingS in file "js/config.js" as follows:

	- var AWS_AccessKeyId = ''; //Your credentials for specific user and privileges
	- var AWS_SecretAccessKey = ''; //Your credentials for specific user and privileges
	- var AWS_Region = 'us-east-1'; //Or null region, or region specific to your object storage service
	- var AWS_BucketName = ''; //Highly recommended
	- var AWS_MaxKeys = 500; //How many objects will retrive (include folders and items)
	- var AWS_Prefix = ''; //Stating folder, by default start on root of bucket
	- var AWS_SignedUrl_Expires = 900; //This is the default value for expires getSignedUrl (value in seconds, 15 mins set)
	//Check this parameter in http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
	- var TITLE = 'S3 Navigator Pro';

	**Note:** You can leave the `AccessKeyId` and `SecretAccessKey` as empty strings to avoid exposing AWS credentials publicly. In this case S3 Navigator Pro will prompt the user for credentials via a WEB form.

3) Navigate to s3navpro.html and start browsing...

## Bucket Configuration (recommended, but not always required)

Need to establish this CORS configuration on your bucket to work correctly:
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
Reference: http://docs.aws.amazon.com/IAM/latest/UserGuide/PoliciesOverview.html


## License

Copyright (c) 2021 John Shubeck

Copyright (c) 2017 Juvenal Guzman

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
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Credits

Joseph Chereshnovsky (webdevbyjoss)

Jouni Kaplas (kaplas)

