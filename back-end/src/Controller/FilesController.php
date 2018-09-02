<?php
namespace App\Controller;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Finder\Finder;

class FilesController
{
    private const UPLOAD_DIR = '/var/tmp/kraken_files';

    /**
    * @Post("/files", name="_files")
    */
    public function index(Request $request)
    {
        $file = $request->get('file');
        $filename = $request->get('name');

        $fileInfo = new \SplFileInfo($filename);
        
        try {
            $fileContent = base64_decode($file);
            $fileUploadFilename = self::UPLOAD_DIR . '/' . md5($filename) . '.' . $fileInfo->getExtension();

            file_put_contents(
                $fileUploadFilename,
                $fileContent
            );
        } catch (\Throwable $e) {
            return new JsonResponse(
                [ 'error' => 'Server can not upload this file' ]
            );    
        }

        return new JsonResponse(
            [ 'isUploaded' => true ]
        );
    }

    /**
    * @Get("/files", name="_files_list")
    */
    public function listAction()
    {
        $finder = new Finder();
        $finder->files()->in(self::UPLOAD_DIR);
        $content = array_map(function ($file) {
            return $file->getBasename();
        }, iterator_to_array($finder, false));

        return new JsonResponse([ 'files' => $content ]);
    }
}