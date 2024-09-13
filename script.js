(function() {
    const episodes = [
        {id: 1, title: "에피소드 1", videoId: "hfqup-YNCk4"},
        {id: 2, title: "에피소드 2", videoId: "VIDEO_ID_2"},
        {id: 3, title: "에피소드 3", videoId: "VIDEO_ID_3"},
        {id: 4, title: "에피소드 4", videoId: "VIDEO_ID_4"},
        {id: 5, title: "에피소드 5", videoId: "VIDEO_ID_5"},
        {id: 6, title: "에피소드 6 (광고)", videoId: "VIDEO_ID_6"},
        {id: 7, title: "에피소드 7 (광고)", videoId: "VIDEO_ID_7"},
        {id: 8, title: "에피소드 8 (광고)", videoId: "VIDEO_ID_8"},
        {id: 9, title: "에피소드 9 (광고)", videoId: "VIDEO_ID_9"},
        {id: 10, title: "에피소드 10 (광고)", videoId: "VIDEO_ID_10"},
    ];

    function loadEpisodes() {
        const grid = document.getElementById('episode-grid');
        grid.innerHTML = ''; // 기존 내용을 초기화합니다.
        episodes.forEach(ep => {
            const item = document.createElement('div');
            item.className = "episode-item";
            if (ep.id > 5) {
                item.classList.add('locked');
            }
            item.innerHTML = `${ep.id}`;
            item.onclick = () => playEpisode(ep.id);
            grid.appendChild(item);
        });
        
        // 초기 메시지 표시
        document.getElementById('video-container').innerHTML = '<p class="text-center">에피소드를 선택하세요</p>';
    }

    function playEpisode(id) {
        console.log(`에피소드 ${id} 재생`); // 디버깅용 로그
        if (id > 5 && !localStorage.getItem(`ad_watched_${id}`)) {
            playAd(id);
        } else {
            const episode = episodes.find(ep => ep.id === id);
            if (episode) {
                document.getElementById('video-container').innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${episode.videoId}" frameborder="0" allowfullscreen></iframe>
                `;
                localStorage.setItem('lastWatchedEpisode', id);
                
                // 모든 에피소드 항목의 배경색 초기화
                document.querySelectorAll('.episode-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // 현재 재생 중인 에피소드 배경색 변경
                const currentEpisode = document.querySelector(`.episode-item:nth-child(${id})`);
                if (currentEpisode) {
                    currentEpisode.classList.add('active');
                }
            }
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
        loadEpisodes();
        
        // 마지막으로 시청한 에피소드 재생 또는 첫 번째 에피소드 재생
        const lastWatched = localStorage.getItem('lastWatchedEpisode');
        if (lastWatched) {
            playEpisode(parseInt(lastWatched));
        } else {
            playEpisode(1);
        }
    });

    console.log("script.js loaded and executed");
})();
