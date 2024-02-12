// Funktion zum Starten der Sprachsuche
function startVoiceSearch() {
    // Prüfen, ob der Browser die Web Speech API unterstützt
    if ('webkitSpeechRecognition' in window) {
        // Rufe die API-Schlüssel sicher aus dem Shopware-Backend ab
        const apiKey = Shopware.ConfigReader.get('YourPluginName', 'google_api_key');
        const projectId = Shopware.ConfigReader.get('YourPluginName', 'google_project_id');
        const clientEmail = Shopware.ConfigReader.get('YourPluginName', 'google_client_email');
        const privateKey = Shopware.ConfigReader.get('YourPluginName', 'google_private_key');

        // Initialisiere die Google Cloud Speech Recognition-Instanz
        const recognition = new google.cloud.speech.SpeechRecognition({
            apiKey: apiKey,
            projectId: projectId,
            clientEmail: clientEmail,
            privateKey: privateKey,
            // Weitere Konfigurationsoptionen hier
        });

        // Konfiguriere die Spracherkennungsoptionen
        recognition.continuous = false;
        recognition.interimResults = true;

        // Event-Handler für den Start der Spracherkennung
        recognition.onstart = function() {
            document.getElementById('voiceSearchButton').classList.add('listening');
        };

        // Event-Handler für Fehler während der Spracherkennung
        recognition.onerror = function(event) {
            console.error('Voice recognition error:', event);
            document.getElementById('voiceSearchButton').classList.remove('listening');
        };

        // Event-Handler für das Ende der Spracherkennung
        recognition.onend = function() {
            document.getElementById('voiceSearchButton').classList.remove('listening');
        };

        // Event-Handler für die Ergebnisse der Spracherkennung
        recognition.onresult = function(event) {
            var final_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                }
            }

            // Hier können Sie die Transkription an Ihren Server senden
            sendTranscriptionToServer(final_transcript.trim());
        };

        // Starte die Spracherkennung
        recognition.start();
    } else {
        // Informiere den Benutzer, dass der Browser die Sprachsuche nicht unterstützt
        alert('Sorry, your browser does not support voice search.');
    }
}

// Funktion zum Senden der Transkription an Ihren Server
function sendTranscriptionToServer(transcription) {
    // Rufe die Server-URL sicher aus dem Backend ab (falls erforderlich)
    const serverUrl = 'https://your-server-endpoint.com'; // Ersetzen Sie dies durch Ihre Server-URL

    // Sende die Transkription an den Server mit der Fetch API
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transcription: transcription })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Verarbeite die Antwort vom Server, wenn nötig
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}
