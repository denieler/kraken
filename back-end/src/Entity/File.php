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
     * @ORM\Column(type="string", length=255)
     */
    private $salt;

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

    private static function generateSalt()
    {
        return random_bytes(16);
    }

    private static function getHashName(string $fileName, string $salt)
    {
        return md5($fileName . $salt);
    }

    private static function generateRandomFileName(string $fileName, string $salt)
    {
        $hash = File::getHashName($fileName, $salt);
        return $hash . '.' . File::getFileExtension($fileName);
    }

    public static function createFromUploadFile(string $fileName): self
    {
        $salt = File::generateSalt();
        $uploadingFileHash = File::getHashName($fileName, $salt);
        $uploadingFileName = '/' . File::generateRandomFileName($fileName, $salt);

        $fileEntity = new File();
        $fileEntity->setName($fileName);
        $fileEntity->setHash($uploadingFileHash);
        $fileEntity->setSalt($salt);
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

    public function getSalt(): ?string
    {
        return $this->salt;
    }

    public function setSalt(string $salt): self
    {
        $this->salt = $salt;

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
