<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CollectionRepository")
 * @ApiResource(
 *  normalizationContext={"groups"={"collection_read"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={"title": "exact"})
 */
class Collection
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"collection_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"collection_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="array")
     * @Groups({"collection_read"})
     */
    private $productList = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getProductList(): ?array
    {
        return $this->productList;
    }

    public function setProductList(array $productList): self
    {
        $this->productList = $productList;

        return $this;
    }
}
