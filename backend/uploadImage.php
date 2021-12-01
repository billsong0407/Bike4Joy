<?php
	
	// RUN:$ composer require aws/aws-sdk-php <---(Run this in the folder where this file is located)
	// vendor folder should be generated, autoload.php file should be in the vendor folder
	require 'vendor/autoload.php';
	
	use Aws\S3\S3Client;
	use Aws\S3\Exception\S3Exception;

	// AWS Info
	$bucketName = '';
	$IAM_KEY = '';
	$IAM_SECRET = '';

	// Connect to AWS
	try {
		
		$s3 = S3Client::factory(
			array(
				'credentials' => array(
					'key' => $IAM_KEY,
					'secret' => $IAM_SECRET
				),
				'version' => 'latest',
				//change region if doesnt work
				'region'  => 'us-east-2'
			)
		);
	} catch (Exception $e) {
		
		die("Error: " . $e->getMessage());
	}

	//keyName could be set to anything
	$keyName = 'object1' . basename($_FILES["fileToUpload"]['name']);
	//change region if doesnt work
	$pathInS3 = 'https://s3.us-east-2.amazonaws.com/' . $bucketName . '/' . $keyName;

	// Add it to S3
	try {
		// Uploaded:
		$file = $_FILES["fileToUpload"]['tmp_name'];

		$result = $s3->putObject(
			array(
				'Bucket'=>$bucketName,
				'Key' =>  $keyName,
				'SourceFile' => $file,
				//this this on public read
				'ACL' => 'public-read' 
			)
		);
        $imageUrl = $result['ObjectURL']; //<--returned image url

		//catch errors
	} catch (S3Exception $e) {
		die('Error:' . $e->getMessage());
	} catch (Exception $e) {
		die('Error:' . $e->getMessage());
	}


	echo 'Done ';
    echo $imageUrl;

	
?>