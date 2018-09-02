<?php
namespace App\Controller;

use App\Entity\File;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Filesystem\Filesystem;

class FilesController extends AbstractController
{
    private const UPLOAD_DIR = '/var/tmp/kraken_files';
    private const SUPPORTED_FILE_SIZE = 1000000;
    private const SUPPORTED_FILE_TYPE = [
        'image/jpeg',
        'image/png',
        'image/gif'
    ];

    private function isSupportedFileType(string $mimeType)
    {
        return in_array($mimeType, self::SUPPORTED_FILE_TYPE);
    }

    private function isSupportedFileSize(string $size)
    {
        return $size <= self::SUPPORTED_FILE_SIZE;
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

    /**
    * @Post("/files", name="_files")
    */
    public function uploadAction(Request $request)
    {
        $file = $request->get('file');
        $filename = $request->get('name');

        $fileInfo = new \SplFileInfo($filename);
        $hash = md5($filename);
        $fileUploadFilename = '/' . md5($filename) . '.' . $fileInfo->getExtension();

        $entityManager = $this->getDoctrine()->getManager();
        $fileRepository = $entityManager->getRepository(File::class);

        $fileEntityExisting = $fileRepository->findAllByHash($hash);
        if ($fileEntityExisting) {
            return new JsonResponse(
                [
                    'errors' => [
                        [
                            'code' => 'DUPLICATE_FILE',
                            'title' => 'File you trying to upload already exists on server'
                        ]
                    ]
                ],
                500
            );
        }

        $fileEntity = new File();
        $fileEntity->setName($filename);
        $fileEntity->setHash($hash);
        $fileEntity->setPath($fileUploadFilename);
        // if we would have userId then we would need to also connect file
        // record to the userId

        $entityManager->persist($fileEntity);
        $entityManager->flush();

        $fileId = $fileEntity->getId();
        
        try {
            $fileContent = base64_decode($file);

            $mime_type = $this->getFileMimeType($fileContent);
            $this->isSupportedFileType($mime_type);
            $size = $this->getFileSize($fileContent);
            $this->isSupportedFileSize($size);

            file_put_contents(
                self::UPLOAD_DIR . $fileUploadFilename,
                $fileContent
            );
        } catch (\Throwable $e) {
            return new JsonResponse(
                [
                    'errors' => [
                        [
                            'code' => 'SERVER_CAN_NOT_PROCESS_FILE',
                            'title' => 'Server can not upload this file'
                        ]
                    ]
                ],
                500
            );
        }

        return new JsonResponse(
            [
                'data' => [ 
                    'id' => $fileId,
                    'name' => $filename,
                ]
            ]
        );
    }

    /**
    * @Get("/files", name="_files_list")
    */
    public function listAction()
    {
        $fileRepository = $this->getDoctrine()->getRepository(File::class);
        $files = $fileRepository->findAllNotDeleted();

        $result = array_map(function ($file) {
            return [
                'id' => $file->getId(),
                'name' => $file->getName(),
            ];
        }, $files);

        return new JsonResponse([ 'data' => $result ]);
    }

    /**
    * @Delete("/files/{id}", name="_files_delete")
    */
    public function deleteAction(int $id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $fileRepository = $entityManager->getRepository(File::class);

        // if we would have userId then we would find file by userId and id
        $fileEntity = $fileRepository->find($id);

        if (!$fileEntity) {
            return new JsonResponse([ 'data' => null ], 404);    
        }

        $fileEntity->setDeleted(true);
        $entityManager->flush();

        $fileSystem = new Filesystem();
        $fileSystem->remove(self::UPLOAD_DIR . $fileEntity->getPath());

        return new JsonResponse(
            [
                'data' => [ 
                    'id' => $fileEntity->getId(),
                    'name' => $fileEntity->getName(),
                ]
            ]
        );
    }
}