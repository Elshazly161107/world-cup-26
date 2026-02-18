// switching lang

let title = document.querySelector("title");
let html = document.querySelector("html");
let langBtn = document.getElementById("switch-lang");

langBtn.addEventListener("click", function () {
  fade.classList.add("active");

  setTimeout(() => {
    // html & switch btn

    html.classList.toggle("ar");
    if (html.classList.contains("ar")) {
      title.textContent = "كأس العالم 2026";
      html.setAttribute("lang", "ar");
      html.setAttribute("dir", "rtl");
      langBtn.textContent = "en";
    } else {
      title.textContent = "World Cup 2026";
      html.setAttribute("lang", "en");
      html.setAttribute("dir", "ltr");
      langBtn.textContent = "ar";
    }

    // nav

    navBtns.innerHTML = "";

    for (let i = 0; i < navBtnsArr.length; i++) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      if (html.classList.contains("ar")) {
        a.textContent = navBtnsArr[i].ar;
        a.setAttribute("href", `#${navBtnsArr[i].en.toLowerCase()}`);
      } else {
        a.textContent = navBtnsArr[i].en;
        a.setAttribute("href", `#${navBtnsArr[i].en.toLowerCase()}`);
      }
      li.appendChild(a);
      navBtns.appendChild(li);
    }

    // counter to start

    let spanD = document.querySelector("#days .type");
    let spanH = document.querySelector("#hours .type");
    let spanM = document.querySelector("#minutes .type");
    let spanS = document.querySelector("#seconds .type");
    let counterH1 = document.querySelector(".count-down h1");

    if (html.classList.contains("ar")) {
      spanD.innerHTML = "أيام";
      spanH.innerHTML = "ساعات";
      spanM.innerHTML = "دقائق";
      spanS.innerHTML = "ثواني";
      counterH1.innerHTML = "متبقى لبداية كأس العالم !";
    } else {
      spanD.innerHTML = "day/s";
      spanH.innerHTML = "hour/s";
      spanM.innerHTML = "minute/s";
      spanS.innerHTML = "second/s";
      counterH1.innerHTML = "left to start !";
    }

    // teams home cards

    teamsShow.innerHTML = "";

    let teamsTitle = document.querySelector(".teams .title-wrapper h1");

    if (html.classList.contains("ar")) {
      teamsTitle.textContent = "الفرق";
      for (let i = 0; i < teamsData.length; i++) {
        let card = document.createElement("div");
        card.classList.add("team-card");
        card.innerHTML = `
          <div class="bg" style="background-image: url(${teamsData[i].teamFlag11});"></div>
          <div class="content">
              <h1>${teamsData[i].teamNameAR}</h1>
              <div class="logo">
                  <img src="${teamsData[i].teamLogo}">
              </div>
              <div class="group-num">
                  <h2>المجموعة</h2>
                  <span>${teamsData[i].teamGroupAR}</span>
              </div>
              <div class="info">
                  <div class="qu-times">
                      <h2>المشاركات</h2>
                      <span>${teamsData[i].worldCupAppearances}</span>
                  </div>
                  <div class="win-times">
                      <h2>الألقاب</h2>
                      <span>${teamsData[i].worldCupTitles}</span>
                  </div>
                  <div class="fifa-rank">
                      <h2>تصنيف الفيفا</h2>
                      <span># ${teamsData[i].fifaRank}</span>
                  </div>
              </div>
              <a href="pages/teams-pages.html/${teamsData[i].teamShortName}.html">صفحة الفريق</a>
          </div>`;
        teamsShow.appendChild(card);
      }
    } else {
      teamsTitle.textContent = "teams";
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
    }

    //

    if (html.classList.contains("ar")) {
      scrollLeftBtnTeams = function () {
        teamsShow.scrollBy({ left: 320, behavior: "smooth" });
      };

      scrollRightBtnTeams = function () {
        teamsShow.scrollBy({ left: -320, behavior: "smooth" });
      };
    } else {
      scrollLeftBtnTeams = function () {
        teamsShow.scrollBy({ left: -320, behavior: "smooth" });
      };

      scrollRightBtnTeams = function () {
        teamsShow.scrollBy({ left: 320, behavior: "smooth" });
      };
    }

    // matches home cards

    matchesShow.innerHTML = "";

    let matchesTitle = document.querySelector(".matches .title-wrapper h1");

    if (html.classList.contains("ar")) {
      matchesTitle.textContent = "المباريات";
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
          stadium = "يحدد لاحقا";
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
                      <span>${matchesData[i].teamOneAR}</span>
                  </div>
                  <span class="score">${matchesData[i].teamOneScore}</span>
              </div>
              <div class="team">
                  <div class="info">
                      <img src="${matchesData[i].teamTwoFlag}" alt>
                      <span>${matchesData[i].teamTwoAR}</span>
                  </div>
                  <span class="score">${matchesData[i].teamTwoScore}</span>
              </div>
          </div>
          <span>${stadium}</span>`;
        matchesShow.appendChild(matchCard);
      }
    } else {
      matchesTitle.textContent = "matches";
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
    }

    //

    if (html.classList.contains("ar")) {
      scrollLeftBtnMatches = function () {
        matchesShow.scrollBy({ left: 370, behavior: "smooth" });
      };

      scrollRightBtnMatches = function () {
        matchesShow.scrollBy({ left: -370, behavior: "smooth" });
      };
    } else {
      scrollLeftBtnMatches = function () {
        matchesShow.scrollBy({ left: -370, behavior: "smooth" });
      };

      scrollRightBtnMatches = function () {
        matchesShow.scrollBy({ left: 370, behavior: "smooth" });
      };
    }

    //

    fade.classList.remove("active");
  }, 250);
});
