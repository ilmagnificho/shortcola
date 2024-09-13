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

    let player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('video-container', {
            height: '100%',
            width: '100%',
            videoId: episodes[0].videoId,
            playerVars: {
                'playsinline': 1,
                'controls': 1,
                'autoplay': 0
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        // 플레이어가 준비되면 필요한 작업을 수행할 수 있습니다.
    }

    function playEpisode(id) {
        console.log(`에피소드 ${id} 재생`); // 디버깅용 로그
        const episode = episodes.find(ep => ep.id === id);
        if (episode && player) {
            player.loadVideoById(episode.videoId);
            localStorage.setItem('lastWatchedEpisode', id);
            updateEpisodeCount(id);
            
            // 모든 에피소드 항목의 배경색 초기화
            document.querySelectorAll('.episode-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // 현재 재생 중인 에피소드 배경색 변경
            const currentEpisode = document.querySelector(`.episode-item:nth-child(${id})`);
            if (currentEpisode) {
                currentEpisode.classList.add('active');
            }
        } else {
            console.error(`에피소드 ${id}를 찾을 수 없거나 플레이어가 준비되지 않았습니다.`);
        }
    }

    function playAd(episodeId) {
        const adContainer = document.getElementById('video-container');
        adContainer.innerHTML = `
            <div class="ad-container">
                <h2>광고</h2>
                <p>이 곳에 실제 광고가 표시됩니다.</p>
                <button id="skip-ad" class="btn btn-primary mt-3">5초 후 광고 건너뛰기</button>
            </div>
        `;
        
        let countdown = 5;
        const skipButton = document.getElementById('skip-ad');
        skipButton.disabled = true;
        
        const timer = setInterval(() => {
            countdown--;
            skipButton.textContent = `${countdown}초 후 광고 건너뛰기`;
            if (countdown <= 0) {
                clearInterval(timer);
                skipButton.disabled = false;
                skipButton.textContent = '광고 건너뛰기';
            }
        }, 1000);
        
        skipButton.onclick = () => {
            clearInterval(timer);
            localStorage.setItem(`ad_watched_${episodeId}`, 'true');
            playEpisode(episodeId);
        };
    }

    function updateDramaInfo(title, genre, plot, likeCount, starCount) {
        document.getElementById('drama-title').textContent = title;
        document.getElementById('drama-genre').textContent = genre;
        document.getElementById('drama-plot').textContent = plot;
        document.getElementById('like-count').textContent = likeCount;
        document.getElementById('star-count').textContent = starCount;
    }

    // 페이지 로드 시 실행
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM loaded, updating drama info");
        updateDramaInfo(
            '주인님의 죽음을 위해서', 
            'Genres : 혐관물',
            '선우는 주인님의 죽음을 위해서 필사의 노력을 다하는데!!',
            '100.3k',
            '595.5k'
        );
        loadEpisodes(); // 이 줄이 있는지 확인하세요
        
        // 마지막으로 시청한 에피소드 재생 또는 첫 번째 에피소드 재생
        const lastWatched = localStorage.getItem('lastWatchedEpisode');
        if (lastWatched) {
            playEpisode(parseInt(lastWatched));
        } else {
            playEpisode(1);
        }
        
        const episodeListIcon = document.getElementById('episode-list-icon');
        const episodeOverlay = document.getElementById('episode-overlay');
        const closeOverlay = document.getElementById('close-overlay');

        episodeListIcon.addEventListener('click', () => {
            episodeOverlay.style.display = 'block';
        });

        closeOverlay.addEventListener('click', () => {
            episodeOverlay.style.display = 'none';
        });

        function updateEpisodeCount(currentEpisode) {
            document.getElementById('episode-count').textContent = `${currentEpisode}/10`;
        }

        function playEpisode(id) {
            // ... 기존 코드 ...
            updateEpisodeCount(id);
            episodeOverlay.style.display = 'none';
        }

        // 초기 에피소드 카운트 설정
        updateEpisodeCount(0);
    });

    console.log("script.js loaded and executed");
})();
