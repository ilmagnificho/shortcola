(function() {
    const episodes = [
        {id: 1, title: "에피소드 1", videoId: "hfqup-YNCk4", locked: false},
        {id: 2, title: "에피소드 2", videoId: "8nGvwQ2Vteo", locked: false},
        {id: 3, title: "에피소드 3", videoId: "trvOrFO5aUk", locked: false},
        {id: 4, title: "에피소드 4", videoId: "htw1TsXlZ6E", locked: false},
        {id: 5, title: "에피소드 5", videoId: "r1N89xFzSsA", locked: false},
        {id: 6, title: "에피소드 6", videoId: "qll4P2CdCno", locked: true},
        {id: 7, title: "에피소드 7", videoId: "pct2Op9H7F0", locked: true},
        {id: 8, title: "에피소드 8", videoId: "B8WjorPPg1U", locked: true},
        {id: 9, title: "에피소드 9", videoId: "eG7YZ4XvBIQ", locked: true},
        {id: 10, title: "에피소드 10", videoId: "IAmpmai_3yY", locked: true},
    ];

    let currentEpisode = 1;
    let player;

    function loadEpisodes() {
        const overlay = document.getElementById('episode-overlay');
        overlay.innerHTML = `
            <button id="overlay-close">&times;</button>
            <div class="episode-range">
                <span class="active">1-5</span>
                <span>6-10</span>
            </div>
            <div class="episode-grid"></div>
        `;
        const grid = overlay.querySelector('.episode-grid');
        episodes.forEach(ep => {
            const item = document.createElement('div');
            item.className = "episode-item";
            if (ep.locked) {
                item.classList.add('locked');
            }
            item.textContent = ep.id;
            item.onclick = () => {
                if (ep.locked) {
                    unlockEpisode(ep.id);
                } else {
                    playEpisode(ep.id);
                    overlay.style.display = 'none';
                }
            };
            grid.appendChild(item);
        });

        document.getElementById('overlay-close').addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }

    function unlockEpisode(id) {
        console.log(`에피소드 ${id} 광고 재생`);
        
        setTimeout(() => {
            const episode = episodes.find(ep => ep.id === id);
            if (episode) {
                episode.locked = false;
                loadEpisodes();
                playEpisode(id);
            }
        }, 1000);
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            playNextEpisode();
        }
    }

    function playNextEpisode() {
        currentEpisode++;
        if (currentEpisode <= episodes.length) {
            playEpisode(currentEpisode);
        } else {
            console.log("모든 에피소드를 시청했습니다.");
        }
    }

    function playEpisode(id) {
        const episode = episodes.find(ep => ep.id === id);
        if (episode) {
            if (episode.locked) {
                unlockEpisode(id);
                return;
            }
            currentEpisode = id;
            if (player) {
                player.loadVideoById(episode.videoId);
            } else {
                player = new YT.Player('video-container', {
                    height: '100%',
                    width: '100%',
                    videoId: episode.videoId,
                    playerVars: {
                        'autoplay': 1,
                        'playsinline': 1,
                        'controls': 0,
                        'loop': 0
                    },
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
            }
            document.getElementById('episode-count').textContent = `${id}/10`;
        }
    }

    window.onYouTubeIframeAPIReady = function() {
        playEpisode(currentEpisode);
    }

    function initializeUI() {
        loadEpisodes();

        const backButton = document.getElementById('back-button');
        const listButton = document.getElementById('list-button');
        const shareButton = document.getElementById('share-button');
        const episodeOverlay = document.getElementById('episode-overlay');

        backButton.addEventListener('click', () => {
            console.log('뒤로 가기');
            // 여기에 실제 뒤로 가기 로직을 구현하세요
            history.back();
        });

        listButton.addEventListener('click', () => {
            episodeOverlay.style.display = episodeOverlay.style.display === 'block' ? 'none' : 'block';
        });

        shareButton.addEventListener('click', () => {
            const shareUrl = window.location.href;
            const shareTitle = "주인님의 죽음을 위해서";
            
            if (navigator.share) {
                navigator.share({
                    title: shareTitle,
                    url: shareUrl
                }).then(() => {
                    console.log('공유 성공');
                }).catch((error) => {
                    console.log('공유 실패:', error);
                });
            } else {
                prompt("이 링크를 복사하여 공유하세요:", shareUrl);
            }
        });
    }

    // DOMContentLoaded 이벤트를 사용하여 UI 초기화
    document.addEventListener('DOMContentLoaded', initializeUI);
})();
