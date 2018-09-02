<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\FileRepository")
 */
class File
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $hash;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $path;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $deleted;

    private static function getFileExtension(string $fileName)
    {
        $fileInfo = new \SplFileInfo($fileName);
        return $fileInfo->getExtension();
    }

    private static function getHashName(string $fileName)
    {
        return md5($fileName);
    }

    private static function generateRandomFileName(string $fileName)
    {
        $hash = File::getHashName($fileName);
        return $hash . '.' . File::getFileExtension($fileName);
    }

    public static function createFromUploadFile(string $fileName): self
    {
        $uploadingFileHash = File::getHashName($fileName);
        $uploadingFileName = '/' . File::generateRandomFileName($fileName);

        $fileEntity = new File();
        $fileEntity->setName($fileName);
        $fileEntity->setHash($uploadingFileHash);
        $fileEntity->setPath($uploadingFileName);
        // if we would have userId then we would need to also connect file
        // record to the userId

        return $fileEntity;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getHash(): ?string
    {
        return $this->hash;
    }

    public function setHash(string $hash): self
    {
        $this->hash = $hash;

        return $this;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(?string $path): self
    {
        $this->path = $path;

        return $this;
    }

    public function getDeleted(): ?bool
    {
        return $this->deleted;
    }

    public function setDeleted(?bool $deleted): self
    {
        $this->deleted = $deleted;

        return $this;
    }
}
