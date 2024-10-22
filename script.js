// script.js

document.addEventListener("DOMContentLoaded", function () {
    console.log('The script is running');

    // Global variables
    let currentChapter = 0;
    let currentLanguage = 'en'; // Default language: English

    // Check if 'chapters' is defined
    if (typeof chapters === 'undefined') {
        console.error('The chapters array is not defined. Please ensure that chapters.js is correctly included.');
        return;
    }

    // DOM element selections
    const chapterTitle = document.getElementById("chapterTitle");
    const chapterText = document.getElementById("chapterText");
    const nextChapterButton = document.getElementById("nextChapter");
    const languageButton = document.getElementById("languageButton");
    const commandmentsTitle = document.getElementById("commandmentsTitle");
    const commandmentsList = document.getElementById("commandmentsList");

    // Function to display a chapter
    function showChapter(chapter) {
        if (!chapter || !chapter.title || !chapter.text) {
            console.error('The chapter is invalid:', chapter);
            return;
        }
        chapterTitle.textContent = chapter.title[currentLanguage];
        chapterText.textContent = chapter.text[currentLanguage];
    }

    // Function for page-turning effect
    function turnPage() {
        const pageTurn = document.createElement("div");
        pageTurn.id = "pageTurn";
        document.body.appendChild(pageTurn);
        setTimeout(() => {
            document.body.removeChild(pageTurn);
        }, 1000);
    }

    // Handle "Next Chapter" button click
    nextChapterButton.addEventListener("click", function () {
        if (currentChapter < chapters.length - 1) {
            currentChapter++; // Increment chapter
            turnPage();
            setTimeout(() => {
                showChapter(chapters[currentChapter]);
            }, 1000);
        } else if (currentChapter === chapters.length - 1) {
            // Display the epilogue
            currentChapter++;
            turnPage();
            setTimeout(() => {
                chapterTitle.textContent = currentLanguage === 'en' ? "Epilogue" : "尾声";
                chapterText.textContent = epilogue[currentLanguage];
                nextChapterButton.disabled = true; // Disable the button after the epilogue
            }, 1000);
        } else {
            alert(currentLanguage === 'en' ? "You have reached the end of the story!" : "您已到达故事的结尾！");
        }
    });

    // Handle language change button click
    languageButton.addEventListener("click", function () {
        currentLanguage = currentLanguage === 'en' ? 'zh' : 'en'; // Toggle between 'en' and 'zh'
        if (currentChapter < chapters.length) {
            showChapter(chapters[currentChapter]);
        } else if (currentChapter === chapters.length) {
            chapterTitle.textContent = currentLanguage === 'en' ? "Epilogue" : "尾声";
            chapterText.textContent = epilogue[currentLanguage];
        }
        updateBackgroundMusic();
        updateNextChapterButton();
        updateMainTitle();
        updateCopyAlertMessage();
        updateCommandments();
    });

    // Function to update background music
    function updateBackgroundMusic() {
        const backgroundMusic = document.getElementById("backgroundMusic");
        backgroundMusic.pause(); // Stop the current music
        if (currentLanguage === 'en') {
            backgroundMusic.src = "story_en.mp3";
        } else {
            backgroundMusic.src = "story_zh.mp3";
        }
        backgroundMusic.load(); // Reload the audio player
        backgroundMusic.play(); // Play the new music
    }

    // Function to update the "Next Chapter" button text
    function updateNextChapterButton() {
        nextChapterButton.textContent = currentLanguage === 'en' ? 'Next Chapter' : '下一章';
    }

    // Function to update the main title
    function updateMainTitle() {
        const mainTitle = document.querySelector('h1.typing-effect');
        mainTitle.textContent = currentLanguage === 'en' ? 'The Book of Solana' : '索拉纳之书';
    }

    // Function to update the copy alert message
    function updateCopyAlertMessage() {
        copyAlertMessage = currentLanguage === 'en' ? " copied to clipboard!" : " 已复制到剪贴板！";
    }

    // Handle copy button
    let copyAlertMessage = currentLanguage === 'en' ? " copied to clipboard!" : " 已复制到剪贴板！";

    document.getElementById("copyButton").addEventListener("click", function() {
        const code = document.getElementById("code").textContent;
        navigator.clipboard.writeText(code)
            .then(() => {
                alert(code + copyAlertMessage);
            })
            .catch(err => {
                console.error("Error:", err);
            });
    });

    // The 10 Commandments in English and Chinese
    const commandmentsEn = [
        "Thou shall NOT jeet for peanuts.",
        "Thou shall NOT say where is the Dev.",
        "Thou shall NOT buy Bitcoin.",
        "Thou shall Pump $BOSOL",
        "Thou shall create memes for the holy $BOSOL community.",
        "Thou shall accumulate $BOSOL into one Billion Mc.",
        "Thou shall only pump $BOSOL.",
        "Thou shall always have faith in $BOSOL",
        "Thou shall always be active in $BOSOL community",
        "Thou shall always stay loyal to SOL"
    ];

    const commandmentsZh = [
        "你不应该为小钱抛售。",
        "你不应该问开发者在哪里。",
        "你不应该购买比特币。",
        "你应该推动 $BOSOL。",
        "你应该为神圣的 $BOSOL 社区创造表情包。",
        "你应该积累 $BOSOL 直到市值十亿。",
        "你只应该推动 $BOSOL。",
        "你应该始终对 $BOSOL 保持信心。",
        "你应该始终活跃在 $BOSOL 社区。",
        "你应该始终忠于 SOL。"
    ];

    // Function to display the commandments
    function displayCommandments() {
        // Update the commandments title
        if (currentLanguage === 'en') {
            commandmentsTitle.textContent = "The 10 Commandments of $BOSOL";
        } else if (currentLanguage === 'zh') {
            commandmentsTitle.textContent = "$BOSOL的十诫";
        }

        // Clear the current list
        commandmentsList.innerHTML = "";

        // Select the commandments based on the current language
        let commandmentsToDisplay = currentLanguage === 'en' ? commandmentsEn : commandmentsZh;

        // Populate the list
        commandmentsToDisplay.forEach((commandment) => {
            const li = document.createElement("li");
            li.textContent = commandment;
            commandmentsList.appendChild(li);
        });
    }

    // Function to update the commandments when language changes
    function updateCommandments() {
        displayCommandments();
    }

    // Icons to display
    const icons = [
        'images/icon1.png',
        'images/icon2.png',
        'images/icon3.png',
        'images/icon4.png',
        'images/icon5.png',
        'images/icon6.png',
        'images/icon7.png',
        'images/icon8.png'
        // Add more icons if necessary
    ];

    // Check if the icons can be loaded
    icons.forEach(function(src) {
        const imgTest = new Image();
        imgTest.src = src;
        imgTest.onerror = function() {
            console.error('The icon cannot be loaded:', src);
        };
    });

    // Function to create a floating icon
    function createFloatingIcon(src) {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'floating-icon';

        // Icon size
        const iconSize = 50; // Adjust according to your icons
        img.style.width = iconSize + 'px';
        img.style.height = iconSize + 'px';

        // Initial random position within the window
        let currentTop = Math.random() * (window.innerHeight - iconSize);
        let currentLeft = Math.random() * (window.innerWidth - iconSize);
        img.style.top = currentTop + 'px';
        img.style.left = currentLeft + 'px';
        img.style.position = 'fixed';

        // Add the icon to the body
        document.body.appendChild(img);

        // Random speed and direction
        let deltaX = (Math.random() * 2 - 1) * 2; // Horizontal speed
        let deltaY = (Math.random() * 2 - 1) * 2; // Vertical speed

        // Icon movement
        function moveIcon() {
            currentTop += deltaY;
            currentLeft += deltaX;

            // Bounce off edges
            if (currentTop <= 0 || currentTop >= window.innerHeight - iconSize) {
                deltaY *= -1; // Reverse vertical direction
            }
            if (currentLeft <= 0 || currentLeft >= window.innerWidth - iconSize) {
                deltaX *= -1; // Reverse horizontal direction
            }

            // Update position
            img.style.top = currentTop + 'px';
            img.style.left = currentLeft + 'px';

            requestAnimationFrame(moveIcon);
        }

        moveIcon();
    }

    // Create multiple floating icons
    for (let i = 0; i < 10; i++) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        createFloatingIcon(randomIcon);
    }

    // Initialization
    showChapter(chapters[0]);
    updateNextChapterButton();
    updateMainTitle();
    updateBackgroundMusic();
    updateCopyAlertMessage();
    updateCommandments(); // Initialize commandments in the correct language
});
