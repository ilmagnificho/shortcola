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

    function updateDramaInfo(title, genre, plot, likeCount, starCount) {
        document.getElementById('drama-title').textContent = title;
        document.getElementById('drama-genre').textContent = genre;
        document.getElementById('drama-plot').textContent = plot;
        document.getElementById('like-count').textContent = likeCount;
        document.getElementById('star-count').textContent = starCount;
    }

    function loadEpisodes() {
        const overlay = document.getElementById('episode-overlay');
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
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${episode.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            `;
            document.getElementById('episode-count').textContent = `${id}/10`;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        updateDramaInfo(
            '주인님의 죽음을 위해서', 
            'Genres : 혐관물',
            '선우는 주인님의 죽음을 위해서 필사의 노력을 다하는데!!',
            '100.3k',
            '595.5k'
        );
        loadEpisodes();
        playEpisode(1);

        const episodeListButton = document.getElementById('episode-list-button');
        const episodeOverlay = document.getElementById('episode-overlay');

        episodeListButton.addEventListener('click', () => {
            episodeOverlay.style.display = 'block';
        });

        episodeOverlay.addEventListener('click', (e) => {
            if (e.target === episodeOverlay) {
                episodeOverlay.style.display = 'none';
            }
        });
    });
})();
