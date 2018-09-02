<?php
namespace App\Controller;

use App\Constant\FileUploadConstants;
use App\Entity\File;
use App\Exception\WrongFileTypeException;
use App\Exception\WrongFileSizeException;
use App\Service\FileUploadService;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Put;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Finder\Finder;

class FilesController extends AbstractController
{
    private $fileUploadService;

    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
    }

    /**
    * @Put("/files", name="_files")
    */
    public function uploadAction(Request $request)
    {
        $fileContentBase64 = $request->get('content');
        $fileName = $request->get('name');

        $fileEntity = File::createFromUploadFile($fileName);

        $entityManager = $this->getDoctrine()->getManager();
        $fileRepository = $entityManager->getRepository(File::class);

        $fileEntityExisting = $fileRepository->findAllByHash($fileEntity->getHash());
        // if we would have userId then we would need to check that there are no
        // file with the same hash existing already for this userId
        if ($fileEntityExisting)
        {
            return new JsonResponse([
                'errors' => [
                    [
                        'code' => 'DUPLICATE_FILE',
                        'title' => 'File you trying to upload already exists on server'
                    ]
                ]
            ], 500);
        }

        try {
            $this->fileUploadService->uploadFile($fileEntity->getPath(), $fileContentBase64);

            $entityManager->persist($fileEntity);
            $entityManager->flush();
        } catch (WrongFileTypeException $e) {
            return new JsonResponse([
                'errors' => [
                    [
                        'code' => 'SERVER_CAN_NOT_PROCESS_FILE_TYPE',
                        'title' => 'Server can not upload this type of files'
                    ]
                ]
            ], 500);
        } catch (WrongFileSizeException $e) {
            return new JsonResponse([
                'errors' => [
                    [
                        'code' => 'SERVER_CAN_NOT_PROCESS_FILE_SIZE',
                        'title' => 'File size is way too big. Please upload another file'
                    ]
                ]
            ], 500);
        } catch (\Throwable $e) {
            return new JsonResponse([
                'errors' => [
                    [
                        'code' => 'SERVER_CAN_NOT_PROCESS_FILE',
                        'title' => 'Server can not upload this file'
                    ]
                ]
            ], 500);
        }

        $fileId = $fileEntity->getId();
        return new JsonResponse(
            [
                'data' => [ 
                    'id' => $fileId,
                    'name' => $fileEntity->getName(),
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
        // if we would have userId there we should find all not deleted
        // for userId obviously
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

        try {
            $this->fileUploadService->removeFile($fileEntity->getPath());

            $fileEntity->setDeleted(true);
            $entityManager->flush();
        } catch (\Throwable $e) {
            return new JsonResponse([
                'errors' => [
                    [
                        'code' => 'FILE_HAS_NOT_BEEN_REMOVED',
                        'title' => 'File has not been removed'
                    ]
                ]
            ], 500);
        }

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