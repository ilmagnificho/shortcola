(function() {
    const episodes = [
        {id: 1, title: "에피소드 1", videoId: "hfqup-YNCk4"},
        {id: 2, title: "에피소드 2", videoId: "8nGvwQ2Vteo"},
        {id: 3, title: "에피소드 3", videoId: "trvOrFO5aUk"},
        {id: 4, title: "에피소드 4", videoId: "htw1TsXlZ6E"},
        {id: 5, title: "에피소드 5", videoId: "r1N89xFzSsA"},
        {id: 6, title: "에피소드 6", videoId: "qll4P2CdCno"},
        {id: 7, title: "에피소드 7", videoId: "pct2Op9H7F0"},
        {id: 8, title: "에피소드 8", videoId: "B8WjorPPg1U"},
        {id: 9, title: "에피소드 9", videoId: "eG7YZ4XvBIQ"},
        {id: 10, title: "에피소드 10", videoId: "IAmpmai_3yY"},
    ];

    function updateDramaInfo(title, genre, plot) {
        document.getElementById('drama-title').textContent = title;
        document.getElementById('drama-genre').textContent = genre;
        document.getElementById('drama-plot').textContent = plot;
    }

    function loadEpisodes() {
        const overlay = document.getElementById('episode-overlay');
        overlay.innerHTML = ''; // Clear existing content
        episodes.forEach(ep => {
            const item = document.createElement('div');
            item.className = "episode-item";
            if (ep.id > 5) {
                item.classList.add('locked');
            }
            item.textContent = `에피소드 ${ep.id}`;
            item.onclick = () => {
                playEpisode(ep.id);
                overlay.style.display = 'none';
            };
            overlay.appendChild(item);
        });
    }

    function playEpisode(id) {
        const episode = episodes.find(ep => ep.id === id);
        if (episode) {
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${episode.videoId}?autoplay=1&playsinline=1&controls=0&loop=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            `;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        updateDramaInfo(
            '주인님의 죽음을 위해서', 
            'Genres : 혐관물',
            '선우는 주인님의 죽음을 위해서 필사의 노력을 다하는데!!'
        );
        loadEpisodes();
        playEpisode(1);

        const listButton = document.getElementById('list-button');
        const episodeOverlay = document.getElementById('episode-overlay');

        listButton.addEventListener('click', () => {
            episodeOverlay.style.display = episodeOverlay.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (e.target !== listButton && !episodeOverlay.contains(e.target)) {
                episodeOverlay.style.display = 'none';
            }
        });
    });
})();
