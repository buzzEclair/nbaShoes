<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Stock;
use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    
    private $encoder;
    
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }
    
    // ...
    public function load(ObjectManager $manager)
    {

        $picturesID = ["trdk1R0F3tg", "164_6wVEHfI", "j1GiPlvSGWI", "DMl5gG0yWWY", "updW-QUccFE", "VJIL_YZrpyQ", "cOJgO4Zzs-w", "ad047kyPBh8", "KvRy5S8hKPw", "-fhcpPYjf3g", "by5NImY0VHI", "GSwMQzHUEXk", "pu-PgXMI30I", "AZf7DL-8Qhk", "7CNNyPREfxc", "l8p1aWZqHvE", "ZC2dxuOQy9c", "UwnvYQg-oYE", "aDZ5YIuedQg", "wmdcUQ0CJ4c", "wz_eb7K2Ip8", "0UCGfN2qtrs", "JzJSybPFb3s", "rA2k3A24tOc", "l76tzNZhsok", "0dLJWa40dqM", "b2uYNpBG7Ho", "dII8zRTK6lo", "SoabJuHqlh0", "Mjen77Q2yyk"];

        $faker = Factory::create();   
        $userAdmin = new User();
        $userAdmin->setEmail('email@email1.fr')->setPassword('password')->setRoles(['ROLE_ADMIN']);
        
        $password = $this->encoder->encodePassword($userAdmin, 'password');
        $userAdmin->setPassword($password);

        $manager->persist($userAdmin);
        $user = new User();
        $user->setEmail('email@email2.fr')->setPassword('password')->setRoles(['ROLE_USER']);
        
        $password = $this->encoder->encodePassword($user, 'password');
        $user->setPassword($password);

        $manager->persist($user);
        
        for ($i=0; $i < 30; $i++) { 

            $product = new Product();
            $product
                ->setName("Nike - ". $faker->word())
                ->setPrice($faker->numberBetween($min = 120, $max = 250))
                ->setResume($faker->paragraph($nbSentences = 4, $variableNbSentences = true))
                ->setPictures([$picturesID[$i]])
                ;

                $manager->persist($product);

                for ($j=0; $j < 5; $j++) { 
                    $stock = new Stock();
                    $stock
                    ->setSize(strval(40+$j))
                    ->setQuantity($faker->numberBetween($min = 50, $max = 1000))
                    ->setProductId($product)
                    ;
                    $manager->persist($stock);

                }
            
            }
            
            $manager->flush();
        }



}
