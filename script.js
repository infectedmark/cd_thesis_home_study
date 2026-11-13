/* =====================================================================
 * WHERE HOME HAPPENS / 完整交互脚本
 *
 * 阅读顺序：
 * 1. I18N：界面中英文字典。
 * 2. SOURCES / CASES：资料来源与六个研究案例；新增内容主要改这里。
 * 3. state：当前阅读案例和滚动状态。
 * 4. render 函数：把数据转换成 HTML。
 * 5. 事件：弹窗与水平循环滚动。
 *
 * 不使用 fetch / ES module，所以通过 file:// 打开也能读取全部本地数据。
 * innerHTML 只接收下面的本地资料，动态文字均通过 escapeHTML 转义。
 * 如果以后接入用户输入或远程 CMS，仍应使用可靠的 HTML 清理方案。
 * ===================================================================== */
"use strict";
(() => {
  // 01 / UI 字典。数组第 1 项英文、第 2 项中文，t() 根据当前语言选择。
  const I18N = {
    entering: ["ENTERING", "进入"], gathering: ["GATHERING", "聚集"], feeding: ["FEEDING", "饮食"],
    diagramNote: ["INTERPRETIVE DIAGRAMS — NOT TO SCALE", "研究性示意图 · 非测绘平面图 · 不按比例"],
    evidence: ["WHAT THE SOURCE DOCUMENTS", "来源记录了什么"],
    meaning: ["READING THE SPACE", "如何理解这个空间"],
    limit: ["CONTEXT & LIMITS", "语境与研究边界"], references: ["SOURCE MATERIAL", "来源资料"],
    previous: ["← PREVIOUS", "← 上一例"], next: ["NEXT →", "下一例 →"],
    close: ["Close", "关闭"],
  };

  // 02 / 来源索引。每条都给出可直接访问的原始网址，无虚构引文。
  // 研究内容来自此前讨论并核查的材料；部分来源仅有公开摘要，已明确说明。
  const SOURCES = {
    genkan: { title: "The Japan Forum — Genkan (1997)", url: "https://www.tjf.or.jp/deai/contents/teacher/mini_en/html/genkan.html" },
    japan: { title: "Web Japan — The Structure of a Japanese House", url: "https://web-japan.org/kidsweb/virtual/house/house01.html" },
    porch: { title: "Smithsonian NMAAHC — Resting on the Porch", url: "https://www.searchablemuseum.com/resting-on-the-porch/" },
    majlis: { title: "UNESCO — Majlis, a cultural and social space (2015)", url: "https://ich.unesco.org/en/RL/majlis-a-cultural-and-social-space-01076" },
    majlisfilm: { title: "UNESCO — Majlis documentary archive record (2015)", url: "https://www.unesco.org/archives/multimedia/document-4011" },
    frontroom: { title: "Michael McMillan — The West Indian Front Room (2009), public abstract", url: "https://ualresearchonline.arts.ac.uk/id/eprint/9381/" },
    interview: { title: "UAL — Michael McMillan on curating A front Room in 1970 (2022)", url: "https://www.arts.ac.uk/colleges/london-college-of-fashion/stories/michael-mcmillan-on-curating-a-front-room-in-1970" },
    frankfurt: { title: "MoMA — Counter Space: The Frankfurt Kitchen", url: "https://www.moma.org/interactives/exhibitions/2010/counter_space/the_frankfurt_kitchen/" },
    moma: { title: "MoMA — Frankfurt Kitchen, collection record (1926–27)", url: "https://www.moma.org/collection/works/126451" },
    levine: { title: "Tenement Museum — What Gets Let Go", url: "https://www.tenement.org/in-praise-of-stuff-the-tenement-museums-collections/what-gets-let-go/" },
    apartment: { title: "Tenement Museum — Levine family apartment", url: "https://www.tenement.org/tour/5a-levines/" },
    miller: { title: "Daniel Miller — Behind Closed Doors, UCL manuscript", url: "https://www.ucl.ac.uk/anthropology/sites/anthropology/files/mil-32.pdf" }
  };

  // 每个案例字段说明：
  // id：唯一标识；num：展签编号；chapter：对应筛选器；title/place/period：双语文本；
  // evidence：来源记录；meaning：作者解读；limit：避免跨文化概括的边界；
  // sources：引用 SOURCES 的键。
  // image：本地 SVG 原创示意图。修改文件路径即可替换自己的图像。
  const CASES = [
    {
      id: "genkan", num: "01", chapter: "entering",
      title: ["The genkan", "玄关"], place: ["Japan", "日本"], period: ["Spatial convention / 1997 account", "空间惯例 / 1997 年文献"],
      image: "assets/genkan.svg",
      question: ["When does outside become inside?", "从哪里开始，外面变成了里面？"],
      evidence: ["The Japan Forum describes a lower entrance surface where outdoor shoes are removed before stepping up into the home. Brief exchanges can happen at the entrance; invited guests continue farther inside. Web Japan illustrates traditional arrangements while noting that contemporary housing varies.", "日本国际文化交流财团的资料描述了较低的入口地面：人在这里脱下室外鞋，再踏上室内地板。短暂的交接可以停留在玄关，受邀的客人则进入更深的空间。Web Japan 展示传统住宅的安排，同时说明当代住宅并不完全相同。"],
      meaning: ["A boundary is made through an action as well as a wall. Removing shoes and being invited farther in establish different degrees of entry. The threshold becomes a place where welcome is negotiated.", "边界通过动作，也通过墙体形成。脱鞋与被邀请进入更深处，构成不同程度的进入。门槛因此成为协商欢迎与距离的地方。"],
      limit: ["These are educational descriptions of conventions, not evidence that every Japanese household uses an identical layout or follows the same rules.", "这些教育性资料介绍的是空间惯例，不能据此认定所有日本家庭拥有相同布局或遵循相同规则。"],
      sources: ["genkan", "japan"]
    },
    {
      id: "porch", num: "02", chapter: "entering",
      title: ["On the porch", "坐在门廊上"], place: ["African American domestic history", "非裔美国人的居住历史"], period: ["Historical account / image dated 1918", "历史记录 / 配图标注为 1918 年"],
      image: "assets/porch.svg",
      question: ["Can the edge of home be a place to stay?", "家的边缘，也可以是停留之处吗？"],
      evidence: ["The Smithsonian’s Resting on the Porch describes porches as places for rest, connection, and watching everyday life. Drawing on Mabel O. Wilson, the account discusses a relationship between inside and outside. It includes a photograph of Odessa Johnson dated 1918.", "史密森尼的《Resting on the Porch》将门廊描述为休息、交往和观察日常生活的空间。资料引用 Mabel O. Wilson 的研究，讨论室内与室外的联系，并配有一张标注为 1918 年的 Odessa Johnson 照片。"],
      meaning: ["The threshold can hold domestic life in view of the neighborhood. A porch allows us to ask how resting, being seen, and meeting others shape a sense of home beyond an enclosed room.", "门槛可以让居家生活延伸到邻里视野中。门廊让我们追问：休息、被看见、与他人相遇，如何在封闭房间之外塑造家的感受。"],
      limit: ["This is a situated historical account. A photograph cannot establish what every person felt, nor does one porch represent all African American homes.", "这是具有具体语境的历史资料。照片无法证明人物的全部感受，一座门廊也不能代表所有非裔美国人的家。"],
      sources: ["porch"]
    },
    {
      id: "majlis", num: "03", chapter: "gathering",
      title: ["A place to gather", "相聚之处"], place: ["Majlis / UAE, Saudi Arabia, Oman, Qatar", "Majlis / 阿联酋、沙特、阿曼、卡塔尔"], period: ["Heritage documentation / 2015", "文化遗产记录 / 2015 年"],
      image: "assets/majlis.svg",
      question: ["Who gathers, and what is passed on?", "谁在这里相聚，又传递着什么？"],
      evidence: ["UNESCO documents majlis as settings for receiving guests, discussing community matters, resolving disputes, and transmitting oral heritage. Its account describes elders as knowledge holders and younger people learning through attendance. It also records women’s majlis and varied participation.", "联合国教科文组织将 majlis 记录为接待客人、讨论社区事务、处理分歧和传递口述遗产的场所。资料描述长者作为知识的持有者，年轻人通过参与学习，也记录了女性的 majlis 与不同的参与方式。"],
      meaning: ["Gathering can connect hospitality with community responsibilities. The meaning of this space lies partly in relationships between participants and in knowledge that circulates through conversation.", "聚集把待客与社区责任联系起来。空间的意义，部分存在于参与者之间的关系，以及交谈中流动的知识里。"],
      limit: ["The nomination emphasizes a living heritage practice. It is not a plan of one household; majlis can also exist outside domestic settings. The documentary catalog was consulted, not a film transcript.", "申遗资料强调的是活态文化实践，不是某个家庭的平面图；majlis 也存在于住宅之外。本项目使用纪录片的目录说明，未将其视为已观看影片的逐字记录。"],
      sources: ["majlis", "majlisfilm"]
    },
    {
      id: "front-room", num: "04", chapter: "gathering",
      title: ["The front room", "前厅"], place: ["West Indian migration / Britain", "西印度群岛移民 / 英国"], period: ["1970s interior / later reconstruction", "1970 年代室内 / 后来的策展重构"],
      image: "assets/front-room.svg",
      question: ["What does a room say on our behalf?", "一个房间，如何替我们表达自己？"],
      evidence: ["Michael McMillan’s public abstract links front-room decoration with migration, dignity, and racialized experience. In a published interview, he explains how lived experience, donated objects, his mother’s crochet, and sourced furnishings informed his installation. The interior is a curated reconstruction.", "Michael McMillan 的公开论文摘要将前厅装饰与移民、尊严及种族化经验联系起来。在已发表的访谈中，他解释自身经验、捐赠物件、母亲的钩织与搜集到的家具如何共同形成装置。这个室内空间是策展重构。"],
      meaning: ["Displaying and caring for objects can express a household’s identity within a wider social world. Decoration becomes a way to study aspiration, memory, and the work of maintaining dignity.", "展示与照料物件，可以在更广的社会环境中表达家庭身份。装饰成为研究愿望、记忆以及维护尊严所付出劳动的入口。"],
      limit: ["The full journal article was not reviewed; only its public abstract was available. The installation should be identified as a reconstruction, not an untouched historical home.", "本项目未阅读受限的完整期刊论文，仅使用其公开摘要。装置应标注为重构，而不是原封不动保留下来的历史住宅。"],
      sources: ["frontroom", "interview"]
    },
    {
      id: "frankfurt", num: "05", chapter: "feeding",
      title: ["A kitchen as a system", "作为系统的厨房"], place: ["Frankfurt Kitchen / Germany", "法兰克福厨房 / 德国"], period: ["Grete Schütte-Lihotzky / 1926–27", "Grete Schütte-Lihotzky / 1926–27 年"],
      image: "assets/frankfurt.svg",
      question: ["Whose work is organized by a plan?", "一张平面图，安排着谁的劳动？"],
      evidence: ["MoMA situates the Frankfurt Kitchen within the New Frankfurt housing program. The design drew on time-motion studies and consultation with women. Integrated storage, labeled ingredient bins, and carefully placed equipment were used to organize domestic tasks.", "MoMA 将法兰克福厨房置于 New Frankfurt 住宅计划中。设计参考了动作时间研究以及对女性的咨询，通过一体化储物、带标签的食材盒与设备布置，组织家务活动。"],
      meaning: ["A kitchen is also a proposal for how work should happen. Its arrangements invite questions about who cooks, how tasks are divided, and what a design can change about everyday labor.", "厨房也是关于劳动应如何发生的一项提案。它的安排引出问题：谁来做饭，任务如何分配，设计又能怎样改变日常劳动。"],
      limit: ["Design intentions do not prove identical use by all residents. This archive does not claim measured time savings, and its schematic is not the original kitchen plan.", "设计意图不能证明所有住户都以同样方式使用空间。本档案不宣称经过测量的时间节省；示意图也不是原始厨房平面图。"],
      sources: ["frankfurt", "moma"]
    },
    {
      id: "levine", num: "06", chapter: "feeding",
      title: ["Many lives, one room", "一个房间，多种生活"], place: ["Levine apartment / New York", "Levine 家庭公寓 / 纽约"], period: ["Household history / around 1902", "家庭历史 / 约 1902 年"],
      image: "assets/levine.svg",
      question: ["Can a room ever have only one purpose?", "一个房间，真的只有一种用途吗？"],
      evidence: ["The Tenement Museum describes Jennie Levine caring for children and preparing meals while sharing her kitchen with garment workers. Its household account places paid garment work in the front room. The museum also explains how historically plausible objects help reconstruct the apartment.", "Tenement Museum 描述 Jennie Levine 照顾孩子、准备饭菜，同时与制衣工人共用厨房。家庭资料记录了前厅中的制衣工作。博物馆也解释，部分重构物件是符合当时情况的同类物品，并非已确认的家庭原物。"],
      meaning: ["Cooking, care, and paid work overlap within the dwelling. This case challenges a tidy division of home into single-purpose rooms and directs attention to the conditions under which domestic life is maintained.", "烹饪、照护和有偿劳动在住宅中重叠。这个案例挑战了把家整齐划分为单一用途房间的方式，也让我们注意到维持家庭生活的具体条件。"],
      limit: ["This is a named household interpreted by a museum. Do not infer an exact daily schedule or treat every object in the reconstruction as an original Levine possession.", "这是由博物馆解释的具体家庭案例。不能据此推断精确的日程，也不能把重构中的每件物品都视为 Levine 家庭原物。"],
      sources: ["levine", "apartment"]
    }
  ];

  // 03 / 状态与工具。界面固定使用英文，保留双语研究内容以便编辑。
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const pick = pair => pair[0];
  const t = key => pick(I18N[key] || [key, key]);
  const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const findCase = id => CASES.find(item => item.id === id);
  const viewport = $("#viewport");
  const collection = $("#case-collection");
  const scrollMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let gridMode = false;
  let cycleWidth = 0;
  let touching = false;
  let previousTime = 0;
  let scrollPosition = 0;
  const photoSection = $("#photo-section");
  const studyScreen = $("#study-screen");
  let pageNavigationUntil = 0;
  let wheelIntent = 0;
  let wheelTime = 0;
  let returnFocusPending = false;
  let readingPinnedByTouch = false;
  const planPreview = $("#floorplan-preview");
  const previewImage = $("img", planPreview);
  const caseHeadline = $(".headline-case");
  let previewCase = null;
  let previewAnimation = null;
  let leaveTimer = null;
  let previewSource = null;
  let resumeAfter = 0;
  let scrollSpeed = 0;
  let pointerInPreview = false;
  let previewHoverTop = 0;

  function fitCaseHeadline() {
    caseHeadline.style.fontSize = "";
    if (!previewCase) return;
    const available = $("h1").clientWidth;
    const textWidth = caseHeadline.scrollWidth;
    if (textWidth > available) {
      caseHeadline.style.fontSize = `${parseFloat(getComputedStyle(caseHeadline).fontSize) * available / textWidth}px`;
    }
  }
  function previewBounds() {
    const rowBounds = viewport.getBoundingClientRect();
    previewHoverTop = rowBounds.top - 18;
    const roomBelow = Math.max(0, window.innerHeight - 24 - rowBounds.bottom);
    $("#main").style.setProperty("--row-shift", `${Math.min(window.innerHeight * .18, roomBelow)}px`);
    const headingBottom = $(".atlas-intro").getBoundingClientRect().bottom;
    const top = Math.max(window.innerHeight * .49, headingBottom + 22);
    const height = Math.max(80, window.innerHeight - top - 24);
    planPreview.style.setProperty("--preview-top", `${top}px`);
    planPreview.style.setProperty("--preview-height", `${height}px`);
  }
  // One reversible animation keeps position and scale continuous during quick re-entry.
  function finishPlanExit() {
    readingPinnedByTouch = false;
    if (window.scrollY > 2) window.scrollTo({ top: 0, behavior: "instant" });
    photoSection.hidden = true;
    document.body.classList.remove("in-photo-section");
    studyScreen.inert = false;
    document.documentElement.style.setProperty("--page-scroll", "0px");
    previewAnimation?.cancel();
    previewAnimation = null;
    previewSource?.closest(".case-study").classList.remove("is-preview-source");
    previewSource = null;
    previewCase = null;
    pointerInPreview = false;
    planPreview.hidden = true;
    planPreview.classList.remove("is-closing");
    document.body.classList.remove("has-plan-preview");
    $(".headline-default").removeAttribute("aria-hidden");
    caseHeadline.setAttribute("aria-hidden", "true");
    resumeAfter = performance.now() + 180;
    scrollSpeed = 0;
  }
  function showPlan(button) {
    if (!button) return;
    const item = findCase(button.dataset.open);
    if (!item) return;
    if (gridMode && !previewCase && window.scrollY > 8) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.documentElement.style.setProperty("--page-scroll", "0px");
    }
    clearTimeout(leaveTimer);
    if (previewCase === item.id) {
      if (planPreview.classList.contains("is-closing")) {
        planPreview.classList.remove("is-closing");
        document.body.classList.add("has-plan-preview");
        if (previewAnimation) {
          previewAnimation.playbackRate = 1;
          previewAnimation.play();
        }
      }
      return;
    }
    const switching = previewCase !== null;
    const keepTouchState = readingPinnedByTouch;
    if (previewCase) finishPlanExit();
    readingPinnedByTouch = keepTouchState;
    const sourceImage = button.querySelector(".case-image");
    const sourceRect = sourceImage.getBoundingClientRect();
    previewCase = item.id;
    previewSource = button;
    renderPhotoEssay(item);
    caseHeadline.textContent = pick(item.title);
    fitCaseHeadline();
    previewImage.src = item.image;
    previewImage.alt = `${pick(item.title)} — original interpretive diagram`;
    $("#source-account").innerHTML = `
      <p class="reading-index">${item.num} / CASE STUDY</p>
      <p class="reading-place">${escapeHTML(pick(item.place))}<br>${escapeHTML(pick(item.period))}</p>
      <h2>${escapeHTML(t("evidence"))}</h2>
      <p>${escapeHTML(pick(item.evidence))}</p>
      <div class="reading-sources"><h2>${escapeHTML(t("references"))}</h2>${sourceLinks(item.sources)}</div>`;
    $("#source-context").innerHTML = `
      <p class="reading-question">${escapeHTML(pick(item.question))}</p>
      <h2>${escapeHTML(t("meaning"))}</h2><p>${escapeHTML(pick(item.meaning))}</p>
      <h2>${escapeHTML(t("limit"))}</h2><p class="reading-limit">${escapeHTML(pick(item.limit))}</p>`;
    planPreview.querySelectorAll(".reading-copy").forEach(column => { column.scrollTop = 0; });
    $(".headline-default").setAttribute("aria-hidden", "true");
    caseHeadline.setAttribute("aria-hidden", "false");
    planPreview.hidden = false;
    planPreview.scrollTop = 0;
    planPreview.classList.remove("is-closing");
    previewBounds();
    void planPreview.offsetWidth;
    document.body.classList.add("has-plan-preview");
    button.closest(".case-study").classList.add("is-preview-source");
    if (!scrollMotion.matches) {
      const rect = previewImage.getBoundingClientRect();
      const naturalWidth = sourceImage.naturalWidth || 360;
      const naturalHeight = sourceImage.naturalHeight || 240;
      const scale = Math.min(sourceRect.width / naturalWidth, sourceRect.height / naturalHeight) /
        Math.min(rect.width / naturalWidth, rect.height / naturalHeight);
      const x = sourceRect.left + sourceRect.width / 2 - rect.left - rect.width * scale / 2;
      const y = sourceRect.top + sourceRect.height / 2 - rect.top - rect.height * scale / 2;
      previewAnimation = previewImage.animate([
        { transform: `translate(${x}px, ${y}px) scale(${scale})` },
        { transform: "translate(0, 0) scale(1)" }
      ], { duration: 1100, easing: "cubic-bezier(.4,0,.2,1)", fill: "both" });
      previewAnimation.onfinish = () => {
        if (previewAnimation?.playbackRate < 0) finishPlanExit();
      };
      if (switching) {
        previewAnimation.pause();
        previewAnimation.currentTime = 1100;
        previewImage.animate([{ opacity: .35 }, { opacity: 1 }], { duration: 500, easing: "ease-out" });
      }
    }
  }
  function hidePlan(immediate = false) {
    if (!immediate && (readingPinnedByTouch || window.scrollY > 8 || performance.now() < pageNavigationUntil)) return;
    clearTimeout(leaveTimer);
    if (!previewCase && planPreview.hidden) return;
    if (immediate || scrollMotion.matches || !previewAnimation) {
      finishPlanExit();
      return;
    }
    // Brief pointer intent avoids flicker at the edge of the enlarged drawing.
    leaveTimer = setTimeout(() => {
      if (readingPinnedByTouch || window.scrollY > 8 || performance.now() < pageNavigationUntil || !previewAnimation || planPreview.classList.contains("is-closing")) return;
      planPreview.classList.add("is-closing");
      document.body.classList.remove("has-plan-preview");
      previewAnimation.playbackRate = -1;
      previewAnimation.play();
    }, 90);
  }
  viewport.addEventListener("pointerover", event => {
    if (event.pointerType === "touch") return;
    const image = event.target.closest(".case-image");
    if (image) showPlan(image.closest(".case-open"));
  });
  viewport.addEventListener("pointerleave", event => {
    if (planPreview.contains(event.relatedTarget) || $("#main").contains(event.relatedTarget)) return;
    hidePlan();
  });
  planPreview.addEventListener("pointerenter", () => {
    pointerInPreview = true;
    clearTimeout(leaveTimer);
    if (previewSource) showPlan(previewSource);
  });
  planPreview.addEventListener("pointerleave", event => {
    pointerInPreview = false;
    if (!$("#main").contains(event.relatedTarget)) hidePlan();
  });
  // Keep the hover region stable while the case row moves away from the pointer.
  $("#main").addEventListener("pointermove", event => {
    if (event.pointerType === "touch" || !previewCase) return;
    if (!planPreview.contains(event.target) && event.clientY < previewHoverTop) hidePlan();
  });
  $("#main").addEventListener("pointerleave", event => {
    if (event.pointerType !== "touch") hidePlan();
  });
  viewport.addEventListener("focusin", event => {
    const button = event.target.closest(".case-open");
    if (button && button.matches(":focus-visible")) showPlan(button);
  });
  viewport.addEventListener("focusout", event => {
    if (!viewport.contains(event.relatedTarget) && !planPreview.contains(event.relatedTarget) && !pointerInPreview) hidePlan();
  });
  planPreview.addEventListener("focusout", event => {
    if (event.relatedTarget && !planPreview.contains(event.relatedTarget) && !viewport.contains(event.relatedTarget) && !pointerInPreview) hidePlan();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (document.body.classList.contains("in-photo-section")) { returnToStudy(true); return; }
      const returnFocus = planPreview.contains(document.activeElement);
      readingPinnedByTouch = false;
      hidePlan();
      if (returnFocus) $("#home-button").focus({ preventScroll: true });
    }
  });


  function sourceLinks(keys) {
    return keys.map(key => {
      const source = SOURCES[key];
      return `<a class="source-link" href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title)} ↗</a>`;
    }).join("");
  }

  // 六个原始案例供键盘访问；循环副本隐藏于读屏导航，但保留鼠标点击。
  function renderCases() {
    collection.innerHTML = `<div class="case-group">` + CASES.map(item => `
      <article class="case-study" data-case="${item.id}">
        <button class="case-open" data-open="${item.id}" aria-label="${escapeHTML(pick(item.title))}">
          <img class="case-image" src="${item.image}" alt="${escapeHTML(pick(item.title))} — ${escapeHTML(t("diagramNote"))}" draggable="false" width="360" height="240">
          <span class="case-caption"><span class="case-id">${item.num}</span><span>${escapeHTML(pick(item.title))}</span><span class="case-arrow" aria-hidden="true">↗</span></span>
          <span class="case-subtitle">${escapeHTML(pick(item.place))}</span>
        </button>
      </article>`).join("") + `</div>`;
    refreshLoop();
  }
  function refreshLoop() {
    hidePlan(true);
    collection.querySelectorAll("[data-copy]").forEach(node => node.remove());
    const original = collection.querySelector(".case-group");
    if (!original) return;
    cycleWidth = original.getBoundingClientRect().width;
    if (!gridMode && !scrollMotion.matches && cycleWidth > 0) {
      const copies = Math.ceil(viewport.clientWidth / cycleWidth) + 1;
      for (let i = 0; i < copies; i++) {
        const copy = original.cloneNode(true);
        copy.dataset.copy = "true";
        copy.setAttribute("aria-hidden", "true");
        copy.querySelectorAll("button").forEach(button => { button.tabIndex = -1; });
        collection.append(copy);
      }
    }
    viewport.scrollLeft = 0;
    scrollPosition = 0;
    previousTime = 0;
  }
  function animateCases(time) {
    const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
    previousTime = time;
    const paused = gridMode || scrollMotion.matches || touching || document.hidden || time < resumeAfter || previewCase !== null || !planPreview.hidden ||
      viewport.matches(":hover") || viewport.contains(document.activeElement) ||
      window.scrollY > 8 || document.body.classList.contains("is-landing");
    const moving = !paused && cycleWidth > 0;
    document.body.classList.toggle("is-scrolling", moving);
    if (!moving) scrollSpeed = 0;
    if (moving) {
      scrollSpeed += (.035 - scrollSpeed) * (1 - Math.exp(-elapsed / 420));
      if (Math.abs(viewport.scrollLeft - scrollPosition) > 2) scrollPosition = viewport.scrollLeft;
      scrollPosition = (scrollPosition + elapsed * scrollSpeed) % cycleWidth;
      viewport.scrollLeft = scrollPosition;
    }
    requestAnimationFrame(animateCases);
  }

  // The full reading experience now lives inline beside the floorplan.
  document.addEventListener("click", event => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.dataset.open) {
      showPlan(target);
      if (event.pointerType === "touch" || window.matchMedia("(hover: none)").matches) readingPinnedByTouch = true;
      if (event.detail === 0) $(".reading-left").focus({ preventScroll: true });
    }
    else if (target.id === "home-button") refreshLoop();
    else if (target.id === "layout-toggle") {
      hidePlan(true);
      gridMode = !gridMode;
      document.body.classList.toggle("is-grid", gridMode);
      target.setAttribute("aria-pressed", String(gridMode));
      target.setAttribute("aria-label", gridMode ? "Switch to horizontal scrolling view" : "Switch to static grid view");
      $("#layout-label").textContent = gridMode ? "SCROLL VIEW" : "GRID VIEW";
      viewport.setAttribute("aria-label", gridMode ? "All six case studies in a static grid" : "Domestic space archive — scrolling case studies");
      refreshLoop();
    }
    else if (target.id === "view-photos") scrollToPhotos(event.detail === 0);
    else if (target.id === "back-to-study") returnToStudy(event.detail === 0);
    else if (target.id === "close-reading") {
      readingPinnedByTouch = false;
      $("#home-button").focus({ preventScroll: true });
      hidePlan();
    } else if (target.dataset.browse && previewCase) {
      const index = CASES.findIndex(item => item.id === previewCase);
      const next = CASES[(index + Number(target.dataset.browse) + CASES.length) % CASES.length];
      const button = collection.querySelector(`.case-group:not([data-copy]) [data-open="${next.id}"]`);
      const rect = button.getBoundingClientRect();
      const row = viewport.getBoundingClientRect();
      viewport.scrollLeft += rect.left - row.left - (row.width - rect.width) / 2;
      scrollPosition = viewport.scrollLeft;
      showPlan(button);
    }
  });

  viewport.addEventListener("pointerdown", event => { if (event.pointerType === "touch") touching = true; });
  window.addEventListener("pointerup", () => { touching = false; });
  window.addEventListener("pointercancel", () => { touching = false; });
  scrollMotion.addEventListener("change", refreshLoop);
  let resizeFrame;
  window.addEventListener("resize", () => {
    if (window.scrollY > 8) {
      document.documentElement.style.setProperty("--page-scroll", `${window.scrollY}px`);
      return;
    }
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(refreshLoop);
  });

  // Add verified photo records here. The floorplan SVGs are not photographs.
  // { id, caseId, src: "assets/photos/example.jpg", alt, caption, credit, sourceUrl }
  const PHOTOGRAPHS = [
  {
    "id": "genkan-01",
    "caseId": "genkan",
    "src": "assets/photos/genkan-01.jpg",
    "alt": "Japanese residential genkan with a lower tiled entrance and raised wooden hallway",
    "caption": "A residential genkan in Japan, viewed from the raised interior hallway. Representative residential reference; not identified as a home documented in the 1997 research source.",
    "credit": "Fg2 · Public domain · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Genkan-M9774.jpg",
    "license": "Public domain",
    "licenseUrl": ""
  },
  {
    "id": "genkan-02",
    "caseId": "genkan",
    "src": "assets/photos/genkan-02.jpg",
    "alt": "Japanese residential genkan with a lower tiled entrance and raised wooden hallway",
    "caption": "The same residential genkan viewed from outside, showing shoes on the lower tiled entry and the raised interior floor. Representative residential reference; not identified as a home documented in the 1997 research source.",
    "credit": "Fg2 · Public domain · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Genkan-M9778.jpg",
    "license": "Public domain",
    "licenseUrl": ""
  },
  {
    "id": "porch-01",
    "caseId": "porch",
    "src": "assets/photos/porch-01.jpg",
    "alt": "Historical photograph of African American residents on domestic porches and steps",
    "caption": "Porches and front steps in Georgia, from the Library of Congress collection assembled for the 1900 Paris Exposition. Historical reference; this is not the 1918 Odessa Johnson photograph cited in the case study.",
    "credit": "Photographer not identified · Daniel Murray Collection, Library of Congress · Public domain · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:African_American_boy_seated_on_porch_of_house%2C_another_African_American_boy_standing_with_bicycle_on_porch_of_another_house%2C_with_two_young_African_American_women_on_steps%2C_Georgia_LCCN95507099.jpg",
    "license": "Public domain",
    "licenseUrl": ""
  },
  {
    "id": "porch-02",
    "caseId": "porch",
    "src": "assets/photos/porch-02.jpg",
    "alt": "Historical photograph of African American residents on domestic porches and steps",
    "caption": "African American men seated on porch steps, from the Library of Congress collection assembled for the 1900 Paris Exposition. Historical reference; this is not the 1918 Odessa Johnson photograph cited in the case study.",
    "credit": "Photographer not identified · Daniel Murray Collection, Library of Congress · Public domain · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:African_American_men_seated_on_porch_steps_LCCN95507125.jpg",
    "license": "Public domain",
    "licenseUrl": ""
  },
  {
    "id": "majlis-01",
    "caseId": "majlis",
    "src": "assets/photos/majlis-01.jpg",
    "alt": "Traditional majlis in northern Qatar with perimeter seating, cushions and a central carpet",
    "caption": "Visitors being shown a traditional majlis in northern Qatar, 15 April 2012. Reference photograph of a hospitality space, not a specific household documented by the UNESCO nomination.",
    "credit": "Lawrence Wang (lawrenceyeah on Flickr) · CC BY-SA 2.0 · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tourists_being_shown_a_traditional_majlis_in_northern_Qatar.jpg",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
  },
  {
    "id": "majlis-02",
    "caseId": "majlis",
    "src": "assets/photos/majlis-02.jpg",
    "alt": "Traditional majlis in northern Qatar with perimeter seating, cushions and a central carpet",
    "caption": "Interior of a traditional majlis in northern Qatar, 15 April 2012. Reference photograph of a hospitality space, not a specific household documented by the UNESCO nomination.",
    "credit": "Lawrence Wang (lawrenceyeah on Flickr) · CC BY-SA 2.0 · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:View_of_a_traditional_majlis_in_northern_Qatar.jpg",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
  },
  {
    "id": "front-room-01",
    "caseId": "front-room",
    "src": "assets/photos/front-room-01.jpg",
    "alt": "Museum reconstruction of a decorated 1970s domestic interior at Christmas",
    "caption": "A 1970s domestic interior displayed for Christmas at the Museum of the Home, London, photographed on 30 November 2025. Contextual museum reconstruction; not verified as the particular McMillan installation discussed in the case study.",
    "credit": "Matt Brown · CC BY 4.0 · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:1970s_Christmas%2C_Museum_of_the_Home_2025-11-30.jpg",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
  },
  {
    "id": "front-room-02",
    "caseId": "front-room",
    "src": "assets/photos/front-room-02.jpg",
    "alt": "Museum reconstruction of a decorated 1970s domestic interior at Christmas",
    "caption": "A Christmas dining-table view in a 1970s interior display at the Museum of the Home, London, photographed on 30 November 2025. Contextual museum reconstruction; not verified as the particular McMillan installation discussed in the case study.",
    "credit": "Matt Brown · CC BY 4.0 · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:1970s_Christmas_dinner%2C_Museum_of_the_Home_2025-11-30.jpg",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
  },
  {
    "id": "frankfurt-01",
    "caseId": "frankfurt",
    "src": "assets/photos/frankfurt-01.jpg",
    "alt": "Frankfurt Kitchen ingredient-storage bins in a museum display",
    "caption": "Ingredient storage in a Frankfurt Kitchen display at the V&A East Storehouse, London. Museum display of a historic design, not an occupied original flat.",
    "credit": "14GTR · CC0 · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Frankfurt_kitchen_at_V%26A_East_Storehouse_01.jpg",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en"
  },
  {
    "id": "frankfurt-02",
    "caseId": "frankfurt",
    "src": "assets/photos/frankfurt-02.jpg",
    "alt": "Historic black-and-white photograph of the compact Frankfurt Kitchen",
    "caption": "Historic Frankfurt Kitchen photograph published in Das neue Frankfurt in 1927, p. 122. Reference image of the design; not the project’s schematic plan.",
    "credit": "Das neue Frankfurt (1927), p. 122 · photographer not identified · Public domain · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Frankfurterkueche.jpg",
    "license": "Public domain",
    "licenseUrl": ""
  },
  {
    "id": "levine-01",
    "caseId": "levine",
    "src": "assets/photos/levine-01.jpg",
    "alt": "Reconstructed tenement kitchen with stove, cooking utensils and dining furniture",
    "caption": "Kitchen and dining furnishings in a room at the New York City Tenement Museum. Photograph by Carol M. Highsmith, dated by the catalogue to between 1980 and 2006. Contextual museum interior; not identified as the Levine family apartment.",
    "credit": "Carol M. Highsmith · Public domain · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Room_in_the_New_York_City_Tenement_Museum%2C_New_York_LCCN2011632428.tif",
    "license": "Public domain",
    "licenseUrl": ""
  },
  {
    "id": "levine-02",
    "caseId": "levine",
    "src": "assets/photos/levine-02.jpg",
    "alt": "Reconstructed tenement parlor with a sewing machine, chairs and decorated mantelpiece",
    "caption": "A furnished parlor at the New York City Tenement Museum. Photograph by Carol M. Highsmith, dated by the catalogue to between 1980 and 2006. Contextual museum interior; not identified as the Levine family apartment.",
    "credit": "Carol M. Highsmith · Public domain · Resized for display; uncropped.",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Parlor_at_the_New_York_City_Tenement_Museum%2C_New_York_LCCN2011635004.tiff",
    "license": "Public domain",
    "licenseUrl": ""
  }
];
  function renderPhotoEssay(item) {
    const photographs = PHOTOGRAPHS.filter(photo => photo.caseId === item.id);
    $("#photo-case-number").textContent = `${item.num} / PHOTOGRAPHIC STUDY · ${String(photographs.length).padStart(2,"0")} VIEWS`;
    $("#photo-title").textContent = pick(item.title);
    const grid = $("#photo-essay-grid");
    grid.replaceChildren(...photographs.map((photo, index) => {
      const figure = document.createElement("figure"); figure.className = "photo-essay-item";
      const image = document.createElement("img"); image.src = photo.src; image.alt = photo.alt; image.decoding = "async";
      const caption = document.createElement("figcaption");
      const number = document.createElement("p"); number.className = "micro photo-essay-number"; number.textContent = String(index + 1).padStart(2,"0");
      const description = document.createElement("p"); description.className = "photo-essay-caption"; description.textContent = photo.caption;
      const credit = document.createElement("p"); credit.className = "micro photo-essay-credit"; credit.textContent = photo.credit + " Displayed in monochrome; original photo file retained.";
      caption.append(number, description, credit); figure.append(image, caption); return figure;
    }));
    photoSection.hidden = false;
  }
  function photoPageTop() {
    return Math.max(0, photoSection.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter")));
  }
  function scrollToPhotos(moveFocus = false) {
    if (!previewCase || photoSection.hidden) return;
    clearTimeout(leaveTimer);
    pageNavigationUntil = performance.now() + (scrollMotion.matches ? 150 : 1000);
    window.scrollTo({ top: photoPageTop(), behavior: scrollMotion.matches ? "instant" : "smooth" });
    if (moveFocus) $("#photo-title").focus({ preventScroll: true });
  }
  function returnToStudy(moveFocus = false) {
    clearTimeout(leaveTimer);
    pageNavigationUntil = performance.now() + (scrollMotion.matches ? 150 : 1000);
    studyScreen.inert = false;
    returnFocusPending = moveFocus;
    window.scrollTo({ top: 0, behavior: scrollMotion.matches ? "instant" : "smooth" });
    if (window.scrollY < 3 && returnFocusPending) { returnFocusPending = false; $("#view-photos").focus({ preventScroll: true }); }
  }
  window.addEventListener("scroll", () => {
    const position = window.scrollY;
    document.documentElement.style.setProperty("--page-scroll", `${position}px`);
    const inPhotos = !photoSection.hidden && position >= photoPageTop() - window.innerHeight * .35;
    document.body.classList.toggle("in-photo-section", inPhotos);
    studyScreen.inert = inPhotos;
    if (position > 8) clearTimeout(leaveTimer);
    if (position < 3 && returnFocusPending) { returnFocusPending = false; $("#view-photos").focus({ preventScroll: true }); }
  }, { passive: true });
  // One deliberate wheel gesture switches screens; overflow text remains natively scrollable.
  window.addEventListener("wheel", event => {
    if (!previewCase || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const column = event.target.closest(".reading-copy");
    if (column && event.deltaY > 0 && column.scrollTop + column.clientHeight < column.scrollHeight - 2) return;
    if (column && event.deltaY < 0 && column.scrollTop > 2) return;
    const inPhotos = document.body.classList.contains("in-photo-section");
    const shouldSwitch = (!inPhotos && event.deltaY > 0) || (inPhotos && event.deltaY < 0 && (window.innerWidth > 680 || window.scrollY <= photoPageTop() + 8));
    if (!shouldSwitch) return;
    event.preventDefault();
    const now = performance.now();
    if (now < pageNavigationUntil) return;
    if (now - wheelTime > 220 || Math.sign(wheelIntent) !== Math.sign(event.deltaY)) wheelIntent = 0;
    wheelTime = now;
    wheelIntent += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
    if (Math.abs(wheelIntent) >= 55) {
      wheelIntent = 0;
      if (inPhotos) returnToStudy(); else scrollToPhotos();
    }
  }, { passive: false });

  // 11 / 启动。无需网络请求即可呈现六个研究案例。
  renderCases();
  requestAnimationFrame(animateCases);

  // 每个标签页首次访问播放；存储不可用时仍可进入，减少动态效果时直接显示正文。
  const landing = document.getElementById("landing");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let introSeen = false;
  try { introSeen = sessionStorage.getItem("whh-intro-seen") === "1"; } catch {}
  if (landing && !introSeen && !motionPreference.matches) {
    const shell = document.getElementById("app");
    const title = landing.querySelector(".landing-title");
    const skip = landing.querySelector(".landing-skip");
    title.replaceChildren(...Array.from(title.textContent.trim(), (letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00a0" : letter;
      span.style.setProperty("--letter", index);
      span.setAttribute("aria-hidden", "true");
      return span;
    }));
    landing.hidden = false;
    shell.inert = true;
    document.body.classList.add("is-landing");
    let leaving = false;
    let timer;
    function enterArchive() {
      if (leaving) return;
      leaving = true;
      const restoreFocus = landing.contains(document.activeElement);
      clearTimeout(timer);
      try { sessionStorage.setItem("whh-intro-seen", "1"); } catch {}
      document.body.classList.add("is-entering");
      landing.classList.add("is-leaving");
      const finish = () => {
        landing.hidden = true;
        shell.inert = false;
        document.body.classList.remove("is-landing", "is-entering");
        if (restoreFocus) document.getElementById("home-button").focus({ preventScroll: true });
        refreshLoop();
      };
      window.setTimeout(finish, motionPreference.matches ? 0 : 1400);
      motionPreference.removeEventListener("change", onMotionChange);
    }
    function onMotionChange(event) { if (event.matches) enterArchive(); }
    skip.addEventListener("click", enterArchive);
    landing.addEventListener("keydown", event => { if (event.key === "Escape") enterArchive(); });
    motionPreference.addEventListener("change", onMotionChange);
    timer = window.setTimeout(enterArchive, 3400);
  }
})();
