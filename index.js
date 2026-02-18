// switching mode

let body = document.body;
let modeBtn = document.getElementById("switch-mode");
let WCLOGO = document.querySelector("header .container img");
let fade = document.querySelector(".theme-fade");
let currentMood = "dark";

modeBtn.addEventListener("click", function () {
  fade.classList.add("active");

  setTimeout(function () {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
      currentMood = "light";
    } else {
      currentMood = "dark";
    }

    modeBtn.innerHTML = "";
    let icon = document.createElement("i");
    icon.classList.add("fa-solid");

    if (currentMood === "light") {
      icon.classList.add("fa-moon");
      WCLOGO.setAttribute("src", "media/WORLDCUPLOGO/LOGO1.svg");
    } else {
      icon.classList.add("fa-sun");
      WCLOGO.setAttribute("src", "media/WORLDCUPLOGO/LOGO3.svg");
    }
    modeBtn.appendChild(icon);

    fade.classList.remove("active");
  }, 200);
});

// page content

let navBtns = document.querySelector("nav .container ul");

let navBtnsArr = [
  {
    ar: "الفرق",
    en: "teams",
  },
  {
    ar: "المباريات",
    en: "matches",
  },
  {
    ar: "المجموعات",
    en: "groups",
  },
  {
    ar: "الملاعب",
    en: "venues",
  },
];

for (let i = 0; i < navBtnsArr.length; i++) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.textContent = navBtnsArr[i].en;
  a.setAttribute("href", `#${navBtnsArr[i].en.toLowerCase()}`);
  li.appendChild(a);
  navBtns.appendChild(li);
}

// count down

// 1. جلب العناصر مرة واحدة خارج التكرار
const countDownD = document.querySelector("#days .the-num");
const countDownH = document.querySelector("#hours .the-num");
const countDownM = document.querySelector("#minutes .the-num");
const countDownS = document.querySelector("#seconds .the-num");

// 2. تحديد التاريخ بصيغة ISO مع حرف Z لضمان توقيت غرينتش
const launchDate = new Date("2026-06-11T20:00:00Z").getTime();

// 3. تعريف دالة الأنيميشن خارجاً
function updateWithAnim(element, value) {
  let formattedValue = value < 10 ? "0" + value : value;
  if (element.textContent !== String(formattedValue)) {
    element.textContent = formattedValue;
    element.classList.remove("flip");
    void element.offsetWidth; // لإعادة تشغيل الأنيميشن
    element.classList.add("flip");
  }
}

let counting = setInterval(() => {
  const now = new Date().getTime(); // "الآن" بتوقيت المستخدم المحلي
  const distance = launchDate - now;

  if (distance < 0) {
    clearInterval(counting);
    document.querySelector(".the-watch").innerHTML = "IT'S SHOWTIME! ⚽";
    return;
  }

  // حسابات الوقت
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  updateWithAnim(countDownD, d);
  updateWithAnim(countDownH, h);
  updateWithAnim(countDownM, m);
  updateWithAnim(countDownS, s);
}, 1000);

// teams home cards

let teamsShow = document.querySelector(".teams .teams-show");

for (let i = 0; i < teamsData.length; i++) {
  let card = document.createElement("div");
  card.classList.add("team-card");
  card.innerHTML = `
    <div class="bg" style="background-image: url(${teamsData[i].teamFlag11});"></div>
    <div class="content">
        <h1>${teamsData[i].teamName}</h1>
        <div class="logo">
            <img src="${teamsData[i].teamLogo}">
        </div>
        <div class="group-num">
            <h2>group</h2>
            <span>${teamsData[i].teamGroup}</span>
        </div>
        <div class="info">
            <div class="qu-times">
                <h2>appearances</h2>
                <span>${teamsData[i].worldCupAppearances}</span>
            </div>
            <div class="win-times">
                <h2>world cup titles</h2>
                <span>${teamsData[i].worldCupTitles}</span>
            </div>
            <div class="fifa-rank">
                <h2>fifa rank</h2>
                <span># ${teamsData[i].fifaRank}</span>
            </div>
        </div>
        <a href="pages/teams-pages.html/${teamsData[i].teamShortName}.html">team profile</a>
    </div>`;
  teamsShow.appendChild(card);
}

let scrollLeftBtnTeams = function () {
  teamsShow.scrollBy({ left: -320, behavior: "smooth" });
};

let scrollRightBtnTeams = function () {
  teamsShow.scrollBy({ left: 320, behavior: "smooth" });
};

// matches home cards

let matchesShow = document.querySelector(".matches-show");

for (let i = 0; i < matchesData.length; i++) {
  let matchCard = document.createElement("div");
  matchCard.classList.add("match-card");
  if (
    matchesData[i].teamOne === "mexico" ||
    matchesData[i].teamTwo === "mexico"
  ) {
    matchCard.classList.add("mexico");
  } else if (
    matchesData[i].teamOne === "canada" ||
    matchesData[i].teamTwo === "canada"
  ) {
    matchCard.classList.add("canada");
  } else if (
    matchesData[i].teamOne === "united stats" ||
    matchesData[i].teamTwo === "united stats"
  ) {
    matchCard.classList.add("united-stats");
  }

  let dateObj = new Date(matchesData[i].timestamp);

  let formattedDate = dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });

  let formattedTime = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let stadium;
  if (
    matchesData[i].place &&
    matchesData[i].place[0].length > 0 &&
    matchesData[i].place[1].length > 0
  ) {
    stadium = matchesData[i].place.join(" | ");
  } else {
    stadium = "Later";
  }
  matchCard.innerHTML = `
    <div class="info">
        <div class="date">${formattedDate}</div>
        <div class="time">${formattedTime}</div>
    </div>
    <div class="content">
        <div class="team">
            <div class="info">
                <img src="${matchesData[i].teamOneFlag}" alt>
                <span>${matchesData[i].teamOne}</span>
            </div>
            <span class="score">${matchesData[i].teamOneScore}</span>
        </div>
        <div class="team">
            <div class="info">
                <img src="${matchesData[i].teamTwoFlag}" alt>
                <span>${matchesData[i].teamTwo}</span>
            </div>
            <span class="score">${matchesData[i].teamTwoScore}</span>
        </div>
    </div>
    <span>${stadium}</span>`;
  matchesShow.appendChild(matchCard);
}

let scrollLeftBtnMatches = function () {
  matchesShow.scrollBy({ left: -370, behavior: "smooth" });
};

let scrollRightBtnMatches = function () {
  matchesShow.scrollBy({ left: 370, behavior: "smooth" });
};
