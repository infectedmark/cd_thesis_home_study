"use strict";

(() => {
  /*
   * 界面固定使用英文。
   * 内容数组保留 [英文, 中文]，方便以后编辑。
   */

  const I18N = {
    masthead: [
      "A STUDY OF DOMESTIC LIFE",
      "关于日常居住的研究"
    ],
    all: ["ALL SPACES", "全部空间"],
    entering: ["ENTERING", "进入"],
    gathering: ["GATHERING", "聚集"],
    feeding: ["FEEDING", "饮食"],
    diagramNote: [
      "INTERPRETIVE DIAGRAMS — NOT TO SCALE",
      "研究性示意图 · 非测绘平面图 · 不按比例"
    ],
    dragHint: [
      "DRAG TO WANDER · SELECT TO READ",
      "拖动画布探索 · 点击案例阅读"
    ],
    scale: ["SCALE", "缩放"],
    reset: ["RESET ↺", "复位 ↺"],
    sources: ["SOURCES & NOTES ↗", "资料与注释 ↗"],
    evidence: [
      "WHAT THE SOURCE DOCUMENTS",
      "来源记录了什么"
    ],
    meaning: ["READING THE SPACE", "如何理解这个空间"],
    limit: ["CONTEXT & LIMITS", "语境与研究边界"],
    references: ["SOURCE MATERIAL", "来源资料"],
    previous: ["← PREVIOUS", "← 上一例"],
    next: ["NEXT →", "下一例 →"],
    researchNote: [
      "Situated examples, not a classification of entire cultures. Diagrams are original interpretive schematics, not surveyed plans.",
      "具有具体语境的案例，不是对整个文化的分类。图像为原创研究示意图，不是实测平面图。"
    ],
    close: ["Close", "关闭"],
    print: ["PRINT RESEARCH READER ↗", "打印研究摘要 ↗"],
    sourcesIntro: [
      "Follow the original material. Source descriptions are distinguished from our interpretation.",
      "回到原始材料阅读。来源中的记录与本项目的研究解读分别标注。"
    ]
  };

  /* 来源 */
  const SOURCES = {
    genkan: {
      title: "The Japan Forum — Genkan (1997)",
      url: "https://www.tjf.or.jp/deai/contents/teacher/mini_en/html/genkan.html"
    },
    japan: {
      title: "Web Japan — The Structure of a Japanese House",
      url: "https://web-japan.org/kidsweb/virtual/house/house01.html"
    },
    porch: {
      title: "Smithsonian NMAAHC — Resting on the Porch",
      url: "https://www.searchablemuseum.com/resting-on-the-porch/"
    },
    majlis: {
      title: "UNESCO — Majlis, a cultural and social space (2015)",
      url: "https://ich.unesco.org/en/RL/majlis-a-cultural-and-social-space-01076"
    },
    majlisfilm: {
      title: "UNESCO — Majlis documentary archive record (2015)",
      url: "https://www.unesco.org/archives/multimedia/document-4011"
    },
    frontroom: {
      title: "Michael McMillan — The West Indian Front Room (2009), public abstract",
      url: "https://ualresearchonline.arts.ac.uk/id/eprint/9381/"
    },
    interview: {
      title: "UAL — Michael McMillan on curating A front Room in 1970 (2022)",
      url: "https://www.arts.ac.uk/colleges/london-college-of-fashion/stories/michael-mcmillan-on-curating-a-front-room-in-1970"
    },
    frankfurt: {
      title: "MoMA — Counter Space: The Frankfurt Kitchen",
      url: "https://www.moma.org/interactives/exhibitions/2010/counter_space/the_frankfurt_kitchen/"
    },
    moma: {
      title: "MoMA — Frankfurt Kitchen, collection record (1926–27)",
      url: "https://www.moma.org/collection/works/126451"
    },
    levine: {
      title: "Tenement Museum — What Gets Let Go",
      url: "https://www.tenement.org/in-praise-of-stuff-the-tenement-museums-collections/what-gets-let-go/"
    },
    apartment: {
      title: "Tenement Museum — Levine family apartment",
      url: "https://www.tenement.org/tour/5a-levines/"
    },
    miller: {
      title: "Daniel Miller — Behind Closed Doors, UCL manuscript",
      url: "https://www.ucl.ac.uk/anthropology/sites/anthropology/files/mil-32.pdf"
    }
  };

  /* 案例内容 */
  const CASES = [
    {
      id: "genkan",
      num: "01",
      chapter: "entering",
      x: 85,
      y: 435,
      w: 260,
      rotation: -4,
      title: ["The genkan", "玄关"],
      place: ["Japan", "日本"],
      period: [
        "Spatial convention / 1997 account",
        "空间惯例 / 1997 年文献"
      ],
      image: "assets/genkan.svg",
      question: [
        "When does outside become inside?",
        "从哪里开始，外面变成了里面？"
      ],
      evidence: [
        "The Japan Forum describes a lower entrance surface where outdoor shoes are removed before stepping up into the home. Brief exchanges can happen at the entrance; invited guests continue farther inside. Web Japan illustrates traditional arrangements while noting that contemporary housing varies.",
        "日本国际文化交流财团的资料描述了较低的入口地面：人在这里脱下室外鞋，再踏上室内地板。短暂的交接可以停留在玄关，受邀的客人则进入更深的空间。Web Japan 展示传统住宅的安排，同时说明当代住宅并不完全相同。"
      ],
      meaning: [
        "A boundary is made through an action as well as a wall. Removing shoes and being invited farther in establish different degrees of entry. The threshold becomes a place where welcome is negotiated.",
        "边界通过动作，也通过墙体形成。脱鞋与被邀请进入更深处，构成不同程度的进入。门槛因此成为协商欢迎与距离的地方。"
      ],
      limit: [
        "These are educational descriptions of conventions, not evidence that every Japanese household uses an identical layout or follows the same rules.",
        "这些教育性资料介绍的是空间惯例，不能据此认定所有日本家庭拥有相同布局或遵循相同规则。"
      ],
      sources: ["genkan", "japan"]
    },
    {
      id: "porch",
      num: "02",
      chapter: "entering",
      x: 490,
      y: 342,
      w: 285,
      rotation: 3,
      title: ["On the porch", "坐在门廊上"],
      place: [
        "African American domestic history",
        "非裔美国人的居住历史"
      ],
      period: [
        "Historical account / image dated 1918",
        "历史记录 / 配图标注为 1918 年"
      ],
      image: "assets/porch.svg",
      question: [
        "Can the edge of home be a place to stay?",
        "家的边缘，也可以是停留之处吗？"
      ],
      evidence: [
        "The Smithsonian’s Resting on the Porch describes porches as places for rest, connection, and watching everyday life. Drawing on Mabel O. Wilson, the account discusses a relationship between inside and outside. It includes a photograph of Odessa Johnson dated 1918.",
        "史密森尼的《Resting on the Porch》将门廊描述为休息、交往和观察日常生活的空间。资料引用 Mabel O. Wilson 的研究，讨论室内与室外的联系，并配有一张标注为 1918 年的 Odessa Johnson 照片。"
      ],
      meaning: [
        "The threshold can hold domestic life in view of the neighborhood. A porch allows us to ask how resting, being seen, and meeting others shape a sense of home beyond an enclosed room.",
        "门槛可以让居家生活延伸到邻里视野中。门廊让我们追问：休息、被看见、与他人相遇，如何在封闭房间之外塑造家的感受。"
      ],
      limit: [
        "This is a situated historical account. A photograph cannot establish what every person felt, nor does one porch represent all African American homes.",
        "这是具有具体语境的历史资料。照片无法证明人物的全部感受，一座门廊也不能代表所有非裔美国人的家。"
      ],
      sources: ["porch"]
    },
    {
      id: "majlis",
      num: "03",
      chapter: "gathering",
      x: 1008,
      y: 70,
      w: 325,
      rotation: -3,
      title: ["A place to gather", "相聚之处"],
      place: [
        "Majlis / UAE, Saudi Arabia, Oman, Qatar",
        "Majlis / 阿联酋、沙特、阿曼、卡塔尔"
      ],
      period: [
        "Heritage documentation / 2015",
        "文化遗产记录 / 2015 年"
      ],
      image: "assets/majlis.svg",
      question: [
        "Who gathers, and what is passed on?",
        "谁在这里相聚，又传递着什么？"
      ],
      evidence: [
        "UNESCO documents majlis as settings for receiving guests, discussing community matters, resolving disputes, and transmitting oral heritage. Its account describes elders as knowledge holders and younger people learning through attendance. It also records women’s majlis and varied participation.",
        "联合国教科文组织将 majlis 记录为接待客人、讨论社区事务、处理分歧和传递口述遗产的场所。资料描述长者作为知识的持有者，年轻人通过参与学习，也记录了女性的 majlis 与不同的参与方式。"
      ],
      meaning: [
        "Gathering can connect hospitality with community responsibilities. The meaning of this space lies partly in relationships between participants and in knowledge that circulates through conversation.",
        "聚集把待客与社区责任联系起来。空间的意义，部分存在于参与者之间的关系，以及交谈中流动的知识里。"
      ],
      limit: [
        "The nomination emphasizes a living heritage practice. It is not a plan of one household; majlis can also exist outside domestic settings. The documentary catalog was consulted, not a film transcript.",
        "申遗资料强调的是活态文化实践，不是某个家庭的平面图；majlis 也存在于住宅之外。本项目使用纪录片的目录说明，未将其视为已观看影片的逐字记录。"
      ],
      sources: ["majlis", "majlisfilm"]
    },
    {
      id: "front-room",
      num: "04",
      chapter: "gathering",
      x: 925,
      y: 427,
      w: 280,
      rotation: 4,
      title: ["The front room", "前厅"],
      place: [
        "West Indian migration / Britain",
        "西印度群岛移民 / 英国"
      ],
      period: [
        "1970s interior / later reconstruction",
        "1970 年代室内 / 后来的策展重构"
      ],
      image: "assets/front-room.svg",
      question: [
        "What does a room say on our behalf?",
        "一个房间，如何替我们表达自己？"
      ],
      evidence: [
        "Michael McMillan’s public abstract links front-room decoration with migration, dignity, and racialized experience. In a published interview, he explains how lived experience, donated objects, his mother’s crochet, and sourced furnishings informed his installation. The interior is a curated reconstruction.",
        "Michael McMillan 的公开论文摘要将前厅装饰与移民、尊严及种族化经验联系起来。在已发表的访谈中，他解释自身经验、捐赠物件、母亲的钩织与搜集到的家具如何共同形成装置。这个室内空间是策展重构。"
      ],
      meaning: [
        "Displaying and caring for objects can express a household’s identity within a wider social world. Decoration becomes a way to study aspiration, memory, and the work of maintaining dignity.",
        "展示与照料物件，可以在更广的社会环境中表达家庭身份。装饰成为研究愿望、记忆以及维护尊严所付出劳动的入口。"
      ],
      limit: [
        "The full journal article was not reviewed; only its public abstract was available. The installation should be identified as a reconstruction, not an untouched historical home.",
        "本项目未阅读受限的完整期刊论文，仅使用其公开摘要。装置应标注为重构，而不是原封不动保留下来的历史住宅。"
      ],
      sources: ["frontroom", "interview"]
    },
    {
      id: "frankfurt",
      num: "05",
      chapter: "feeding",
      x: 1235,
      y: 610,
      w: 235,
      rotation: -5,
      title: ["A kitchen as a system", "作为系统的厨房"],
      place: [
        "Frankfurt Kitchen / Germany",
        "法兰克福厨房 / 德国"
      ],
      period: [
        "Grete Schütte-Lihotzky / 1926–27",
        "Grete Schütte-Lihotzky / 1926–27 年"
      ],
      image: "assets/frankfurt.svg",
      question: [
        "Whose work is organized by a plan?",
        "一张平面图，安排着谁的劳动？"
      ],
      evidence: [
        "MoMA situates the Frankfurt Kitchen within the New Frankfurt housing program. The design drew on time-motion studies and consultation with women. Integrated storage, labeled ingredient bins, and carefully placed equipment were used to organize domestic tasks.",
        "MoMA 将法兰克福厨房置于 New Frankfurt 住宅计划中。设计参考了动作时间研究以及对女性的咨询，通过一体化储物、带标签的食材盒与设备布置，组织家务活动。"
      ],
      meaning: [
        "A kitchen is also a proposal for how work should happen. Its arrangements invite questions about who cooks, how tasks are divided, and what a design can change about everyday labor.",
        "厨房也是关于劳动应如何发生的一项提案。它的安排引出问题：谁来做饭，任务如何分配，设计又能怎样改变日常劳动。"
      ],
      limit: [
        "Design intentions do not prove identical use by all residents. This archive does not claim measured time savings, and its schematic is not the original kitchen plan.",
        "设计意图不能证明所有住户都以同样方式使用空间。本档案不宣称经过测量的时间节省；示意图也不是原始厨房平面图。"
      ],
      sources: ["frankfurt", "moma"]
    },
    {
      id: "levine",
      num: "06",
      chapter: "feeding",
      x: 470,
      y: 625,
      w: 330,
      rotation: 2,
      title: ["Many lives, one room", "一个房间，多种生活"],
      place: [
        "Levine apartment / New York",
        "Levine 家庭公寓 / 纽约"
      ],
      period: [
        "Household history / around 1902",
        "家庭历史 / 约 1902 年"
      ],
      image: "assets/levine.svg",
      question: [
        "Can a room ever have only one purpose?",
        "一个房间，真的只有一种用途吗？"
      ],
      evidence: [
        "The Tenement Museum describes Jennie Levine caring for children and preparing meals while sharing her kitchen with garment workers. Its household account places paid garment work in the front room. The museum also explains how historically plausible objects help reconstruct the apartment.",
        "Tenement Museum 描述 Jennie Levine 照顾孩子、准备饭菜，同时与制衣工人共用厨房。家庭资料记录了前厅中的制衣工作。博物馆也解释，部分重构物件是符合当时情况的同类物品，并非已确认的家庭原物。"
      ],
      meaning: [
        "Cooking, care, and paid work overlap within the dwelling. This case challenges a tidy division of home into single-purpose rooms and directs attention to the conditions under which domestic life is maintained.",
        "烹饪、照护和有偿劳动在住宅中重叠。这个案例挑战了把家整齐划分为单一用途房间的方式，也让我们注意到维持家庭生活的具体条件。"
      ],
      limit: [
        "This is a named household interpreted by a museum. Do not infer an exact daily schedule or treat every object in the reconstruction as an original Levine possession.",
        "这是由博物馆解释的具体家庭案例。不能据此推断精确的日程，也不能把重构中的每件物品都视为 Levine 家庭原物。"
      ],
      sources: ["levine", "apartment"]
    }
  ];

  /* 状态与工具 */
  const $ = (selector, root = document) => root.querySelector(selector);

  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector)
  ];

  const state = {
    filter: "all",
    current: null,
    zoom: 1,
    fitScale: 1,
    x: 0,
    y: 0,
    drag: null,
    suppressClick: false
  };

  const pick = pair => pair[0];

  const t = key => pick(I18N[key] || [key, key]);

  const escapeHTML = text => String(text).replace(
    /[&<>"']/g,
    char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char])
  );

  const findCase = id => CASES.find(item => item.id === id);

  const filteredCases = () => CASES.filter(
    item => state.filter === "all" || item.chapter === state.filter
  );

  const isMobile = () => window.matchMedia(
    "(max-width: 680px)"
  ).matches;

  const viewport = $("#viewport");
  const artboard = $("#artboard");
  const reader = $("#reader-dialog");
  const editorial = $("#editorial-dialog");

  function announce(message) {
    $("#status").textContent = message;
  }

  function sourceLinks(keys) {
    return keys.map(key => {
      const source = SOURCES[key];

      return `
        <a
          class="source-link"
          href="${escapeHTML(source.url)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${escapeHTML(source.title)} ↗
        </a>
      `;
    }).join("");
  }

  /* 生成六个案例 */
  function renderCases() {
    $("#case-collection").innerHTML = CASES.map(item => `
      <article
        class="case-study"
        data-case="${item.id}"
        style="
          --x:${item.x}px;
          --y:${item.y}px;
          --w:${item.w}px;
          --rotation:${item.rotation}deg;
        "
      >
        <button
          class="case-open"
          data-open="${item.id}"
          aria-label="${escapeHTML(pick(item.title))}"
        >
          <img
            class="case-image"
            src="${item.image}"
            alt="${escapeHTML(pick(item.title))} — ${escapeHTML(t("diagramNote"))}"
            draggable="false"
            width="360"
            height="240"
          >

          <span class="case-caption">
            <span class="case-id">${item.num}</span>
            <span>${escapeHTML(pick(item.title))}</span>
            <span class="case-arrow" aria-hidden="true">↗</span>
          </span>

          <span class="case-subtitle">
            ${escapeHTML(pick(item.place))}
          </span>
        </button>
      </article>
    `).join("");

    applyFilter();
  }

  function applyFilter() {
    $$(".case-study").forEach(node => {
      const item = findCase(node.dataset.case);

      node.classList.toggle(
        "filtered-out",
        state.filter !== "all" && item.chapter !== state.filter
      );
    });

    $$("[data-filter]").forEach(button => {
      const active = button.dataset.filter === state.filter;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    $("#result-count").textContent =
      `${String(filteredCases().length).padStart(2, "0")} / ${String(CASES.length).padStart(2, "0")}`;
  }

  /* 案例详情 */
  function renderReader() {
    const item = findCase(state.current);
    if (!item) return;

    const list = filteredCases();
    const index = list.findIndex(entry => entry.id === item.id);

    $("#reader-content").innerHTML = `
      <div class="reader-visual">
        <p class="micro">
          ${escapeHTML(t(item.chapter))} / CASE STUDY
        </p>

        <div class="reader-number" aria-hidden="true">
          ${item.num}
        </div>

        <img
          src="${item.image}"
          alt="${escapeHTML(pick(item.title))} — ${escapeHTML(t("diagramNote"))}"
          width="360"
          height="240"
        >

        <p class="diagram-caption">
          ${escapeHTML(t("diagramNote"))}
          <br>
          Original drawing for this project.
          Spatial relationships are illustrative.
        </p>
      </div>

      <div class="reader-text">
        <div class="dialog-bar">
          <span class="micro">
            ${item.num} / ${escapeHTML(t(item.chapter))}
          </span>

          <button
            class="close-button"
            data-close="reader-dialog"
            aria-label="${escapeHTML(t("close"))}"
          >
            ×
          </button>
        </div>

        <h2 id="reader-title">
          ${escapeHTML(pick(item.title))}
        </h2>

        <div class="reader-place">
          ${escapeHTML(pick(item.place))}
          <br>
          ${escapeHTML(pick(item.period))}
        </div>

        <p class="reader-question">
          ${escapeHTML(pick(item.question))}
        </p>

        <h3>${escapeHTML(t("evidence"))}</h3>
        <p>${escapeHTML(pick(item.evidence))}</p>

        <h3>${escapeHTML(t("meaning"))}</h3>
        <p>${escapeHTML(pick(item.meaning))}</p>

        <h3>${escapeHTML(t("limit"))}</h3>
        <p class="source-note">
          ${escapeHTML(pick(item.limit))}
        </p>

        <h3>${escapeHTML(t("references"))}</h3>
        ${sourceLinks(item.sources)}

        <div class="reader-nav">
          <button
            class="text-button"
            data-step="-1"
            ${index <= 0 ? "disabled" : ""}
          >
            ${escapeHTML(t("previous"))}
          </button>

          <button
            class="text-button"
            data-step="1"
            ${index < 0 || index >= list.length - 1 ? "disabled" : ""}
          >
            ${escapeHTML(t("next"))}
          </button>
        </div>
      </div>
    `;
  }

  function openCase(id) {
    if (!findCase(id)) return;

    state.current = id;
    renderReader();

    if (!reader.open) {
      reader.showModal();
    }

    $(".reader-text", reader).scrollTop = 0;
    $("#reader-content").scrollTop = 0;

    $("[data-close]", reader).focus({
      preventScroll: true
    });
  }

  /* 研究方法与来源 */
  function renderEditorial() {
    $("#editorial-content").innerHTML = `
      <h2 id="editorial-title">
        How does a room become a home?
      </h2>

      <p class="editorial-lead">
        Home takes shape in the ways we enter, gather,
        and care for one another.
      </p>

      <div class="editorial-body">
        <p>
          This atlas brings six situated examples into conversation.
          An entrance can negotiate access.
          A gathering space can carry hospitality and identity.
          A kitchen can organize care and paid or unpaid work.
          These are questions to investigate through sources,
          rather than universal definitions of entire cultures.
        </p>

        <p>
          The project uses online museum research, educational resources,
          heritage documentation, a published interview, and a scholarly
          abstract. Source-based description and our interpretation are
          separated in each case. A spatial convention, a named household,
          and a curated reconstruction are different kinds of evidence.
        </p>

        <p>
          All six drawings are original interpretive schematics made for
          this interface. They have no survey dimensions and do not
          reproduce historical plans. Their purpose is to make selected
          relationships readable. They should not be used as architectural
          evidence.
        </p>
      </div>

      <h3 id="source-register">
        ${escapeHTML(t("sources"))}
      </h3>

      <p class="source-note">
        ${escapeHTML(t("sourcesIntro"))}
      </p>

      <ol class="editorial-sources">
        ${Object.values(SOURCES).map(source => `
          <li>
            <a
              href="${escapeHTML(source.url)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${escapeHTML(source.title)} ↗
            </a>
          </li>
        `).join("")}
      </ol>

      <p class="editorial-credit">
        VISUAL DIRECTION / Olive, pale pink, fold lines, and rotated
        marginalia respond to the supplied print reference.
        The spatial index / detail / editorial browsing logic responds
        to Kellerstöckl Architektur. This is an original implementation;
        their code and photographs are not included.
        <br>
        <a
          href="https://www.kellerstoecklarchitektur.at/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kellerstöckl Architektur ↗
        </a>
      </p>

      <button id="print-button" class="solid-button">
        ${escapeHTML(t("print"))}
      </button>
    `;
  }

  function openEditorial(showSources = false) {
    renderEditorial();
    editorial.showModal();
    editorial.scrollTop = 0;

    if (showSources) {
      requestAnimationFrame(() => {
        $("#source-register").scrollIntoView({
          block: "start"
        });
      });
    }
  }

  function initializeContent() {
    $$("[data-i18n]").forEach(node => {
      node.textContent = t(node.dataset.i18n);
    });

    renderCases();
  }

  /* 画布缩放 */
  function paintCanvas() {
    artboard.style.transform =
      `translate(${state.x}px, ${state.y}px) scale(${state.fitScale * state.zoom})`;

    $("#zoom").value = String(Math.round(state.zoom * 100));

    $("#zoom-value").value =
      `${Math.round(state.zoom * 100)}%`;
  }

  function fitCanvas() {
    if (isMobile()) return;

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;

    state.fitScale = Math.min(
      (width - 60) / 1520,
      (height - 15) / 930
    );

    state.zoom = 1;
    state.x = (width - 1520 * state.fitScale) / 2;
    state.y = (height - 930 * state.fitScale) / 2;

    paintCanvas();
  }

  function setZoom(value) {
    const oldScale = state.fitScale * state.zoom;
    const cx = viewport.clientWidth / 2;
    const cy = viewport.clientHeight / 2;

    const worldX = (cx - state.x) / oldScale;
    const worldY = (cy - state.y) / oldScale;

    state.zoom = Math.max(.75, Math.min(1.9, value));

    const newScale = state.fitScale * state.zoom;

    state.x = cx - worldX * newScale;
    state.y = cy - worldY * newScale;

    paintCanvas();
  }

  /* 打印研究摘要 */
  function printReader() {
    let printArea = $("#print-output");

    if (!printArea) {
      printArea = document.createElement("div");
      printArea.id = "print-output";
      document.body.append(printArea);
    }

    printArea.innerHTML = `
      <h1>Where Home Happens</h1>
      <p>${escapeHTML(t("researchNote"))}</p>
    ` + CASES.map(item => `
      <article>
        <p>
          ${item.num} / ${escapeHTML(t(item.chapter))}
        </p>

        <h2>${escapeHTML(pick(item.title))}</h2>

        <p>
          ${escapeHTML(pick(item.place))}
          ·
          ${escapeHTML(pick(item.period))}
        </p>

        <img
          src="${item.image}"
          alt="${escapeHTML(t("diagramNote"))}"
        >

        <h3>${escapeHTML(t("evidence"))}</h3>
        <p>${escapeHTML(pick(item.evidence))}</p>

        <h3>${escapeHTML(t("meaning"))}</h3>
        <p>${escapeHTML(pick(item.meaning))}</p>

        <h3>${escapeHTML(t("limit"))}</h3>
        <p>${escapeHTML(pick(item.limit))}</p>

        ${item.sources.map(key => `
          <p>
            ${escapeHTML(SOURCES[key].title)}
            <br>
            <a href="${escapeHTML(SOURCES[key].url)}">
              ${escapeHTML(SOURCES[key].url)}
            </a>
          </p>
        `).join("")}
      </article>
    `).join("");

    window.print();
  }

  /* 按钮事件 */
  document.addEventListener("click", event => {
    const target = event.target.closest("button");

    if (!target) return;

    if (state.suppressClick && target.closest("#viewport")) {
      event.preventDefault();
      return;
    }

    if (target.dataset.open) {
      openCase(target.dataset.open);
    } else if (target.dataset.close) {
      document.getElementById(target.dataset.close).close();
    } else if (target.dataset.filter) {
      state.filter = target.dataset.filter;
      applyFilter();
      fitCanvas();

      announce(
        `${t(state.filter)}: ${filteredCases().length}`
      );
    } else if (target.dataset.step) {
      const list = filteredCases();

      const index = list.findIndex(
        item => item.id === state.current
      );

      const next = list[index + Number(target.dataset.step)];

      if (next) {
        openCase(next.id);
      }
    } else if (target.id === "sources-button") {
      openEditorial(true);
    } else if (target.id === "print-button") {
      printReader();
    } else if (target.id === "fit-button") {
      fitCanvas();
    } else if (target.id === "home-button") {
      state.filter = "all";
      applyFilter();
      fitCanvas();
    }
  });

  /* 点击弹窗背景关闭 */
  [reader, editorial].forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;

      const box = dialog.getBoundingClientRect();

      const outside =
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom;

      if (outside) {
        dialog.close();
      }
    });
  });

  reader.addEventListener("close", () => {
    state.current = null;
  });

  $("#zoom").addEventListener("input", event => {
    setZoom(Number(event.target.value) / 100);
  });

  /* 桌面拖动画布 */
  viewport.addEventListener("pointerdown", event => {
    if (isMobile() || event.button !== 0) return;

    state.drag = {
      id: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      x: state.x,
      y: state.y,
      moved: false
    };
  });

  viewport.addEventListener("pointermove", event => {
    const drag = state.drag;

    if (!drag || drag.id !== event.pointerId) return;

    const dx = event.clientX - drag.clientX;
    const dy = event.clientY - drag.clientY;

    if (!drag.moved && Math.hypot(dx, dy) > 6) {
      drag.moved = true;
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add("dragging");
    }

    if (drag.moved) {
      state.x = Math.max(
        -1520 * state.fitScale * state.zoom + 120,
        Math.min(viewport.clientWidth - 120, drag.x + dx)
      );

      state.y = Math.max(
        -930 * state.fitScale * state.zoom + 120,
        Math.min(viewport.clientHeight - 120, drag.y + dy)
      );

      paintCanvas();
    }
  });

  function endDrag(event) {
    const drag = state.drag;

    if (!drag || drag.id !== event.pointerId) return;

    state.suppressClick = drag.moved;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    viewport.classList.remove("dragging");
    state.drag = null;

    setTimeout(() => {
      state.suppressClick = false;
    }, 0);
  }

  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);

  window.addEventListener("pointerup", event => {
    if (state.drag) {
      endDrag(event);
    }
  });

  /* 详情左右键翻页，Escape 由原生 dialog 处理 */
  document.addEventListener("keydown", event => {
    if (
      !reader.open ||
      /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)
    ) {
      return;
    }

    if (
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft"
    ) {
      const step = event.key === "ArrowRight" ? "1" : "-1";
      const button = $(`[data-step="${step}"]`, reader);

      if (button && !button.disabled) {
        event.preventDefault();
        button.click();
      }
    }
  });

  let resizeFrame;

  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(fitCanvas);
  });

  window.addEventListener("afterprint", () => {
    $("#print-output")?.remove();
  });

  /* 初始化正文 */
  initializeContent();
  requestAnimationFrame(fitCanvas);

  /* 开场动画 */
  const landing = $("#landing");

  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let introSeen = false;

  try {
    introSeen = sessionStorage.getItem("whh-intro-seen") === "1";
  } catch {
    // 浏览器禁用存储时仍然可以正常进入网站。
  }

  if (landing && !introSeen && !motionPreference.matches) {
    const shell = $("#app");
    const title = $(".landing-title", landing);
    const skip = $(".landing-skip", landing);

    /*
     * trim() 去掉 HTML 换行产生的空白，
     * 确保只对标题文字逐字动画。
     */
    const letters = Array.from(
      title.textContent.trim(),
      (letter, index) => {
        const span = document.createElement("span");

        span.textContent = letter === " " ? "\u00a0" : letter;
        span.style.setProperty("--letter", index);
        span.setAttribute("aria-hidden", "true");

        return span;
      }
    );

    title.replaceChildren(...letters);

    landing.hidden = false;
    shell.inert = true;
    document.body.classList.add("is-landing");

    let leaving = false;
    let timer;

    function enterArchive() {
      if (leaving) return;

      leaving = true;

      const restoreFocus = landing.contains(
        document.activeElement
      );

      clearTimeout(timer);

      try {
        sessionStorage.setItem("whh-intro-seen", "1");
      } catch {
        // 存储不可用不影响动画结束。
      }

      document.body.classList.add("is-entering");
      landing.classList.add("is-leaving");

      const finish = () => {
        landing.hidden = true;
        shell.inert = false;

        document.body.classList.remove(
          "is-landing",
          "is-entering"
        );

        if (restoreFocus) {
          $("#home-button").focus({
            preventScroll: true
          });
        }

        fitCanvas();
      };

      window.setTimeout(
        finish,
        motionPreference.matches ? 0 : 1400
      );

      motionPreference.removeEventListener(
        "change",
        onMotionChange
      );
    }

    function onMotionChange(event) {
      if (event.matches) {
        enterArchive();
      }
    }

    skip.addEventListener("click", enterArchive);

    landing.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        enterArchive();
      }
    });

    motionPreference.addEventListener(
      "change",
      onMotionChange
    );

    // 文字浮现与停留时间，单位毫秒。
    timer = window.setTimeout(enterArchive, 3400);
  }
})();