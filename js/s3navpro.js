//
// Version: 3.16.1.34
// Dated: 10-NOV-2021
// Source: https://github.com/jshubeck/s3-navigator-pro
// Citation: Based on a fork of https://github.com/juvs/s3-bucket-browser
//
var bucket = null;

function listMoreObjects(marker, prefix, countFiles, countFolders) {
	$('#overlay').show();
	$('#status').html('<div id="statusimg"></div>Loading...');

//
// Modified "listObjects" call below to focus on the bucket name (v3.16.34)
// OLD bucket.listObjects({MaxKeys: AWS_MaxKeys, Prefix : prefix, Delimiter : '/' },function (err, data) {
// OLD bucket.listObjects({MaxKeys: AWS_MaxKeys, Marker: marker, Prefix : prefix, Delimiter : '/' },function (err, data) {
// OLD listObjects({Bucket: AWS_BucketName, Prefix: ""}, function(err,data){
// NEW bucket.listObjects({Bucket: AWS_BucketName, MaxKeys: AWS_MaxKeys, Prefix : prefix, Delimiter : '/' },function (err, data) {
//
		bucket.listObjects({Bucket: AWS_BucketName, MaxKeys: AWS_MaxKeys, Marker: marker, Prefix : prefix, Delimiter : '/' },function (err, data) {
		if (err) {
//OLD			$('#status').html('<img src="img/exclamation-red.png"> Could not load objects from S3');
			$('#status').html('<img src="img/exclamation-red.png"> Could not load objects from S3 - ' + err);
			window.alert(err.stack);
		} else {
			var truncated = data.IsTruncated;
			var nextMarker = data.NextMarker;
			$('#moreobjects').remove();
			renderObjects(data.Contents, countFolders, countFiles, prefix, truncated, nextMarker);
		}
		$('#overlay').hide();
	});
}

function listObjects(prefix) {
	$('#overlay').show();
	$('#status').html('<div id="statusimg"></div>Loading...');
	$('#objects').empty();

//
// Modified "listObjects" call below to focus on the bucket name (v3.16.34)
// OLD bucket.listObjects({MaxKeys: AWS_MaxKeys, Prefix : prefix, Delimiter : '/' },function (err, data) {
// NEW bucket.listObjects({Bucket: AWS_BucketName, MaxKeys: AWS_MaxKeys, Prefix : prefix, Delimiter : '/' },function (err, data) {
//
		bucket.listObjects({Bucket: AWS_BucketName, MaxKeys: AWS_MaxKeys, Prefix : prefix, Delimiter : '/' },function (err, data) {

		if (err) {
//OLD			$('#status').html('<img src="img/exclamation-red.png"> Could not load objects from S3');
			$('#status').html('<img src="img/exclamation-red.png"> Could not load objects from S3 - ' + err);

			window.alert(err.stack);
		} else {
			//Load folders...
			//Set breadcrumbs..
			var truncated = data.IsTruncated;
			var nextMarker = data.NextMarker;
			var currentFolder = '<a href="javascript:listObjects(\'\')"><span class="path">root</span></a>';
			var icon = '';
			if  (prefix !== '') {
				currentFolder += '/';
				var folders = prefix.split('/');
				var parent = '';
				var slash = '';
				var topFolder = '';
				for (var i = 0; i < folders.length - 1; i++) {
					if (folders[i] !== '') {
						var path = '';
						parent += slash + folders[i];
						if ( i > 0 ) {
							path = parent;
						} else {
							path = folders[i];
						}
						if ( i !== (folders.length - 2)) { 
							topFolder = path;
						}
						currentFolder += slash + '<a href="javascript:listObjects(\'' + path + '/\')"><span class="path">' + folders[i] + '</span></a>';
						slash = '/';
					}
				}
			}

			if (typeof topFolder != 'undefined') {
				if (topFolder !== '') {
					topFolder += '/';
				}
				icon = '<img src="img/arrow-090.png"/>';
				$('#objects').append('<li><a href="javascript:listObjects(\'' + topFolder + '\')">' + icon + '<span>...</span></a></li>');
			}
//  			$('#breadcrumb').html('Current folder is: ' + currentFolder);  Removed in 3.16.1.34
  			$('#breadcrumb').html('Current bucket: ' + AWS_BucketName + ", Namespace prefix: " + currentFolder);
			//Set folders...
			var countFolders = 0;
			for (var i = 0; i < data.CommonPrefixes.length; i++) {
				var currentPrefix = data.CommonPrefixes[i].Prefix;
				var name = (currentPrefix.replace(prefix, '')).replace('/','');
				icon = '<img src="img/folder-horizontal.png"/>';
				if (prefix !== currentPrefix) {
					countFolders++;
					$('#objects').append('<li><a href="javascript:listObjects(\'' + currentPrefix + '\')">' + icon + '<span>' + name + '</span></a></li>');
				}
			}
			
			renderObjects(data.Contents, countFolders, 0, prefix, truncated, nextMarker);
		}
		$('#overlay').hide();
	});
}

//
// NEW FUNCTION TO RENDER BYTE SIZES (Under Construction)
//
//function bytesToHumanReadable(size) {
//  var i = -1;
//  var units = [' kB', ' MB', ' GB'];
//  do {
//    size = size / 1024;
//    i++;
//  } while (size > 1024);
// return Math.max(size, 0.1).toFixed(1) + units[i];
//}

function renderObjects(contents, countFolders, currentCountFiles, prefix, truncated, nextMarker) {
	//Load files...
	var countFiles = currentCountFiles;
	for (var i = 0; i < contents.length; i++) {
		var key = contents[i].Key;
		var size = Math.ceil(contents[i].Size / 1024);
//		var size = bytesToHumanReadable(size);   (Under construction, not activated)
		var fileName = key.replace(prefix, '');
		var lastModified = contents[i].LastModified.toString();
		icon = '<img src="img/document.png"/>';
		if (prefix !== key) {
			countFiles++;
			var params = {Bucket: 'bucket', Key: 'key'};
			$('#objects').append(
				'<li><a href="javascript:getObject(\'' + key + '\')">' + icon +
				'<span class="size">' + size + 'KB</span>' +
				'<span class="lastModifiedDate">' + lastModified + '  </span>' +
				'<span class="fileName">' + fileName + '</span>' +
				'</a></li>'
			);
		}
	}
	if (truncated) {
		$('#status').html('Loaded: ' + countFolders + ' folder(s), showing ' + countFiles + ' item(s) from S3, <a href="javascript:scrollToBottomListObjects()"><img src="img/arrow-270.png">Go to the bottom of the list to load more items.</a>');
		icon = '<img src="img/plus-circle.png"/>';
		$('#objects').append('<li id="moreobjects"><a href="javascript:listMoreObjects(\'' + nextMarker + '\',\'' + prefix + '\',' + countFiles + ',' + countFolders + ')">' + icon + '<span>Get more items...</span></a></li>');
	} else {
		$('#status').html('Loaded: ' + countFolders + ' folder(s), ' + countFiles + ' item(s) from S3');
	}			
}

function getObject(key) {
	var params = {Bucket: AWS_BucketName, Key: key, Expires: AWS_SignedUrl_Expires};
	var url = bucket.getSignedUrl('getObject', params);
	window.open(url, url);
}

function scrollToBottomListObjects() {
	$('#contents').scrollTop($('#contents').prop("scrollHeight"));
}

function init() {
	$('#headertitle').html(TITLE);
}

//
// Modified to support generic S3 Cloud Object Storage
// https://github.com/jshubeck (v3.16.34 on 10-NOV-2021)
//
function runS3Browser() {
	bucket = new AWS.S3({
									accessKeyId: AWS_AccessKeyId,
									secretAccessKey: AWS_SecretAccessKey,
									endpoint: AWS_Endpoint,
									sslEnabled: false,
									s3ForcePathStyle: true,
									region: AWS_Region
									});
	listObjects(AWS_Prefix);
}

//
// Modified to support generic S3 Cloud Object Storage
// https://github.com/jshubeck (v3.16.34 on 10-NOV-2021)
//
function showLoginForm() {
	$('#overlay').hide();
	$("body").append(
		'<div id="loginForm">' +
		'<h2>S3 Credentials</h2><br />' +
		'<label for="Endpoint">Endpoint:</label> <input id="Endpoint" type="text" name="Endpoint" maxlength="50"><br />' +
		'<label for="AccessKeyId">AccessKeyId:</label> <input id="AccessKeyId" type="text" name="AccessKeyId" maxlength="50"><br />' +
		'<label for="SecretAccessKey">SecretAccessKey:</label> <input id="SecretAccessKey" type="password" name="SecretAccessKey" maxlength="80"><br />' +
		'<label for="BucketName">Bucket:</label> <input id="BucketName" type="text" name="BucketName" maxlength="63"><br /><br />' +
		'<input type="button" value="      Login      " onclick="login()">' +
		'</div>'
	);
}

function login() {
	// validation
	var Endpoint = $('input[name=Endpoint]').val();
	var AccessKeyId = $('input[name=AccessKeyId]').val();
	var SecretAccessKey = $('input[name=SecretAccessKey]').val();
	var BucketName = $('input[name=BucketName]').val();

	if (AccessKeyId === "" || SecretAccessKey === "") {
		return alert('AccessKeyId and SecretAccessKey are required');
	}

	// update config data
	AWS_Endpoint = Endpoint;
	AWS_AccessKeyId = AccessKeyId;
	AWS_SecretAccessKey = SecretAccessKey;
	AWS_BucketName = BucketName;

	$('#loginForm').remove();

	$('#overlay').show();
	runS3Browser()
}

$(document).ready(function() {
	init();

	// if keys are not available from config then ask user to provide those
	if (!AWS_SecretAccessKey) {
		showLoginForm();
	} else {
		runS3Browser();
	}
});
