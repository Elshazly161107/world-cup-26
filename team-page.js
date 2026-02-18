// ****

let html = document.querySelector("html");
let listData = teamsData;
let mainData;

for (let i = 0; i < 48; i++) {
  if (html.classList.contains(listData[i].teamShortName)) {
    mainData = listData[i];
  }
}

// switching mode

let body = document.body;
let modeBtn = document.getElementById("switch-mode");
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
    } else {
      icon.classList.add("fa-sun");
    }
    modeBtn.appendChild(icon);

    fade.classList.remove("active");
  }, 200);
});

// title

let title = document.querySelector("title");
title.textContent = mainData.teamName.toUpperCase();
let pageIcon = document.querySelector("link[rel='icon']");
pageIcon.setAttribute("href", `/${mainData.teamLogo}`);

// page content

let navBtns = document.querySelector("nav .container ul");

let navBtnsArr = [
  {
    ar: "قائمة الفريق",
    en: "team list",
    id: "team-list",
    statu: "active",
  },
  {
    ar: "المباريات",
    en: "matches",
    id: "team-matches",
    statu: "",
  },
  {
    ar: "الترتيب",
    en: "standing",
    id: "team-group",
    statu: "",
  },
];

for (let i = 0; i < navBtnsArr.length; i++) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  if (navBtnsArr[i].statu !== "") {
    a.classList.add(navBtnsArr[i].statu);
  }
  a.addEventListener("click", function () {
    let tabs = document.querySelectorAll("section .container main");
    tabs.forEach((tab) => tab.classList.remove("active"));

    let links = document.querySelectorAll("nav ul li a");
    links.forEach((link) => link.classList.remove("active"));

    a.classList.add("active");

    document.getElementById(navBtnsArr[i].id).classList.add("active");
  });
  a.textContent = navBtnsArr[i].en;
  li.appendChild(a);
  navBtns.appendChild(li);
}

//

let headerImg = document.querySelector("header .container img");
headerImg.setAttribute("src", `/${mainData.teamLogo}`);
let headerName = document.querySelector("header .container h1");
headerName.textContent = mainData.teamName;

//

let playersShow = document.querySelector(".team-list");

for (let i = 0; i < mainData.teamPlayers.length; i++) {
  let card = document.createElement("div");
  card.classList.add("player-card");
  //
  let playerPic;
  if (
    !mainData.teamPlayers[i].playerImg ||
    mainData.teamPlayers[i].playerImg === ""
  ) {
    playerPic = "/media/PLAYERS/unknown.svg";
  } else {
    playerPic = `/${mainData.teamPlayers[i].playerImg}`;
  }
  //
  let clubPic;
  if (
    !mainData.teamPlayers[i].playerClubLogo ||
    mainData.teamPlayers[i].playerClubLogo === ""
  ) {
    clubPic = "/media/CLUBS/unknown.svg";
  } else {
    clubPic = `/${mainData.teamPlayers[i].playerClubLogo}`;
  }
  //
  let statsAll = mainData.teamPlayers[i].playerStats;
  //
  let matchesAll;
  //
  let goalsAll;
  //
  let assistsAll;
  //
  matchesAll = 0;
  goalsAll = 0;
  assistsAll = 0;
  //
  for (let o = 0; o < statsAll.length; o++) {
    if (Number(statsAll[o].mp) > 0) {
      matchesAll++;
    }
    if (matchesAll > 0) {
      goalsAll += statsAll[o].g;
      assistsAll += statsAll[o].a;
    } else {
      goalsAll = 0;
      assistsAll = 0;
    }
  }
  //
  let trows = ``;
  for (let d = 0; d < statsAll.length; d++) {
    trows += `
    <tr>
      <td><span class="vs">${statsAll[d].vs}</span></td>
      <td><span>${statsAll[d].mp}</span></td>
      <td><span>${statsAll[d].g}</span></td>
      <td><span>${statsAll[d].a}</span></td>
      <td><span>${statsAll[d].yc}</span></td>
      <td><span>${statsAll[d].rc}</span></td>
    </tr>`;
  }
  //
  let goal;
  let assist;
  let minplay;
  let yloCard;
  let redCard;
  //
  goal = 0;
  assist = 0;
  minplay = 0;
  yloCard = 0;
  redCard = 0;
  //
  for (let h = 0; h < statsAll.length; h++) {
    goal += statsAll[h].g;
    assist += statsAll[h].a;
    minplay += statsAll[h].mp;
    yloCard += statsAll[h].yc;
    redCard += statsAll[h].rc;
  }
  //
  card.innerHTML = `
      <div class="image">
        <img src="${playerPic}" alt>
    </div>
    <div class="info">
        <h1 class="name">${mainData.teamPlayers[i].playerName}</h1>
        <div class="pos-num-tem">
            <span>${mainData.teamPlayers[i].playerShortPos}</span>
            <span>#${mainData.teamPlayers[i].playerNum}</span>
            <img
                src="${clubPic}"
                alt title="${mainData.teamPlayers[i].playerClubName}">
        </div>
    </div>
    <div class="small-stat">
        <div>
            <h2>matches</h2>
            <h3>${matchesAll}</h3>
        </div>
        <div>
            <h2>goals</h2>
            <h3>${goalsAll}</h3>
        </div>
        <div>
            <h2>assists</h2>
            <h3>${assistsAll}</h3>
        </div>
    </div>
    <div class="big-stat">
        <table>
            <thead>
                <tr>
                    <td><span>match</span></td>
                    <td><span>minutes played</span></td>
                    <td><span>goals</span></td>
                    <td><span>assists</span></td>
                    <td><span>yellow cards</span><span
                            class="y-card"></span></td>
                    <td><span>red cards</span><span
                            class="r-card"></span></td>
                </tr>
            </thead>
            <tbody>
              ${trows}
            </tbody>
            <thead>
                <tr>
                    <td><span>total</span></td>
                    <td><span>${minplay}</span></td>
                    <td><span>${goal}</span></td>
                    <td><span>${assist}</span></td>
                    <td><span>${yloCard}</span><span
                            class="y-card"></span></td>
                    <td><span>${redCard}</span><span
                            class="r-card"></span></td>
                </tr>
            </thead>
        </table>
    </div>`;
  playersShow.appendChild(card);
}

let playersCards = document.querySelectorAll(".player-card");
playersCards.forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("open");
  });
});
