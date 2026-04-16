// JS cho giao diện Sơ đồ tư duy (Native Scroll)
function centerMindmap() {
    const canvas = document.getElementById('canvas');
    const mindmap = document.getElementById('mindmap');
    if(mindmap.offsetWidth > canvas.clientWidth) {
        canvas.scrollLeft = (mindmap.offsetWidth - canvas.clientWidth) / 2;
    }
}

/* --- 3. UI LOGIC (TABS & MINDMAP) --- */
function switchTab(tabId) {
    const activeClass = 'px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400 transition-all flex items-center';
    const inactiveClass = 'px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all flex items-center';
    
    document.getElementById('tab-mindmap').className = tabId === 'mindmap' ? activeClass : inactiveClass;
    document.getElementById('tab-quiz').className = tabId === 'quiz' ? activeClass : inactiveClass;

    document.getElementById('mindmapTab').style.display = tabId === 'mindmap' ? 'block' : 'none';
    document.getElementById('quizTab').style.display = tabId === 'quiz' ? 'block' : 'none';

    if (tabId === 'mindmap') {
        document.body.classList.add('mindmap-active');
        centerMindmap();
    } else {
        document.body.classList.remove('mindmap-active');
    }
}

// Mindmap Panel Logic
const detailPanel = document.getElementById('detailPanel');
const backdrop = document.getElementById('backdrop');

function openDetail(chapterId) {
    const data = chapterData[chapterId];
    if(!data) return;

    document.getElementById('detailChapter').innerText = data.chapter;
    document.getElementById('detailTitle').innerText = data.title;
    document.getElementById('panelHeader').className = `p-6 border-b dark:border-gray-700 flex justify-between items-center text-white ${data.color}`;

    let htmlContent = `
        <div class="mb-6">
            <div class="w-16 h-16 ${data.color} rounded-full flex items-center justify-center text-white text-2xl mb-4 shadow-md">
                <i class="fa-solid ${data.icon}"></i>
            </div>
            <p class="text-gray-700 dark:text-gray-300 italic font-medium">"${data.summary}"</p>
        </div>
        <div>
            <h3 class="font-bold text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-2 mb-3">Nội dung cốt lõi:</h3>
            <ul class="space-y-3">
    `;
    data.points.forEach(point => {
        htmlContent += `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-green-500 mt-1 text-sm"></i><span class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">${point}</span></li>`;
    });
    htmlContent += `</ul></div>
        <div class="mt-8 pt-4 border-t dark:border-gray-700">
            <button onclick="goToChapterQuiz(${chapterId})" class="w-full bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 font-bold py-2 rounded transition">
                Làm trắc nghiệm ${data.chapter} <i class="fa-solid fa-arrow-right ml-1"></i>
            </button>
        </div>
    `;
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

function goToChapterQuiz(chapId) {
    closeDetail();
    switchTab('quiz');
    loadChapterQuiz(chapId);
}

/* --- 4. QUIZ LOGIC --- */
let currentQuizData = [];
let currentQuizMode = ''; 
let selectedChapter = null;
let currentMockExamId = null;

function saveScoreHistory(mode, id, score, total) {
    let history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    history.push({
        mode: mode,
        id: id,
        score: score,
        total: total,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('quizHistory', JSON.stringify(history));
}

// Init chapter buttons
const chapContainer = document.getElementById('chapterButtonsContainer');
if (chapContainer) {
    for (let i = 1; i <= 9; i++) {
        chapContainer.innerHTML += `
            <button onclick="loadChapterQuiz(${i})" class="bg-white dark:bg-gray-800 border dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md p-4 rounded-xl text-left transition group">
                <div class="font-bold text-blue-600 dark:text-blue-400 mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-300">Chương ${i}</div>
                <div class="text-sm text-gray-600 dark:text-gray-300 truncate" title="${chapterData[i].title}">${chapterData[i].title}</div>
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-2">${questionBank[i].length} câu hỏi</div>
            </button>
        `;
    }
}

function showMenu() {
    document.getElementById('quizMenu').style.display = 'block';
    document.getElementById('chapterSelection').style.display = 'none';
    document.getElementById('quizExecution').style.display = 'none';
    window.scrollTo(0,0);
}

function showChapterSelection() {
    document.getElementById('quizMenu').style.display = 'none';
    document.getElementById('chapterSelection').style.display = 'block';
    document.getElementById('quizExecution').style.display = 'none';
}

function backToMenu() {
    showMenu();
}

function loadChapterQuiz(chapId) {
    currentQuizMode = 'chapter';
    selectedChapter = chapId;
    currentQuizData = [...questionBank[chapId]];
    
    document.getElementById('quizTitle').innerText = `Ôn tập: Chương ${chapId}`;
    document.getElementById('quizSubtitle').innerText = chapterData[chapId].title;
    renderQuiz();
}

function startMockExam() {
    currentQuizMode = 'mock';
    selectedChapter = null;
    currentMockExamId = Date.now(); 
    
    let allQ = [];
    for (let i = 1; i <= 9; i++) {
        allQ = allQ.concat(questionBank[i]);
    }
    
    allQ = allQ.sort(() => 0.5 - Math.random());
    currentQuizData = allQ.slice(0, 40);

    document.getElementById('quizTitle').innerText = `Thi thử Tổng hợp`;
    document.getElementById('quizSubtitle').innerText = `Đề ngẫu nhiên từ Chương 1 đến 9`;
    renderQuiz();
}

function renderQuiz() {
    document.getElementById('quizMenu').style.display = 'none';
    document.getElementById('chapterSelection').style.display = 'none';
    document.getElementById('quizExecution').style.display = 'block';
    
    document.getElementById('questionCount').innerText = currentQuizData.length;
    
    const container = document.getElementById('questionsContainer');
    let html = '';

    currentQuizData.forEach((q, idx) => {
        html += `
            <div class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700" id="qblock-${idx}">
                <div class="font-bold text-gray-800 dark:text-gray-100 mb-4 text-base md:text-lg">
                    <span class="text-blue-600 dark:text-blue-400 mr-1">Câu ${idx + 1}:</span> ${q.q}
                </div>
                <div class="space-y-3">
        `;
        
        q.options.forEach((opt, optIdx) => {
            html += `
                <label class="relative flex items-center cursor-pointer group">
                    <input type="radio" name="q${idx}" value="${optIdx}" class="peer sr-only radio-custom">
                    <div class="w-full p-3 md:p-4 rounded-lg border-2 border-gray-100 dark:border-gray-700 flex items-center gap-3 transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div class="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 flex items-center justify-center radio-circle transition-colors">
                            <div class="w-2.5 h-2.5 bg-blue-600 rounded-full scale-0 transition-transform duration-200 ease-out after:content-['']"></div>
                        </div>
                        <span class="text-sm md:text-base text-gray-700 dark:text-gray-200">${opt}</span>
                    </div>
                </label>
            `;
        });

        html += `
                </div>
                <div id="feedback-${idx}" class="mt-4 hidden p-3 md:p-4 rounded-lg text-sm font-semibold"></div>
            </div>
        `;
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
        const feedback = document.getElementById(`feedback-${idx}`);
        const block = document.getElementById(`qblock-${idx}`);
        
        document.querySelectorAll(`input[name="q${idx}"]`).forEach(inp => inp.disabled = true);
        feedback.classList.remove('hidden');

        if (selected && parseInt(selected.value) === q.correct) {
            score++;
            feedback.innerHTML = '<i class="fa-solid fa-circle-check mr-2"></i> Chính xác!';
            feedback.className = "mt-4 block p-3 rounded-lg text-sm font-semibold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800";
            block.classList.add('border-green-300', 'dark:border-green-700');
        } else {
            const correctText = q.options[q.correct];
            let text = selected 
                ? `<i class="fa-solid fa-circle-xmark mr-2"></i> Sai. Đáp án đúng là: <span class="text-gray-900 dark:text-white underline">${correctText}</span>` 
                : `<i class="fa-solid fa-triangle-exclamation mr-2"></i> Chưa làm. Đáp án đúng là: <span class="text-gray-900 dark:text-white underline">${correctText}</span>`;
            
            feedback.innerHTML = text;
            feedback.className = selected 
                ? "mt-4 block p-3 rounded-lg text-sm font-semibold bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                : "mt-4 block p-3 rounded-lg text-sm font-semibold bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800";
            
            if(selected) block.classList.add('border-red-300', 'dark:border-red-700');
        }
    });

    const percent = Math.round((score / currentQuizData.length) * 100);
    const summary = document.getElementById('resultSummary');
    summary.innerHTML = `Điểm của bạn: <span class="${percent >= 50 ? 'text-green-600' : 'text-red-600'} text-xl md:text-2xl">${score}/${currentQuizData.length}</span> (${percent}%)`;
    summary.classList.remove('hidden');
    
    saveScoreHistory(currentQuizMode, currentQuizMode === 'chapter' ? selectedChapter : currentMockExamId, score, currentQuizData.length);
    
    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('retryBtn').classList.remove('hidden');
}

function retryCurrentQuiz() {
    document.querySelectorAll('input[type="radio"]').forEach(inp => {
        inp.checked = false;
        inp.disabled = false;
    });
    
    document.querySelectorAll('[id^="feedback-"]').forEach(feedback => {
        feedback.classList.add('hidden');
        feedback.innerHTML = '';
    });

    document.querySelectorAll('[id^="qblock-"]').forEach(block => {
        block.classList.remove('border-green-300', 'dark:border-green-700', 'border-red-300', 'dark:border-red-700');
    });

    document.getElementById('resultSummary').classList.add('hidden');
    document.getElementById('retryBtn').classList.add('hidden');
    document.getElementById('submitBtn').classList.remove('hidden');
    
    window.scrollTo(0,0);
}

/* --- 5. HISTORY LOGIC (MODAL) --- */
function openHistory() {
    const modal = document.getElementById('historyModal');
    const content = document.getElementById('historyContent');
    let history = JSON.parse(localStorage.getItem('quizHistory')) || [];

    if (history.length === 0) {
        content.innerHTML = '<div class="flex flex-col items-center justify-center py-10 text-gray-400"><i class="fa-regular fa-folder-open text-4xl mb-3"></i><p>Chưa có dữ liệu lịch sử nào.</p></div>';
    } else {
        let historyCopy = [...history].reverse(); // Đảo ngược để mới nhất lên đầu
        let html = '<div class="space-y-3">';
        
        historyCopy.forEach((item) => {
            let title = item.mode === 'chapter' ? `Ôn tập: Chương ${item.id}` : 'Thi thử Tổng hợp';
            let percent = Math.round((item.score / item.total) * 100);
            let colorClass = percent >= 50 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
            let bgClass = percent >= 50 ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10';
            let borderClass = percent >= 50 ? 'border-green-100 dark:border-green-900/30' : 'border-red-100 dark:border-red-900/30';
            
            html += `
                <div class="p-4 border ${borderClass} rounded-xl ${bgClass} flex justify-between items-center transition-all hover:scale-[1.02]">
                    <div>
                        <div class="font-bold text-gray-800 dark:text-gray-100 text-base">${title}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1"><i class="fa-regular fa-calendar text-xs"></i> ${item.date}</div>
                    </div>
                    <div class="text-right bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div class="font-bold ${colorClass} text-lg">${item.score}/${item.total}</div>
                        <div class="text-xs text-gray-500 font-medium">(${percent}%)</div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        content.innerHTML = html;
    }
    
    modal.classList.remove('hidden');
    // Hiệu ứng mờ dần (Fade in)
    setTimeout(() => {
        modal.firstElementChild.classList.remove('scale-95', 'opacity-0');
        modal.firstElementChild.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeHistory() {
    const modal = document.getElementById('historyModal');
    modal.firstElementChild.classList.remove('scale-100', 'opacity-100');
    modal.firstElementChild.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function clearHistory() {
    if(confirm('Ông có chắc chắn muốn xóa toàn bộ bảng vàng thành tích không?')) {
        localStorage.removeItem('quizHistory');
        openHistory(); 
    }
}