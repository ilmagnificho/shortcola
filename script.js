(function() {
    const episodes = [
        { id: '8nGvwQ2Vteo', title: '예고편' },
        { id: '4zU2_2Uf4wE', title: '에피소드 1' },
        { id: 'FFMWzJbo4kk', title: '에피소드 2' },
        { id: 'HI6p94t5XXk', title: '에피소드 3' },
        { id: 'aKAvgA294q4', title: '에피소드 4' },
        { id: 'XNKaaEDbANE', title: '에피소드 5' },
        { id: 'v-wYCAT1I_o', title: '에피소드 6' },
        { id: 'zl_dl4p_Uwc', title: '에피소드 7' },
        { id: 'hfqup-YNCk4', title: '에피소드 8' },
        { id: 'JZsgy56QPSQ', title: '에피소드 9' },
        { id: '4aBaL5TwK-8', title: '에피소드 10' },
        { id: 'PXT5Asxqlpc', title: '에피소드 11' },
        { id: 'MfYAD2xQAns', title: '에피소드 12' },
        { id: '3ZpTJ5LygyI', title: '에피소드 13' },
        { id: 'nRrQRBKiwbE', title: '에피소드 14' },
        { id: 'nawqIEBWazU', title: '에피소드 15' }
    ];

    let currentEpisode = 0;

    function createEpisodeList() {
        const episodeOverlay = document.getElementById('episode-overlay');
        const episodeGrid = document.createElement('div');
        episodeGrid.className = 'episode-grid';

        episodes.forEach((episode, index) => {
            const episodeItem = document.createElement('div');
            episodeItem.className = 'episode-item';
            episodeItem.textContent = episode.title;
            
            if (index > 5) {
                episodeItem.classList.add('locked');
            }

            episodeItem.addEventListener('click', () => {
                if (index <= 5) {
                    playEpisode(index);
                } else {
                    showAdPrompt(index);
                }
            });

            episodeGrid.appendChild(episodeItem);
        });

        episodeOverlay.appendChild(episodeGrid);
    }

    function playEpisode(index) {
        currentEpisode = index;
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${episodes[index].id}" frameborder="0" allowfullscreen></iframe>`;
        updateEpisodeCount();
    }

    function updateEpisodeCount() {
        const episodeCount = document.getElementById('episode-count');
        episodeCount.textContent = `${currentEpisode}/${episodes.length - 1}`;
    }

    function showAdPrompt(index) {
        // 광고 프롬프트 로직 구현
        // ...
    }

    function init() {
        createEpisodeList();
        playEpisode(0);
        // 기타 초기화 로직
        // ...
    }

    window.addEventListener('load', init);
})();
