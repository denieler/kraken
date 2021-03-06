<?php

namespace App\Repository;

use App\Entity\File;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method File|null find($id, $lockMode = null, $lockVersion = null)
 * @method File|null findOneBy(array $criteria, array $orderBy = null)
 * @method File[]    findAll()
 * @method File[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FileRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, File::class);
    }

    /**
     * @return File[] Returns an array of File objects
     */
    public function findAllNotDeleted()
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.deleted IS NULL')
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @return File[] Returns an array of File objects
     */
    public function findAllByHash($hash)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.hash = :hash')
            ->andWhere('f.deleted IS NULL')
            ->setParameter('hash', $hash)
            ->getQuery()
            ->getResult()
        ;
    }
}
