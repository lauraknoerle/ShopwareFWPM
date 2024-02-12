<?php

class Shopware_Plugins_Frontend_VoiceSearchIntegration_Bootstrap extends Shopware_Components_Plugin_Bootstrap
{
    // Gibt den Anzeigenamen des Plugins zurück.
    
    public function getLabel()
    {
        return 'Voice Search Integration';
    }

    //Gibt die aktuelle Version des Plugins zurück.
    public function getVersion()
    {
        return '1.0.0';
    }

    //Installationsmethode des Plugins.
    
    public function install()
    {
        // Registriere deine Frontend-Ressourcen
        $this->subscribeEvent(
            'Enlight_Controller_Action_PostDispatchSecure_Frontend',
            'onFrontendPostDispatch'
        );

        // Rückgabe-Array für die Installationsroutine
        return ['success' => true, 'invalidateCache' => ['frontend']];
    }

    /**
     * Event-Handler für den Frontend-PostDispatch.
     * Wird aufgerufen, wenn eine Frontend-Action beendet wurde.
     */
    public function onFrontendPostDispatch(Enlight_Event_EventArgs $args)
    {
        /** @var Shopware_Controllers_Frontend_Index $controller */
        $controller = $args->getSubject();
        $view = $controller->View();

        // Füge das Verzeichnis für unsere Plugin-Templates zum Shopware-Template-Stack hinzu
        $view->addTemplateDir($this->Path() . 'Views/');

        // Füge unsere JS- und CSS-Dateien hinzu
        $view->extendsTemplate('frontend/plugins/yourpluginname/voiceSearch.js');
        $view->extendsTemplate('frontend/plugins/yourpluginname/styles.css');
    }
}
