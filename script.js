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
        videoContainer.innerHTML = `<iframe id="youtube-player" width="100%" height="100%" src="https://www.youtube.com/embed/${episodes[index].id}?enablejsapi=1" frameborder="0" allowfullscreen></iframe>`;
        updateEpisodeCount();

        // YouTube API를 사용하여 자동 재생 설정
        const player = new YT.Player('youtube-player', {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function updateEpisodeCount() {
        const episodeCount = document.getElementById('episode-count');
        episodeCount.textContent = `${currentEpisode}/${episodes.length - 1}`;
    }

    function showAdPrompt(index) {
        // 광고 프롬프트 로직 구현
        // ...
    }

    function addButtonListeners() {
        const backButton = document.getElementById('back-button');
        const listButton = document.getElementById('list-button');
        const shareButton = document.getElementById('share-button');

        backButton.addEventListener('click', () => {
            // 이전 페이지로 이동
            window.history.back();
        });

        listButton.addEventListener('click', () => {
            // 에피소드 목록 오버레이 토글
            const episodeOverlay = document.getElementById('episode-overlay');
            episodeOverlay.style.display = episodeOverlay.style.display === 'none' ? 'block' : 'none';
        });

        shareButton.addEventListener('click', () => {
            // 공유 기능 구현
            if (navigator.share) {
                navigator.share({
                    title: '나는 너, 너는 나',
                    text: `에피소드 ${currentEpisode} 보기`,
                    url: window.location.href
                }).then(() => {
                    console.log('공유 성공');
                }).catch((error) => {
                    console.log('공유 실패:', error);
                });
            } else {
                alert('공유 기능을 지원하지 않는 브라우저입니다.');
            }
        });
    }

    function setupAutoplay() {
        const videoContainer = document.getElementById('video-container');
        videoContainer.addEventListener('ended', () => {
            if (currentEpisode < episodes.length - 1) {
                playEpisode(currentEpisode + 1);
            }
        });
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            if (currentEpisode < episodes.length - 1) {
                playEpisode(currentEpisode + 1);
            }
        }
    }

    function init() {
        createEpisodeList();
        addButtonListeners();
        setupAutoplay();
        playEpisode(0);
        // YouTube API 로드
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.addEventListener('load', init);
})();
