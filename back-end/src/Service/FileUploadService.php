<?php
namespace App\Service;

use App\Constant\FileUploadConstants;
use App\Exception\WrongFileTypeException;
use App\Exception\WrongFileSizeException;
use Symfony\Component\Filesystem\Filesystem;

class FileUploadService
{
    private function isSupportedFileType(string $mimeType)
    {
        return in_array($mimeType, FileUploadConstants::SUPPORTED_FILE_TYPE);
    }

    private function isSupportedFileSize(string $size)
    {
        return $size <= FileUploadConstants::SUPPORTED_FILE_SIZE;
    }

    private function getFileSize(string $fileContent) {
        return strlen($fileContent);
    }

    private function getFileMimeType(string $fileContent)
    {
        $f = finfo_open();
        $mime_type = finfo_buffer($f, $fileContent, FILEINFO_MIME_TYPE);
        return $mime_type;
    }

    public function uploadFile(string $fileName, string $contentBase64)
    {
        $fileContent = base64_decode($contentBase64);

        $mime_type = $this->getFileMimeType($fileContent);
        if (!$this->isSupportedFileType($mime_type))
        {
            throw new WrongFileTypeException();
        }

        $size = $this->getFileSize($fileContent);
        if (!$this->isSupportedFileSize($size))
        {
            throw new WrongFileSizeException();
        }

        file_put_contents(
            FileUploadConstants::UPLOAD_DIR . $fileName,
            $fileContent
        );
    }

    public function removeFile (string $filePath)
    {
        $fileSystem = new Filesystem();
        $fileSystem->remove(FileUploadConstants::UPLOAD_DIR . $filePath);
    }
}