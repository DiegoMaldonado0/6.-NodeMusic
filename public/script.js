document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchBtn').onclick = async function() {
        const query = document.getElementById('query').value;
        const response = await fetch(`/search/${query}`);
        const data = await response.json();

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        // Asegúrate de que estás iterando sobre los resultados correctamente
        if (Array.isArray(data)) {
            data.forEach(track => {
                const trackElement = document.createElement('div');
                trackElement.classList.add('track');
                trackElement.innerHTML = `
                    <h3>${track.title}</h3>
                    <p>Artista: <a href="${track.artist.link}" target="_blank">${track.artist.name}</a></p>
                    <img src="${track.album.cover_medium}" alt="${track.album.title}" />
                    <audio preload="auto" src="${track.preview}" id="audio-${track.id}"></audio>
                `;
                
                trackElement.onmouseenter = function() {
                    const audio = document.getElementById(`audio-${track.id}`);
                    audio.play();
                };
                
                trackElement.onmouseleave = function() {
                    const audio = document.getElementById(`audio-${track.id}`);
                    audio.pause();
                    audio.currentTime = 0; // Reiniciar el audio
                };

                resultsDiv.appendChild(trackElement);
            });
        } else {
            // Si no es un array, puedes manejarlo como un solo resultado
            const track = data; // Suponiendo que solo recibes un objeto
            const trackElement = document.createElement('div');
            trackElement.classList.add('track');
            trackElement.innerHTML = `
                <div class="track-info">
                    <h3>${track.title}</h3>
                    <p>Artista: <a href="${track.artist.link}" target="_blank">${track.artist.name}</a></p>
                </div>
                <img src="${track.album.cover_medium}" alt="${track.album.title}" />
                <audio preload="auto" src="${track.preview}" id="audio-${track.id}"></audio>
            `;
            
            resultsDiv.appendChild(trackElement);
        }
    };
});
