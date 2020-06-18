<?php

namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderUsers implements EventSubscriberInterface{
  
  public static function getSubscribedEvents()
  {
      // return the subscribed events, their methods and priorities
      return [
        KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
    ];
  }

  /**
   * @var UserPasswordEncoderInterface
   */
  private $encoder;

  public function __construct(UserPasswordEncoderInterface $encoder)
  {
      $this->encoder = $encoder;
  }

  public function encodePassword(ViewEvent $event){
    $value = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();
    
    if ($value instanceof User && $method === "POST") {
        $value->setPassword($this->encoder->encodePassword($value, $value->getPassword()));
    }
}

}