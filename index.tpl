{extends file="parent:backend/system/view/main.tpl"}
    <!-- Das Template erweitert ein anderes Template Backend von Shopware befindet. -->

{block name="backend/system/view/main"}
    <!-- Dieser Block definiert den Hauptabschnitt des Templates für die Backend-Seite. -->
    
    {block name="backend/system/config/view/form"}
        <!-- Innerhalb des Hauptblocks wird ein weiterer Block definiert, der für die Konfigurationsformularansicht im Backend zuständig ist. -->
        
        {include file="backend/voice_search_integration/config/view/form.js"}
        <!-- Hier wird eine JavaScript-Datei aus dem Verzeichnis eingefügt.  -->
    {/block}

    {block name="backend/system/config/view/main"}
        <!-- Ein weiterer Block wird definiert, um die Hauptstruktur der Backend-Seite zu erstellen. -->
        <div class="page-container">
            <div class="page">
                <div class="content">
                    {block name="backend/system/config/view/form"}
                        <!-- Hier wird erneut der Block für die Konfigurationsformularansicht geöffnet, und die JS-Datei eingefügt. -->
                        {include file="backend/voice_search_integration/config/view/form.js"}
                    {/block}
                </div>
            </div>
        </div>
    {/block}
{/block}
