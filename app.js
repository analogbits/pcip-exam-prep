// PCIP Exam Prep Application Logic
// Aligned with PCI DSS v4.0.1
// Modes: Practice (Instant Feedback & Reasoning), Exam Simulator (75Q Timed), Flashcards, Bookmarks/Missed, Master Cheat Sheet

document.addEventListener('DOMContentLoaded', () => {
  // Helper to ensure questions are retrieved reliably in any browser environment
  function getQuestions() {
    if (typeof window !== 'undefined' && Array.isArray(window.PCIP_QUESTIONS) && window.PCIP_QUESTIONS.length > 0) {
      return window.PCIP_QUESTIONS;
    }
    if (typeof PCIP_QUESTIONS !== 'undefined' && Array.isArray(PCIP_QUESTIONS) && PCIP_QUESTIONS.length > 0) {
      return PCIP_QUESTIONS;
    }
    return [];
  }

  // State
  let allQuestions = getQuestions();
  let currentTab = 'practice';
  let practiceFilter = 'all';
  let practiceSearch = '';
  // Practice mode strictly defaults to 'unanswered' so completed questions are never shown
  let practiceStatusFilter = 'unanswered';
  localStorage.setItem('pcip_practice_status_filter', 'unanswered');
  let practiceShuffle = (localStorage.getItem('pcip_practice_shuffle') === 'true');
  let practiceIndex = 0;
  let practiceFilteredList = [];
  let justSubmittedQid = null; // Tracks if a question was just submitted on screen to view its reasoning
  let userAnswers = JSON.parse(localStorage.getItem('pcip_practice_answers') || '{}');
  let userSubmitted = JSON.parse(localStorage.getItem('pcip_practice_submitted') || '{}');

  // Unified Completed Pool across both Practice and Exam Simulator
  const storedCompleted = JSON.parse(localStorage.getItem('pcip_completed_qids') || '[]');
  let completedQids = new Set(storedCompleted.map(Number));

  // Seamlessly merge any existing questions already answered in Practice or previous sessions
  Object.keys(userSubmitted).forEach(qid => {
    if (userSubmitted[qid]) completedQids.add(Number(qid));
  });
  Object.keys(userAnswers).forEach(qid => {
    if (userAnswers[qid] && userAnswers[qid].length > 0) completedQids.add(Number(qid));
  });

  // Sync back so userSubmitted also reflects all completed questions
  completedQids.forEach(qid => {
    userSubmitted[qid] = true;
  });

  function saveCompletedState() {
    localStorage.setItem('pcip_completed_qids', JSON.stringify([...completedQids]));
    localStorage.setItem('pcip_practice_submitted', JSON.stringify(userSubmitted));
    localStorage.setItem('pcip_practice_answers', JSON.stringify(userAnswers));
  }
  saveCompletedState();

  let bookmarks = new Set(JSON.parse(localStorage.getItem('pcip_bookmarks') || '[]'));
  let incorrectQids = new Set(JSON.parse(localStorage.getItem('pcip_incorrect') || '[]'));
  let everIncorrectQids = new Set(JSON.parse(localStorage.getItem('pcip_ever_incorrect') || '[]'));
  // Ensure all currently incorrect questions are cataloged in everIncorrectQids
  incorrectQids.forEach(id => everIncorrectQids.add(Number(id)));
  localStorage.setItem('pcip_ever_incorrect', JSON.stringify([...everIncorrectQids]));

  // Exam Simulator State
  let examActive = false;
  let examQuestions = [];
  let examAnswers = {};
  let examMarked = new Set();
  let examCurrentIndex = 0;
  let examTimeRemaining = 90 * 60; // 90 minutes in seconds
  let examTimerInterval = null;
  let examFinished = false;

  // Flashcards State
  let flashcardIndex = 0;
  let flashcardFlipped = false;

  // DOM Elements
  const tabPracticeBtn = document.getElementById('tab-practice-btn');
  const tabExamBtn = document.getElementById('tab-exam-btn');
  const tabFlashcardsBtn = document.getElementById('tab-flashcards-btn');
  const tabCheatsheetBtn = document.getElementById('tab-cheatsheet-btn');
  const tabReviewBtn = document.getElementById('tab-review-btn');
  const tabTelltalesBtn = document.getElementById('tab-telltales-btn');

  const viewPractice = document.getElementById('view-practice');
  const viewExam = document.getElementById('view-exam');
  const viewFlashcards = document.getElementById('view-flashcards');
  const viewCheatsheet = document.getElementById('view-cheatsheet');
  const viewReview = document.getElementById('view-review');
  const viewTelltales = document.getElementById('view-telltales');

  // Populate Filter Categories
  const categoryFilterSelect = document.getElementById('category-filter');
  function populateCategories() {
    if (!categoryFilterSelect) return;
    const cats = Array.from(new Set(allQuestions.map(q => q.category))).sort();
    categoryFilterSelect.innerHTML = '<option value="all">All Domains & Categories</option>';
    cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      categoryFilterSelect.appendChild(opt);
    });
  }
  populateCategories();

  // Tab Navigation Handling
  function switchTab(tab) {
    currentTab = tab;
    [tabPracticeBtn, tabExamBtn, tabFlashcardsBtn, tabCheatsheetBtn, tabReviewBtn, tabTelltalesBtn].forEach(btn => {
      if (btn) {
        btn.classList.remove('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
        btn.classList.add('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700', 'hover:text-white');
      }
    });

    [viewPractice, viewExam, viewFlashcards, viewCheatsheet, viewReview, viewTelltales].forEach(v => {
      if (v) v.classList.add('hidden');
    });
    if (tab !== 'cheatsheet' && typeof stopAudioNarration === 'function') {
      stopAudioNarration();
    }

    if (tab === 'practice') {
      justSubmittedQid = null;
      if (tabPracticeBtn) {
        tabPracticeBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
        tabPracticeBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      }
      if (viewPractice) viewPractice.classList.remove('hidden');
      updatePracticeList();
      if (practiceShuffle && practiceFilteredList.length > 0) {
        practiceIndex = Math.floor(Math.random() * practiceFilteredList.length);
      }
      renderPracticeQuestion();
    } else if (tab === 'exam') {
      if (tabExamBtn) {
        tabExamBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
        tabExamBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      }
      if (viewExam) viewExam.classList.remove('hidden');
      renderExamView();
    } else if (tab === 'flashcards') {
      if (tabFlashcardsBtn) {
        tabFlashcardsBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
        tabFlashcardsBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      }
      if (viewFlashcards) viewFlashcards.classList.remove('hidden');
      renderFlashcard();
    } else if (tab === 'cheatsheet') {
      if (tabCheatsheetBtn) {
        tabCheatsheetBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
        tabCheatsheetBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      }
      if (viewCheatsheet) viewCheatsheet.classList.remove('hidden');
      if (typeof renderCheatsheetWeakAreas === 'function') {
        renderCheatsheetWeakAreas();
      }
    } else if (tab === 'review') {
      if (tabReviewBtn) {
        tabReviewBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
        tabReviewBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      }
      if (viewReview) viewReview.classList.remove('hidden');
      renderReviewView();
    } else if (tab === 'telltales') {
      if (tabTelltalesBtn) {
        tabTelltalesBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
        tabTelltalesBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      }
      if (viewTelltales) viewTelltales.classList.remove('hidden');
      renderTelltalesView();
    }
  }

  if (tabPracticeBtn) tabPracticeBtn.addEventListener('click', () => switchTab('practice'));
  if (tabExamBtn) tabExamBtn.addEventListener('click', () => switchTab('exam'));
  if (tabFlashcardsBtn) tabFlashcardsBtn.addEventListener('click', () => switchTab('flashcards'));
  if (tabCheatsheetBtn) tabCheatsheetBtn.addEventListener('click', () => switchTab('cheatsheet'));
  if (tabReviewBtn) tabReviewBtn.addEventListener('click', () => switchTab('review'));
  if (tabTelltalesBtn) tabTelltalesBtn.addEventListener('click', () => switchTab('telltales'));

  // ---------------------------------------------------------------------
  // PRACTICE MODE (INSTANT FEEDBACK & REASONING WITH PERSISTENCE)
  // ---------------------------------------------------------------------
  function updatePracticeStats() {
    const answeredCount = completedQids.size;
    const totalCount = allQuestions.length || 500;
    const pct = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;

    const ansEl = document.getElementById('practice-answered-count');
    const totEl = document.getElementById('practice-total-available');
    const pctEl = document.getElementById('practice-progress-pct');
    if (ansEl) ansEl.textContent = answeredCount;
    if (totEl) totEl.textContent = totalCount;
    if (pctEl) pctEl.textContent = `${pct}%`;

    // Running Score & Accuracy Metrics (Passing threshold is 75%)
    let wrongCount = 0;
    completedQids.forEach(qid => {
      if (incorrectQids.has(qid)) wrongCount++;
    });
    const correctCount = Math.max(0, answeredCount - wrongCount);
    const accuracyPct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    const accBadge = document.getElementById('practice-accuracy-badge');
    const accPctEl = document.getElementById('practice-accuracy-pct');
    const accCountsEl = document.getElementById('practice-accuracy-counts');

    if (accPctEl && accCountsEl && accBadge) {
      if (answeredCount === 0) {
        accPctEl.textContent = '--%';
        accPctEl.className = 'font-black text-slate-700';
        accCountsEl.textContent = '(0 answered)';
        accBadge.className = 'font-bold text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-900 px-2.5 py-1 rounded-lg border border-slate-200 inline-flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer group';
      } else {
        accPctEl.textContent = `${accuracyPct}%`;
        accCountsEl.textContent = `(${correctCount}/${answeredCount} Correct)`;
        if (accuracyPct >= 75) {
          accPctEl.className = 'font-black text-emerald-800';
          accBadge.className = 'font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-300 inline-flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer group';
        } else {
          accPctEl.className = 'font-black text-amber-800';
          accBadge.className = 'font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 hover:border-amber-400 px-2.5 py-1 rounded-lg border border-amber-300 inline-flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer group';
        }
      }
    }
  }

  function updatePracticeList() {
    if (!allQuestions.length) allQuestions = getQuestions();
    practiceFilteredList = allQuestions.filter(q => {
      const matchCat = (practiceFilter === 'all') || (q.category === practiceFilter);
      const matchSearch = !practiceSearch || 
        q.question.toLowerCase().includes(practiceSearch.toLowerCase()) || 
        q.explanation.toLowerCase().includes(practiceSearch.toLowerCase());
      
      let matchStatus = true;
      const isCompleted = completedQids.has(q.id);
      if (practiceStatusFilter === 'unanswered') {
        matchStatus = !isCompleted;
      } else if (practiceStatusFilter === 'answered') {
        matchStatus = isCompleted;
      } else if (practiceStatusFilter === 'incorrect') {
        matchStatus = incorrectQids.has(q.id);
      }
      return matchCat && matchSearch && matchStatus;
    });

    if (practiceShuffle) {
      // Fisher-Yates shuffle for practice list
      for (let i = practiceFilteredList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [practiceFilteredList[i], practiceFilteredList[j]] = [practiceFilteredList[j], practiceFilteredList[i]];
      }
    }

    if (practiceIndex >= practiceFilteredList.length) {
      practiceIndex = Math.max(0, practiceFilteredList.length - 1);
    }
    const totalEl = document.getElementById('practice-total-count');
    if (totalEl) totalEl.textContent = practiceFilteredList.length;
    updatePracticeStats();
  }

  function jumpToRandomQuestion() {
    justSubmittedQid = null;
    if (practiceStatusFilter === 'unanswered') {
      updatePracticeList();
    }
    if (!practiceFilteredList.length) {
      renderPracticeQuestion();
      return;
    }
    if (practiceFilteredList.length === 1) {
      practiceIndex = 0;
    } else {
      let newIdx = practiceIndex;
      let attempts = 0;
      while (newIdx === practiceIndex && attempts < 10) {
        newIdx = Math.floor(Math.random() * practiceFilteredList.length);
        attempts++;
      }
      practiceIndex = newIdx;
    }
    renderPracticeQuestion();
  }

  function resetAllProgress() {
    const answeredCount = completedQids.size;
    const msg = `Are you sure you want to reset all progress?\n\nThis will clear all ${answeredCount} completed questions across both Practice Mode and the Exam Simulator, making all 500 questions fresh and available again.`;
    if (!confirm(msg)) return;

    completedQids.clear();
    userAnswers = {};
    userSubmitted = {};
    incorrectQids.clear();
    everIncorrectQids.clear();
    localStorage.removeItem('pcip_completed_qids');
    localStorage.removeItem('pcip_practice_answers');
    localStorage.removeItem('pcip_practice_submitted');
    localStorage.removeItem('pcip_incorrect');
    localStorage.removeItem('pcip_ever_incorrect');
    practiceIndex = 0;
    updatePracticeStats();
    updatePracticeList();
    renderPracticeQuestion();
    if (currentTab === 'exam') {
      renderExamView();
    }
  }

  function resetPracticeProgress() {
    resetAllProgress();
  }

  function renderPracticeQuestion() {
    const container = document.getElementById('practice-card-container');
    if (!practiceFilteredList.length) {
      const isUnansweredFilter = (practiceStatusFilter === 'unanswered');
      container.innerHTML = `
        <div class="p-8 md:p-12 text-center bg-white rounded-3xl shadow-sm border border-slate-200 max-w-xl mx-auto space-y-5 animate-fade-in">
          <div class="w-16 h-16 mx-auto rounded-2xl ${isUnansweredFilter ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-500'} flex items-center justify-center text-3xl font-bold">
            ${isUnansweredFilter ? '✓' : '🔍'}
          </div>
          <h3 class="text-xl font-black text-slate-900">
            ${isUnansweredFilter ? 'All Questions Answered in This View!' : 'No Matching Questions Found'}
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            ${isUnansweredFilter 
              ? 'Awesome job! You have answered all available questions under this filter. You can review your submitted answers, switch categories, or reset answers below to practice from scratch.' 
              : 'No questions match your current category, search keyword, or status filter. Try clearing your search query or switching filters.'}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            ${isUnansweredFilter ? `
              <button id="show-all-practice-btn" class="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors">
                Review Answered Questions
              </button>
            ` : `
              <button id="clear-practice-filters-btn" class="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors">
                Reset Filters
              </button>
            `}
            <button id="reset-practice-btn-empty" class="px-5 py-2.5 rounded-xl text-sm font-bold border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors">
              ↺ Reset Practice Answers
            </button>
          </div>
        </div>`;

      const showAllBtn = document.getElementById('show-all-practice-btn');
      if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
          practiceStatusFilter = 'all';
          const statSelect = document.getElementById('practice-status-filter');
          if (statSelect) statSelect.value = 'all';
          localStorage.setItem('pcip_practice_status_filter', 'all');
          practiceIndex = 0;
          updatePracticeList();
          renderPracticeQuestion();
        });
      }

      const clearFiltersBtn = document.getElementById('clear-practice-filters-btn');
      if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
          practiceFilter = 'all';
          practiceSearch = '';
          practiceStatusFilter = 'unanswered';
          if (categoryFilterSelect) categoryFilterSelect.value = 'all';
          const sInput = document.getElementById('search-questions');
          if (sInput) sInput.value = '';
          const statSelect = document.getElementById('practice-status-filter');
          if (statSelect) statSelect.value = 'unanswered';
          localStorage.setItem('pcip_practice_status_filter', 'unanswered');
          practiceIndex = 0;
          updatePracticeList();
          renderPracticeQuestion();
        });
      }

      const resetEmptyBtn = document.getElementById('reset-practice-btn-empty');
      if (resetEmptyBtn) {
        resetEmptyBtn.addEventListener('click', resetPracticeProgress);
      }
      return;
    }

    const q = practiceFilteredList[practiceIndex];
    if (!q) {
      updatePracticeList();
      if (!practiceFilteredList.length) {
        renderPracticeQuestion();
        return;
      }
    }

    // Strict Guard: In 'unanswered' mode, if this question was already completed (and wasn't just submitted in this interaction), advance immediately!
    if (practiceStatusFilter === 'unanswered' && completedQids.has(q.id) && justSubmittedQid !== q.id) {
      updatePracticeList();
      if (practiceFilteredList.length > 0) {
        if (practiceIndex >= practiceFilteredList.length) practiceIndex = 0;
        renderPracticeQuestion();
      } else {
        renderPracticeQuestion();
      }
      return;
    }

    const isSubmitted = userSubmitted[q.id] || false;
    const selected = userAnswers[q.id] || [];
    const isBookmarked = bookmarks.has(q.id);

    const idxEl = document.getElementById('practice-current-index');
    if (idxEl) idxEl.textContent = practiceIndex + 1;

    let optionsHtml = q.options.map((opt, idx) => {
      const isChecked = selected.includes(idx);
      let btnClass = "border-slate-200 hover:border-indigo-400 bg-white text-slate-800";
      let iconHtml = `<span class="w-6 h-6 rounded-md border flex items-center justify-center mr-3 font-semibold text-xs ${q.type === 'multiple' ? 'rounded-md' : 'rounded-full'} border-slate-300 text-slate-600">${String.fromCharCode(65 + idx)}</span>`;

      if (isSubmitted) {
        const isCorrect = q.correct.includes(idx);
        if (isCorrect) {
          btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium ring-2 ring-emerald-400";
          iconHtml = `<span class="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center mr-3 font-bold text-xs">✓</span>`;
        } else if (isChecked && !isCorrect) {
          btnClass = "border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-400";
          iconHtml = `<span class="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center mr-3 font-bold text-xs">✕</span>`;
        } else {
          btnClass = "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
        }
      } else if (isChecked) {
        btnClass = "border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500";
        iconHtml = `<span class="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center mr-3 font-bold text-xs">${String.fromCharCode(65 + idx)}</span>`;
      }

      return `
        <button type="button" data-idx="${idx}" class="practice-opt-btn w-full text-left p-4 rounded-xl border flex items-start transition-all ${btnClass} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}">
          ${iconHtml}
          <div class="flex-1 text-sm md:text-base leading-relaxed">${opt}</div>
        </button>
      `;
    }).join('');

    let resultBanner = '';
    if (isSubmitted) {
      const correctSet = new Set(q.correct);
      const selSet = new Set(selected);
      const isPerfect = (correctSet.size === selSet.size) && [...correctSet].every(x => selSet.has(x));

      resultBanner = `
        <div class="mt-6 p-5 rounded-2xl ${isPerfect ? 'bg-emerald-50 border border-emerald-300' : 'bg-rose-50 border border-rose-300'} animate-fade-in">
          <div class="flex items-center gap-3 mb-2">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isPerfect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}">
              ${isPerfect ? 'Correct Answer' : 'Incorrect'}
            </span>
            <span class="text-xs text-slate-500 font-medium">Ref: ${q.v4_ref || 'PCI DSS v4.0.1'}</span>
          </div>
          <div class="text-slate-800 text-sm md:text-base leading-relaxed mt-2">
            <p class="font-bold text-slate-900 mb-1">Official Reasoning & Standard Context:</p>
            ${q.explanation}
          </div>
          ${q.tip ? `
            <div class="mt-3 pt-3 border-t border-slate-200/80 flex items-start gap-2 text-xs md:text-sm text-indigo-900 bg-indigo-50/70 p-3 rounded-xl">
              <span class="font-bold text-indigo-700">💡 Exam Tip:</span>
              <span>${q.tip}</span>
            </div>
          ` : ''}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              ${q.category}
            </span>
            <span class="px-2.5 py-1 rounded-full text-xs font-medium ${q.type === 'multiple' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600'}">
              ${q.type === 'multiple' ? 'Select All That Apply' : 'Single Correct Answer'}
            </span>
          </div>
          <button id="bookmark-btn" class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${isBookmarked ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}">
            <span>${isBookmarked ? '★' : '☆'}</span>
            <span>${isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>

        <div class="my-6">
          <h2 class="text-lg md:text-xl font-bold text-slate-900 leading-snug">
            <span class="text-indigo-600 mr-2">Q${practiceIndex + 1}.</span>${q.question}
          </h2>
        </div>

        <div class="space-y-3">
          ${optionsHtml}
        </div>

        ${resultBanner}

        <div class="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <button id="practice-prev-btn" ${(practiceIndex === 0 && !practiceShuffle) ? 'disabled' : ''} class="px-3.5 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700">
              ← Prev
            </button>
            <button id="practice-random-btn" class="px-3.5 py-2 rounded-xl text-sm font-semibold border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 flex items-center gap-1.5 transition-colors shadow-xs">
              <span>🎲</span> Random
            </button>
            <button id="practice-next-btn" ${(practiceFilteredList.length <= 1 || (!practiceShuffle && !isSubmitted && practiceIndex >= practiceFilteredList.length - 1)) ? 'disabled' : ''} class="px-3.5 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700">
              Next →
            </button>
          </div>

          <div class="flex items-center gap-2">
            ${isSubmitted ? `
              <button id="practice-retry-btn" class="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700">
                ↺ Try Again
              </button>
            ` : `
              <button id="practice-submit-btn" class="px-6 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200">
                Submit Answer
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    // Hook up option buttons
    container.querySelectorAll('.practice-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (isSubmitted) return;
        const idx = parseInt(btn.getAttribute('data-idx'));
        let cur = userAnswers[q.id] ? [...userAnswers[q.id]] : [];

        if (q.type === 'multiple') {
          if (cur.includes(idx)) {
            cur = cur.filter(x => x !== idx);
          } else {
            cur.push(idx);
          }
        } else {
          cur = [idx];
        }
        userAnswers[q.id] = cur;
        localStorage.setItem('pcip_practice_answers', JSON.stringify(userAnswers));
        renderPracticeQuestion();
      });
    });

    // Submit Answer
    const submitBtn = document.getElementById('practice-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const sel = userAnswers[q.id] || [];
        if (!sel.length) {
          alert('Please select an option before submitting.');
          return;
        }
        justSubmittedQid = q.id;
        userSubmitted[q.id] = true;
        completedQids.add(q.id);
        saveCompletedState();

        const correctSet = new Set(q.correct);
        const selSet = new Set(sel);
        const isPerfect = (correctSet.size === selSet.size) && [...correctSet].every(x => selSet.has(x));

        if (!isPerfect) {
          incorrectQids.add(q.id);
          everIncorrectQids.add(q.id);
        } else {
          incorrectQids.delete(q.id);
          // Note: We deliberately do NOT remove from everIncorrectQids so remediated questions can be drilled separately!
        }
        localStorage.setItem('pcip_incorrect', JSON.stringify([...incorrectQids]));
        localStorage.setItem('pcip_ever_incorrect', JSON.stringify([...everIncorrectQids]));

        updatePracticeStats();
        renderPracticeQuestion();
      });
    }

    // Retry Answer
    const retryBtn = document.getElementById('practice-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        justSubmittedQid = null;
        completedQids.delete(q.id);
        delete userSubmitted[q.id];
        delete userAnswers[q.id];
        saveCompletedState();
        updatePracticeStats();
        renderPracticeQuestion();
      });
    }

    // Random button on card
    const cardRandomBtn = document.getElementById('practice-random-btn');
    if (cardRandomBtn) {
      cardRandomBtn.addEventListener('click', jumpToRandomQuestion);
    }

    // Prev / Next Navigation
    const prevBtn = document.getElementById('practice-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        justSubmittedQid = null;
        if (practiceStatusFilter === 'unanswered') {
          updatePracticeList();
        }
        if (practiceIndex > 0) {
          practiceIndex--;
        } else if (practiceFilteredList.length > 0) {
          practiceIndex = practiceFilteredList.length - 1;
        }
        renderPracticeQuestion();
      });
    }

    const nextBtn = document.getElementById('practice-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const wasJustAnswered = completedQids.has(q.id);
        justSubmittedQid = null;
        if (practiceStatusFilter === 'unanswered') {
          updatePracticeList();
        }
        if (practiceShuffle) {
          jumpToRandomQuestion();
        } else {
          if (!wasJustAnswered) {
            // User skipped without answering, advance to next
            if (practiceIndex < practiceFilteredList.length - 1) {
              practiceIndex++;
            } else {
              practiceIndex = 0;
            }
          } else {
            // Question was answered and removed; current practiceIndex already points to next item
            if (practiceIndex >= practiceFilteredList.length) {
              practiceIndex = 0;
            }
          }
          renderPracticeQuestion();
        }
      });
    }

    // Bookmark Toggle
    const bkmkBtn = document.getElementById('bookmark-btn');
    if (bkmkBtn) {
      bkmkBtn.addEventListener('click', () => {
        if (bookmarks.has(q.id)) {
          bookmarks.delete(q.id);
        } else {
          bookmarks.add(q.id);
        }
        localStorage.setItem('pcip_bookmarks', JSON.stringify([...bookmarks]));
        renderPracticeQuestion();
      });
    }
  }

  // Filter by Domain
  if (categoryFilterSelect) {
    categoryFilterSelect.addEventListener('change', (e) => {
      practiceFilter = e.target.value;
      practiceIndex = 0;
      updatePracticeList();
      renderPracticeQuestion();
    });
  }

  // Filter by Status (Unanswered / All / Answered / Incorrect)
  const practiceStatusSelect = document.getElementById('practice-status-filter');
  if (practiceStatusSelect) {
    practiceStatusSelect.value = practiceStatusFilter;
    practiceStatusSelect.addEventListener('change', (e) => {
      practiceStatusFilter = e.target.value;
      localStorage.setItem('pcip_practice_status_filter', practiceStatusFilter);
      practiceIndex = 0;
      updatePracticeList();
      renderPracticeQuestion();
    });
  }

  // Reset Practice Button
  const resetPracticeBtn = document.getElementById('reset-practice-btn');
  if (resetPracticeBtn) {
    resetPracticeBtn.addEventListener('click', resetPracticeProgress);
  }

  // Top Jump to Random Button
  const topRandomBtn = document.getElementById('top-practice-random-btn');
  if (topRandomBtn) {
    topRandomBtn.addEventListener('click', jumpToRandomQuestion);
  }

  // Shuffle Toggle
  const shuffleToggle = document.getElementById('practice-shuffle-toggle');
  if (shuffleToggle) {
    shuffleToggle.checked = practiceShuffle;
    shuffleToggle.addEventListener('change', (e) => {
      practiceShuffle = e.target.checked;
      localStorage.setItem('pcip_practice_shuffle', practiceShuffle ? 'true' : 'false');
      updatePracticeList();
      if (practiceShuffle && practiceFilteredList.length > 0) {
        practiceIndex = Math.floor(Math.random() * practiceFilteredList.length);
      } else {
        practiceIndex = 0;
      }
      renderPracticeQuestion();
    });
  }

  // Search input
  const searchInput = document.getElementById('search-questions');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      practiceSearch = e.target.value;
      practiceIndex = 0;
      updatePracticeList();
      renderPracticeQuestion();
    });
  }
  // ---------------------------------------------------------------------
  // EXAM SIMULATOR (75 QUESTIONS, 90 MINUTES, PEARSON VUE FORMAT)
  // ---------------------------------------------------------------------
  function startExam(count = 75) {
    if (!allQuestions.length) allQuestions = getQuestions();
    if (!allQuestions.length) {
      alert("Error: Questions could not be loaded. Please ensure questions.js is accessible.");
      return;
    }

    // Filter to questions that have NOT been completed in either Practice or previous Exams
    let freshQuestions = allQuestions.filter(q => !completedQids.has(q.id));
    let poolForExam = [];

    if (freshQuestions.length >= count) {
      const shuffled = [...freshQuestions].sort(() => 0.5 - Math.random());
      poolForExam = shuffled.slice(0, count);
    } else if (freshQuestions.length > 0) {
      // Use all remaining fresh questions, then draw remaining needed from completed pool
      const shuffledFresh = [...freshQuestions].sort(() => 0.5 - Math.random());
      const remainingNeeded = count - freshQuestions.length;
      const completedPool = allQuestions.filter(q => completedQids.has(q.id)).sort(() => 0.5 - Math.random());
      poolForExam = [...shuffledFresh, ...completedPool.slice(0, remainingNeeded)].sort(() => 0.5 - Math.random());
    } else {
      // All 500 questions completed! Draw from all 500
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      poolForExam = shuffled.slice(0, Math.min(count, shuffled.length));
    }

    examQuestions = poolForExam;
    examAnswers = {};
    examMarked = new Set();
    examCurrentIndex = 0;
    examTimeRemaining = 90 * 60; // 90 minutes
    examActive = true;
    examFinished = false;

    if (examTimerInterval) clearInterval(examTimerInterval);
    examTimerInterval = setInterval(() => {
      examTimeRemaining--;
      updateExamTimerDisplay();
      if (examTimeRemaining <= 0) {
        clearInterval(examTimerInterval);
        alert("Time is up! Submitting your exam now.");
        finishExam();
      }
    }, 1000);

    renderExamInterface();
  }

  function updateExamTimerDisplay() {
    const el = document.getElementById('exam-timer');
    const headerTimer = document.getElementById('exam-timer-header');
    const mins = Math.floor(examTimeRemaining / 60);
    const secs = examTimeRemaining % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    if (el) {
      el.textContent = timeStr;
      if (examTimeRemaining < 300) {
        el.classList.add('text-rose-600', 'animate-pulse');
      } else {
        el.classList.remove('text-rose-600', 'animate-pulse');
      }
    }
    if (headerTimer) {
      headerTimer.textContent = timeStr;
    }
  }

  function finishExam() {
    if (examTimerInterval) clearInterval(examTimerInterval);
    examActive = false;
    examFinished = true;
    renderExamResults();
  }

  function finishExamWithPrompt() {
    const answeredCount = Object.keys(examAnswers).filter(k => examAnswers[k]?.length).length;
    const unanswered = examQuestions.length - answeredCount;
    if (unanswered > 0) {
      if (!confirm(`You have ${unanswered} unanswered question(s). Are you sure you want to finish and submit your exam?`)) {
        return;
      }
    } else {
      if (!confirm('Are you ready to submit your exam and view your score report?')) return;
    }
    finishExam();
  }

  function renderExamView() {
    if (examFinished) {
      renderExamResults();
    } else if (examActive) {
      renderExamInterface();
    } else {
      renderExamStartScreen();
    }
  }

  function renderExamStartScreen() {
    viewExam.innerHTML = `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10 text-center animate-fade-in">
        <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold mb-4 shadow-sm border border-indigo-100">
          ⏱️
        </div>
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">PCIP Exam Simulator</h2>
        <p class="text-slate-600 text-sm md:text-base mb-8 leading-relaxed max-w-lg mx-auto">
          Simulate the official Pearson VUE Payment Card Industry Professional (PCIP v4.0.1) exam format under authentic timed conditions.
        </p>

        <!-- Live Pool Counter & Reset Option -->
        <div class="mb-6 p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div class="flex items-center gap-2 text-left">
            <span class="text-lg">🎯</span>
            <div>
              <p class="font-extrabold text-indigo-950">Exam Question Pool Status:</p>
              <p class="text-indigo-700 font-bold">${allQuestions.filter(q => !completedQids.has(q.id)).length} Fresh / Unanswered Questions Available <span class="text-slate-500 font-normal">(${completedQids.size} completed across Practice/Exam)</span></p>
            </div>
          </div>
          ${completedQids.size > 0 ? `
            <button id="exam-reset-completed-btn" class="text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer shadow-xs">
              ↺ Reset All Progress
            </button>
          ` : ''}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Item Count</p>
            <p class="text-xl font-black text-slate-900 mt-1">75 Questions</p>
            <p class="text-xs text-slate-500 mt-0.5">Single & Multi-Select</p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Time Limit</p>
            <p class="text-xl font-black text-slate-900 mt-1">90 Minutes</p>
            <p class="text-xs text-slate-500 mt-0.5">~1.2 min / question</p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Passing Standard</p>
            <p class="text-xl font-black text-emerald-600 mt-1">75%</p>
            <p class="text-xs text-slate-500 mt-0.5">~57 / 75 correct</p>
          </div>
        </div>

        <div class="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-left text-xs md:text-sm text-amber-900 mb-8 space-y-1.5">
          <p class="font-bold flex items-center gap-1.5"><span>⚠️</span> Pearson VUE Simulator Rules:</p>
          <ul class="list-disc list-inside space-y-1 text-xs text-amber-800">
            <li>Answers are not revealed during the exam to simulate actual test conditions.</li>
            <li>You can "Mark for Review" questions and jump freely via the question grid.</li>
            <li>Upon submission, you receive an immediate pass/fail verdict, domain proficiency breakdown, and an item review with official explanations.</li>
          </ul>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <button id="start-exam-75-btn" class="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md shadow-indigo-200 transition-all text-base cursor-pointer">
            Start Full Exam (75 Questions)
          </button>
          <button id="start-exam-30-btn" class="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-sm cursor-pointer">
            Quick Practice (30 Questions)
          </button>
        </div>
      </div>
    `;

    document.getElementById('start-exam-75-btn').addEventListener('click', () => startExam(75));
    document.getElementById('start-exam-30-btn').addEventListener('click', () => startExam(30));

    const examResetBtn = document.getElementById('exam-reset-completed-btn');
    if (examResetBtn) {
      examResetBtn.addEventListener('click', resetAllProgress);
    }
  }

  function renderExamInterface() {
    if (!examQuestions || examQuestions.length === 0) {
      renderExamStartScreen();
      return;
    }
    if (examCurrentIndex >= examQuestions.length) {
      examCurrentIndex = 0;
    }

    const q = examQuestions[examCurrentIndex];
    if (!q) {
      renderExamStartScreen();
      return;
    }

    const selected = examAnswers[q.id] || [];
    const isMarked = examMarked.has(q.id);
    const isLastQuestion = (examCurrentIndex === examQuestions.length - 1);
    const answeredCount = Object.keys(examAnswers).filter(k => examAnswers[k]?.length).length;

    // Build question grid (1 to total)
    const gridHtml = examQuestions.map((eq, i) => {
      const isAns = examAnswers[eq.id] && examAnswers[eq.id].length > 0;
      const isCur = (i === examCurrentIndex);
      const isM = examMarked.has(eq.id);

      let color = 'bg-white text-slate-700 border-slate-200 hover:border-slate-400';
      if (isCur) {
        color = 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-400 font-bold';
      } else if (isM) {
        color = 'bg-amber-100 text-amber-900 border-amber-400 font-bold';
      } else if (isAns) {
        color = 'bg-slate-700 text-white border-slate-700 font-semibold';
      }

      return `
        <button data-exam-idx="${i}" class="exam-grid-btn w-8 h-8 rounded-lg border text-xs font-semibold flex items-center justify-center relative transition-all ${color}">
          ${i + 1}
          ${isM ? '<span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"></span>' : ''}
        </button>
      `;
    }).join('');

    // Build options
    const optionsHtml = q.options.map((opt, idx) => {
      const isChecked = selected.includes(idx);
      return `
        <button type="button" data-exam-opt="${idx}" class="exam-opt-btn w-full text-left p-4 rounded-xl border flex items-start transition-all cursor-pointer ${isChecked ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500' : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'}">
          <span class="w-6 h-6 rounded-md ${q.type === 'multiple' ? 'rounded-md' : 'rounded-full'} border flex items-center justify-center mr-3 font-semibold text-xs ${isChecked ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 text-slate-600'}">
            ${String.fromCharCode(65 + idx)}
          </span>
          <span class="flex-1 text-sm md:text-base leading-relaxed">${opt}</span>
        </button>
      `;
    }).join('');

    viewExam.innerHTML = `
      <div class="space-y-4">
        <!-- Top Sticky Action Bar on mobile/desktop -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Time Remaining:</span>
            <span id="exam-timer-header" class="font-mono text-lg font-black text-indigo-600">--:--</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-500">Answered: <strong>${answeredCount}/${examQuestions.length}</strong></span>
            <button id="exam-top-submit-btn" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-sm">
              Submit Exam
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Main Question Card -->
          <div class="lg:col-span-3 space-y-4">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div class="flex items-center gap-3">
                  <span class="font-mono text-sm font-bold text-slate-700">Question ${examCurrentIndex + 1} of ${examQuestions.length}</span>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-medium ${q.type === 'multiple' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600'}">
                    ${q.type === 'multiple' ? 'Select All That Apply' : 'Single Correct Answer'}
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <button id="exam-mark-btn" class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${isMarked ? 'bg-amber-100 border-amber-400 text-amber-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}">
                    <span>${isMarked ? '🚩 Flagged' : '⚐ Mark for Review'}</span>
                  </button>
                </div>
              </div>

              <div class="my-6">
                <h2 class="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                  ${q.question}
                </h2>
              </div>

              <div class="space-y-3">
                ${optionsHtml}
              </div>

              <div class="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <button id="exam-prev-btn" ${examCurrentIndex === 0 ? 'disabled' : ''} class="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer">
                    ← Previous
                  </button>
                  <button id="exam-next-btn" ${isLastQuestion ? 'disabled' : ''} class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                    Next →
                  </button>
                </div>

                <div>
                  ${isLastQuestion ? `
                    <button id="exam-card-submit-btn" class="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer transition-all">
                      Review & Submit Exam ✓
                    </button>
                  ` : `
                    <button id="exam-quick-finish-btn" class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 cursor-pointer">
                      Finish Early
                    </button>
                  `}
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar / Navigation Grid -->
          <div class="space-y-4">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span class="text-xs font-bold uppercase text-slate-400">Timer</span>
                <span id="exam-timer" class="font-mono text-xl font-black text-indigo-600">--:--</span>
              </div>

              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Question Map</p>
              <div class="grid grid-cols-5 gap-1.5 max-h-72 overflow-y-auto p-1 border rounded-xl border-slate-100 custom-scrollbar">
                ${gridHtml}
              </div>

              <div class="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div class="flex items-center justify-between text-slate-600">
                  <span>Answered:</span>
                  <span class="font-bold text-slate-900">${answeredCount} / ${examQuestions.length}</span>
                </div>
                <div class="flex items-center justify-between text-slate-600">
                  <span>Marked for review:</span>
                  <span class="font-bold text-amber-700">${examMarked.size}</span>
                </div>
              </div>

              <div class="mt-5">
                <button id="exam-finish-btn" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-all text-sm cursor-pointer">
                  Submit & Grade Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    updateExamTimerDisplay();

    // Option selection
    viewExam.querySelectorAll('.exam-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-exam-opt'));
        let cur = examAnswers[q.id] ? [...examAnswers[q.id]] : [];

        if (q.type === 'multiple') {
          if (cur.includes(idx)) {
            cur = cur.filter(x => x !== idx);
          } else {
            cur.push(idx);
          }
        } else {
          cur = [idx];
        }
        examAnswers[q.id] = cur;
        renderExamInterface();
      });
    });

    // Grid button click
    viewExam.querySelectorAll('.exam-grid-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-exam-idx'));
        examCurrentIndex = idx;
        renderExamInterface();
      });
    });

    // Mark for review
    document.getElementById('exam-mark-btn').addEventListener('click', () => {
      if (examMarked.has(q.id)) {
        examMarked.delete(q.id);
      } else {
        examMarked.add(q.id);
      }
      renderExamInterface();
    });

    // Prev / Next
    document.getElementById('exam-prev-btn').addEventListener('click', () => {
      if (examCurrentIndex > 0) {
        examCurrentIndex--;
        renderExamInterface();
      }
    });

    const nextBtn = document.getElementById('exam-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (examCurrentIndex < examQuestions.length - 1) {
          examCurrentIndex++;
          renderExamInterface();
        }
      });
    }

    // Submit buttons
    const submitBtn = document.getElementById('exam-finish-btn');
    if (submitBtn) submitBtn.addEventListener('click', finishExamWithPrompt);

    const topSubmitBtn = document.getElementById('exam-top-submit-btn');
    if (topSubmitBtn) topSubmitBtn.addEventListener('click', finishExamWithPrompt);

    const cardSubmitBtn = document.getElementById('exam-card-submit-btn');
    if (cardSubmitBtn) cardSubmitBtn.addEventListener('click', finishExamWithPrompt);

    const quickFinishBtn = document.getElementById('exam-quick-finish-btn');
    if (quickFinishBtn) quickFinishBtn.addEventListener('click', finishExamWithPrompt);
  }

  function renderExamResults() {
    let correctCount = 0;
    const categoryStats = {};

    examQuestions.forEach(q => {
      const sel = examAnswers[q.id] || [];
      const hasAnswer = (sel.length > 0);

      // Mark this exam question as completed across the entire application!
      if (hasAnswer) {
        completedQids.add(q.id);
        userSubmitted[q.id] = true;
        userAnswers[q.id] = sel;
      }

      const correctSet = new Set(q.correct);
      const selSet = new Set(sel);
      const isPerfect = (correctSet.size === selSet.size) && [...correctSet].every(x => selSet.has(x));

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0 };
      }
      categoryStats[q.category].total++;

      if (isPerfect) {
        correctCount++;
        categoryStats[q.category].correct++;
      } else {
        incorrectQids.add(q.id);
        everIncorrectQids.add(q.id);
      }
    });

    saveCompletedState();
    localStorage.setItem('pcip_incorrect', JSON.stringify([...incorrectQids]));
    localStorage.setItem('pcip_ever_incorrect', JSON.stringify([...everIncorrectQids]));
    updatePracticeStats();

    const pct = Math.round((correctCount / examQuestions.length) * 100);
    const passed = (pct >= 75);

    let catBreakdownHtml = Object.keys(categoryStats).map(cat => {
      const stat = categoryStats[cat];
      const catPct = Math.round((stat.correct / stat.total) * 100);
      return `
        <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div class="flex-1 mr-4">
            <p class="text-sm font-semibold text-slate-800">${cat}</p>
            <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1.5">
              <div class="h-full ${catPct >= 75 ? 'bg-emerald-500' : 'bg-amber-500'}" style="width: ${catPct}%"></div>
            </div>
          </div>
          <div class="text-right">
            <span class="text-sm font-bold text-slate-900">${stat.correct}/${stat.total}</span>
            <span class="text-xs text-slate-500 ml-1">(${catPct}%)</span>
          </div>
        </div>
      `;
    }).join('');

    let reviewListHtml = examQuestions.map((q, i) => {
      const sel = examAnswers[q.id] || [];
      const correctSet = new Set(q.correct);
      const selSet = new Set(sel);
      const isPerfect = (correctSet.size === selSet.size) && [...correctSet].every(x => selSet.has(x));

      const optsHtml = q.options.map((opt, oIdx) => {
        const wasChosen = sel.includes(oIdx);
        const shouldBe = q.correct.includes(oIdx);
        let border = 'border-slate-200 text-slate-600 bg-white';
        let badge = '';

        if (shouldBe) {
          border = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
          badge = '<span class="ml-2 text-xs font-bold text-emerald-700">(Correct)</span>';
        } else if (wasChosen && !shouldBe) {
          border = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
          badge = '<span class="ml-2 text-xs font-bold text-rose-700">(Your Answer)</span>';
        }

        return `
          <div class="p-3 rounded-lg border text-xs md:text-sm ${border} flex items-center justify-between">
            <span><strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}</span>
            ${badge}
          </div>
        `;
      }).join('');

      return `
        <div class="p-5 rounded-2xl border ${isPerfect ? 'border-slate-200 bg-white' : 'border-rose-200 bg-rose-50/30'} space-y-3">
          <div class="flex items-center justify-between gap-3">
            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${isPerfect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
              Q${i + 1}: ${isPerfect ? 'Correct' : 'Incorrect'}
            </span>
            <span class="text-xs text-slate-400 font-medium">${q.category}</span>
          </div>
          <h4 class="font-bold text-slate-900 text-sm md:text-base">${q.question}</h4>
          <div class="space-y-1.5">${optsHtml}</div>
          <div class="text-xs md:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 mt-2">
            <p class="font-bold text-slate-900 mb-1">Official Reasoning & Reference:</p>
            ${q.explanation}
          </div>
        </div>
      `;
    }).join('');

    const timeSpentSeconds = Math.max(0, 90 * 60 - examTimeRemaining);
    const spentMins = Math.floor(timeSpentSeconds / 60);
    const spentSecs = timeSpentSeconds % 60;

    viewExam.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <!-- Score Card -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10 text-center">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-full ${passed ? 'bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50' : 'bg-rose-100 text-rose-600 ring-8 ring-rose-50'} text-3xl font-black mb-4">
            ${pct}%
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-slate-900">${passed ? '🎉 Congratulations! You Passed!' : 'Needs Further Review'}</h2>
          <p class="text-slate-600 mt-2 max-w-md mx-auto text-sm md:text-base">
            ${passed 
              ? `You scored ${pct}%, exceeding the required passing score of 75%. You are well-prepared for the Pearson VUE examination!` 
              : `You scored ${pct}%. A minimum of 75% is required to pass the PCIP examination. Review the missed items below and drill the Master Cheat Sheet.`}
          </p>

          <div class="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-slate-100">
            <div>
              <p class="text-xs text-slate-400 uppercase font-semibold">Total Correct</p>
              <p class="text-xl font-bold text-slate-900 mt-0.5">${correctCount} / ${examQuestions.length}</p>
            </div>
            <div>
              <p class="text-xs text-slate-400 uppercase font-semibold">Passing Standard</p>
              <p class="text-xl font-bold text-slate-900 mt-0.5">75% Required</p>
            </div>
            <div>
              <p class="text-xs text-slate-400 uppercase font-semibold">Time Elapsed</p>
              <p class="text-xl font-bold text-slate-900 mt-0.5">${spentMins} min ${spentSecs} sec</p>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-4 mt-8">
            <button id="retake-exam-btn" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-all text-sm cursor-pointer">
              Retake Exam Simulation
            </button>
            <button id="study-missed-btn" class="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all text-sm cursor-pointer">
              Study Missed Questions
            </button>
          </div>
        </div>

        <!-- Domain Breakdown -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h3 class="text-lg font-bold text-slate-900 mb-4">Domain Proficiency Breakdown</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${catBreakdownHtml}
          </div>
        </div>

        <!-- Comprehensive Item Review -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-slate-900">Comprehensive Item Review (${examQuestions.length} Questions)</h3>
          ${reviewListHtml}
        </div>
      </div>
    `;

    document.getElementById('retake-exam-btn').addEventListener('click', () => {
      examActive = false;
      examFinished = false;
      renderExamStartScreen();
    });

    document.getElementById('study-missed-btn').addEventListener('click', () => {
      switchTab('review');
    });
  }

  // ---------------------------------------------------------------------
  // FLASHCARDS (HIGH YIELD CRAMMING)
  // ---------------------------------------------------------------------
  const CORE_FLASHCARDS = [
    {
        "cat": "Account Data",
        "front": "What is the core distinction between Cardholder Data (CHD) and Sensitive Authentication Data (SAD)?",
        "back": "\u2022 CHD = PAN, Cardholder Name, Expiration Date, Service Code. May be stored post-authorization if protected (rendered unreadable).\n\n\u2022 SAD = Full Track Data, CAV2/CVC2/CVV2/CID, PIN/PIN Block. CAN NEVER BE STORED POST-AUTHORIZATION under any circumstances (even if encrypted!). Only issuers with business justification may retain SAD."
    },
    {
        "cat": "Foundations & Governance",
        "front": "What are the 6 overarching Control Objectives of PCI DSS?",
        "back": "1. Build and Maintain a Secure Network and Systems (Req 1, 2)\n2. Protect Account Data (Req 3, 4)\n3. Maintain a Vulnerability Management Program (Req 5, 6)\n4. Implement Strong Access Control Measures (Req 7, 8, 9)\n5. Regularly Monitor and Test Networks (Req 10, 11)\n6. Maintain an Information Security Policy (Req 12)"
    },
    {
        "cat": "Ecosystem Roles",
        "front": "Who enforces PCI DSS compliance and assesses fines/penalties?",
        "back": "Payment Brands (Visa, MasterCard, Amex, Discover, JCB) and Acquirers (Merchant Banks).\n\nCRITICAL TRAP: The PCI SSC ONLY creates, manages, and publishes standards and trains assessors. The PCI SSC has NO enforcement power, imposes NO fines, and does NOT mandate compliance programs!"
    },
    {
        "cat": "Req 3: Data Protection",
        "front": "What are the 4 approved methods to render stored PAN unreadable (Req 3.5)?",
        "back": "1. One-way hashing based on strong cryptography of the entire PAN (with keyed salt in v4.0)\n2. Truncation (permanent removal of digits, e.g. first 6/8 and last 4)\n3. Index tokens and securely stored token pads\n4. Strong cryptography with associated key-management processes (e.g. AES-128/256)"
    },
    {
        "cat": "Req 11: Testing",
        "front": "What are the key timeframes for Vulnerability Scans vs Penetration Testing?",
        "back": "\u2022 Internal Scans: At least quarterly + after significant changes (qualified internal or external personnel)\n\u2022 External Scans: At least quarterly + after significant changes (must be performed by a PCI-approved ASV)\n\u2022 Penetration Testing: At least annually (every 12 months) + after significant infrastructure/app changes\n\u2022 Service Provider Segmentation Pentest: At least once every 6 months"
    },
    {
        "cat": "Compensating Controls",
        "front": "What are the 4 mandatory validation criteria for a Compensating Control (Appendix C)?",
        "back": "1. Meets the intent and rigor of the original requirement\n2. Provides an equivalent level of defense (offsets the risk)\n3. Above and beyond other PCI DSS requirements (cannot just be doing another required control)\n4. Commensurate with the additional risk\n\n*TRAP: Financial constraints or budget limitations are NEVER accepted as justification!"
    },
    {
        "cat": "Customized Approach",
        "front": "What is the PCI DSS v4.0 'Customized Approach' (Appendix D)?",
        "back": "Allows mature entities to design their own custom security controls to meet a Requirement's Stated Objective rather than following the prescriptive Defined Approach.\n\nKey Requirements:\n\u2022 Entity must perform and document a Targeted Risk Analysis (TRA)\n\u2022 Entity designs custom controls & testing procedures\n\u2022 The Assessor must independently design and execute custom testing procedures to validate effectiveness."
    },
    {
        "cat": "Req 6 & 11: Web Security",
        "front": "What are the new PCI DSS v4.0 requirements for E-Commerce Payment Pages?",
        "back": "\u2022 Req 6.4.3: Inventory, document business justification, and ensure cryptographic integrity/authorization for ALL scripts executing in consumer browsers on payment pages.\n\u2022 Req 11.6.1: Implement tamper-detection mechanisms (alerts on unauthorized script/header modification) evaluated at least weekly."
    },
    {
        "cat": "Req 7 & 8: Access Control",
        "front": "What are the major new account and authentication rules in PCI DSS v4.0?",
        "back": "\u2022 Inactive accounts: Disabled or deleted within 90 days of inactivity (Req 8.2.6)\n\u2022 User access review: Conducted at least once every 6 months (Req 7.2.4)\n\u2022 Passwords: Minimum 12 characters (or 8 if system technically incapable) (Req 8.3.6)\n\u2022 MFA: Required for ALL users entering the CDE, not just remote/admin users (Req 8.4.2)"
    },
    {
        "cat": "SAQs",
        "front": "What is the difference between SAQ A and SAQ A-EP?",
        "back": "\u2022 SAQ A: Card-not-present merchant who 100% outsources payment processing to a compliant third party via hosted iframe or URL redirect. No merchant system ever sees or impacts cardholder data.\n\u2022 SAQ A-EP: Merchant hosts the e-commerce website/checkout page that directs payment data to a third party (e.g. JavaScript SDK / Direct Post). Merchant server impacts transaction security!"
    },
    {
        "cat": "SAQs",
        "front": "Which SAQ do Service Providers use?",
        "back": "SAQ D for Service Providers.\n\nCRITICAL RULE: Service Providers are NEVER eligible to complete SAQ A, B, or C. They must complete SAQ D for Service Providers (or have an on-site ROC assessment)."
    },
    {
        "cat": "Software Security",
        "front": "What standard officially replaced PA-DSS?",
        "back": "The PCI Software Security Framework (SSF), composed of:\n1. Secure Software Standard (technical security of payment software)\n2. Secure Software Lifecycle (Secure SLC) Standard (software vendor's internal development processes)"
    },
    {
        "cat": "Ecosystem Roles",
        "front": "What are the 3 phases of the payment card transaction cycle (ACS)?",
        "back": "1. Authorization: Merchant requests approval from Issuer via Acquirer and Brand network; Issuer checks funds and returns authorization approval/decline code.\n2. Clearing: Exchange of final transaction information between Acquirer and Issuer via the Brand network.\n3. Settlement: Financial transfer of funds from Issuer to Acquirer, and from Acquirer into the Merchant bank account."
    },
    {
        "cat": "Ecosystem Roles",
        "front": "What is the exact distinction between the Acquirer and the Issuer?",
        "back": "\u2022 Acquirer (Merchant Bank): Financial institution contracted with the merchant to accept payments, process card batches, and disburse settled funds. Passes brand compliance fines to merchants.\n\u2022 Issuer (Cardholder Bank): Financial institution that issues credit/debit cards to consumers. ONLY THE ISSUER has the authority to approve or decline a purchase during authorization."
    },
    {
        "cat": "Ecosystem Roles",
        "front": "What is an Open-Loop (4-Party) vs Closed-Loop (3-Party) card system?",
        "back": "\u2022 Open-Loop (4-Party): Visa, MasterCard. Brand does not issue cards or acquire merchants directly. Four parties: Cardholder, Issuer, Acquirer, Merchant.\n\u2022 Closed-Loop (3-Party): American Express, Discover. Brand acts as both Issuer to consumers and Acquirer to merchants directly."
    },
    {
        "cat": "Professional Responsibility",
        "front": "What are the 3 disciplinary actions the PCI SSC can take against a certified professional (PCIP/QSA/ISA)?",
        "back": "1. Warning (formal notice of deficiency)\n2. Suspension (temporary removal of qualification)\n3. Revocation (permanent termination of credential)"
    },
    {
        "cat": "Scoping & Architecture",
        "front": "What systems are in scope for a PCI DSS assessment?",
        "back": "1. Cardholder Data Environment (CDE): Systems that store, process, or transmit CHD/SAD, plus any systems on the same unsegmented network.\n2. Connected-To Systems: Systems directly connected to the CDE (e.g. jump boxes, admin workstations).\n3. Security-Impacting Systems: Systems that can affect the security of the CDE (e.g. Active Directory/LDAP, NTP, patch servers, SIEM, firewalls)."
    },
    {
        "cat": "Req 1: Network Security",
        "front": "What term replaced 'firewalls and routers' in PCI DSS v4.0, and why?",
        "back": "Network Security Controls (NSCs).\n\nPCI DSS v4.0 adopted 'NSCs' to be technology-neutral, embracing cloud security groups, virtual firewalls, container policies, and software-defined networking (SDN) alongside traditional hardware firewalls."
    },
    {
        "cat": "Req 1: Network Security",
        "front": "What are the primary NSC configuration rules for incoming and outgoing traffic?",
        "back": "\u2022 Inbound traffic: Restrict to only necessary protocols, services, and ports; deny all other traffic by default.\n\u2022 Outbound traffic: Restrict outbound traffic from the CDE to only explicitly authorized destinations; deny all other egress traffic by default.\n\u2022 Direct connections between the Internet and CDE are strictly forbidden (DMZ required)."
    },
    {
        "cat": "Req 2: Secure Configurations",
        "front": "What are the core requirements of Requirement 2 (Secure Configurations)?",
        "back": "\u2022 Change all vendor-supplied defaults (passwords, encryption keys, SNMP community strings) before system deployment.\n\u2022 Develop system configuration standards (hardening benchmarks such as CIS or NIST).\n\u2022 Remove unnecessary accounts, protocols, scripts, and services.\n\u2022 Disable or secure all non-console administrative access (SSH, HTTPS only; no plain telnet or HTTP)."
    },
    {
        "cat": "Req 3: Data Protection",
        "front": "What is Dual Control and Split Knowledge in Cryptographic Key Management?",
        "back": "\u2022 Split Knowledge: Key components are divided among multiple custodians such that no single person knows or possesses the full key.\n\u2022 Dual Control: Two separate individuals must authenticate or be present to authorize or execute a cryptographic key operation (e.g. generation, loading, rotation, destruction)."
    },
    {
        "cat": "Req 3: Data Protection",
        "front": "What is the difference between a Data Encryption Key (DEK) and a Key Encrypting Key (KEK)?",
        "back": "\u2022 DEK (Data Encryption Key): Directly encrypts and decrypts account data (PAN).\n\u2022 KEK (Key Encrypting Key): Encrypts the DEK to protect it in storage.\n\u2022 Principle: KEK must be at least as cryptographically strong as the DEK it protects, and stored separately from the encrypted DEK."
    },
    {
        "cat": "Req 4: Encryption in Transit",
        "front": "What networks require strong cryptography for PAN transmission under Requirement 4?",
        "back": "Open, public networks (e.g. the Internet, wireless/Wi-Fi, cellular, satellite).\n\nMust use trusted industry protocols (TLS 1.2 or TLS 1.3 with secure cipher suites; SSL and early TLS versions are strictly prohibited)."
    },
    {
        "cat": "Req 5: Malware Defense",
        "front": "How does PCI DSS v4.0 treat systems considered 'not commonly affected by malware'?",
        "back": "The entity must perform a documented Targeted Risk Analysis (TRA) to evaluate and confirm why anti-malware software is not necessary on those systems, and re-evaluate this risk analysis at least annually."
    },
    {
        "cat": "Req 6: Vulnerability & Patching",
        "front": "Within what timeframe must Critical and High security patches be deployed (Req 6.3.3)?",
        "back": "Within 30 calendar days of vendor release for all 'Critical' or 'High' vulnerabilities.\n\nLesser patches must be applied within an entity-defined timeframe based on formal risk assessment."
    },
    {
        "cat": "Req 6: Web Applications",
        "front": "What are the two compliance options for public-facing web applications under Req 6.4.1/6.4.2?",
        "back": "1. Automated technical solution that continually detects and prevents web-based attacks (e.g., Web Application Firewall - WAF) \u2014 MANDATORY as of March 31, 2025.\n2. Manual or automated application vulnerability assessments at least annually and after any changes (historically an option, but WAF is required under v4.0 for public-facing apps)."
    },
    {
        "cat": "Req 7: Access Control",
        "front": "What is the core principle governing user access under Requirement 7?",
        "back": "Principle of Least Privilege and Need-to-Know:\n\u2022 Access must be restricted strictly to the minimum necessary for the user's specific job role (Role-Based Access Control - RBAC).\n\u2022 Default access privilege must be set to 'Deny All'."
    },
    {
        "cat": "Req 8: Authentication",
        "front": "Where is Multi-Factor Authentication (MFA) required under PCI DSS v4.0 (Req 8.4)?",
        "back": "1. All non-console administrative access into the CDE.\n2. All remote access originating from outside the entity's network into the CDE.\n3. Req 8.4.2 (New in v4.0): ALL access (admin AND regular non-admin users) entering the Cardholder Data Environment."
    },
    {
        "cat": "Req 8: Authentication",
        "front": "Are shared or generic accounts permitted in PCI DSS?",
        "back": "STRICTLY PROHIBITED for individual users.\n\u2022 Every individual user must be assigned a unique ID to ensure non-repudiation and individual accountability.\n\u2022 Generic or shared administrative accounts (e.g. 'root' or 'administrator') may only be used on an exception basis with documented justification and individual secondary authentication."
    },
    {
        "cat": "Req 9: Physical Security",
        "front": "How long must physical visitor logs and video camera surveillance footage be retained (Req 9)?",
        "back": "At least 90 calendar days.\n\nVisitor logs must include: visitor name, firm represented, host employee, date, entry/exit time, and badge number."
    },
    {
        "cat": "Req 9: Physical Security",
        "front": "What controls are required for offsite media transport containing cardholder data?",
        "back": "\u2022 Media must be securely packaged and logged upon departure and receipt.\n\u2022 Must be transported via secure courier or other traceable delivery mechanism with signature verification.\n\u2022 Management authorization must be documented prior to release."
    },
    {
        "cat": "Req 10: Logging & Monitoring",
        "front": "How often must audit logs be reviewed, and which logs require daily review?",
        "back": "\u2022 Daily review (manual or automated): Security events, system components that perform security functions (firewalls, IDS/IPS, authentication servers), and all systems storing, processing, or transmitting CHD.\n\u2022 Periodic review (defined by TRA): All other system components."
    },
    {
        "cat": "Req 10: Logging & Monitoring",
        "front": "What is the mandatory retention timeline for audit logs (Req 10.5.1)?",
        "back": "At least 1 year total retention.\n\nWith at least the most recent 3 months immediately available for immediate analysis (online/readily accessible)."
    },
    {
        "cat": "Req 10: Logging & Monitoring",
        "front": "What time synchronization standard is required across all in-scope systems?",
        "back": "Network Time Protocol (NTP) or equivalent technology.\n\u2022 Must synchronize from designated, reliable central internal time servers.\n\u2022 Time sync ensures chronological accuracy and legal admissability of forensic audit trails across distributed systems."
    },
    {
        "cat": "Req 11: Security Testing",
        "front": "What constitutes a 'clean' passing ASV external vulnerability scan?",
        "back": "\u2022 No vulnerabilities scored CVSS 4.0 or higher.\n\u2022 No automatic failures (e.g. unsupported OS, default account, SQL injection, open recursive DNS, visible PAN).\n\u2022 All scan exceptions must be addressed through formal ASV dispute process."
    },
    {
        "cat": "Req 11: Security Testing",
        "front": "How frequently must internal and external penetration testing be conducted?",
        "back": "\u2022 Annually (at least once every 12 months).\n\u2022 After any significant infrastructure or application changes.\n\u2022 Must cover both application-layer and network-layer pentesting inside and outside the perimeter.\n\u2022 Critical vulnerabilities must be remediated and retested until clean."
    },
    {
        "cat": "Req 11: Security Testing",
        "front": "How often must rogue wireless access points be detected (Req 11.2)?",
        "back": "At least once every 3 months (quarterly).\n\nConducted via automated Wireless Intrusion Detection/Prevention Systems (WIDS/WIPS) or physical site walk-around RF scanning."
    },
    {
        "cat": "Req 12: Policies & Programs",
        "front": "How often must the PCI DSS scope documentation be updated and verified (Req 12.5.2)?",
        "back": "\u2022 Merchants: At least once every 12 months (annually).\n\u2022 Service Providers: At least once every 6 months (semi-annually) + after significant architectural changes."
    },
    {
        "cat": "Req 12: Policies & Programs",
        "front": "What are the rules regarding Third-Party Service Provider (TPSP) agreements (Req 12.8.2)?",
        "back": "The entity must maintain written agreements with all TPSPs in which the TPSP explicitly acknowledges in writing its responsibility for the security of cardholder data it possesses, stores, processes, or transmits on behalf of the customer."
    },
    {
        "cat": "Req 12: Policies & Programs",
        "front": "How often must security awareness training and Incident Response Plan testing be conducted?",
        "back": "\u2022 Security Awareness Training: Upon hire and at least once every 12 months thereafter (with role-specific training for developers and administrators).\n\u2022 Incident Response Plan Testing: Tested at least once every 12 months (annually), including simulated scenarios."
    },
    {
        "cat": "Appendices",
        "front": "What is Appendix A1 (Multi-Tenant Service Providers)?",
        "back": "Applies to hosting and cloud providers serving multiple clients.\n\u2022 Must ensure logical isolation between tenant environments.\n\u2022 Must prevent one tenant from accessing or viewing another tenant's cardholder data or logs.\n\u2022 Provider must facilitate client penetration testing and audit rights."
    },
    {
        "cat": "Appendices",
        "front": "What is Appendix A3 (DESV - Designated Entities Supplemental Validation)?",
        "back": "Additional rigorous oversight requirements invoked by a Card Brand or Acquirer for entities that:\n1. Have suffered a significant data compromise\n2. Maintain high transaction aggregation risk\n3. Exhibit ongoing systemic non-compliance\nRequires formal BAU compliance program and designated executive compliance officer."
    },
    {
        "cat": "Other Standards",
        "front": "What is a PCI Point-to-Point Encryption (P2PE) solution?",
        "back": "A comprehensive hardware-to-hardware encryption system where account data is encrypted inside a certified PTS Point of Interaction (POI) terminal and remains encrypted until reaching the provider's secure decryption environment.\n\nMassively reduces merchant PCI DSS scope (allowing merchant to use SAQ P2PE - only ~33 requirements!)."
    },
    {
        "cat": "Other Standards",
        "front": "What does the PCI PIN Security Standard govern?",
        "back": "The secure management, processing, and transmission of personal identification numbers (PINs) during online and offline payment card transactions at ATMs and unattended/attended POS terminals.\n\nMandates that PINs must NEVER exist in plaintext outside a certified secure cryptographic device (HSM/PTS)."
    },
    {
        "cat": "Other Standards",
        "front": "What is PCI 3-D Secure (3DS Core)?",
        "back": "An authentication protocol that provides an additional identity validation layer for Card-Not-Present (CNP) e-commerce transactions.\n\nEnables cardholders to authenticate with their card issuer (via one-time passcode, biometrics, or risk analytics) before the purchase authorization occurs, reducing fraudulent chargebacks."
    },
    {
        "cat": "SAQs",
        "front": "What is SAQ B vs SAQ B-IP?",
        "back": "\u2022 SAQ B: Merchants using standalone, dial-up (brick-and-mortar) payment terminals connected via traditional phone line; no electronic cardholder data storage.\n\u2022 SAQ B-IP: Merchants using standalone PTS-approved point-of-interaction (POI) terminals connected via IP network/Ethernet to the payment processor; no electronic storage."
    },
    {
        "cat": "SAQs",
        "front": "What is SAQ C-VT vs SAQ C?",
        "back": "\u2022 SAQ C-VT: Merchants who manually enter transactions one-by-one into an online virtual terminal hosted by a third-party processor via web browser; no hardware card readers; no cardholder data storage.\n\u2022 SAQ C: Merchants with dedicated payment application systems connected to the Internet (e.g. POS software on a local PC); no electronic cardholder data storage."
    },
    {
        "cat": "Assessor Programs",
        "front": "What are the distinct roles of QSA, ISA, and PCIP?",
        "back": "\u2022 QSA (Qualified Security Assessor): Independent consultant working for an approved QSA Company; performs external audits, issues Reports on Compliance (ROC).\n\u2022 ISA (Internal Security Assessor): Employee of an entity trained by PCI SSC to sponsor internal compliance, perform internal assessments, and liaise with QSAs.\n\u2022 PCIP (Payment Card Industry Professional): Individual credential demonstrating foundational expertise in PCI standards; does not sign official audit ROCs."
    },
    {
        "cat": "Scoping & Tokenization",
        "front": "Does tokenization always remove systems completely from PCI DSS scope?",
        "back": "NO.\n\u2022 The tokenization server, token database, and key-management systems are IN FULL SCOPE.\n\u2022 Systems that store or process non-reversible tokens (with no ability to detokenize) are generally OUT of scope, provided they cannot access the detokenization mechanism."
    },
    {
        "cat": "Emergency Cram Rule",
        "front": "What is the #1 Cardinal Rule to remember for every single question on the PCIP exam?",
        "back": "SAD CAN NEVER BE STORED POST-AUTHORIZATION!\n\nIf any question asks if full track data, CVV/CVC, or PIN can be kept for recurring billing, chargebacks, troubleshooting, or fraud analysis\u2014the answer is ALWAYS NO. Even with customer consent, even with AES-256 encryption, post-auth storage of SAD is strictly illegal!"
    }
];

  let activeFlashcardDeck = 'core'; // 'core', 'questions', 'missed'
  let activeFlashcards = [...CORE_FLASHCARDS];

  function getDeckCards(deckType) {
    if (deckType === 'questions') {
      return allQuestions.map(q => {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const optionsList = q.options.map((opt, i) => `${letters[i] || i + 1}) ${opt}`).join('\n');
        const correctAnswers = q.correct.map(idx => `${letters[idx] || idx + 1}) ${q.options[idx]}`).join('\n');
        return {
          cat: q.category,
          front: `[${q.category}]\n\n${q.question}\n\nOptions:\n${optionsList}`,
          back: `CORRECT ANSWER:\n${correctAnswers}\n\nEXPLANATION:\n${q.explanation}\n\nEXAM TIP:\n${q.tip}\n\nREF: ${q.v4_ref}`
        };
      });
    } else if (deckType === 'missed') {
      const missed = allQuestions.filter(q => incorrectQids.has(q.id));
      if (missed.length === 0) {
        return [{
          cat: "Weak Areas Queue",
          front: "Great news! You have no recorded incorrect answers yet.",
          back: "Answer questions in Practice Mode or Exam Simulator. Any questions you answer incorrectly will automatically appear here as flashcards!"
        }];
      }
      return missed.map(q => {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const correctAnswers = q.correct.map(idx => `${letters[idx] || idx + 1}) ${q.options[idx]}`).join('\n');
        return {
          cat: q.category,
          front: `[MISSED QUESTION • ${q.category}]\n\n${q.question}`,
          back: `CORRECT ANSWER:\n${correctAnswers}\n\nEXPLANATION:\n${q.explanation}\n\nEXAM TIP:\n${q.tip}`
        };
      });
    }
    return [...CORE_FLASHCARDS];
  }

  function setFlashcardDeck(deckType) {
    activeFlashcardDeck = deckType;
    activeFlashcards = getDeckCards(deckType);
    flashcardIndex = 0;
    flashcardFlipped = false;
    renderFlashcard();
  }

  function shuffleActiveFlashcards() {
    for (let i = activeFlashcards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [activeFlashcards[i], activeFlashcards[j]] = [activeFlashcards[j], activeFlashcards[i]];
    }
    flashcardIndex = 0;
    flashcardFlipped = false;
    renderFlashcard();
  }

  function renderFlashcard() {
    if (!activeFlashcards || activeFlashcards.length === 0) {
      activeFlashcards = [...CORE_FLASHCARDS];
    }
    if (flashcardIndex >= activeFlashcards.length) {
      flashcardIndex = 0;
    }
    const card = activeFlashcards[flashcardIndex];
    const curEl = document.getElementById('flashcard-current');
    const totEl = document.getElementById('flashcard-total');
    if (curEl) curEl.textContent = flashcardIndex + 1;
    if (totEl) totEl.textContent = activeFlashcards.length;

    const cardInner = document.getElementById('flashcard-inner');
    if (!cardInner) return;
    cardInner.innerHTML = `
      <div class="relative w-full min-h-[22rem] rounded-3xl border border-slate-200 bg-white shadow-md p-6 md:p-8 flex flex-col justify-between cursor-pointer transition-all hover:shadow-lg ${flashcardFlipped ? 'bg-indigo-50/60 border-indigo-200' : ''}">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${flashcardFlipped ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}">
            ${card.cat || (flashcardFlipped ? 'Official Standard Answer' : 'Concept / Question')}
          </span>
          <span class="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200">
            Tap to ${flashcardFlipped ? 'see front ↩' : 'flip answer ↪'}
          </span>
        </div>

        <div class="my-auto py-6 text-left">
          <div class="text-sm md:text-base font-medium ${flashcardFlipped ? 'text-indigo-950 whitespace-pre-line leading-relaxed' : 'text-slate-900 leading-relaxed font-semibold'}">
            ${flashcardFlipped ? card.back : card.front}
          </div>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3 mt-2">
          <span>Deck: <strong class="text-slate-600 uppercase font-mono">${activeFlashcardDeck}</strong></span>
          <span>Card ${flashcardIndex + 1} of ${activeFlashcards.length}</span>
        </div>
      </div>
    `;

    cardInner.onclick = () => {
      flashcardFlipped = !flashcardFlipped;
      renderFlashcard();
    };

    const prevBtn = document.getElementById('flashcard-prev-btn');
    const nextBtn = document.getElementById('flashcard-next-btn');
    if (prevBtn) prevBtn.disabled = (flashcardIndex === 0);
    if (nextBtn) nextBtn.disabled = (flashcardIndex === activeFlashcards.length - 1);
  }

  // Deck selector change listener
  const deckSelect = document.getElementById('flashcard-deck-select');
  if (deckSelect) {
    deckSelect.addEventListener('change', (e) => {
      setFlashcardDeck(e.target.value);
    });
  }

  // Shuffle button listener
  const shuffleBtn = document.getElementById('flashcard-shuffle-btn');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      shuffleActiveFlashcards();
    });
  }

  const fcPrev = document.getElementById('flashcard-prev-btn');
  if (fcPrev) {
    fcPrev.addEventListener('click', () => {
      if (flashcardIndex > 0) {
        flashcardIndex--;
        flashcardFlipped = false;
        renderFlashcard();
      }
    });
  }

  const fcNext = document.getElementById('flashcard-next-btn');
  if (fcNext) {
    fcNext.addEventListener('click', () => {
      if (flashcardIndex < activeFlashcards.length - 1) {
        flashcardIndex++;
        flashcardFlipped = false;
        renderFlashcard();
      }
    });
  }

  // ---------------------------------------------------------------------
  // FOCUS REVIEW / WEAK AREAS & REMEDIATION QUEUE
  // ---------------------------------------------------------------------
  let reviewFilter = 'all'; // 'all', 'remediated', 'incorrect', 'bookmarks'

  function renderReviewView() {
    const bookmarkedList = allQuestions.filter(q => bookmarks.has(q.id));
    const incorrectList = allQuestions.filter(q => incorrectQids.has(q.id));
    const remediatedList = allQuestions.filter(q => everIncorrectQids.has(q.id) && !incorrectQids.has(q.id));
    const allWeakList = allQuestions.filter(q => everIncorrectQids.has(q.id));

    // Update Counter Elements in Header
    const bookmarkedCountEl = document.getElementById('bookmarked-count');
    const incorrectCountEl = document.getElementById('incorrect-count');
    const remediatedCountEl = document.getElementById('remediated-count');
    const totalWeakCountEl = document.getElementById('total-weak-count');
    if (bookmarkedCountEl) bookmarkedCountEl.textContent = bookmarkedList.length;
    if (incorrectCountEl) incorrectCountEl.textContent = incorrectList.length;
    if (remediatedCountEl) remediatedCountEl.textContent = remediatedList.length;
    if (totalWeakCountEl) totalWeakCountEl.textContent = allWeakList.length;

    // Update Tab Counts
    const tabAllWeakCount = document.getElementById('tab-all-weak-count');
    const tabRemediatedCount = document.getElementById('tab-remediated-count');
    const tabIncorrectCount = document.getElementById('tab-incorrect-count');
    const tabBookmarksCount = document.getElementById('tab-bookmarks-count');
    if (tabAllWeakCount) tabAllWeakCount.textContent = allWeakList.length;
    if (tabRemediatedCount) tabRemediatedCount.textContent = remediatedList.length;
    if (tabIncorrectCount) tabIncorrectCount.textContent = incorrectList.length;
    if (tabBookmarksCount) tabBookmarksCount.textContent = bookmarkedList.length;

    // Filter button styling and listeners
    const filterBtns = {
      'all': document.getElementById('filter-all-weak-btn'),
      'remediated': document.getElementById('filter-remediated-btn'),
      'incorrect': document.getElementById('filter-incorrect-btn'),
      'bookmarks': document.getElementById('filter-bookmarks-btn')
    };

    Object.entries(filterBtns).forEach(([key, btn]) => {
      if (!btn) return;
      if (key === reviewFilter) {
        btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs cursor-pointer';
      } else {
        btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer';
      }
      btn.onclick = () => {
        reviewFilter = key;
        renderReviewView();
      };
    });

    const listContainer = document.getElementById('review-items-container');
    if (!listContainer) return;

    // Determine questions to show based on reviewFilter
    let displayQuestions = [];
    if (reviewFilter === 'remediated') {
      displayQuestions = remediatedList;
    } else if (reviewFilter === 'incorrect') {
      displayQuestions = incorrectList;
    } else if (reviewFilter === 'bookmarks') {
      displayQuestions = bookmarkedList;
    } else {
      // 'all': all weak history + bookmarks
      const combined = new Map();
      allWeakList.forEach(q => combined.set(q.id, q));
      bookmarkedList.forEach(q => combined.set(q.id, q));
      displayQuestions = Array.from(combined.values());
    }

    if (!displayQuestions.length) {
      let emptyMsg = 'No questions found in this view!';
      let emptySub = 'As you practice questions or complete mock exams, items will automatically populate this queue.';
      if (reviewFilter === 'remediated') {
        emptyMsg = 'No Remediated Questions Yet';
        emptySub = 'Questions that you answered incorrectly and subsequently changed to the correct answer will automatically appear here so you can verify long-term retention!';
      } else if (reviewFilter === 'incorrect') {
        emptyMsg = 'Zero Active Missed Questions';
        emptySub = 'Great job! You have no currently unresolved missed questions.';
      } else if (reviewFilter === 'bookmarks') {
        emptyMsg = 'No Bookmarked Questions';
        emptySub = 'Star questions during Practice Mode to save them here for rapid review.';
      }

      listContainer.innerHTML = `
        <div class="p-8 sm:p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-3xl font-bold">
            ✨
          </div>
          <p class="text-slate-800 font-extrabold text-base">${emptyMsg}</p>
          <p class="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">${emptySub}</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = displayQuestions.map(q => {
      const isIncorrect = incorrectQids.has(q.id);
      const isRemediated = everIncorrectQids.has(q.id) && !isIncorrect;
      const isBookmarked = bookmarks.has(q.id);

      let tagBadges = [];
      if (isRemediated) {
        tagBadges.push(`<span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1"><span>🔄</span> <span>Remediated (Originally Missed, Now Correct)</span></span>`);
      } else if (isIncorrect) {
        tagBadges.push(`<span class="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1"><span>✕</span> <span>Missed in Quiz (Active)</span></span>`);
      }
      if (isBookmarked) {
        tagBadges.push(`<span class="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1"><span>★</span> <span>Bookmarked</span></span>`);
      }

      const opts = q.options.map((opt, idx) => {
        const isC = q.correct.includes(idx);
        return `
          <div class="p-3 rounded-xl border text-xs md:text-sm ${isC ? 'border-emerald-300 bg-emerald-50 text-emerald-950 font-medium' : 'border-slate-200 text-slate-600 bg-white'}">
            <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt} ${isC ? '<span class="text-emerald-700 font-bold ml-1">✓ (Correct Answer)</span>' : ''}
          </div>
        `;
      }).join('');

      return `
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2">
              ${tagBadges.join('')}
              <span class="text-xs text-slate-400 font-mono font-bold">#${q.id} · ${q.category}</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="window.drillSingleQuestion(${q.id})" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs">
                <span>🔁</span> <span>Drill (Sandbox)</span>
              </button>
              <button onclick="window.markQuestionMasteredFromCheatsheet(${q.id})" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex items-center gap-1" title="Mark completely mastered and remove from weak list">
                <span>✓</span> <span>Mark Mastered</span>
              </button>
            </div>
          </div>

          ${isRemediated ? `
            <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-start gap-2">
              <span class="text-sm">💡</span>
              <div class="leading-relaxed">
                <strong>Remediation History:</strong> You originally answered this incorrectly, and then changed it to correct. Click <strong>"Drill (Sandbox)"</strong> to re-test it with zero impact on your running stats!
              </div>
            </div>
          ` : ''}

          <h4 class="font-bold text-slate-900 text-sm sm:text-base leading-snug">${q.question}</h4>
          <div class="space-y-1.5">${opts}</div>
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs md:text-sm text-slate-700 space-y-1.5">
            <p class="font-bold text-slate-900 mb-1">Reasoning & Standard Reference (${q.v4_ref || 'PCI DSS v4.0.1'}):</p>
            <p class="leading-relaxed">${q.explanation}</p>
            ${q.tip ? `<p class="mt-2 text-indigo-900 font-semibold bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-100 text-xs"><span class="font-bold">🎯 Exam Trap Clue:</span> ${q.tip}</p>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  const clearBmBtn = document.getElementById('clear-bookmarks-btn');
  if (clearBmBtn) {
    clearBmBtn.addEventListener('click', () => {
      if (!bookmarks.size) {
        alert('You have no bookmarks to clear.');
        return;
      }
      if (confirm(`Clear all ${bookmarks.size} bookmarks?`)) {
        bookmarks.clear();
        localStorage.removeItem('pcip_bookmarks');
        renderReviewView();
      }
    });
  }

  const clearIncBtn = document.getElementById('clear-incorrect-btn');
  if (clearIncBtn) {
    clearIncBtn.addEventListener('click', () => {
      if (!incorrectQids.size) {
        alert('You have no active missed questions to clear.');
        return;
      }
      if (confirm(`Clear all ${incorrectQids.size} currently missed questions?`)) {
        incorrectQids.clear();
        localStorage.setItem('pcip_incorrect', JSON.stringify([]));
        renderReviewView();
        if (typeof renderCheatsheetWeakAreas === 'function') renderCheatsheetWeakAreas();
        updatePracticeStats();
      }
    });
  }

  const clearRemBtn = document.getElementById('clear-remediated-btn');
  if (clearRemBtn) {
    clearRemBtn.addEventListener('click', () => {
      const remediatedIds = Array.from(everIncorrectQids).filter(id => !incorrectQids.has(id));
      if (!remediatedIds.length) {
        alert('You have no remediated questions to clear.');
        return;
      }
      if (confirm(`Clear all ${remediatedIds.length} remediated questions from your weak areas queue?`)) {
        remediatedIds.forEach(id => everIncorrectQids.delete(id));
        localStorage.setItem('pcip_ever_incorrect', JSON.stringify([...everIncorrectQids]));
        renderReviewView();
        if (typeof renderCheatsheetWeakAreas === 'function') renderCheatsheetWeakAreas();
      }
    });
  }

  // ---------------------------------------------------------------------
  // SECTION 8: DYNAMIC WEAK AREAS & PRIORITY REVISION FOR MASTER CHEAT SHEET
  // ---------------------------------------------------------------------
  const domainRulesMap = {
    'req 1': {
      title: 'Req 1: Network Security Controls (NSCs)',
      rules: [
        'Review firewall & router configuration rule sets at least once every six months (semi-annually).',
        'Inbound and outbound traffic must be restricted strictly to traffic necessary for the CDE; all other traffic explicitly denied.',
        'Anti-spoofing controls must be implemented at network perimeter boundaries to detect and block forged internal source IP addresses.'
      ]
    },
    'req 2': {
      title: 'Req 2: Secure Configurations & Default Passwords',
      rules: [
        'Change all vendor default passwords and remove unnecessary default accounts before deploying any system component to production.',
        'One primary function per system: Configure only one primary function per system component (or isolate using virtualization/containers).',
        'Disable all unnecessary services, protocols, daemons, and insecure functions; document business justification for all enabled services.'
      ]
    },
    'req 3': {
      title: 'Req 3: Protect Stored Account Data & SAD',
      rules: [
        'SAD Storage Prohibition: Sensitive Authentication Data (full track, CVV2/CVC2/CID, PIN block) must NEVER be retained post-authorization, even if encrypted!',
        'Render PAN unreadable anywhere stored: Strong cryptography (AES-256), keyed one-way hash, index tokens, or truncation. Masking alone does NOT satisfy storage!',
        'Masking on Display: Maximum first 6 and last 4 digits (or BIN + last 4) may be displayed without documented business need (Req 3.3.1).',
        'Live PAN Forbidden: Live production PANs are strictly forbidden in development, test, and staging environments (Req 6.5.3).'
      ]
    },
    'req 4': {
      title: 'Req 4: Protect Cardholder Data in Transit',
      rules: [
        'Strong cryptography (TLS 1.2 or TLS 1.3 with secure ciphers) is mandatory whenever cardholder data traverses open, public networks.',
        'End-user messaging prohibition: PANs must never be sent unprotected via email, instant messaging, SMS, or chat applications.'
      ]
    },
    'req 5': {
      title: 'Req 5: Malware & Phishing Defense',
      rules: [
        'Req 5.4.1 Phishing: Mandates AUTOMATED TECHNICAL mechanisms (anti-spoofing SPF, DKIM, DMARC, and email filtering) to detect & defend personnel against phishing.',
        'Administrative Training is Req 12.6.3 — do NOT confuse employee awareness training with automated 5.4.1 technical email defenses!',
        'Anti-malware must be actively deployed on all systems commonly affected by malware; systems deemed not affected require a formal annual Targeted Risk Analysis (TRA).'
      ]
    },
    'req 6': {
      title: 'Req 6: Secure Systems & Software Development',
      rules: [
        'Critical Security Patches: Must be installed within 30 calendar days of vendor release (Req 6.3.3). Non-critical patches installed per TRA.',
        'Payment Page Scripts (Req 6.4.3 & 11.6.1): Inventory, written justification, and integrity monitoring for ALL scripts executing in browser on payment pages; weekly tamper detection.',
        'Public-Facing Web Applications: Automated technical solution (such as a WAF) required to continuously detect and prevent web-based attacks.'
      ]
    },
    'req 7': {
      title: 'Req 7: Restrict Access to Need-to-Know',
      rules: [
        'Principle of Least Privilege: Access must be strictly restricted to the minimum required for an individual\'s job function (Role-Based Access Control).',
        'Default deny-all access privilege model required across all systems and user groups.'
      ]
    },
    'req 8': {
      title: 'Req 8: Identification & Authentication (MFA & Passwords)',
      rules: [
        'MFA Scope: MFA is mandatory for ALL individuals with non-console administrative access into CDE, AND for ALL access into the CDE (Req 8.4.2).',
        'Password Length: Minimum 12 characters (or at least 8 if system cannot support 12 and documented via TRA), containing alphabetic and numeric characters (Req 8.3.6).',
        'Unique IDs: Shared, generic, or group user accounts are strictly forbidden for individual accountability.'
      ]
    },
    'req 9': {
      title: 'Req 9: Physical Security of Systems & Devices',
      rules: [
        'Visitor logs and video surveillance camera footage must be retained for at least 90 calendar days.',
        'POI Device Tamper Inspection: Periodically inspect Point of Interaction (POI) card-reading devices for physical tampering or unauthorized substitution.'
      ]
    },
    'req 10': {
      title: 'Req 10: Log Monitoring & NTP Time Sync',
      rules: [
        'Daily Log Review: Mandatory once daily for all CDE system components, servers performing security functions (firewalls, IDS/IPS, authentication/RADIUS), and critical servers.',
        'Log Retention: Retain audit logs for at least 1 year total, with the most recent 3 months immediately accessible online.',
        'Network Time Protocol (NTP): All system clocks must synchronize with central designated time sources to ensure chronological accuracy for forensics.'
      ]
    },
    'req 11': {
      title: 'Req 11: Security Testing & Penetration Testing',
      rules: [
        'External ASV Scans: Quarterly by a PCI SSC Approved Scanning Vendor; passing scan requires ZERO vulnerabilities scored CVSS 4.0 or higher.',
        'Penetration Testing: Conducted at least annually (every 12 months) and after any significant infrastructure change; must include active exploitation.',
        'Segmentation Testing: Merchants test annually (12 months); Service Providers must test semi-annually (every 6 months) and after changes to segmentation controls.',
        'File Integrity Monitoring (FIM): Change-detection mechanism deployed to alert personnel to unauthorized modifications of critical system/binary files at least weekly.'
      ]
    },
    'req 12': {
      title: 'Req 12: Information Security Governance & Scoping',
      rules: [
        'Scope Confirmation: Merchants confirm annually (Req 12.5.2); Service Providers must confirm at least once every 6 months (semi-annually) under Req 12.5.2.1.',
        'Incident Response Plan: Tested at least once every 12 months (annually), including simulated breach scenarios and lessons learned.',
        'Third-Party Service Providers (TPSPs): Entity must maintain TPSP inventory, monitor PCI DSS compliance status at least annually, and execute written agreements.',
        'Targeted Risk Analysis (TRA): Any entity-defined control frequency must be documented in a TRA reviewed at least once every 12 months.'
      ]
    },
    'saq': {
      title: 'SAQ Eligibility & Scoping Architecture',
      rules: [
        'SAQ A: 100% of cardholder data functions outsourced to validated third party (URL redirect or iframe). No card data touches merchant server.',
        'SAQ A-EP: Merchant website delivers payment page, JavaScript, or uses Direct Post / APIs (merchant server impacts payment security).',
        'SAQ C-VT: Manual keyboard entry of single card transactions into web-based virtual terminal hosted by processor, on isolated PC with no card reader.',
        'SAQ D for Service Providers: Service providers can NEVER use SAQ A, B, or C. They must ALWAYS use SAQ D for Service Providers.',
        'Electronic Storage Disqualification: Storing cardholder data electronically anywhere immediately disqualifies from SAQs A, B, B-IP, C-VT, C, P2PE and mandates SAQ D.'
      ]
    },
    'scoping': {
      title: 'PCI DSS Scoping & Payment Flow',
      rules: [
        'Authorization Decision: ONLY the Card Issuer (the consumer\'s issuing bank) has the authority to approve or decline a transaction in real-time.',
        'Compensating Controls: Permitted ONLY for legitimate technical constraints or legal/regulatory limitations. Financial cost is NEVER an acceptable justification!',
        'Customized Approach: Entity meets the Stated Customized Objective and documents a Targeted Risk Analysis (TRA) in Appendix D (no CCW needed).'
      ]
    }
  };

  window.renderCheatsheetWeakAreas = function() {
    const cheatsheetWeakContainer = document.getElementById('cheatsheet-weak-areas-container');
    const cheatsheetWeakCountBadge = document.getElementById('cheatsheet-weak-count-badge');
    const cheatsheetJumpPracticeBtn = document.getElementById('cheatsheet-jump-practice-btn');
    const cheatsheetClearWeakBtn = document.getElementById('cheatsheet-clear-weak-btn');

    if (!cheatsheetWeakContainer) return;

    const incorrectList = allQuestions.filter(q => incorrectQids.has(q.id));
    const remediatedList = allQuestions.filter(q => everIncorrectQids.has(q.id) && !incorrectQids.has(q.id));
    const allWeakList = allQuestions.filter(q => everIncorrectQids.has(q.id));

    // Connect top header buttons
    if (cheatsheetJumpPracticeBtn) {
      cheatsheetJumpPracticeBtn.onclick = () => window.openRemediationDrill('all');
      cheatsheetJumpPracticeBtn.innerHTML = '<span>🔁</span> <span>Launch Isolated Drill</span>';
    }
    if (cheatsheetClearWeakBtn) {
      cheatsheetClearWeakBtn.onclick = () => window.clearAllMissedFromCheatsheet();
    }

    // Zero Weak Areas State
    if (!allWeakList.length) {
      if (cheatsheetWeakCountBadge) {
        cheatsheetWeakCountBadge.textContent = '0 Weak Areas (100% Mastery)';
        cheatsheetWeakCountBadge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold';
      }

      cheatsheetWeakContainer.innerHTML = `
        <div class="bg-white rounded-3xl p-8 sm:p-10 text-center border border-slate-200 shadow-sm space-y-4">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-3xl font-bold">
            🏆
          </div>
          <div class="space-y-1">
            <h4 class="text-lg font-black text-slate-900">Zero Weak Areas Active — 100% Mastery!</h4>
            <p class="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              You currently have 0 missed or remediated questions in your queue. As you complete questions in <strong>Practice Mode</strong> or take the <strong>75-Question Exam Simulator</strong>, any missed concepts will automatically generate customized cheat sheet revision notes right here!
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button onclick="switchTab('practice')" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm cursor-pointer">
              💡 Open Practice Mode
            </button>
            <button onclick="switchTab('exam')" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all shadow-sm cursor-pointer">
              ⏱️ Launch 75Q Exam Simulator
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Active Weak Areas State
    if (cheatsheetWeakCountBadge) {
      cheatsheetWeakCountBadge.textContent = `${incorrectList.length} Missed · ${remediatedList.length} Remediated`;
      cheatsheetWeakCountBadge.className = 'px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold';
    }

    // Group by category to find weak domains across all weak questions
    const domainCounts = {};
    allWeakList.forEach(q => {
      const cat = q.category || 'General';
      domainCounts[cat] = (domainCounts[cat] || 0) + 1;
    });

    const sortedDomains = Object.entries(domainCounts).sort((a, b) => b[1] - a[1]);

    // Find relevant domain rules
    const matchedRulesSections = [];
    const matchedKeys = new Set();

    sortedDomains.forEach(([cat]) => {
      const lower = cat.toLowerCase();
      Object.keys(domainRulesMap).forEach(key => {
        if (!matchedKeys.has(key) && lower.includes(key)) {
          matchedKeys.add(key);
          matchedRulesSections.push(domainRulesMap[key]);
        }
      });
    });

    if (!matchedRulesSections.length) {
      matchedRulesSections.push(domainRulesMap['req 3'], domainRulesMap['req 5']);
    }

    cheatsheetWeakContainer.innerHTML = `
      <!-- Domain Diagnostic Pill Bar -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div class="flex items-center justify-between flex-wrap gap-2 text-xs">
          <span class="font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span>🎯</span> <span>Weak Domain Diagnostics:</span>
          </span>
          <span class="text-slate-400 font-medium">Click any domain to launch an isolated sandbox drill</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          ${sortedDomains.map(([cat, count]) => `
            <button onclick="window.openRemediationDrill('all')" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
              <span>${cat}</span>
              <span class="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px]">${count} in weak queue</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Priority Cram Rules Tailored to Weak Areas -->
      <div class="bg-amber-50/70 rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-amber-800 font-black text-sm uppercase tracking-wide">
              ⚡ Targeted Priority Rules For Your Missed & Remediated Questions:
            </span>
          </div>
          <span class="text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
            High-Yield Focus
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          ${matchedRulesSections.map(sec => `
            <div class="bg-white rounded-xl p-4 border border-amber-200/60 shadow-2xs space-y-2">
              <h5 class="text-xs font-extrabold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> <span>${sec.title}</span>
              </h5>
              <ul class="text-xs text-slate-700 space-y-1.5 pl-1 leading-relaxed">
                ${sec.rules.map(r => `
                  <li class="flex items-start gap-1.5">
                    <span class="text-amber-600 font-bold shrink-0">•</span>
                    <span>${r}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Weak Questions Instant Review List -->
      <div class="space-y-3">
        <div class="flex items-center justify-between px-1 text-xs">
          <span class="font-extrabold text-slate-700 uppercase tracking-wider">
            Weak & Remediated Queue (${allWeakList.length} total · ${remediatedList.length} corrected)
          </span>
          <button onclick="window.openRemediationDrill('all')" class="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer">
            🔁 Launch Sandbox Re-Test Drill
          </button>
        </div>

        ${allWeakList.map(q => {
          const isRemediated = !incorrectQids.has(q.id);
          const correctLetters = q.correct.map(idx => String.fromCharCode(65 + idx)).join(', ');
          const correctText = q.correct.map(idx => q.options[idx]).join(' / ');

          return `
            <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full ${isRemediated ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'} text-[11px] font-bold">
                    ${isRemediated ? '🔄 Remediated (Fixed)' : '✕ Missed in Quiz'}
                  </span>
                  <span class="text-xs font-medium text-slate-400 font-mono">
                    #${q.id} · ${q.category}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="window.drillSingleQuestion(${q.id})" class="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all cursor-pointer flex items-center gap-1">
                    <span>🔁</span> <span>Drill (Sandbox)</span>
                  </button>
                  <button onclick="window.markQuestionMasteredFromCheatsheet(${q.id})" class="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 transition-all cursor-pointer flex items-center gap-1">
                    <span>✓</span> <span>Mark Mastered</span>
                  </button>
                </div>
              </div>

              <h4 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                ${q.question}
              </h4>

              <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium space-y-1">
                <span class="font-bold text-emerald-800 block text-[11px] uppercase tracking-wide">
                  ✅ Correct Answer: Option ${correctLetters}
                </span>
                <p class="leading-relaxed">${correctText}</p>
              </div>

              <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong class="text-slate-900 font-bold block mb-1">Official Reasoning & Standard Reference:</strong>
                ${q.explanation}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  };

  window.jumpToPracticeMissed = function() {
    switchTab('practice');
    const statusSelect = document.getElementById('practice-status-filter');
    if (statusSelect) {
      statusSelect.value = 'incorrect';
      practiceStatusFilter = 'incorrect';
      localStorage.setItem('pcip_practice_status_filter', 'incorrect');
    }
    const searchInput = document.getElementById('search-questions');
    if (searchInput) {
      searchInput.value = '';
      practiceSearch = '';
    }
    const catSelect = document.getElementById('category-filter');
    if (catSelect) {
      catSelect.value = 'all';
      practiceFilter = 'all';
    }
    updatePracticeList();
    practiceIndex = 0;
    renderPracticeQuestion();
  };

  window.jumpToPracticeDomain = function(domainName) {
    switchTab('practice');
    const catSelect = document.getElementById('category-filter');
    if (catSelect) {
      catSelect.value = domainName;
      practiceFilter = domainName;
    }
    const statusSelect = document.getElementById('practice-status-filter');
    if (statusSelect) {
      statusSelect.value = 'incorrect';
      practiceStatusFilter = 'incorrect';
      localStorage.setItem('pcip_practice_status_filter', 'incorrect');
    }
    updatePracticeList();
    practiceIndex = 0;
    renderPracticeQuestion();
  };

  window.markQuestionMasteredFromCheatsheet = function(qid) {
    qid = Number(qid);
    incorrectQids.delete(qid);
    everIncorrectQids.delete(qid);
    localStorage.setItem('pcip_incorrect', JSON.stringify([...incorrectQids]));
    localStorage.setItem('pcip_ever_incorrect', JSON.stringify([...everIncorrectQids]));
    renderCheatsheetWeakAreas();
    if (currentTab === 'review') renderReviewView();
    updatePracticeStats();
  };

  window.clearAllMissedFromCheatsheet = function() {
    const totalWeak = everIncorrectQids.size;
    if (!totalWeak) {
      alert('You have no weak area or missed questions to clear!');
      return;
    }
    if (confirm(`Mark all ${totalWeak} weak/remediated questions as mastered and clear your weak areas queue?`)) {
      incorrectQids.clear();
      everIncorrectQids.clear();
      localStorage.setItem('pcip_incorrect', JSON.stringify([]));
      localStorage.setItem('pcip_ever_incorrect', JSON.stringify([]));
      renderCheatsheetWeakAreas();
      if (currentTab === 'review') renderReviewView();
      updatePracticeStats();
    }
  };


  // ---------------------------------------------------------------------
  // TEXT-TO-SPEECH (READ ALOUD) ENGINE FOR MASTER CHEAT SHEET
  // ---------------------------------------------------------------------
  let ttsSentences = [];
  let ttsSentenceIndex = 0;
  let ttsIsSpeaking = false;
  let ttsIsPaused = false;
  let ttsCurrentSectionEl = null;

  const ttsPlayBtn = document.getElementById('tts-play-btn');
  const ttsPauseBtn = document.getElementById('tts-pause-btn');
  const ttsStopBtn = document.getElementById('tts-stop-btn');
  const ttsSectionSelect = document.getElementById('tts-section-select');
  const ttsSpeedSelect = document.getElementById('tts-speed-select');
  const ttsStatusText = document.getElementById('tts-status-text');
  const ttsProgressBar = document.getElementById('tts-progress-bar');
  const ttsProgressContainer = document.getElementById('tts-progress-container');

  function cleanTextForSpeech(text) {
    if (!text) return '';
    return text
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\bv4\.0\.1\b/gi, 'version 4 point 0 point 1')
      .replace(/\bv4\.0\b/gi, 'version 4 point 0')
      .replace(/\bv3\.2\.1\b/gi, 'version 3 point 2 point 1')
      .replace(/\bReq\s*(\d+(\.\d+)*)/gi, 'Requirement $1')
      .replace(/\bSAD\b/g, 'Sensitive Authentication Data')
      .replace(/\bCHD\b/g, 'Cardholder Data')
      .replace(/\bCDE\b/g, 'Cardholder Data Environment')
      .replace(/\bPAN\b/g, 'Primary Account Number')
      .replace(/\bMFA\b/g, 'Multi-Factor Authentication')
      .replace(/\bPCI\s*SSC\b/gi, 'P C I Security Standards Council')
      .replace(/\bPCI\s*DSS\b/gi, 'P C I D S S')
      .replace(/\bQSA\b/g, 'Qualified Security Assessor')
      .replace(/\bISA\b/g, 'Internal Security Assessor')
      .replace(/\bASV\b/g, 'Approved Scanning Vendor')
      .replace(/\bPCIP\b/g, 'P C I P')
      .replace(/\bFIM\b/g, 'File Integrity Monitoring')
      .replace(/\bWAF\b/g, 'Web Application Firewall')
      .replace(/\bIDS\/IPS\b/gi, 'Intrusion Detection and Prevention Systems')
      .replace(/\bTPSP\b/g, 'Third Party Service Provider')
      .replace(/\bDESV\b/g, 'Designated Entities Supplemental Validation')
      .replace(/\bTRA\b/g, 'Targeted Risk Analysis')
      .replace(/\bP2PE\b/g, 'Point to Point Encryption')
      .replace(/\bPOI\b/g, 'Point of Interaction')
      .replace(/\bPTS\b/g, 'PIN Transaction Security')
      .replace(/\bSSF\b/g, 'Software Security Framework')
      .replace(/\b3DS\b/g, '3 D Secure')
      .replace(/\bMPoC\b/g, 'Mobile Payments on Commercial Off the Shelf')
      .replace(/\bNTP\b/g, 'Network Time Protocol')
      .replace(/\bCVV2\/CVC2\b/gi, 'card verification code')
      .replace(/\bCVV\b/gi, 'card verification code')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getSectionSpeechItems(targetId) {
    let sections = [];
    if (targetId === 'all') {
      sections = Array.from(document.querySelectorAll('.cheat-section'));
    } else {
      const el = document.getElementById(targetId);
      if (el) sections = [el];
    }

    const items = [];
    sections.forEach(sec => {
      const clone = sec.cloneNode(true);
      clone.querySelectorAll('.section-audio-btn').forEach(b => b.remove());

      const blocks = clone.querySelectorAll('h3, h4, p, li, tr');
      blocks.forEach(block => {
        const raw = block.innerText || block.textContent || '';
        const cleaned = cleanTextForSpeech(raw);
        if (cleaned.length > 5) {
          const sentences = cleaned.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) || [cleaned];
          sentences.forEach(s => {
            const sTrim = s.trim();
            if (sTrim.length > 3) {
              items.push({
                text: sTrim,
                sectionEl: sec
              });
            }
          });
        }
      });
    });
    return items;
  }

  function stopAudioNarration() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    ttsIsSpeaking = false;
    ttsIsPaused = false;
    ttsSentences = [];
    ttsSentenceIndex = 0;

    if (ttsCurrentSectionEl) {
      ttsCurrentSectionEl.classList.remove('ring-4', 'ring-indigo-400', 'bg-indigo-50/40');
      ttsCurrentSectionEl = null;
    }

    if (ttsPlayBtn) ttsPlayBtn.classList.remove('hidden');
    if (ttsPauseBtn) ttsPauseBtn.classList.add('hidden');
    if (ttsStatusText) ttsStatusText.textContent = 'Audio stopped · Ready to read aloud';
    if (ttsProgressContainer) ttsProgressContainer.classList.add('hidden');
    if (ttsProgressBar) ttsProgressBar.style.width = '0%';
  }

  function pauseAudioNarration() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && ttsIsSpeaking) {
      window.speechSynthesis.pause();
      ttsIsPaused = true;
      if (ttsPlayBtn) ttsPlayBtn.classList.remove('hidden');
      if (ttsPauseBtn) ttsPauseBtn.classList.add('hidden');
      if (ttsStatusText) ttsStatusText.textContent = '⏸ Paused · Click Play to resume';
    }
  }

  function playNextSentence() {
    if (!ttsIsSpeaking || ttsSentenceIndex >= ttsSentences.length) {
      stopAudioNarration();
      if (ttsStatusText) ttsStatusText.textContent = '✓ Finished reading cheat sheet!';
      return;
    }

    const currentItem = ttsSentences[ttsSentenceIndex];

    if (ttsCurrentSectionEl !== currentItem.sectionEl) {
      if (ttsCurrentSectionEl) {
        ttsCurrentSectionEl.classList.remove('ring-4', 'ring-indigo-400', 'bg-indigo-50/40');
      }
      ttsCurrentSectionEl = currentItem.sectionEl;
      if (ttsCurrentSectionEl) {
        ttsCurrentSectionEl.classList.add('ring-4', 'ring-indigo-400', 'bg-indigo-50/40', 'transition-all');
        ttsCurrentSectionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    const pct = Math.round(((ttsSentenceIndex + 1) / ttsSentences.length) * 100);
    if (ttsProgressBar) ttsProgressBar.style.width = `${pct}%`;
    if (ttsStatusText) {
      const h3 = ttsCurrentSectionEl ? ttsCurrentSectionEl.querySelector('h3') : null;
      const title = h3 ? h3.innerText.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim() : 'Cheat Sheet';
      ttsStatusText.textContent = `🔊 Reading: ${title} (${pct}%)`;
    }

    const rate = parseFloat(ttsSpeedSelect ? ttsSpeedSelect.value : '1.0') || 1.0;
    const utterance = new SpeechSynthesisUtterance(currentItem.text);
    utterance.rate = rate;
    utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Alex')));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      if (ttsIsSpeaking && !ttsIsPaused) {
        ttsSentenceIndex++;
        playNextSentence();
      }
    };

    utterance.onerror = () => {
      if (ttsIsSpeaking && !ttsIsPaused) {
        ttsSentenceIndex++;
        playNextSentence();
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  function startAudioNarration(sectionId) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Your browser does not support Web Speech synthesis. Please use Chrome, Safari, or Edge.');
      return;
    }

    if (ttsIsPaused) {
      window.speechSynthesis.resume();
      ttsIsPaused = false;
      ttsIsSpeaking = true;
      if (ttsPlayBtn) ttsPlayBtn.classList.add('hidden');
      if (ttsPauseBtn) ttsPauseBtn.classList.remove('hidden');
      if (ttsStatusText) ttsStatusText.textContent = '🔊 Resuming audio playback...';
      return;
    }

    stopAudioNarration();

    const targetSection = sectionId || (ttsSectionSelect ? ttsSectionSelect.value : 'all');
    ttsSentences = getSectionSpeechItems(targetSection);

    if (!ttsSentences.length) {
      alert('Could not find text for this section.');
      return;
    }

    ttsSentenceIndex = 0;
    ttsIsSpeaking = true;
    ttsIsPaused = false;

    if (ttsPlayBtn) ttsPlayBtn.classList.add('hidden');
    if (ttsPauseBtn) ttsPauseBtn.classList.remove('hidden');
    if (ttsProgressContainer) ttsProgressContainer.classList.remove('hidden');

    playNextSentence();
  }

  // Hook up TTS buttons
  if (ttsPlayBtn) {
    ttsPlayBtn.addEventListener('click', () => {
      startAudioNarration();
    });
  }

  if (ttsPauseBtn) {
    ttsPauseBtn.addEventListener('click', () => {
      pauseAudioNarration();
    });
  }

  if (ttsStopBtn) {
    ttsStopBtn.addEventListener('click', () => {
      stopAudioNarration();
    });
  }

  // Section quick audio buttons
  document.querySelectorAll('.section-audio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      if (ttsSectionSelect) ttsSectionSelect.value = targetId;
      startAudioNarration(targetId);
    });
  });

  // ---------------------------------------------------------------------
  // BACKUP / SYNC & TRANSFER PROGRESS (LOCAL <-> GITHUB PAGES)
  // ---------------------------------------------------------------------
  const syncModal = document.getElementById('sync-modal');
  const backupSyncBtn = document.getElementById('backup-sync-btn');
  const closeSyncModalBtn = document.getElementById('close-sync-modal-btn');
  const exportBackupBtn = document.getElementById('export-backup-btn');
  const copyBackupBtn = document.getElementById('copy-backup-btn');
  const importFileInput = document.getElementById('import-file-input');
  const importPasteBtn = document.getElementById('import-paste-btn');
  const syncStatPill = document.getElementById('sync-stat-pill');

  function updateSyncPill() {
    if (syncStatPill) {
      syncStatPill.textContent = `${completedQids.size} answered (${bookmarks.size} bookmarked)`;
    }
  }

  function openSyncModal() {
    updateSyncPill();
    if (syncModal) syncModal.classList.remove('hidden');
  }

  function closeSyncModal() {
    if (syncModal) syncModal.classList.add('hidden');
  }

  if (backupSyncBtn) backupSyncBtn.addEventListener('click', openSyncModal);
  if (closeSyncModalBtn) closeSyncModalBtn.addEventListener('click', closeSyncModal);
  if (syncModal) {
    syncModal.addEventListener('click', (e) => {
      if (e.target === syncModal) closeSyncModal();
    });
  }

  // ---------------------------------------------------------------------
  // PERFORMANCE ANALYTICS & EXAM PASS PROBABILITY (PSYCHOMETRIC ENGINE)
  // ---------------------------------------------------------------------
  const scoreAnalyticsModal = document.getElementById('score-analytics-modal');
  const closeAnalyticsModalBtn = document.getElementById('close-analytics-modal-btn');
  const analyticsPracticeMissedBtn = document.getElementById('analytics-practice-missed-btn');
  const analyticsOpenTelltalesBtn = document.getElementById('analytics-open-telltales-btn');
  const practiceAccuracyBadge = document.getElementById('practice-accuracy-badge');

  function openScoreAnalyticsModal() {
    try {
      renderScoreAnalytics();
    } catch (err) {
      console.error('Error rendering score analytics:', err);
    }
    const modal = document.getElementById('score-analytics-modal') || scoreAnalyticsModal;
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
  }

  function closeScoreAnalyticsModal() {
    const modal = document.getElementById('score-analytics-modal') || scoreAnalyticsModal;
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  }
  window.closeScoreAnalyticsModal = closeScoreAnalyticsModal;
  window.openScoreAnalyticsModal = openScoreAnalyticsModal;
  window.renderScoreAnalytics = renderScoreAnalytics;

  // Global click delegation for maximum reliability
  document.addEventListener('click', (e) => {
    if (e.target && e.target.closest('#practice-accuracy-badge, #nav-analytics-btn, .open-analytics-trigger')) {
      e.preventDefault();
      openScoreAnalyticsModal();
    }
  });

  if (practiceAccuracyBadge) {
    practiceAccuracyBadge.addEventListener('click', (e) => {
      e.preventDefault();
      openScoreAnalyticsModal();
    });
  }
  if (closeAnalyticsModalBtn) {
    closeAnalyticsModalBtn.addEventListener('click', closeScoreAnalyticsModal);
  }
  if (scoreAnalyticsModal) {
    scoreAnalyticsModal.addEventListener('click', (e) => {
      if (e.target === scoreAnalyticsModal) closeScoreAnalyticsModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeScoreAnalyticsModal();
      if (syncModal && !syncModal.classList.contains('hidden')) {
        closeSyncModal();
      }
    }
  });

  if (analyticsPracticeMissedBtn) {
    analyticsPracticeMissedBtn.addEventListener('click', () => {
      closeScoreAnalyticsModal();
      window.jumpToPracticeMissed();
    });
  }

  if (analyticsOpenTelltalesBtn) {
    analyticsOpenTelltalesBtn.addEventListener('click', () => {
      closeScoreAnalyticsModal();
      switchTab('telltales');
    });
  }

  function logGamma(z) {
    const g = 7;
    const C = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.138571095857209, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];
    if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
    z -= 1;
    let x = C[0];
    for (let i = 1; i < g + 2; i++) x += C[i] / (z + i);
    const t = z + g + 0.5;
    return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
  }

  function logBeta(a, b) {
    return logGamma(a) + logGamma(b) - logGamma(a + b);
  }

  function computeExamPassProbability(correct, total) {
    const totalBank = allQuestions.length || 500;
    const coveragePct = totalBank > 0 ? (total / totalBank) * 100 : 0;

    if (total < 5) {
      return {
        prob: null,
        statusText: 'Insufficient Sample (min 5 questions)',
        expScore: '--',
        badge: 'Collecting Data',
        badgeClass: 'bg-slate-200 text-slate-700 border border-slate-300',
        cardClass: 'p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1',
        moeText: '±--%',
        moeVal: 0,
        ciText: '[--% - --%]',
        sampleTier: 'Initial Calibration',
        sampleReliability: 'Collecting Initial Data (<5 questions)',
        coveragePct: coveragePct.toFixed(1)
      };
    }

    const p = Math.max(0.01, Math.min(0.999, correct / total));
    const N = 75; // Official PCIP question count
    const passThreshold = 57; // 75% passing mark (56.25 rounded to 57)
    const expScore = (N * p).toFixed(1);

    // Standard Error and Margin of Error (95% CI)
    const se = Math.sqrt((p * (1 - p)) / total);
    const moe = Math.min(0.25, 1.96 * se);
    const ciLower = Math.max(0, Math.round((p - moe) * 100));
    const ciUpper = Math.min(100, Math.round((p + moe) * 100));

    // Sample Reliability Tier based on total questions answered
    let sampleTier = 'Preliminary Sample';
    let sampleReliability = 'Low Confidence (high variance expected)';
    if (total >= 150) {
      sampleTier = 'High Reliability Baseline';
      sampleReliability = 'High Statistical Confidence (2+ Full Mocks)';
    } else if (total >= 75) {
      sampleTier = 'Solid Sample Size';
      sampleReliability = 'Moderate-High (1 Full Mock Equivalent)';
    } else if (total >= 25) {
      sampleTier = 'Developing Sample';
      sampleReliability = 'Moderate Sample (preliminary baseline)';
    }

    // Sample-Weighted Bayesian Beta-Binomial Posterior Predictive Probability
    // The Beta prior Beta(4, 2) regularizes small samples, accurately discounting tiny samples
    const priorAlpha = 4;
    const priorBeta = 2;
    const alpha = priorAlpha + correct;
    const beta = priorBeta + (total - correct);
    const logBetaAB = logBeta(alpha, beta);

    let totalProb = 0;
    for (let x = passThreshold; x <= N; x++) {
      let logComb = 0;
      for (let i = 1; i <= x; i++) logComb += Math.log(N - x + i) - Math.log(i);
      const logTerm = logComb + logBeta(x + alpha, N - x + beta) - logBetaAB;
      totalProb += Math.exp(logTerm);
    }

    let probPct = Math.min(99.9, Math.max(0.1, totalProb * 100));

    let badge = 'Safe Pass Zone (≥85%)';
    let badgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
    let cardClass = 'p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1';

    if (probPct < 50) {
      badge = 'Borderline / At Risk (<50%)';
      badgeClass = 'bg-rose-100 text-rose-800 border border-rose-300';
      cardClass = 'p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1';
    } else if (probPct < 85) {
      badge = 'Contender / Borderline Passing';
      badgeClass = 'bg-amber-100 text-amber-800 border border-amber-300';
      cardClass = 'p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1';
    }

    return {
      prob: probPct.toFixed(1),
      expScore: expScore,
      badge: badge,
      badgeClass: badgeClass,
      cardClass: cardClass,
      p: p,
      moeText: `±${(moe * 100).toFixed(1)}%`,
      moeVal: (moe * 100),
      ciText: `[${ciLower}% - ${ciUpper}%]`,
      sampleTier: `${sampleTier} (${total}Q)`,
      sampleReliability: sampleReliability,
      coveragePct: coveragePct.toFixed(1)
    };
  }

  function renderScoreAnalytics() {
    const answeredCount = completedQids.size;
    let wrongCount = 0;
    completedQids.forEach(qid => {
      if (incorrectQids.has(qid)) wrongCount++;
    });
    const correctCount = Math.max(0, answeredCount - wrongCount);
    const accuracyPct = answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0;

    // Sample size bar elements
    const statSampleTierBadge = document.getElementById('stat-sample-tier-badge');
    const statSampleMoe = document.getElementById('stat-sample-moe');
    const statBankCoverageText = document.getElementById('stat-bank-coverage-text');
    const statSampleReliabilityText = document.getElementById('stat-sample-reliability-text');
    const statBankCoverageBar = document.getElementById('stat-bank-coverage-bar');
    const statSampleQCount = document.getElementById('stat-sample-q-count');
    const statCiRange = document.getElementById('stat-ci-range');

    const statAccuracyBig = document.getElementById('stat-accuracy-big');
    const statAccuracyCounts = document.getElementById('stat-accuracy-counts');
    const statAccuracySubtext = document.getElementById('stat-accuracy-subtext');
    const statProbCard = document.getElementById('stat-prob-card');
    const statProbBig = document.getElementById('stat-prob-big');
    const statProbBadge = document.getElementById('stat-prob-badge');
    const statProbSubtext = document.getElementById('stat-prob-subtext');
    const statExpScore = document.getElementById('stat-exp-score');
    const statExpSubtext = document.getElementById('stat-exp-subtext');
    const statReadinessBanner = document.getElementById('stat-readiness-banner');
    const statDomainList = document.getElementById('stat-domain-breakdown-list');
    const statRecommendedAction = document.getElementById('stat-recommended-action');

    // Compute Sample-Weighted Model
    const model = computeExamPassProbability(correctCount, answeredCount);

    // Populate Sample Size Bar
    if (statSampleTierBadge) statSampleTierBadge.textContent = model.sampleTier;
    if (statSampleMoe) statSampleMoe.textContent = `Margin of Error: ${model.moeText}`;
    if (statBankCoverageText) statBankCoverageText.textContent = `${answeredCount} / ${allQuestions.length || 500} (${model.coveragePct}%)`;
    if (statSampleReliabilityText) statSampleReliabilityText.textContent = model.sampleReliability;
    if (statBankCoverageBar) statBankCoverageBar.style.width = `${Math.min(100, Math.max(5, model.coveragePct))}%`;
    if (statSampleQCount) statSampleQCount.textContent = `${answeredCount} questions`;
    if (statCiRange) statCiRange.textContent = `95% Skill CI: ${model.ciText}`;

    // 1. Accuracy Card
    if (statAccuracyBig) statAccuracyBig.textContent = answeredCount ? `${Math.round(accuracyPct)}%` : '--%';
    if (statAccuracyCounts) statAccuracyCounts.textContent = `(${correctCount}/${answeredCount} Correct)`;
    if (statAccuracySubtext) {
      if (answeredCount === 0) {
        statAccuracySubtext.textContent = 'Answer questions to generate stats';
      } else {
        const diff = (accuracyPct - 75).toFixed(1);
        statAccuracySubtext.textContent = diff >= 0
          ? `+${diff}% above Pearson VUE benchmark`
          : `${Math.abs(diff)}% below 75% benchmark`;
      }
    }

    // 2. Pass Probability & Projected Score (Bayesian Beta-Binomial)
    if (statProbBig) statProbBig.textContent = model.prob ? `${model.prob}%` : '--%';
    if (statProbBadge) {
      statProbBadge.textContent = model.badge;
      statProbBadge.className = `text-[10px] font-bold px-2 py-0.5 rounded-full ${model.badgeClass}`;
    }
    if (statProbCard) {
      statProbCard.className = model.cardClass || 'p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1';
    }
    if (statExpScore) statExpScore.textContent = `${model.expScore} / 75`;
    if (statExpSubtext) {
      if (answeredCount < 5) {
        statExpSubtext.textContent = '57/75 needed to pass';
      } else {
        const gap = (Number(model.expScore) - 57).toFixed(1);
        statExpSubtext.textContent = gap >= 0
          ? `+${gap} questions cushion over 57 threshold`
          : `${Math.abs(gap)} questions short of 57 pass mark`;
      }
    }

    // 3. Readiness Diagnosis & Gap Analysis Banner
    if (statReadinessBanner) {
      if (answeredCount < 5) {
        statReadinessBanner.className = 'p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs space-y-1.5';
        statReadinessBanner.innerHTML = `
          <div class="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
            <span>ℹ️</span> Initial Calibration Phase
          </div>
          <p class="leading-relaxed">Answer at least 5 questions in Practice Mode or complete a mini quiz to calibrate your predictive passing model.</p>
        `;
      } else if (accuracyPct < 75) {
        const consecutiveNeeded = Math.max(1, Math.ceil((0.75 * answeredCount - correctCount) / 0.25));
        const paceNeeded = Math.max(1, Math.ceil((0.75 * answeredCount - correctCount) / 0.10));

        statReadinessBanner.className = 'p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-2';
        statReadinessBanner.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-amber-900 flex items-center gap-1.5 text-sm">
              <span>⚠️</span> Sample-Weighted Status: Borderline Contender (${Math.round(accuracyPct)}%)
            </span>
            <span class="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold text-[10px]">Sample: ${answeredCount} Questions</span>
          </div>
          <p class="leading-relaxed text-slate-700">
            Based on your solid sample of <strong>${answeredCount} questions</strong> (95% skill interval: <strong>${model.ciText}</strong>, margin of error: <strong>${model.moeText}</strong>), you are currently <strong>${(75 - accuracyPct).toFixed(1)}% shy</strong> of the official 75% pass mark. Your sample size is large enough to give high confidence, meaning this reflects real test preparedness rather than variance!
          </p>
          <div class="p-3 bg-white/80 rounded-xl border border-amber-200 text-slate-800 space-y-1">
            <strong class="text-amber-900 font-bold block">🎯 Fast Track to Safe Zone (85%+ Probability):</strong>
            <p>• Answering your next <strong>${consecutiveNeeded} questions correctly</strong> in Practice Mode will push your cumulative score over 75%.</p>
            <p>• At an 85% study pace across your unattempted questions, you need <strong>${paceNeeded} more questions</strong> to secure a durable passing buffer.</p>
          </div>
        `;
      } else if (accuracyPct < 85) {
        statReadinessBanner.className = 'p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs space-y-2';
        statReadinessBanner.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-emerald-900 flex items-center gap-1.5 text-sm">
              <span>✅</span> Sample-Weighted Status: Passing Trajectory (${Math.round(accuracyPct)}%)
            </span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px]">Sample: ${answeredCount} Questions</span>
          </div>
          <p class="leading-relaxed text-slate-700">
            Great work! With <strong>${answeredCount} questions completed</strong>, your sample size is statistically robust (margin of error <strong>${model.moeText}</strong>). Your Bayesian pass probability on a random 75Q Pearson VUE exam is <strong>${model.prob}%</strong>.
          </p>
          <div class="p-2.5 bg-white/80 rounded-xl border border-emerald-200 text-slate-700">
            💡 <strong>Pro Tip:</strong> Continue until you reach 200+ questions answered to further narrow your margin of error and lock in an 85%+ safe pass probability.
          </div>
        `;
      } else {
        statReadinessBanner.className = 'p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs space-y-2';
        statReadinessBanner.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-indigo-900 flex items-center gap-1.5 text-sm">
              <span>🏆</span> Sample-Weighted Status: Elite Mastery Zone (${Math.round(accuracyPct)}%)
            </span>
            <span class="px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900 font-bold text-[10px]">Sample: ${answeredCount} Questions</span>
          </div>
          <p class="leading-relaxed text-slate-700">
            Outstanding! At <strong>${Math.round(accuracyPct)}% accuracy</strong> across ${answeredCount} questions (margin of error ${model.moeText}), your Bayesian pass probability on the official 75Q exam is <strong>${model.prob}%</strong>. You are statistically primed to pass on your first attempt!
          </p>
        `;
      }
    }

    // 4. Domain-by-Domain Diagnostic Breakdown
    if (statDomainList) {
      const allCategories = Array.from(new Set(allQuestions.map(q => q.category))).sort();
      const domainStats = [];

      allCategories.forEach(cat => {
        const catQuestions = allQuestions.filter(q => q.category === cat);
        const answeredInCat = catQuestions.filter(q => completedQids.has(q.id));
        if (answeredInCat.length > 0) {
          const wrongInCat = answeredInCat.filter(q => incorrectQids.has(q.id)).length;
          const correctInCat = answeredInCat.length - wrongInCat;
          const pct = Math.round((correctInCat / answeredInCat.length) * 100);
          domainStats.push({
            category: cat,
            total: answeredInCat.length,
            correct: correctInCat,
            wrong: wrongInCat,
            pct: pct
          });
        }
      });

      if (!domainStats.length) {
        statDomainList.innerHTML = `
          <div class="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-slate-200">
            No domain history yet. Start answering practice questions to see breakdown by requirement.
          </div>
        `;
      } else {
        // Sort by accuracy ascending (lowest scoring first!)
        domainStats.sort((a, b) => a.pct - b.pct);

        statDomainList.innerHTML = domainStats.map(ds => {
          let barBg = 'bg-emerald-500';

          if (ds.pct < 60) {
            barBg = 'bg-rose-500';
          } else if (ds.pct < 75) {
            barBg = 'bg-amber-500';
          }

          return `
            <div class="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors space-y-1.5">
              <div class="flex items-center justify-between text-xs gap-2">
                <span class="font-bold text-slate-800 truncate" title="${ds.category}">${ds.category}</span>
                <div class="flex items-center gap-2 shrink-0">
                  <span class="font-extrabold ${ds.pct >= 75 ? 'text-emerald-700' : (ds.pct >= 60 ? 'text-amber-700' : 'text-rose-700')}">
                    ${ds.pct}% (${ds.correct}/${ds.total})
                  </span>
                  <button onclick="window.jumpToPracticeDomain('${ds.category.replace(/'/g, "\\'")}'); closeScoreAnalyticsModal();" class="text-[10px] font-bold px-2 py-0.5 rounded bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 transition-all cursor-pointer">
                    Drill ➔
                  </button>
                </div>
              </div>

              <!-- Bar -->
              <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div class="${barBg} h-1.5 rounded-full transition-all duration-300" style="width: ${ds.pct}%"></div>
              </div>
            </div>
          `;
        }).join('');

        // 5. Recommended Action
        if (statRecommendedAction && domainStats.length > 0) {
          const weakest = domainStats[0];
          if (weakest.pct < 75) {
            statRecommendedAction.innerHTML = `Your lowest scoring area is <strong>${weakest.category}</strong> (${weakest.pct}%). Drilling 10 questions here will yield your fastest score increase!`;
          } else {
            statRecommendedAction.textContent = 'All attempted domains are currently passing (≥75%). Take a 75Q mock exam to validate endurance!';
          }
        }
      }
    }
  }

  // ---------------------------------------------------------------------
  // ISOLATED REMEDIATION DRILL ENGINE (ZERO MAIN STAT IMPACT)
  // ---------------------------------------------------------------------
  let drillPoolType = 'all'; // 'all', 'remediated', 'missed'
  let drillQuestions = [];
  let drillIndex = 0;
  let drillAnswers = {};   // qid -> array of selected indices
  let drillSubmitted = {}; // qid -> boolean
  let drillResults = {};   // qid -> boolean
  let drillCorrectCount = 0;
  let drillAnsweredCount = 0;

  window.launchRemediationDrill = function(poolType) {
    drillPoolType = poolType || 'all';
    window.switchDrillPool(drillPoolType);
  };

  window.closeRemediationDrill = function() {
    const modal = document.getElementById('remediation-drill-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  };

  window.openRemediationDrill = function(poolType) {
    window.launchRemediationDrill(poolType);
    const modal = document.getElementById('remediation-drill-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
  };

  const remediationDrillModalEl = document.getElementById('remediation-drill-modal');
  if (remediationDrillModalEl) {
    remediationDrillModalEl.addEventListener('click', (e) => {
      if (e.target === remediationDrillModalEl) window.closeRemediationDrill();
    });
  }

  window.switchDrillPool = function(poolType) {
    drillPoolType = poolType || 'all';
    drillIndex = 0;
    drillAnswers = {};
    drillSubmitted = {};
    drillResults = {};
    drillCorrectCount = 0;
    drillAnsweredCount = 0;

    const missedList = allQuestions.filter(q => incorrectQids.has(q.id));
    const remediatedList = allQuestions.filter(q => everIncorrectQids.has(q.id) && !incorrectQids.has(q.id));
    const allWeakList = allQuestions.filter(q => everIncorrectQids.has(q.id));

    // Update counts on buttons in modal
    const countAllEl = document.getElementById('drill-count-all');
    const countRemEl = document.getElementById('drill-count-remediated');
    const countMissEl = document.getElementById('drill-count-missed');
    if (countAllEl) countAllEl.textContent = allWeakList.length;
    if (countRemEl) countRemEl.textContent = remediatedList.length;
    if (countMissEl) countMissEl.textContent = missedList.length;

    // Active button styling
    ['all', 'remediated', 'missed'].forEach(type => {
      const btn = document.getElementById(`drill-pool-${type}`);
      if (btn) {
        if (type === poolType) {
          btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs cursor-pointer';
        } else {
          btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer';
        }
      }
    });

    if (poolType === 'remediated') {
      drillQuestions = [...remediatedList];
    } else if (poolType === 'missed') {
      drillQuestions = [...missedList];
    } else {
      drillQuestions = [...allWeakList];
    }

    renderDrillQuestion();
  };

  window.shuffleDrillQuestions = function() {
    if (!drillQuestions.length) return;
    for (let i = drillQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [drillQuestions[i], drillQuestions[j]] = [drillQuestions[j], drillQuestions[i]];
    }
    drillIndex = 0;
    renderDrillQuestion();
  };

  window.drillSingleQuestion = function(qid) {
    const q = allQuestions.find(x => x.id === Number(qid));
    if (!q) return;
    drillQuestions = [q];
    drillIndex = 0;
    drillAnswers = {};
    drillSubmitted = {};
    drillResults = {};
    drillCorrectCount = 0;
    drillAnsweredCount = 0;
    if (typeof openRemediationDrill === 'function') {
      openRemediationDrill('all');
    }
    renderDrillQuestion();
  };

  window.toggleDrillOption = function(optIdx) {
    const q = drillQuestions[drillIndex];
    if (!q || drillSubmitted[q.id]) return;

    const isMultiple = q.correct.length > 1;
    let sel = drillAnswers[q.id] || [];

    if (isMultiple) {
      if (sel.includes(optIdx)) {
        sel = sel.filter(x => x !== optIdx);
      } else {
        sel = [...sel, optIdx];
      }
    } else {
      sel = [optIdx];
    }
    drillAnswers[q.id] = sel;
    renderDrillQuestion();
  };

  window.submitDrillAnswer = function() {
    const q = drillQuestions[drillIndex];
    if (!q) return;

    const sel = drillAnswers[q.id] || [];
    if (!sel.length) {
      alert('Please select an option before checking your answer.');
      return;
    }

    const correctSet = new Set(q.correct);
    const selSet = new Set(sel);
    const isPerfect = (correctSet.size === selSet.size) && [...correctSet].every(x => selSet.has(x));

    drillSubmitted[q.id] = true;
    drillResults[q.id] = isPerfect;
    drillAnsweredCount++;
    if (isPerfect) {
      drillCorrectCount++;
    }

    renderDrillQuestion();
  };

  window.drillNext = function() {
    if (drillIndex < drillQuestions.length - 1) {
      drillIndex++;
      renderDrillQuestion();
    } else {
      // Completed drill
      drillIndex = drillQuestions.length;
      renderDrillQuestion();
    }
  };

  window.drillPrev = function() {
    if (drillIndex > 0) {
      drillIndex--;
      renderDrillQuestion();
    }
  };

  window.restartDrill = function() {
    drillIndex = 0;
    drillAnswers = {};
    drillSubmitted = {};
    drillResults = {};
    drillCorrectCount = 0;
    drillAnsweredCount = 0;
    window.switchDrillPool(drillPoolType);
  };

  window.markDrillQuestionMastered = function(qid) {
    qid = Number(qid);
    if (!confirm(`Mark Question #${qid} as completely mastered?\n\nThis will remove it from your Weak Areas tracking queue. (Your main completed question counts remain unaffected).`)) {
      return;
    }
    everIncorrectQids.delete(qid);
    incorrectQids.delete(qid);
    localStorage.setItem('pcip_ever_incorrect', JSON.stringify([...everIncorrectQids]));
    localStorage.setItem('pcip_incorrect', JSON.stringify([...incorrectQids]));

    // Remove from active drill pool
    drillQuestions = drillQuestions.filter(q => q.id !== qid);
    if (drillIndex >= drillQuestions.length) {
      drillIndex = Math.max(0, drillQuestions.length - 1);
    }
    renderDrillQuestion();
    if (currentTab === 'review') renderReviewView();
    if (typeof renderCheatsheetWeakAreas === 'function') renderCheatsheetWeakAreas();
  };

  window.renderDrillQuestion = function() {
    const container = document.getElementById('drill-content-area');
    if (!container) return;

    // 1. Zero Questions State
    if (!drillQuestions.length) {
      let title = 'No questions in this drill queue!';
      let msg = 'Great news! You have no questions fitting this criteria.';
      if (drillPoolType === 'remediated') {
        title = 'No Remediated Questions Yet';
        msg = 'Questions you originally answered incorrectly and subsequently changed to correct will appear here so you can test if you truly retained them!';
      } else if (drillPoolType === 'missed') {
        title = 'Zero Active Missed Questions';
        msg = 'You currently have no unresolved missed questions from your practice quizzes!';
      }

      container.innerHTML = `
        <div class="p-8 sm:p-12 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-3xl font-bold">
            🎉
          </div>
          <div class="space-y-1">
            <h4 class="text-base sm:text-lg font-black text-slate-900">${title}</h4>
            <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">${msg}</p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button onclick="window.switchDrillPool('all')" class="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer">
              View All Weak Areas
            </button>
            <button onclick="window.closeRemediationDrill()" class="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer">
              Exit Drill
            </button>
          </div>
        </div>
      `;
      return;
    }

    // 2. Drill Completion Summary State
    if (drillIndex >= drillQuestions.length) {
      const accuracy = drillAnsweredCount > 0 ? Math.round((drillCorrectCount / drillAnsweredCount) * 100) : 0;
      const passed = accuracy >= 75;

      container.innerHTML = `
        <div class="p-8 sm:p-10 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-5 animate-fade-in">
          <div class="w-16 h-16 mx-auto rounded-3xl ${passed ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-amber-100 text-amber-700 border border-amber-300'} flex items-center justify-center text-3xl font-bold">
            ${passed ? '🏆' : '🎯'}
          </div>

          <div class="space-y-1.5">
            <h4 class="text-xl font-black text-slate-900">Drill Completed!</h4>
            <p class="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              You reviewed ${drillAnsweredCount} weak area questions in this isolated sandbox drill.
            </p>
          </div>

          <!-- Score Card -->
          <div class="max-w-xs mx-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">Sandbox Retention Score</span>
            <div class="text-3xl font-black ${passed ? 'text-emerald-600' : 'text-amber-600'}">
              ${accuracy}%
            </div>
            <p class="text-xs text-slate-500 font-medium">${drillCorrectCount} out of ${drillAnsweredCount} correct</p>
          </div>

          <!-- Zero Impact Confirmation Note -->
          <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 max-w-md mx-auto flex items-center gap-2">
            <span>🛡️</span>
            <span><strong>Zero Impact Verified:</strong> Your main question running score and answered count remain completely untouched.</span>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button onclick="window.restartDrill()" class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm cursor-pointer">
              🔁 Restart Drill
            </button>
            <button onclick="window.closeRemediationDrill()" class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer">
              Exit Drill
            </button>
          </div>
        </div>
      `;
      return;
    }

    // 3. Render Active Question in Drill
    const q = drillQuestions[drillIndex];
    const isSubmitted = !!drillSubmitted[q.id];
    const userSel = drillAnswers[q.id] || [];
    const isMultiple = q.correct.length > 1;
    const isRemediated = everIncorrectQids.has(q.id) && !incorrectQids.has(q.id);

    const drillPct = drillAnsweredCount > 0 ? Math.round((drillCorrectCount / drillAnsweredCount) * 100) : 0;

    let optionsHtml = q.options.map((opt, idx) => {
      const isSelected = userSel.includes(idx);
      const isCorrectOption = q.correct.includes(idx);

      let optionClasses = 'p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ';
      if (!isSubmitted) {
        if (isSelected) {
          optionClasses += 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs';
        } else {
          optionClasses += 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
        }
      } else {
        if (isCorrectOption) {
          optionClasses += 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-xs';
        } else if (isSelected && !isCorrectOption) {
          optionClasses += 'border-rose-400 bg-rose-50 text-rose-950 font-medium';
        } else {
          optionClasses += 'border-slate-200 opacity-60 bg-white text-slate-500';
        }
      }

      const letter = String.fromCharCode(65 + idx);
      const badgeIcon = isSubmitted ? (isCorrectOption ? '✓' : (isSelected ? '✕' : letter)) : letter;

      return `
        <div onclick="window.toggleDrillOption(${idx})" class="${optionClasses}">
          <div class="w-6 h-6 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : (isSubmitted && isCorrectOption ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700')} flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            ${badgeIcon}
          </div>
          <div class="flex-1 leading-snug">
            ${opt}
          </div>
        </div>
      `;
    }).join('');

    // Feedback Banner
    let feedbackHtml = '';
    if (isSubmitted) {
      const isCorrect = !!drillResults[q.id];
      feedbackHtml = `
        <div class="space-y-4 animate-fade-in">
          <div class="p-4 rounded-2xl border ${isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'} space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-black text-sm flex items-center gap-2">
                <span>${isCorrect ? '✅' : '❌'}</span>
                <span>${isCorrect ? 'Correct! Strong retention on this concept.' : 'Missed in drill — review the standard citation below.'}</span>
              </span>
              <span class="text-xs font-bold font-mono px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-200/80 text-emerald-900' : 'bg-rose-200/80 text-rose-900'}">
                Answer: Option ${q.correct.map(x => String.fromCharCode(65 + x)).join(', ')}
              </span>
            </div>
          </div>

          <div class="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
            <p class="font-bold text-slate-900 mb-1">Official Reasoning & Standard Reference (${q.v4_ref || 'PCI DSS v4.0.1'}):</p>
            <p class="leading-relaxed">${q.explanation}</p>
            ${q.tip ? `<div class="p-3 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs text-indigo-900"><strong class="font-bold">🎯 Exam Trap Clue:</strong> ${q.tip}</div>` : ''}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <!-- Question Progress Bar & Stats -->
      <div class="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 pb-3">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold font-mono">
            Item ${drillIndex + 1} of ${drillQuestions.length}
          </span>
          <span class="px-2.5 py-1 rounded-xl ${isRemediated ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'} font-bold">
            ${isRemediated ? '🔄 Remediated (Fixed)' : '✕ Missed in Quiz'}
          </span>
          <span class="text-slate-400 font-mono hidden sm:inline">#${q.id} · ${q.category}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-slate-500 font-medium">Drill Score:</span>
          <span class="font-black text-indigo-700 font-mono bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
            ${drillCorrectCount}/${drillAnsweredCount} (${drillPct}%)
          </span>
        </div>
      </div>

      <!-- Question Stem -->
      <div class="space-y-2">
        <h4 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          ${q.question}
        </h4>
        ${isMultiple ? '<span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block">Select all that apply</span>' : ''}
      </div>

      <!-- Options -->
      <div class="space-y-2.5">
        ${optionsHtml}
      </div>

      <!-- Action Buttons -->
      <div class="pt-2 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          ${drillIndex > 0 ? `
            <button onclick="window.drillPrev()" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer">
              ← Previous
            </button>
          ` : ''}
          <button onclick="window.markDrillQuestionMastered(${q.id})" class="px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer" title="Permanently remove from weak areas queue">
            ✓ Mark Mastered
          </button>
        </div>

        <div class="flex items-center gap-2">
          ${!isSubmitted ? `
            <button onclick="window.submitDrillAnswer()" class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm cursor-pointer">
              Check Answer
            </button>
          ` : `
            <button onclick="window.drillNext()" class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm cursor-pointer flex items-center gap-1.5">
              <span>${drillIndex < drillQuestions.length - 1 ? 'Next Question →' : 'Finish Drill & View Results'}</span>
            </button>
          `}
        </div>
      </div>

      <!-- Feedback Area -->
      ${feedbackHtml}
    `;
  };

  function buildBackupPayload() {
    return {
      appName: 'PCIP Exam Accelerator',
      standard: 'PCI DSS v4.0.1',
      exportedAt: new Date().toISOString(),
      completedQids: Array.from(completedQids),
      userAnswers: userAnswers,
      userSubmitted: userSubmitted,
      incorrectQids: Array.from(incorrectQids),
      everIncorrectQids: Array.from(everIncorrectQids),
      bookmarks: Array.from(bookmarks),
      stats: {
        totalQuestions: allQuestions.length || 500,
        completedCount: completedQids.size,
        accuracyPct: (completedQids.size > 0) ? Math.round(((completedQids.size - incorrectQids.size) / completedQids.size) * 100) : 0
      }
    };
  }

  function downloadBackupFile() {
    const data = buildBackupPayload();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `pcip_mastery_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (exportBackupBtn) {
    exportBackupBtn.addEventListener('click', () => {
      downloadBackupFile();
    });
  }

  if (copyBackupBtn) {
    copyBackupBtn.addEventListener('click', () => {
      const data = buildBackupPayload();
      const jsonStr = JSON.stringify(data);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(jsonStr).then(() => {
          alert('Progress backup JSON copied to clipboard!');
        }).catch(() => {
          prompt('Copy this backup JSON:', jsonStr);
        });
      } else {
        prompt('Copy this backup JSON:', jsonStr);
      }
    });
  }

  function processImportedData(data) {
    if (!data || !Array.isArray(data.completedQids)) {
      alert('Invalid backup file. Please select a valid PCIP progress backup JSON file.');
      return false;
    }

    // Merge completed questions
    data.completedQids.forEach(id => completedQids.add(Number(id)));

    // Merge answers and submitted state
    if (data.userAnswers && typeof data.userAnswers === 'object') {
      Object.assign(userAnswers, data.userAnswers);
    }
    if (data.userSubmitted && typeof data.userSubmitted === 'object') {
      Object.assign(userSubmitted, data.userSubmitted);
    }
    completedQids.forEach(qid => {
      userSubmitted[qid] = true;
    });

    // Merge incorrect
    if (Array.isArray(data.incorrectQids)) {
      data.incorrectQids.forEach(id => {
        incorrectQids.add(Number(id));
        everIncorrectQids.add(Number(id));
      });
    }

    // Merge historically missed (ever-incorrect)
    if (Array.isArray(data.everIncorrectQids)) {
      data.everIncorrectQids.forEach(id => everIncorrectQids.add(Number(id)));
    }

    // Merge bookmarks
    if (Array.isArray(data.bookmarks)) {
      data.bookmarks.forEach(id => bookmarks.add(Number(id)));
    }

    saveCompletedState();
    localStorage.setItem('pcip_incorrect', JSON.stringify([...incorrectQids]));
    localStorage.setItem('pcip_ever_incorrect', JSON.stringify([...everIncorrectQids]));
    localStorage.setItem('pcip_bookmarks', JSON.stringify([...bookmarks]));

    updatePracticeStats();
    updatePracticeList();
    renderPracticeQuestion();
    if (currentTab === 'review') renderReviewView();
    if (currentTab === 'exam') renderExamView();
    if (typeof renderCheatsheetWeakAreas === 'function') renderCheatsheetWeakAreas();
    updateSyncPill();

    alert(`Success! Successfully restored ${completedQids.size} completed questions and ${bookmarks.size} bookmarks. Your running score and progress are ready!`);
    closeSyncModal();
    return true;
  }

  if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          processImportedData(parsed);
        } catch (err) {
          alert('Could not parse backup file. Please ensure it is a valid JSON file.');
        }
      };
      reader.readAsText(file);
      importFileInput.value = '';
    });
  }

  if (importPasteBtn) {
    importPasteBtn.addEventListener('click', () => {
      const pasted = prompt('Paste your progress backup JSON text here:');
      if (!pasted || !pasted.trim()) return;
      try {
        const parsed = JSON.parse(pasted.trim());
        processImportedData(parsed);
      } catch (err) {
        alert('Invalid JSON pasted. Please check the text and try again.');
      }
    });
  }

  // ---------------------------------------------------------------------
  // VIEW 6: QUESTION TELL-TALES & STEM DECODER (PCI DSS v4.0.1)
  // ---------------------------------------------------------------------
  const telltalesData = [
    {
      id: 1,
      category: "verbs",
      categoryName: "Action Verbs & Controls",
      req: "Req 5.4.1 vs 12.6.3",
      title: "'Detect & Defend' Phishing vs. Security Awareness Training",
      clueKeywords: ["detect and defend", "personnel", "phishing attacks"],
      clueExplanation: "The specific verbs 'detect and defend' test technical, automated defensive mechanisms against phishing. In contrast, stems asking to 'educate', 'train', or 'maintain awareness' test the administrative human training program under Requirement 12.6.",
      trapDistractor: "Annual employee security awareness training presentations detailing social engineering vectors.",
      trapReasoning: "Awareness training is a mandatory PCI DSS requirement (Req 12.6.3), so test-takers immediately recognize it as a real rule and pick it. However, training is an administrative control that does not 'detect and defend' email flow.",
      correctAnswer: "Automated technical mechanisms (anti-spoofing protocols like SPF, DKIM, DMARC, and automated email filtering).",
      citation: "PCI DSS v4.0.1 Req 5.4.1: Automated mechanisms are in place to detect and protect personnel against phishing attacks.",
      stemExample: "Under PCI DSS Requirement 5.4.1, what controls must an entity implement to detect and defend personnel against phishing attacks?",
      searchRel: "5.4.1"
    },
    {
      id: 2,
      category: "scoping",
      categoryName: "Entity Roles & Scoping",
      req: "Req 12.5.2 vs 12.5.2.1",
      title: "Scope Confirmation Frequency: Merchants vs. Service Providers",
      clueKeywords: ["Service Provider", "PCI DSS scope confirmation", "frequency"],
      clueExplanation: "Pay immediate attention to whether the entity in the stem is specified as a 'Merchant' or a 'Service Provider'. PCI DSS v4 assigns stricter confirmation frequencies to Service Providers.",
      trapDistractor: "At least once every 12 months (annually) and after significant business changes.",
      trapReasoning: "Annual review is the standard requirement for Merchants under Req 12.5.2. Candidates who memorize 'annual' miss the Service Provider specific rule.",
      correctAnswer: "At least once every six months (semi-annually) and upon significant changes to the environment.",
      citation: "PCI DSS v4.0.1 Req 12.5.2.1: Additional requirement for service providers: PCI DSS scope is documented and confirmed at least once every six months and upon significant changes.",
      stemExample: "Under PCI DSS Requirement 12.5.2.1, how frequently must a Third-Party Service Provider formally document and confirm their PCI DSS scope?",
      searchRel: "12.5.2"
    },
    {
      id: 3,
      category: "data",
      categoryName: "Data Protection & SAD",
      req: "Req 3.2.1 - 3.2.3",
      title: "Post-Authorization SAD Storage vs. PAN Encryption",
      clueKeywords: ["post-authorization", "CVV / CAV2 / CID", "full track data", "PIN block"],
      clueExplanation: "Whenever you spot the qualifier 'post-authorization' paired with Sensitive Authentication Data (SAD), the answer is absolute: NEVER store, regardless of encryption strength.",
      trapDistractor: "Stored in a dedicated database encrypted with AES-256 with split-knowledge key custody.",
      trapReasoning: "Item-writers describe bulletproof encryption, HSMs, and split-custody key management to tempt candidates into believing storage is permitted if secure enough.",
      correctAnswer: "Sensitive Authentication Data (SAD) must NEVER be retained or stored after transaction authorization, even if encrypted.",
      citation: "PCI DSS v4.0.1 Req 3.2.1: Sensitive authentication data is not retained after authorization, even if encrypted. (Exception strictly limited to documented issuers with legitimate business need under Req 3.2.2).",
      stemExample: "A merchant processes e-commerce payments. Under Requirement 3.2.1, which security control is required for storing card verification codes (CVV2/CVC2) post-authorization?",
      searchRel: "3.2.1"
    },
    {
      id: 4,
      category: "data",
      categoryName: "Data Protection & SAD",
      req: "Req 3.3.1 vs 3.5.1",
      title: "Screen Masking vs. Database Cryptographic Storage",
      clueKeywords: ["display", "viewing on screen / receipt", "masking", "at rest storage"],
      clueExplanation: "Look for 'displayed' vs 'stored'. Masking applies ONLY when displaying PANs to humans. Cryptography, truncation, or one-way hashing applies to data stored at rest in databases and files.",
      trapDistractor: "Masking the PAN to only show the first 6 and last 4 digits satisfies Requirement 3.5.1 for database storage.",
      trapReasoning: "Candidates confuse masking (replacing digits with asterisks on a display/receipt) with truncation (permanently deleting middle digits from storage). Masking on screen does not render stored database records unreadable.",
      correctAnswer: "Masking (first 6 / last 4 or BIN + last 4) is strictly for displays and paper receipts (Req 3.3.1). Stored PANs require strong encryption (AES-256), keyed one-way hash, index tokens, or truncation (Req 3.5.1).",
      citation: "PCI DSS v4.0.1 Req 3.3.1 & 3.5.1: Masking PAN when displayed protects visual exposure; render PAN unreadable anywhere it is stored using cryptography.",
      stemExample: "When customer service representatives view account details on internal portals, what is the maximum number of PAN digits that may be displayed under Requirement 3.3.1 without documented business need?",
      searchRel: "3.3.1"
    },
    {
      id: 5,
      category: "frequencies",
      categoryName: "Frequencies & Timeframes",
      req: "Req 11.3.1 vs 11.3.2",
      title: "External ASV Scans vs. Internal Vulnerability Scans",
      clueKeywords: ["external vulnerability scan", "ASV", "clean scan", "internal scan"],
      clueExplanation: "If the stem specifies 'external perimeter' or 'Internet-facing', the scan MUST be conducted by an Approved Scanning Vendor (ASV) and must result in a passing (clean) report with no vulnerabilities score 4.0+.",
      trapDistractor: "Conducted quarterly by internal certified security personnel using commercially available scanning tools.",
      trapReasoning: "Qualified internal personnel ARE permitted to run internal scans (Req 11.3.1), but external scans (Req 11.3.2) can ONLY be certified by a PCI SSC Approved Scanning Vendor.",
      correctAnswer: "External scans must be performed at least quarterly by an Approved Scanning Vendor (ASV), resulting in an ASV-certified passing scan report.",
      citation: "PCI DSS v4.0.1 Req 11.3.2: External vulnerability scans are performed at least once every three months by a PCI SSC Approved Scanning Vendor (ASV).",
      stemExample: "Which entity is authorized to perform external vulnerability scans to satisfy PCI DSS Requirement 11.3.2?",
      searchRel: "11.3.2"
    },
    {
      id: 6,
      category: "verbs",
      categoryName: "Action Verbs & Controls",
      req: "Req 11.4 vs 11.3",
      title: "Penetration Testing (Exploitation) vs. Vulnerability Scanning",
      clueKeywords: ["penetration test", "exploit vulnerabilities", "simulate attacker", "automated scan"],
      clueExplanation: "Look for verbs of action: 'exploit', 'simulate attack', 'validate defenses' = Penetration Testing. 'Identify', 'detect missing patches', 'automated catalog' = Vulnerability Scanning.",
      trapDistractor: "Automated monthly vulnerability scans configured with administrative credentials.",
      trapReasoning: "Scanning identifies theoretical flaws from a database of signatures, but does not simulate an active adversary attempting to exploit them to breach the CDE.",
      correctAnswer: "Penetration testing is an active assessment involving manual and exploitative testing to simulate real-world attacks, performed annually and after significant changes.",
      citation: "PCI DSS v4.0.1 Req 11.4: Penetration testing methodology is implemented; external and internal pen testing performed at least once every 12 months.",
      stemExample: "What distinguishes a penetration test under Requirement 11.4 from an automated vulnerability scan under Requirement 11.3?",
      searchRel: "11.4"
    },
    {
      id: 7,
      category: "scoping",
      categoryName: "Entity Roles & Scoping",
      req: "Req 11.4.5 vs 11.4.6",
      title: "Segmentation Testing: Merchants (Annual) vs. Service Providers (Semi-Annual)",
      clueKeywords: ["segmentation controls", "isolation verification", "Service Provider frequency"],
      clueExplanation: "PCI DSS tests isolation of the CDE from out-of-scope networks. Merchants test annually; Service Providers must test twice as often (every 6 months)!",
      trapDistractor: "Every 12 months (annually) during the regular assessment window.",
      trapReasoning: "Annual testing is correct for merchants (Req 11.4.5), so candidates reflexively pick 'every 12 months' without noticing the stem specified a service provider.",
      correctAnswer: "Service providers must test segmentation controls at least once every six months (semi-annually) and after any change to segmentation controls (Req 11.4.6).",
      citation: "PCI DSS v4.0.1 Req 11.4.6: If segmentation is used by a service provider, test at least once every six months and after any changes to segmentation controls/methods.",
      stemExample: "Under Requirement 11.4.6, how often must a cloud hosting service provider validate that its network segmentation isolates customer cardholder data environments?",
      searchRel: "11.4.6"
    },
    {
      id: 8,
      category: "frequencies",
      categoryName: "Frequencies & Timeframes",
      req: "Req 6.3.3",
      title: "Critical Security Patch Timeframe: Exactly 30 Days",
      clueKeywords: ["critical patches", "high-security vulnerabilities", "vendor release"],
      clueExplanation: "PCI DSS sets an exact calendar deadline for critical patches: within 30 days of release. Other patches are applied based on the entity's targeted risk analysis.",
      trapDistractor: "Immediately within 14 calendar days, or quarterly during scheduled maintenance windows.",
      trapReasoning: "14 days sounds safely stringent, while quarterly sounds like normal IT maintenance. The exact PCI DSS standard is within one month (30 days).",
      correctAnswer: "Critical security patches and high-risk vulnerabilities must be installed within 30 days of release.",
      citation: "PCI DSS v4.0.1 Req 6.3.3: All system components are protected from known vulnerabilities by installing applicable security patches within 30 days of release for critical/high-risk patches.",
      stemExample: "Under PCI DSS Requirement 6.3.3, what is the maximum timeframe permitted for deploying critical vendor-supplied security patches to CDE systems?",
      searchRel: "6.3.3"
    },
    {
      id: 9,
      category: "verbs",
      categoryName: "Action Verbs & Controls",
      req: "Req 6.4.3 & 11.6.1",
      title: "Browser-Side Payment Scripts vs. Network Perimeter WAF",
      clueKeywords: ["consumer browser", "payment page scripts", "tampering", "Magecart"],
      clueExplanation: "Stems referencing threats executing in the consumer's web browser (such as digital skimming, Magecart, or unauthorized script injection) test client-side script controls, NOT server-side firewalls.",
      trapDistractor: "Deploy a Web Application Firewall (WAF) in front of the payment web servers to filter HTTP requests.",
      trapReasoning: "A WAF inspects network traffic reaching the server; it has zero visibility into third-party JavaScript executing directly inside the user's browser DOM.",
      correctAnswer: "Req 6.4.3 requires an inventory, written business justification, and integrity check for all scripts executing on payment pages; Req 11.6.1 mandates a tamper/change detection mechanism running at least weekly.",
      citation: "PCI DSS v4.0.1 Req 6.4.3 & 11.6.1: Manage and ensure integrity of all scripts in consumer browsers on payment pages; detect unauthorized header and script changes.",
      stemExample: "To protect e-commerce customers from client-side script tampering and form-jacking attacks in their web browsers, what control does Requirement 6.4.3 mandate?",
      searchRel: "6.4.3"
    },
    {
      id: 10,
      category: "verbs",
      categoryName: "Action Verbs & Controls",
      req: "Req 8.4.2 & 8.4.3",
      title: "MFA for ALL Access into CDE vs. Remote Administrative Access Only",
      clueKeywords: ["Multi-Factor Authentication", "MFA", "access into the CDE", "console vs non-console"],
      clueExplanation: "In legacy PCI DSS v3.2.1, MFA was primarily required for remote access into the network and non-console admin access. In v4.0.1, MFA is required for ALL access into the CDE for all personnel.",
      trapDistractor: "MFA is only mandated for external remote network access originating outside the corporate firewall.",
      trapReasoning: "Candidates relying on outdated study materials remember remote access. Under v4.0.1 Req 8.4.2, all individual access into the CDE requires MFA.",
      correctAnswer: "MFA is mandatory for ALL individuals with non-console administrative access into the CDE, AND for ALL access into the CDE (Req 8.4.2).",
      citation: "PCI DSS v4.0.1 Req 8.4.2: Multi-factor authentication (MFA) is implemented for all access into the cardholder data environment (CDE).",
      stemExample: "Under PCI DSS v4.0.1 Requirement 8.4.2, when is multi-factor authentication (MFA) required for personnel connecting to systems in the CDE?",
      searchRel: "8.4.2"
    },
    {
      id: 11,
      category: "assessment",
      categoryName: "Assessment & TRA",
      req: "Appendix B & C",
      title: "Financial Cost / Budget Constraint vs. Valid Technical Constraint",
      clueKeywords: ["compensating control", "justification", "budget shortfall", "cost of upgrade"],
      clueExplanation: "Item-writers frequently present a scenario where an organization claims replacing legacy equipment is 'financially prohibitive' or 'too costly'. Financial cost is NEVER an allowable justification.",
      trapDistractor: "The high financial expense of replacing legacy hardware constitutes a documented business constraint.",
      trapReasoning: "Business leaders often cite budget constraints in real life, but the PCI SSC explicitly forbids financial reasons for compensating controls.",
      correctAnswer: "Compensating controls require documented legitimate technical constraints (e.g. system incompatibility) or legal/regulatory limitations. Financial expense or inconvenience is strictly prohibited.",
      citation: "PCI DSS v4.0.1 Appendix B & C: Financial constraints are not considered a valid reason for implementing compensating controls.",
      stemExample: "An entity wishes to implement a compensating control because upgrading legacy POS terminals is cost-prohibitive. How should a QSA evaluate this justification?",
      searchRel: "Compensating"
    },
    {
      id: 12,
      category: "assessment",
      categoryName: "Assessment & TRA",
      req: "Defined vs Customized",
      title: "Customized Approach & TRA vs. Defined Approach & CCW",
      clueKeywords: ["Customized Approach", "Stated Customized Objective", "Appendix D", "Compensating Control Worksheet"],
      clueExplanation: "Distinguish between the Defined Approach (with Compensating Controls in Appendix C when constrained) and the Customized Approach (meeting the Customized Objective documented in Appendix D).",
      trapDistractor: "Customized Approach requires filing a formal Compensating Control Worksheet (CCW) demonstrating an insurmountable technical barrier.",
      trapReasoning: "A CCW is strictly for the Defined Approach when an entity cannot meet a requirement as stated. The Customized Approach is a forward-looking method that does not require an obstacle.",
      correctAnswer: "The Customized Approach requires meeting the Stated Customized Objective, completing a formal Targeted Risk Analysis (TRA), and documenting the control in Appendix D for assessor evaluation.",
      citation: "PCI DSS v4.0.1 Section 'Customized Approach': Entities meeting the Stated Customized Objective must document each customized implementation and TRA in Appendix D.",
      stemExample: "When an organization elects to use the Customized Approach for a PCI DSS requirement, what must it document and provide to the assessor?",
      searchRel: "Customized"
    },
    {
      id: 13,
      category: "assessment",
      categoryName: "Assessment & TRA",
      req: "Req 12.3.1 & 12.3.2",
      title: "Targeted Risk Analysis (TRA) Annual Review Requirement",
      clueKeywords: ["Targeted Risk Analysis", "TRA", "frequency determined by entity", "review cycle"],
      clueExplanation: "Whenever a requirement states that an activity's frequency is defined by the entity (e.g. log reviews, malware scans, POI inspections), it requires a formal TRA that must be reviewed at least annually.",
      trapDistractor: "The frequency can be set at management discretion without documented risk justification.",
      trapReasoning: "PCI DSS v4 gives flexibility, but it is strictly conditioned on a formal, documented TRA (Req 12.3.1) reviewed at least once every 12 months.",
      correctAnswer: "Each TRA must identify assets, threats, and risk factors, justify the chosen frequency, and be formally reviewed at least once every 12 months (annually).",
      citation: "PCI DSS v4.0.1 Req 12.3.1: For each requirement where the frequency is determined by a targeted risk analysis, the entity documents the analysis and reviews it every 12 months.",
      stemExample: "How often must an organization review its documented Targeted Risk Analyses (TRAs) under PCI DSS Requirement 12.3.1?",
      searchRel: "12.3.1"
    },
    {
      id: 14,
      category: "saq",
      categoryName: "SAQ Disqualifiers",
      req: "SAQ A vs SAQ A-EP",
      title: "E-commerce URL Redirect / Iframe vs. Direct Post / Merchant Script",
      clueKeywords: ["e-commerce", "URL redirect", "iframe", "Direct Post", "merchant web server"],
      clueExplanation: "Look at the payment page architecture: If 100% of cardholder data entry and processing is completely outsourced (URL redirect or validated iframe hosted by processor) = SAQ A. If the merchant web server delivers the form or impact payment page security = SAQ A-EP.",
      trapDistractor: "A merchant using Direct Post (browser posts directly to gateway from merchant-delivered HTML form) qualifies for SAQ A.",
      trapReasoning: "Because card data goes directly from browser to gateway, candidates think it is SAQ A. But because the merchant's server delivers the payment page code, it qualifies as SAQ A-EP.",
      correctAnswer: "SAQ A: 100% card data entry outsourced (URL redirect or third-party hosted iframe). SAQ A-EP: Merchant's website hosts or impacts payment pages (Direct Post, APIs, or merchant-delivered JavaScript).",
      citation: "PCI SSC Self-Assessment Questionnaire Instructions: SAQ A applies only when all card data functions are completely outsourced to PCI DSS validated third parties.",
      stemExample: "An online retailer hosts its own shopping cart website and uses an API Direct-Post method where the customer enters card data into fields delivered by the merchant's server. Which SAQ applies?",
      searchRel: "SAQ A"
    },
    {
      id: 15,
      category: "saq",
      categoryName: "SAQ Disqualifiers",
      req: "SAQ C-VT vs SAQ B-IP",
      title: "Virtual Terminal (Web Portal Keyboard Entry) vs. Standalone IP Terminal",
      clueKeywords: ["Virtual Terminal", "web browser", "single transaction manually typed", "isolated workstation"],
      clueExplanation: "When the stem describes a keyboard operator manually entering single telephone/mail-order card transactions into a browser web portal provided by a processor, the tell-tale points directly to SAQ C-VT.",
      trapDistractor: "SAQ B-IP or SAQ C.",
      trapReasoning: "SAQ B-IP requires standalone PTS-approved hardware terminals connected via IP. SAQ C requires dedicated payment application systems connected to the Internet.",
      correctAnswer: "SAQ C-VT applies strictly to manual keyboard entry of individual transactions into an online virtual terminal hosted by a PCI DSS compliant service provider, on an isolated workstation with no card reader.",
      citation: "PCI SSC SAQ C-VT Eligibility: Merchants who manually enter transactions one at a time via keyboard into a web-based virtual terminal solution provided by a PCI DSS compliant service provider.",
      stemExample: "A call center receives phone orders and agents type card details directly into a secure web browser portal provided by their payment processor. Which SAQ should they complete?",
      searchRel: "SAQ C-VT"
    },
    {
      id: 16,
      category: "saq",
      categoryName: "SAQ Disqualifiers",
      req: "SAQ D Service Provider",
      title: "Service Provider SAQ Mandate: NEVER Eligible for SAQ A, B, or C",
      clueKeywords: ["Service Provider", "eligible SAQ", "self-assessment questionnaire"],
      clueExplanation: "If the entity is explicitly identified as a 'Service Provider', they can NEVER use merchant-specific SAQs (SAQ A, B, B-IP, C, C-VT, P2PE). They must complete SAQ D for Service Providers.",
      trapDistractor: "A hosting service provider that does not store card data is eligible to complete SAQ A.",
      trapReasoning: "Candidates focus on 'does not store card data' and jump to SAQ A. But SAQ A is strictly for Merchants. All service providers eligible for SAQs must complete SAQ D for Service Providers.",
      correctAnswer: "Service providers performing self-assessment must ALWAYS complete SAQ D for Service Providers. Shortened SAQs (A, B, C) are reserved exclusively for eligible merchants.",
      citation: "PCI SSC SAQ Instructions: All service providers defined by a payment brand as eligible to complete a Self-Assessment Questionnaire must use SAQ D for Service Providers.",
      stemExample: "Which Self-Assessment Questionnaire (SAQ) is an eligible Third-Party Service Provider permitted to complete to validate compliance?",
      searchRel: "SAQ D"
    },
    {
      id: 17,
      category: "saq",
      categoryName: "SAQ Disqualifiers",
      req: "SAQ Disqualification",
      title: "Electronic Storage of Cardholder Data Disqualifies Shorter SAQs",
      clueKeywords: ["stores cardholder data electronically", "retains PAN on servers", "eligible SAQ"],
      clueExplanation: "Any electronic cardholder data storage immediately disqualifies a merchant from SAQs A, B, B-IP, C, C-VT, and P2PE, forcing full SAQ D for Merchants.",
      trapDistractor: "A merchant storing encrypted PANs in a local database can use SAQ C if an HSM manages keys.",
      trapReasoning: "Candidates assume encryption exempts the merchant from SAQ D. In reality, electronic storage of PAN anywhere on local disks immediately mandates SAQ D.",
      correctAnswer: "ANY electronic storage of cardholder data on local or corporate systems eliminates eligibility for shorter SAQs and mandates SAQ D for Merchants.",
      citation: "PCI SSC SAQ Eligibility: Merchants that store cardholder data electronically must use SAQ D for Merchants.",
      stemExample: "If a merchant stores encrypted cardholder data electronically in an on-premise database, which SAQ must they complete?",
      searchRel: "SAQ D"
    },
    {
      id: 18,
      category: "frequencies",
      categoryName: "Frequencies & Timeframes",
      req: "Req 10.4.1 vs 10.4.2",
      title: "Daily Log Reviews for CDE & Security Systems vs. Periodic TRA",
      clueKeywords: ["log review", "daily review", "security events", "firewalls / IDS / IPS"],
      clueExplanation: "Look at the system role: Daily log review is mandatory for all CDE components, servers performing security functions (firewalls, IDS/IPS, authentication), and critical servers. Other corporate systems are reviewed periodically per TRA.",
      trapDistractor: "Review all logs across the entire corporate network once a week or monthly.",
      trapReasoning: "Weekly reviews are insufficient for CDE systems and security gateways, which strictly require daily log reviews under Requirement 10.4.1.",
      correctAnswer: "Daily log review is mandatory for: (1) all components storing/processing/transmitting CHD, (2) components performing security functions (firewalls, IDS/IPS, MFA/RADIUS), and (3) critical system components.",
      citation: "PCI DSS v4.0.1 Req 10.4.1: Audit logs are reviewed at least once daily for systems that store, process, or transmit CHD, and systems performing security functions.",
      stemExample: "Under PCI DSS Requirement 10.4.1, which system logs must be reviewed at least once daily?",
      searchRel: "10.4.1"
    },
    {
      id: 19,
      category: "verbs",
      categoryName: "Action Verbs & Controls",
      req: "Req 10.5.1 & 11.5.2",
      title: "File Integrity Monitoring (FIM) for Unauthorized File Tampering",
      clueKeywords: ["unauthorized modification", "critical system files", "configuration files", "alert personnel"],
      clueExplanation: "When the stem focuses on 'detecting unauthorized changes/modifications to critical system binaries, configurations, or application libraries and alerting personnel', the answer is FIM (change detection software).",
      trapDistractor: "Antivirus software running real-time heuristic scans on all server partitions.",
      trapReasoning: "Antivirus scans for malware signatures, but does not monitor legitimate configuration files or system executables for unauthorized parameter modifications.",
      correctAnswer: "File Integrity Monitoring (FIM) or change-detection mechanisms to alert personnel to unauthorized modifications of critical files at least once weekly.",
      citation: "PCI DSS v4.0.1 Req 11.5.2: A change-detection mechanism (such as FIM) is deployed to alert personnel to unauthorized modification of critical system files.",
      stemExample: "Under Requirement 11.5.2, what mechanism must be deployed to monitor and alert personnel to unauthorized changes in critical operating system files?",
      searchRel: "11.5.2"
    },
    {
      id: 20,
      category: "frequencies",
      categoryName: "Frequencies & Timeframes",
      req: "Req 12.10.2",
      title: "Incident Response Plan: Tested at Least Annually",
      clueKeywords: ["incident response plan", "test frequency", "tabletop exercise"],
      clueExplanation: "PCI DSS tests how often emergency incident response plans are rehearsed. The minimum baseline is at least once every 12 months (annually).",
      trapDistractor: "Tested semi-annually (every six months) or only following a confirmed data breach.",
      trapReasoning: "Semi-annually sounds like a safe best practice, but Req 12.10.2 establishes an annual baseline.",
      correctAnswer: "The security incident response plan must be tested at least once every 12 months (annually) and include all breach scenarios and lessons learned.",
      citation: "PCI DSS v4.0.1 Req 12.10.2: The incident response plan is tested at least once every 12 months, including all elements defined in Req 12.10.1.",
      stemExample: "According to Requirement 12.10.2, how frequently must an entity test its security incident response plan?",
      searchRel: "12.10.2"
    },
    {
      id: 21,
      category: "scoping",
      categoryName: "Entity Roles & Scoping",
      req: "Card Processing Roles",
      title: "Authorization Approval / Decline Decision: Card Issuer Only",
      clueKeywords: ["authorization approval", "approves or declines", "transaction decision"],
      clueExplanation: "Questions on payment flow test who actually makes the financial credit/funds approval decision. The answer is ALWAYS the Card Issuer (the consumer's issuing bank).",
      trapDistractor: "The Payment Gateway, Merchant Acquirer, or Processing Switch.",
      trapReasoning: "The gateway and acquirer facilitate and route the transaction, but they have no authority or visibility to approve credit lines or funds.",
      correctAnswer: "ONLY the Card Issuer (Issuing Bank) possesses the authority to approve or decline an authorization request.",
      citation: "PCI DSS Glossary & Core Payment Flow: The Issuer authorizes payment card transactions based on cardholder account status and available balance/credit.",
      stemExample: "During an online e-commerce credit card transaction, which entity makes the final real-time decision to approve or decline the authorization request?",
      searchRel: "Issuer"
    },
    {
      id: 22,
      category: "data",
      categoryName: "Data Protection & SAD",
      req: "Req 6.5.3",
      title: "Live Production PAN in Development & Test Environments: Absolute Prohibition",
      clueKeywords: ["production PAN", "live cardholder data", "development / test / QA", "sanitized data"],
      clueExplanation: "Under no circumstances is live production PAN allowed in development, staging, or test environments. Even with CISO sign-off or strong encryption, it is strictly non-compliant.",
      trapDistractor: "Permitted if the database is encrypted with AES-256 and restricted to vetted developers.",
      trapReasoning: "Candidates believe strong controls can justify using production data for testing. PCI DSS Req 6.5.3 contains a strict, non-negotiable prohibition.",
      correctAnswer: "Live PANs are NEVER permitted in pre-production, development, or test environments. Test data must be fictionalized, masked, or synthetic.",
      citation: "PCI DSS v4.0.1 Req 6.5.3: Production cardholder data is not used in pre-production environments.",
      stemExample: "A development team wants to test database performance using a copy of real customer card numbers stored in an air-gapped test lab. Under Req 6.5.3, is this permitted?",
      searchRel: "6.5.3"
    },
    {
      id: 23,
      category: "scoping",
      categoryName: "Entity Roles & Scoping",
      req: "Req 12.8",
      title: "Third-Party Service Provider (TPSP) Written Agreements & Annual Status Tracking",
      clueKeywords: ["third-party service provider", "TPSP oversight", "written agreement", "compliance status"],
      clueExplanation: "Outsourcing cardholder data processing does NOT outsource compliance liability. The entity must maintain an inventory, track TPSP compliance annually (AOC/ROC), and execute written agreements.",
      trapDistractor: "Executing a contract with a PCI-compliant TPSP transfers all compliance responsibility and removes the entity from PCI DSS scope.",
      trapReasoning: "Managers wishful-think that vendors take full responsibility. PCI DSS explicitly states the merchant retains responsibility to monitor and verify TPSP compliance.",
      correctAnswer: "The entity must maintain a TPSP inventory, execute written agreements where TPSPs acknowledge responsibility for CHD security, and verify compliance status at least once every 12 months.",
      citation: "PCI DSS v4.0.1 Req 12.8.2, 12.8.3, 12.8.4: Written agreements acknowledging responsibility; program to monitor TPSP compliance status at least once every 12 months.",
      stemExample: "Under Requirement 12.8.4, what procedure must an entity implement regarding its third-party service providers (TPSPs)?",
      searchRel: "12.8"
    },
    {
      id: 24,
      category: "saq",
      categoryName: "SAQ Disqualifiers",
      req: "SAQ P2PE",
      title: "Point-to-Point Encryption: Merchant Has Zero Access to Decryption Keys",
      clueKeywords: ["Point-to-Point Encryption", "P2PE", "decryption keys", "cleartext card data"],
      clueExplanation: "In a validated PCI P2PE solution, the merchant has zero cryptographic keys, no access to unencrypted card data, and no decryption hardware on premises.",
      trapDistractor: "Merchant stores decryption keys in an on-premise hardware security module (HSM) to inspect transaction payloads.",
      trapReasoning: "If the merchant could decrypt the data, their entire network would remain inside the scope of PCI DSS! Decryption takes place solely in the validated provider's environment.",
      correctAnswer: "In a validated PCI P2PE solution, card data is encrypted at the PTS-approved POI terminal and can ONLY be decrypted by the validated P2PE Solution Provider. The merchant never has access to keys.",
      citation: "PCI P2PE Standard & SAQ P2PE Instructions: All decryption is performed outside the merchant environment by a PCI SSC-listed P2PE Solution Provider.",
      stemExample: "To qualify for SAQ P2PE, where must the cryptographic decryption of encrypted cardholder data take place?",
      searchRel: "P2PE"
    },
    {
      id: 25,
      category: "frequencies",
      categoryName: "Frequencies & Timeframes",
      req: "Req 8.3.5 & 8.3.6",
      title: "PCI DSS v4.0.1 Password Length: Minimum 12 Characters (or 8 with TRA)",
      clueKeywords: ["password length", "minimum characters", "authentication credentials", "v4.0.1 standard"],
      clueExplanation: "PCI DSS v4.0.1 increased the minimum password length requirement from 7 characters (v3.2.1) to 12 characters (alphabetic and numeric). Stems testing this look for awareness of v4 modern standards.",
      trapDistractor: "Minimum 7 or 8 characters containing alphanumeric characters.",
      trapReasoning: "7 characters was the rule for over a decade in PCI DSS v3.2.1. Candidates using legacy memory will pick 7 or 8 instead of the new 12-character standard.",
      correctAnswer: "Under PCI DSS v4.0.1 Requirement 8.3.6, passwords must be a minimum of 12 characters (or at least 8 characters if the system cannot support 12 and documented via TRA), containing both numeric and alphabetic characters.",
      citation: "PCI DSS v4.0.1 Req 8.3.6: Passwords/passphrases have a minimum length of 12 characters (or at least 8 if system cannot support 12).",
      stemExample: "Under PCI DSS v4.0.1 Requirement 8.3.6, what is the default minimum character length required for user account passwords?",
      searchRel: "8.3.6"
    }
  ];

  // Tell-Tales State
  let telltaleSearchTerm = '';
  let telltaleSelectedCategory = 'all';
  let telltaleExpandedCards = new Set([1]); // Expand #1 by default

  const telltaleSearchInput = document.getElementById('telltale-search-input');
  const telltaleCountBadge = document.getElementById('telltale-count-badge');
  const telltaleToggleAllBtn = document.getElementById('telltale-toggle-all-btn');
  const telltalesCardsContainer = document.getElementById('telltales-cards-container');
  const telltaleCategoryPills = document.querySelectorAll('.telltale-cat-pill');
  const toggleTelltaleDrillBtn = document.getElementById('toggle-telltale-drill-btn');
  const telltaleDrillContainer = document.getElementById('telltale-drill-container');

  // Interactive Drill Toggle
  if (toggleTelltaleDrillBtn && telltaleDrillContainer) {
    toggleTelltaleDrillBtn.addEventListener('click', () => {
      const isHidden = telltaleDrillContainer.classList.contains('hidden');
      if (isHidden) {
        telltaleDrillContainer.classList.remove('hidden');
        toggleTelltaleDrillBtn.innerHTML = '<span>✕ Hide Practice Drill</span>';
        toggleTelltaleDrillBtn.classList.replace('bg-indigo-600', 'bg-slate-700');
      } else {
        telltaleDrillContainer.classList.add('hidden');
        toggleTelltaleDrillBtn.innerHTML = '<span>🎯 Practice Spotting Clues</span>';
        toggleTelltaleDrillBtn.classList.replace('bg-slate-700', 'bg-indigo-600');
      }
    });
  }

  // Search Input Event
  if (telltaleSearchInput) {
    telltaleSearchInput.addEventListener('input', (e) => {
      telltaleSearchTerm = (e.target.value || '').trim().toLowerCase();
      renderTelltalesView();
    });
  }

  // Category Filter Pills
  if (telltaleCategoryPills) {
    telltaleCategoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        telltaleCategoryPills.forEach(p => {
          p.classList.remove('active', 'bg-indigo-600', 'text-white');
          p.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
        });
        pill.classList.add('active', 'bg-indigo-600', 'text-white');
        pill.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
        telltaleSelectedCategory = pill.getAttribute('data-cat') || 'all';
        renderTelltalesView();
      });
    });
  }

  // Toggle All Cards
  if (telltaleToggleAllBtn) {
    telltaleToggleAllBtn.addEventListener('click', () => {
      const filtered = getFilteredTelltales();
      if (telltaleExpandedCards.size === filtered.length) {
        telltaleExpandedCards.clear();
        telltaleToggleAllBtn.textContent = 'Expand All';
      } else {
        filtered.forEach(item => telltaleExpandedCards.add(item.id));
        telltaleToggleAllBtn.textContent = 'Collapse All';
      }
      renderTelltalesView();
    });
  }

  function getFilteredTelltales() {
    return telltalesData.filter(item => {
      // Category match
      if (telltaleSelectedCategory !== 'all' && item.category !== telltaleSelectedCategory) {
        return false;
      }
      // Search match
      if (telltaleSearchTerm) {
        const textToSearch = [
          item.title,
          item.req,
          item.categoryName,
          item.clueKeywords.join(' '),
          item.clueExplanation,
          item.trapDistractor,
          item.trapReasoning,
          item.correctAnswer,
          item.citation,
          item.stemExample
        ].join(' ').toLowerCase();
        if (!textToSearch.includes(telltaleSearchTerm)) return false;
      }
      return true;
    });
  }

  // Jump from Tell-Tale Card directly to matching questions in Practice Mode
  window.jumpToPracticeSearch = function(query) {
    switchTab('practice');
    const searchInput = document.getElementById('search-questions');
    if (searchInput) {
      searchInput.value = query;
      practiceSearch = query.toLowerCase();
      const statusSelect = document.getElementById('practice-status-filter');
      if (statusSelect) {
        statusSelect.value = 'all';
        practiceStatusFilter = 'all';
      }
      updatePracticeList();
      practiceIndex = 0;
      renderPracticeQuestion();
    }
  };

  function renderTelltalesView() {
    if (!telltalesCardsContainer) return;
    const filtered = getFilteredTelltales();

    if (telltaleCountBadge) {
      telltaleCountBadge.textContent = `${filtered.length} of ${telltalesData.length} Tell-Tales`;
    }

    if (telltaleToggleAllBtn) {
      telltaleToggleAllBtn.textContent = (telltaleExpandedCards.size >= filtered.length && filtered.length > 0)
        ? 'Collapse All'
        : 'Expand All';
    }

    if (filtered.length === 0) {
      telltalesCardsContainer.innerHTML = `
        <div class="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
          <div class="text-4xl">🔍</div>
          <h3 class="text-lg font-bold text-slate-800">No matching tell-tales found</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords (e.g. "phishing", "SAD", "service provider", "patch", "SAQ").
          </p>
          <button onclick="document.getElementById('telltale-search-input').value=''; telltaleSearchTerm=''; renderTelltalesView();" class="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer">
            Clear Search
          </button>
        </div>
      `;
      return;
    }

    // Category styling helper
    const getBadgeStyle = (cat) => {
      switch (cat) {
        case 'verbs': return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'scoping': return 'bg-purple-50 text-purple-700 border-purple-200';
        case 'data': return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'frequencies': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'saq': return 'bg-rose-50 text-rose-700 border-rose-200';
        case 'assessment': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        default: return 'bg-slate-50 text-slate-700 border-slate-200';
      }
    };

    telltalesCardsContainer.innerHTML = filtered.map(item => {
      const isExpanded = telltaleExpandedCards.has(item.id);
      const badgeStyle = getBadgeStyle(item.category);

      return `
        <div class="bg-white rounded-2xl border ${isExpanded ? 'border-indigo-300 ring-2 ring-indigo-50 shadow-md' : 'border-slate-200 shadow-xs hover:border-slate-300'} transition-all overflow-hidden" data-id="${item.id}">
          <!-- Card Header & Clue Preview -->
          <div class="p-5 sm:p-6 cursor-pointer select-none telltale-header flex flex-col md:flex-row md:items-center justify-between gap-4" onclick="toggleTelltaleCard(${item.id})">
            <div class="space-y-2 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeStyle}">
                  ${item.categoryName}
                </span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                  ${item.req}
                </span>
                <span class="text-xs text-slate-400 font-medium">#${item.id}</span>
              </div>
              <h3 class="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                ${item.title}
              </h3>

              <!-- Clue Keywords Badges -->
              <div class="flex flex-wrap items-center gap-1.5 pt-1">
                <span class="text-xs font-bold text-indigo-600 flex items-center gap-1">
                  <span>🔍 Stem Keywords:</span>
                </span>
                ${item.clueKeywords.map(kw => `
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                    "${kw}"
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Action Button & Expand Chevron -->
            <div class="flex items-center gap-3 self-end md:self-center">
              <span class="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                ${isExpanded ? 'Collapse ▲' : 'View Decoder & Traps ▼'}
              </span>
              <div class="w-8 h-8 rounded-full ${isExpanded ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'} flex items-center justify-center font-bold text-sm transition-transform">
                ${isExpanded ? '▲' : '▼'}
              </div>
            </div>
          </div>

          <!-- Card Expanded Body -->
          ${isExpanded ? `
            <div class="px-5 pb-6 sm:px-6 pt-0 border-t border-slate-100 space-y-4 animate-fade-in">
              <!-- Item-Writer Logic Explainer -->
              <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong class="text-indigo-950 font-bold">🧠 The Item-Writer's Mindset:</strong> ${item.clueExplanation}
              </div>

              <!-- Traps vs Correct 2-Column Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Trap Card -->
                <div class="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                  <div class="flex items-center gap-2 text-rose-800 font-extrabold text-xs uppercase tracking-wider">
                    <span>⚠️</span> The Clever Trap Distractor
                  </div>
                  <p class="text-xs sm:text-sm font-semibold text-rose-950 leading-snug">
                    ${item.trapDistractor}
                  </p>
                  <p class="text-[11px] text-rose-800/90 leading-relaxed border-t border-rose-200/60 pt-2">
                    <strong>Why people guess wrong:</strong> ${item.trapReasoning}
                  </p>
                </div>

                <!-- Correct Answer Card -->
                <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div class="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
                    <span>✅</span> What PCI DSS Actually Mandates
                  </div>
                  <p class="text-xs sm:text-sm font-bold text-emerald-950 leading-snug">
                    ${item.correctAnswer}
                  </p>
                  <p class="text-[11px] text-emerald-800/90 leading-relaxed border-t border-emerald-200/60 pt-2">
                    <strong>Standard Reference:</strong> ${item.citation}
                  </p>
                </div>
              </div>

              <!-- Exam Stem Example & Action -->
              <div class="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div class="space-y-1 flex-1">
                  <div class="text-[11px] font-extrabold text-indigo-700 uppercase tracking-wider">
                    Example Exam Item Stem in Action:
                  </div>
                  <p class="text-xs sm:text-sm text-slate-800 italic">
                    "${item.stemExample}"
                  </p>
                </div>
                <button onclick="event.stopPropagation(); jumpToPracticeSearch('${item.searchRel}')" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5 self-end sm:self-auto">
                  <span>💡 Test This in Practice</span>
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  window.toggleTelltaleCard = function(id) {
    if (telltaleExpandedCards.has(id)) {
      telltaleExpandedCards.delete(id);
    } else {
      telltaleExpandedCards.add(id);
    }
    renderTelltalesView();
  };

  // Initial load
  updatePracticeList();
  renderPracticeQuestion();
});
