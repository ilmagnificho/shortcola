(function() {
    const episodes = [
        { id: '8nGvwQ2Vteo', title: '0' },
        { id: '4zU2_2Uf4wE', title: '1' },
        { id: 'FFMWzJbo4kk', title: '2' },
        { id: 'HI6p94t5XXk', title: '3' },
        { id: 'aKAvgA294q4', title: '4' },
        { id: 'XNKaaEDbANE', title: '5' },
        { id: 'v-wYCAT1I_o', title: '6' },
        { id: 'zl_dl4p_Uwc', title: '7' },
        { id: 'hfqup-YNCk4', title: '8' },
        { id: 'JZsgy56QPSQ', title: '9' },
        { id: '4aBaL5TwK-8', title: '10' },
        { id: 'PXT5Asxqlpc', title: '11' },
        { id: 'MfYAD2xQAns', title: '12' },
        { id: '3ZpTJ5LygyI', title: '13' },
        { id: 'nRrQRBKiwbE', title: '14' },
        { id: 'nawqIEBWazU', title: '15' }
    ];

    let currentEpisode = 0;

    function createEpisodeList() {
        const episodeGrid = document.querySelector('.episode-grid');
        episodeGrid.innerHTML = '';

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
                    toggleEpisodeOverlay();
                } else {
                    showAdPrompt(index);
                }
            });

            episodeGrid.appendChild(episodeItem);
        });
    }

    function toggleEpisodeOverlay() {
        const episodeOverlay = document.getElementById('episode-overlay');
        episodeOverlay.style.display = episodeOverlay.style.display === 'none' ? 'block' : 'none';
    }

    function playEpisode(index) {
        currentEpisode = index;
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = `<div id="youtube-player"></div>`;
        updateEpisodeCount();

        new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: episodes[index].id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
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
        const closeOverlayButton = document.getElementById('close-overlay');

        if (backButton) {
            backButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                window.history.back();
            });
        }

        if (listButton) {
            listButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                toggleEpisodeOverlay();
            });
        }

        if (shareButton) {
            shareButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
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

        if (closeOverlayButton) {
            closeOverlayButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                toggleEpisodeOverlay();
            });
        }
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
        playEpisode(0);

        // 모바일에서 더블탭 줌 방지
        document.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false });

        // 모바일에서 핀치 줌 방지
        document.addEventListener('touchmove', function(event) {
            if (event.scale !== 1) {
                event.preventDefault();
            }
        }, { passive: false });
    }

    // YouTube API 로드
    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = function() {
        init();
    };

    loadYouTubeAPI();
})();
