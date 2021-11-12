// Cloud Object Storage configuration variables
var AWS_Endpoint = '';  //S3 endpoint or leave blank for web form prompt
var AWS_AccessKeyId = '';  // leave this empty for WEB form auth
var AWS_SecretAccessKey = '';  //S3 Secret Aeave this empty for WEB form auth
var AWS_Region = '';  //S3 region or leave blank
var AWS_BucketName = '';  //S3 Bucket name or leave blank for web form prompt

// IBM CLoud Object Storage Service (Example configuration)
//var AWS_Endpoint = 's3.us-south.cloud-object-storage.appdomain.cloud';  //IBM Cloud us-south endpoint
//var AWS_AccessKeyId = '56905f7763064cb6af855651d72ac470';  //Read only access key for the bucket
//var AWS_SecretAccessKey = 'd6e61aa2f93b83f7a505734817fcbe4bdd3546b504f70153';  //Read only secret key for the bucket
//var AWS_Region = 'us-south';  //IBM Cloud protection zone in Dallas
//var AWS_BucketName = 'jrs-shared-201';  //Name of the bucket to explore

var AWS_MaxKeys = 1000; //How many objects to retrieve
var AWS_Prefix = ''; //Stating folder, by default start on root
var AWS_SignedUrl_Expires = 900; //This is the default value for expires getSignedUrl
var TITLE = 'S3 Navigator Pro';
