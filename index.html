/* --- 1. UI LOGIC (TABS & MINDMAP) --- */
function switchTab(tabId) {
    const activeClass = 'px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400 transition-all flex items-center';
    const inactiveClass = 'px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all flex items-center';
    
    document.getElementById('tab-mindmap').className = tabId === 'mindmap' ? activeClass : inactiveClass;
    document.getElementById('tab-quiz').className = tabId === 'quiz' ? activeClass : inactiveClass;
    document.getElementById('mindmapTab').style.display = tabId === 'mindmap' ? 'block' : 'none';
    document.getElementById('quizTab').style.display = tabId === 'quiz' ? 'block' : 'none';

    if (tabId === 'mindmap') {
        document.body.classList.add('mindmap-active');
    } else {
        document.body.classList.remove('mindmap-active');
    }
}

const detailPanel = document.getElementById('detailPanel');
const backdrop = document.getElementById('backdrop');

function openDetail(chapterId) {
    const data = chapterData[chapterId];
    if(!data) return;
    document.getElementById('detailChapter').innerText = data.chapter;
    document.getElementById('detailTitle').innerText = data.title;
    document.getElementById('panelHeader').className = `p-6 border-b dark:border-gray-700 flex justify-between items-center text-white ${data.color}`;
    let htmlContent = `<div class="mb-6"><div class="w-16 h-16 ${data.color} rounded-full flex items-center justify-center text-white text-2xl mb-4 shadow-md"><i class="fa-solid ${data.icon}"></i></div><p class="text-gray-700 dark:text-gray-300 italic font-medium">"${data.summary}"</p></div><div><h3 class="font-bold text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-2 mb-3">Nội dung cốt lõi:</h3><ul class="space-y-3">`;
    data.points.forEach(point => { htmlContent += `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-green-500 mt-1 text-sm"></i><span class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">${point}</span></li>`; });
    htmlContent += `</ul></div><div class="mt-8 pt-4 border-t dark:border-gray-700"><button onclick="goToChapterQuiz(${chapterId})" class="w-full bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 font-bold py-2 rounded transition">Làm trắc nghiệm ${data.chapter} <i class="fa-solid fa-arrow-right ml-1"></i></button></div>`;
    document.getElementById('detailContent').innerHTML = htmlContent;
    backdrop.classList.remove('hidden');
    setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
    detailPanel.classList.remove('translate-x-full');
}

function closeDetail() {
    detailPanel.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => backdrop.classList.add('hidden'), 300);
}

function goToChapterQuiz(chapId) { closeDetail(); switchTab('quiz'); loadChapterQuiz(chapId); }

/* --- 2. QUIZ LOGIC --- */
let currentQuizData = [];
let currentQuizMode = ''; 
let selectedChapter = null;
let currentMockExamId = null;

function renderChapterButtons() {
    const container = document.getElementById('chapterButtonsContainer');
    if (!container || typeof chapterData === 'undefined') return;
    container.innerHTML = '';
    Object.keys(chapterData).forEach(i => {
        container.innerHTML += `
            <button onclick="loadChapterQuiz(${i})" class="bg-white dark:bg-slate-800 border dark:border-slate-700 hover:border-blue-500 hover:shadow-md p-4 rounded-xl text-left transition group">
                <div class="font-bold text-blue-600 dark:text-blue-400 mb-1">Chương ${i}</div>
                <div class="text-sm text-slate-600 dark:text-slate-300 truncate">${chapterData[i].title}</div>
                <div class="text-xs text-slate-400 mt-2">${questionBank[i]?.length || 0} câu hỏi</div>
            </button>`;
    });
}

function showChapterSelection() {
    document.getElementById('quizMenu').style.display = 'none';
    document.getElementById('chapterSelection').style.display = 'block';
}

function backToMenu() {
    document.getElementById('quizMenu').style.display = 'block';
    document.getElementById('chapterSelection').style.display = 'none';
    document.getElementById('quizExecution').style.display = 'none';
}

function loadChapterQuiz(chapId) {
    currentQuizMode = 'chapter'; selectedChapter = chapId;
    currentQuizData = [...questionBank[chapId]];
    document.getElementById('quizTitle').innerText = `Ôn tập: Chương ${chapId}`;
    document.getElementById('quizSubtitle').innerText = chapterData[chapId].title;
    renderQuiz();
}

function startMockExam() {
    currentQuizMode = 'mock'; currentMockExamId = Date.now();
    let allQ = []; Object.values(questionBank).forEach(qArr => allQ = allQ.concat(qArr));
    currentQuizData = allQ.sort(() => 0.5 - Math.random()).slice(0, 40);
    document.getElementById('quizTitle').innerText = `Thi thử Tổng hợp`;
    document.getElementById('quizSubtitle').innerText = `40 câu ngẫu nhiên từ Chương 1-9`;
    renderQuiz();
}

function renderQuiz() {
    document.getElementById('quizMenu').style.display = 'none';
    document.getElementById('chapterSelection').style.display = 'none';
    document.getElementById('quizExecution').style.display = 'block';
    const container = document.getElementById('questionsContainer');
    let html = '';
    currentQuizData.forEach((q, idx) => {
        html += `<div class="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-700" id="qblock-${idx}">
            <div class="font-bold dark:text-white mb-4 text-base md:text-lg"><span class="text-blue-600 mr-1">Câu ${idx + 1}:</span> ${q.q}</div>
            <div class="space-y-2">`;
        q.options.forEach((opt, oIdx) => {
            html += `<label class="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
                <input type="radio" name="q${idx}" value="${oIdx}" class="w-4 h-4 text-blue-600">
                <span class="text-sm md:text-base dark:text-slate-200">${opt}</span>
            </label>`;
        });
        html += `</div><div id="feedback-${idx}" class="mt-4 hidden p-3 rounded-lg text-sm font-semibold"></div></div>`;
    });
    container.innerHTML = html;
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('retryBtn').classList.add('hidden');
    document.getElementById('resultSummary').classList.add('hidden');
    window.scrollTo(0,0);
}

function submitQuiz() {
    let score = 0;
    currentQuizData.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        const fb = document.getElementById(`feedback-${idx}`);
        const block = document.getElementById(`qblock-${idx}`);
        document.querySelectorAll(`input[name="q${idx}"]`).forEach(i => i.disabled = true);
        fb.classList.remove('hidden');
        if (selected && parseInt(selected.value) === q.correct) {
            score++; fb.innerHTML = '✓ Chính xác!'; fb.className = "mt-4 p-3 rounded-lg bg-green-100 text-green-700";
            block.classList.add('border-green-300');
        } else {
            fb.innerHTML = `✗ Sai. Đáp án đúng: ${q.options[q.correct]}`; fb.className = "mt-4 p-3 rounded-lg bg-red-100 text-red-700";
            block.classList.add('border-red-300');
        }
    });
    const pct = Math.round((score / currentQuizData.length) * 100);
    const summary = document.getElementById('resultSummary');
    summary.innerHTML = `Kết quả: ${score}/${currentQuizData.length} (${pct}%)`;
    summary.classList.remove('hidden');
    saveScoreHistory(currentQuizMode, currentQuizMode === 'chapter' ? selectedChapter : 'Mix', score, currentQuizData.length);
    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('retryBtn').classList.remove('hidden');
}

function retryCurrentQuiz() {
    document.querySelectorAll('input[type="radio"]').forEach(i => { i.checked = false; i.disabled = false; });
    document.querySelectorAll('[id^="feedback-"]').forEach(f => f.classList.add('hidden'));
    document.querySelectorAll('[id^="qblock-"]').forEach(b => b.classList.remove('border-green-300', 'border-red-300'));
    document.getElementById('resultSummary').classList.add('hidden');
    document.getElementById('retryBtn').classList.add('hidden');
    document.getElementById('submitBtn').classList.remove('hidden');
    window.scrollTo(0,0);
}

/* --- 3. HISTORY & MINDMAP AUTO-GEN --- */
function saveScoreHistory(mode, id, score, total) {
    let history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    history.push({ mode, id, score, total, date: new Date().toLocaleString() });
    localStorage.setItem('quizHistory', JSON.stringify(history));
}

function openHistory() {
    const modal = document.getElementById('historyModal');
    const content = document.getElementById('historyContent');
    let history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    if (history.length === 0) {
        content.innerHTML = '<p class="text-center text-slate-500 py-10">Chưa có lịch sử làm bài.</p>';
    } else {
        let html = '<div class="space-y-3">';
        [...history].reverse().forEach(item => {
            const pct = Math.round((item.score / item.total) * 100);
            html += `<div class="p-3 border dark:border-slate-700 rounded-lg flex justify-between items-center ${pct >= 50 ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}">
                <div><div class="font-bold dark:text-white">${item.mode === 'chapter' ? 'Chương ' + item.id : 'Thi thử'}</div><div class="text-xs text-slate-500">${item.date}</div></div>
                <div class="text-right font-bold ${pct >= 50 ? 'text-green-600' : 'text-red-600'}">${item.score}/${item.total} (${pct}%)</div>
            </div>`;
        });
        content.innerHTML = html + '</div>';
    }
    modal.classList.remove('hidden');
    setTimeout(() => { modal.firstElementChild.classList.remove('scale-95', 'opacity-0'); modal.firstElementChild.classList.add('scale-100', 'opacity-100'); }, 10);
}

function closeHistory() {
    const modal = document.getElementById('historyModal');
    modal.firstElementChild.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
}

function clearHistory() { if(confirm('Xóa hết lịch sử?')) { localStorage.removeItem('quizHistory'); openHistory(); } }

function renderMindmap() {
    const mm = document.getElementById('mindmap');
    if (!mm || typeof chapterData === 'undefined') return;
    let html = `<div class="node ${chapterData[1].color} mb-20 text-xl" onclick="openDetail(1)">${chapterData[1].chapter}: Tổng quan</div><div class="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20">`;
    Object.keys(chapterData).slice(1).forEach(i => {
        html += `<div class="node ${chapterData[i].color}" onclick="openDetail(${i})">${chapterData[i].chapter}</div>`;
    });
    mm.innerHTML = html + `</div>`;
}

document.addEventListener('DOMContentLoaded', () => { renderMindmap(); renderChapterButtons(); });
