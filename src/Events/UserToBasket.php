<?php 

namespace App\Events;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Sells;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

Class UserToBasket implements EventSubscriberInterface
{
  public static function getSubscribedEvents()
  {
      // return the subscribed events, their methods and priorities
      return [
        KernelEvents::VIEW => ['userBasket', EventPriorities::PRE_VALIDATE]
    ];
  }

  private $security;

  public function __construct(Security $security)
  {
      // Avoid calling getUser() in the constructor: auth may not
      // be complete yet. Instead, store the entire Security object.
      $this->security = $security;
  }


  public function userBasket(ViewEvent $event){
    $value = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if($value instanceof Sells && $method === "POST"){
      $value->setUserId($this->security->getUser());
    }

  }

}