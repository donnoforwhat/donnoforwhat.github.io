const flame = document.getElementById("flame");
const countdownElement = document.getElementById("countdown");
let isBlown = false; // برای اینکه فقط یکبار اجرا شود

/*
کل این یگ سال و خورده یی وقتی که دوستیم؛ تو وافعا وافعا بیشترین دلگرمی من برای همه چی بودی. نمیدونم؛ بیشتر از اینکه دوست دخترم باشی؛
 همیشه فکر میکنم برام یه همزاد کاملا مشابهی، که فقط یه سال ازم بزرگتره :)
مرسی نگار. نه برای این کادوی به شدت خفنی که برام گرفتی.
 برای کل این مدت که کنارت به جای اینکه GiveUP کنم، تو باعث شدی ادامه بدم. برای اینکه هرجا شیفت هام حوصله سربر بود؛ بیدار میموندی و بام حرف میزدی.
 برای اینکه وقتی میخواستم بام بازی کنی، رفتی کلی گشتی موستو پیدا کردی.
 برای وقتی که خودم از خودم عصبی بودم؛ تو گذاشتی پیشت اوپن آپ کنم.
برای هروقت که به جای اینکه میترسم از چیزی، میدونم تهش تو هستی که کمکم باشی.
برای اینکه هروقت ندونم کار درست چیه، با هم نمیدونیم کار درست چیه:)
برای اینکه دستبندم عکس بی دندونه، ولی هربار میبینمش یاد تو میوفتم.
برای اینکه هروقت ناراحتی، میخوام بمیرم از غصه.
برای اینکه هرکاری که کردم رو یادت نرفت.
برای اینکه بهم فضا دادی.
برای اینکه باهام روراست بودی :)
دوستت دارم. نمیدونم بیشتر تو یا کمتر تو؛ ولی هیچکسو بیشتر تو دوست نداشتم.+
 */
async function initMic() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const mic = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        mic.connect(analyser);
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function detectBlow() {
            if (isBlown) return;

            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }
            let average = sum / dataArray.length;

            if (average > 60) {
                flame.classList.add("off");
                isBlown = true;
                startCountdown();
            }
            requestAnimationFrame(detectBlow);
        }
        detectBlow();
    } catch (err) {
        console.error("Microphone access denied or error:", err);
    }
}

function startCountdown() {
    let count = 1;
    countdownElement.innerText = count;

    const interval = setInterval(() => {
        count++;
        if (count <= 3) {
            countdownElement.innerText = count;
        } else {
            clearInterval(interval);
            window.location.href = "nextPage.html";
        }
    }, 1000);
}

initMic();