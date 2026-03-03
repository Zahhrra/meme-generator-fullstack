const API_URL = "/api";

// DOM
const templateList = document.getElementById("templateList");
const memeList = document.getElementById("memeList");
const memeForm = document.getElementElementById?.("memeForm") || document.getElementById("memeForm");

const textColorInput = document.getElementById("textColor");
const outlineColorInput = document.getElementById("outlineColor");
const fontSizeInput = document.getElementById("fontSize");

const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");

let selectedTemplate = null;
let currentPositions = [];

// Drag state (mouse + touch üçün)
const dragState = {
  box: null,
  container: null,
  index: null,
  offsetX: 0,
  offsetY: 0,
};

//  LOAD TEMPLATES
async function loadTemplates() {
  const res = await fetch(`${API_URL}/templates`);
  const data = await res.json();

  templateList.innerHTML = data.templates
  .map(
    (t) => `
      <div 
        class="template-card cursor-pointer border-2 border-transparent hover:border-purple-500 
               rounded-xl overflow-hidden shadow-md transition bg-white 
               min-w-[180px] max-w-[180px] flex-shrink-0"
        data-id="${t.id}"
      >
        <img src="${t.imageUrl}" class="w-full h-32 object-cover" />
      </div>
    `
  )
  .join("");


  document.querySelectorAll(".template-card").forEach((card) =>
    card.addEventListener("click", () => selectTemplate(card.dataset.id))
  );
}

// SELECT TEMPLATE + PREVIEW
async function selectTemplate(id) {
  const res = await fetch(`${API_URL}/templates`);
  const data = await res.json();

  selectedTemplate = data.templates.find((t) => t.id === id);
  if (!selectedTemplate) return;

  document.getElementById("templateId").value = id;

  document
    .querySelectorAll(".template-card")
    .forEach((c) => c.classList.remove("border-purple-600", "scale-105"));
  document
    .querySelector(`.template-card[data-id="${id}"]`)
    .classList.add("border-purple-600", "scale-105");

  showPreview(selectedTemplate);
}

// PREVIEW RENDER (drag üçün hazırlıq)
function showPreview(template) {
  const preview = document.getElementById("previewContainer");
  const img = document.getElementById("previewImage");
  const boxes = document.getElementById("previewTextBoxes");

  preview.classList.remove("hidden");

  img.src = template.imageUrl;
  img.crossOrigin = "anonymous";

  boxes.innerHTML = "";

  // Template.positions string "%"-lərdən ibarətdir → number %-ə çevirək
  currentPositions =
    (template.positions || []).map((p) => ({
      x: typeof p.x === "string" ? parseFloat(p.x) : p.x,
      y: typeof p.y === "string" ? parseFloat(p.y) : p.y,
    })) || [];

  currentPositions.forEach((pos, i) => {
    const div = document.createElement("div");
    div.className =
      "absolute font-extrabold pointer-events-auto text-center w-full select-none";
    div.dataset.index = String(i);

    div.style.left = `${pos.x}%`;
    div.style.top = `${pos.y}%`;
    div.style.transform = "translate(-50%, -50%)";

    div.style.color = textColorInput.value;
    div.style.fontSize = fontSizeInput.value + "px";
    div.style.webkitTextStroke = `2px ${outlineColorInput.value}`;
    div.innerText = i === 0 ? topTextInput.value || "(Top text)" : bottomTextInput.value || "(Bottom text)";

    // Drag events (mouse + touch)
    div.addEventListener("mousedown", (e) => startDrag(e, div, i));
    div.addEventListener("touchstart", (e) => startDrag(e, div, i), {
      passive: false,
    });

    boxes.appendChild(div);
  });
}

// DRAG HANDLERS (mouse + touch)
function startDrag(e, box, index) {
  e.preventDefault();

  const preview = document.getElementById("previewContainer");
  dragState.box = box;
  dragState.container = preview;
  dragState.index = index;

  const point = e.touches ? e.touches[0] : e;
  const boxRect = box.getBoundingClientRect();

  dragState.offsetX = point.clientX - boxRect.left;
  dragState.offsetY = point.clientY - boxRect.top;

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchmove", handleDragMove, { passive: false });
  document.addEventListener("touchend", endDrag);
}

function handleDragMove(e) {
  if (!dragState.box || !dragState.container) return;

  e.preventDefault();

  const point = e.touches ? e.touches[0] : e;
  const containerRect = dragState.container.getBoundingClientRect();

  let x =
    point.clientX -
    containerRect.left -
    dragState.offsetX +
    dragState.box.offsetWidth / 2;
  let y =
    point.clientY -
    containerRect.top -
    dragState.offsetY +
    dragState.box.offsetHeight / 2;

  // Container-dən çıxmasın deyə clamp edirik
  if (x < 0) x = 0;
  if (x > containerRect.width) x = containerRect.width;
  if (y < 0) y = 0;
  if (y > containerRect.height) y = containerRect.height;

  const xPercent = (x / containerRect.width) * 100;
  const yPercent = (y / containerRect.height) * 100;

  dragState.box.style.left = `${xPercent}%`;
  dragState.box.style.top = `${yPercent}%`;

  currentPositions[dragState.index] = { x: xPercent, y: yPercent };
}

function endDrag() {
  if (!dragState.box) return;

  dragState.box = null;
  dragState.container = null;
  dragState.index = null;

  document.removeEventListener("mousemove", handleDragMove);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchmove", handleDragMove);
  document.removeEventListener("touchend", endDrag);
}

// LIVE PREVIEW TEXT UPDATE
function updatePreview() {
  const boxes = document.querySelectorAll("#previewTextBoxes div");

  const top = topTextInput.value;
  const bottom = bottomTextInput.value;

  if (boxes[0]) boxes[0].innerText = top || "(Top text)";
  if (boxes[1]) boxes[1].innerText = bottom || "(Bottom text)";

  boxes.forEach((box) => {
    box.style.color = textColorInput.value;
    box.style.webkitTextStroke = `2px ${outlineColorInput.value}`;
    box.style.fontSize = fontSizeInput.value + "px";
  });
}

topTextInput.addEventListener("input", updatePreview);
bottomTextInput.addEventListener("input", updatePreview);
textColorInput.addEventListener("input", updatePreview);
outlineColorInput.addEventListener("input", updatePreview);
fontSizeInput.addEventListener("input", updatePreview);

// DOWNLOAD PREVIEW
document.getElementById("downloadBtn").addEventListener("click", () => {
  const preview = document.getElementById("previewContainer");

  html2canvas(preview, {
    useCORS: true,
    backgroundColor: null,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

// SAVE MEME (style + positions localStorage-da, meme DB-də)
memeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const templateId = document.getElementById("templateId").value;
  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;

  if (!templateId) {
    alert("Əvvəlcə template seçin");
    return;
  }

  // 1) Meme yaradılır (backend yalnız textləri + template-i saxlayır)
  const res = await fetch(`${API_URL}/memes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      templateId,
      topText,
      bottomText,
      positions: currentPositions,
    }),
  });

  if (!res.ok) {
    alert("Xəta: Meme yaradıla bilmədi.");
    return;
  }

  const createdMeme = await res.json();

  // 2) Style + positions-i localStorage-da meme.id ilə saxlayırıq
  localStorage.setItem(
    "style-" + createdMeme.id,
    JSON.stringify({
      textColor: textColorInput.value,
      outlineColor: outlineColorInput.value,
      fontSize: fontSizeInput.value,
      positions: currentPositions,
    })
  );

  loadMemes();
});

//  LOAD CREATED MEMES (Style + positions tətbiqi ilə)
async function loadMemes() {
  const res = await fetch(`${API_URL}/memes`);
  const data = await res.json();

  memeList.innerHTML = "";

  // Templates lazımdır ki, positions olmasa default-dan götürək
  const templatesRes = await fetch(`${API_URL}/templates`);
  const templatesData = await templatesRes.json();

  for (const meme of data.memes) {
    const template = templatesData.templates.find(
      (t) => t.name === meme.templateName
    );

    // Style + positions localStorage-dan
    const saved =
      JSON.parse(localStorage.getItem("style-" + meme.id) || "null") || {};

    const textColor = saved.textColor || "#ffffff";
    const outlineColor = saved.outlineColor || "#000000";
    const fontSize = saved.fontSize || 32;

    // Positions — əgər saved.positions varsa ondan, yoxdursa template.positions-dan
    let positions = [];
    if (saved.positions && saved.positions.length) {
      positions = saved.positions;
    } else if (template && template.positions) {
      positions = template.positions.map((p) => ({
        x: typeof p.x === "string" ? parseFloat(p.x) : p.x,
        y: typeof p.y === "string" ? parseFloat(p.y) : p.y,
      }));
    }

    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow-lg overflow-hidden border p-4 flex flex-col items-center gap-4";

    const preview = document.createElement("div");
    preview.className =
      "relative w-full h-64 rounded-lg overflow-hidden border bg-black flex justify-center items-center";

    const img = document.createElement("img");
    img.src = meme.imageUrl;
    img.crossOrigin = "anonymous";
    img.className = "max-w-full max-h-full object-contain opacity-90";
    preview.appendChild(img);

    const overlay = document.createElement("div");
    overlay.className = "absolute inset-0";
    preview.appendChild(overlay);

    positions.forEach((pos, i) => {
      const xPerc = typeof pos.x === "number" ? pos.x : parseFloat(pos.x);
      const yPerc = typeof pos.y === "number" ? pos.y : parseFloat(pos.y);

      const box = document.createElement("div");
      box.className =
        "absolute font-extrabold text-center w-full text-white drop-shadow-xl select-none";

      box.style.left = `${xPerc}%`;
      box.style.top = `${yPerc}%`;
      box.style.transform = "translate(-50%, -50%)";

      box.style.fontSize = fontSize + "px";
      box.style.color = textColor;
      box.style.webkitTextStroke = `2px ${outlineColor}`;

      box.innerText = i === 0 ? meme.topText : meme.bottomText;

      overlay.appendChild(box);
    });

    card.appendChild(preview);

    const btns = document.createElement("div");
    btns.className = "flex gap-4";

    const dl = document.createElement("button");
    dl.className =
      "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700";
    dl.innerText = "📥 Download";
    dl.onclick = () => downloadMeme(preview);

    const del = document.createElement("button");
    del.className =
      "bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700";
    del.innerText = "🗑 Delete";
    del.onclick = async () => {
      await fetch(`/api/memes/${meme.id}`, { method: "DELETE" });
      loadMemes();
    };

    btns.append(dl, del);
    card.append(btns);

    memeList.appendChild(card);
  }
}

// DOWNLOAD CREATED MEME
function downloadMeme(previewElement) {
  html2canvas(previewElement, {
    useCORS: true,
    backgroundColor: null,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

// INITIAL
loadTemplates();
loadMemes();
