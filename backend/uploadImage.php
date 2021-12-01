<?php
	
	// Run:$ composer require aws/aws-sdk-php
	require 'vendor/autoload.php';
	
	use Aws\S3\S3Client;
	use Aws\S3\Exception\S3Exception;

	// AWS Info
	$bucketName = 'ride4boybucket';
	$IAM_KEY = 'AKIASAF4PYI3PMBV764R';
	$IAM_SECRET = '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';

	// Connect to AWS
	try {
		
		$s3 = S3Client::factory(
			array(
				'credentials' => array(
					'key' => $IAM_KEY,
					'secret' => $IAM_SECRET
				),
				'version' => 'latest',
				'region'  => 'us-east-2'
			)
		);
	} catch (Exception $e) {
		
		die("Error: " . $e->getMessage());
	}

	
	// For this, I would generate a unqiue random string for the key name. 
	$keyName = 'object1' . basename($_FILES["fileToUpload"]['name']);
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
				'ACL' => 'public-read' //this this on public read
			)
		);
        $imageUrl = $result['ObjectURL']; //<--returned image url

	} catch (S3Exception $e) {
		die('Error:' . $e->getMessage());
	} catch (Exception $e) {
		die('Error:' . $e->getMessage());
	}


	echo 'Done';
    echo $imageUrl;

	
?>