<?php
namespace App\Constant;

class FileUploadConstants
{
    public const UPLOAD_DIR = '/var/tmp/kraken_files';
    public const SUPPORTED_FILE_SIZE = 1000000;
    public const SUPPORTED_FILE_TYPE = [
        'image/jpeg',
        'image/png',
        'image/gif'
    ];
}
