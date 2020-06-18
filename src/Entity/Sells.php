<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SellsRepository")
 * @ApiResource(
 *  normalizationContext={"groups"={"sells_read"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={"userId": "exact"})
 */
class Sells
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"sells_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="sells")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"sells_read"})
     */
    private $userId;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"sells_read"})
     */
    private $amount;

    /**
     * @ORM\Column(type="array")
     * @Groups({"sells_read"})
     */
    private $products = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?User
    {
        return $this->userId;
    }

    public function setUserId(?User $userId): self
    {
        $this->userId = $userId;

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getProducts(): ?array
    {
        return $this->products;
    }

    public function setProducts(array $products): self
    {
        $this->products = $products;

        return $this;
    }
}
