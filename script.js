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

    function initializeUI() {
        const backButton = document.getElementById('back-button');
        const listButton = document.getElementById('list-button');
        const shareButton = document.getElementById('share-button');
        const episodeOverlay = document.getElementById('episode-overlay');

        backButton.addEventListener('click', () => {
            console.log('뒤로 가기');
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

        loadEpisodes();
    }

    function loadEpisodes() {
        const overlay = document.getElementById('episode-overlay');
        overlay.innerHTML = `
            <button id="overlay-close">&times;</button>
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
                playEpisode(ep.id);
                overlay.style.display = 'none';
            };
            grid.appendChild(item);
        });

        document.getElementById('overlay-close').addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('video-container', {
            height: '100%',
            width: '100%',
            videoId: episodes[0].videoId,
            playerVars: {
                'autoplay': 1,
                'playsinline': 1,
                'controls': 1,
                'loop': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        console.log('Player is ready');
        event.target.playVideo();
        initializeUI();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            playNextEpisode();
        }
    }

    function playNextEpisode() {
        const nextEpisodeId = currentEpisode + 1;
        if (nextEpisodeId <= episodes.length) {
            playEpisode(nextEpisodeId);
        } else {
            console.log("모든 에피소드를 시청했습니다.");
        }
    }

    function playEpisode(id) {
        const episode = episodes.find(ep => ep.id === id);
        if (episode) {
            if (episode.locked) {
                showAdPrompt(id);
            } else {
                player.loadVideoById(episode.videoId);
                document.getElementById('episode-count').textContent = `${id}/10`;
                currentEpisode = id;
            }
        }
    }

    function showAdPrompt(id) {
        const adPrompt = document.createElement('div');
        adPrompt.className = 'ad-prompt';
        adPrompt.innerHTML = `
            <p>에피소드 ${id}를 시청하려면 광고를 봐야 합니다. 광고를 보시겠습니까?</p>
            <button id="ad-confirm">확인</button>
            <button id="ad-cancel">취소</button>
        `;
        document.body.appendChild(adPrompt);

        document.getElementById('ad-confirm').onclick = () => {
            document.body.removeChild(adPrompt);
            playAd(id);
        };
        document.getElementById('ad-cancel').onclick = () => {
            document.body.removeChild(adPrompt);
        };
    }

    function playAd(id) {
        const adOverlay = document.createElement('div');
        adOverlay.className = 'ad-overlay';
        adOverlay.innerHTML = `
            <div class="ad-content">
                <h2>광고 재생 중...</h2>
                <p>5초 후 자동으로 닫힙니다.</p>
            </div>
        `;
        document.body.appendChild(adOverlay);

        setTimeout(() => {
            document.body.removeChild(adOverlay);
            unlockEpisode(id);
            playEpisode(id);
        }, 5000); // 5초 후 광고 종료
    }

    function unlockEpisode(id) {
        const episode = episodes.find(ep => ep.id === id);
        if (episode) {
            episode.locked = false;
        }
    }

    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    document.addEventListener('DOMContentLoaded', loadYouTubeAPI);
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
})();
