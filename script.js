<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <title>나는 너, 너는 나</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <!-- 여기에 AdSense 코드를 붙여넣으세요 -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2021850347156633"
     crossorigin="anonymous"></script>
    <meta name="google-adsense-account" content="ca-pub-2021853471956633">
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: Arial, sans-serif;
            background-color: #000;
            color: #FFD700;
        }
        #video-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        #top-bar, #side-buttons {
            position: fixed;
            z-index: 2;
        }
        #top-bar {
            top: 0;
            left: 0;
            right: 0;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #side-buttons {
            right: 10px;
            bottom: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .side-button {
            background: none;
            border: none;
            color: #FFD700;
            font-size: 24px;
            margin: 10px 0;
            cursor: pointer;
        }
        #episode-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            z-index: 1000;
        }
        #close-overlay {
            position: absolute;
            top: 10px;
            right: 10px;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
        .episode-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            padding: 20px;
        }
        .episode-item {
            background: #333;
            color: white;
            padding: 10px;
            text-align: center;
            cursor: pointer;
        }
        .episode-item.locked {
            opacity: 0.5;
        }
        #overlay-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: #FFD700;
            font-size: 24px;
            cursor: pointer;
        }
        #back-button, #episode-count {
            color: #FFD700;
            font-size: 18px;
        }
        .ad-prompt, .ad-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .ad-content {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        #ad-confirm, #ad-cancel {
            margin: 10px;
            padding: 5px 10px;
            cursor: pointer;
            background-color: #FFD700;
            color: #000;
            border: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div id="video-container"></div>
    <div id="top-bar">
        <button id="back-button"><i class="fas fa-arrow-left"></i></button>
        <div id="episode-count">0/15</div>
    </div>
    <div id="side-buttons">
        <button id="list-button" class="side-button"><i class="fas fa-list"></i></button>
        <button id="share-button" class="side-button"><i class="fas fa-share"></i></button>
    </div>
    <div id="episode-overlay">
        <div id="close-overlay">&times;</div>
        <div class="episode-grid"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
