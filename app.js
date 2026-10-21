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

  const viewPractice = document.getElementById('view-practice');
  const viewExam = document.getElementById('view-exam');
  const viewFlashcards = document.getElementById('view-flashcards');
  const viewCheatsheet = document.getElementById('view-cheatsheet');
  const viewReview = document.getElementById('view-review');

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
    [tabPracticeBtn, tabExamBtn, tabFlashcardsBtn, tabCheatsheetBtn, tabReviewBtn].forEach(btn => {
      btn.classList.remove('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
      btn.classList.add('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700', 'hover:text-white');
    });

    [viewPractice, viewExam, viewFlashcards, viewCheatsheet, viewReview].forEach(v => v.classList.add('hidden'));
    if (tab !== 'cheatsheet' && typeof stopAudioNarration === 'function') {
      stopAudioNarration();
    }

    if (tab === 'practice') {
      justSubmittedQid = null;
      tabPracticeBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
      tabPracticeBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      viewPractice.classList.remove('hidden');
      updatePracticeList();
      if (practiceShuffle && practiceFilteredList.length > 0) {
        practiceIndex = Math.floor(Math.random() * practiceFilteredList.length);
      }
      renderPracticeQuestion();
    } else if (tab === 'exam') {
      tabExamBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
      tabExamBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      viewExam.classList.remove('hidden');
      renderExamView();
    } else if (tab === 'flashcards') {
      tabFlashcardsBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
      tabFlashcardsBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      viewFlashcards.classList.remove('hidden');
      renderFlashcard();
    } else if (tab === 'cheatsheet') {
      tabCheatsheetBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
      tabCheatsheetBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      viewCheatsheet.classList.remove('hidden');
    } else if (tab === 'review') {
      tabReviewBtn.classList.add('active-tab', 'bg-indigo-600', 'text-white', 'shadow-sm');
      tabReviewBtn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      viewReview.classList.remove('hidden');
      renderReviewView();
    }
  }

  tabPracticeBtn.addEventListener('click', () => switchTab('practice'));
  tabExamBtn.addEventListener('click', () => switchTab('exam'));
  tabFlashcardsBtn.addEventListener('click', () => switchTab('flashcards'));
  tabCheatsheetBtn.addEventListener('click', () => switchTab('cheatsheet'));
  tabReviewBtn.addEventListener('click', () => switchTab('review'));

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
        accBadge.className = 'font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 inline-flex items-center gap-1.5 transition-colors';
      } else {
        accPctEl.textContent = `${accuracyPct}%`;
        accCountsEl.textContent = `(${correctCount}/${answeredCount} Correct)`;
        if (accuracyPct >= 75) {
          accPctEl.className = 'font-black text-emerald-800';
          accBadge.className = 'font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 inline-flex items-center gap-1.5 transition-colors shadow-2xs';
        } else {
          accPctEl.className = 'font-black text-amber-800';
          accBadge.className = 'font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300 inline-flex items-center gap-1.5 transition-colors shadow-2xs';
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
    localStorage.removeItem('pcip_completed_qids');
    localStorage.removeItem('pcip_practice_answers');
    localStorage.removeItem('pcip_practice_submitted');
    localStorage.removeItem('pcip_incorrect');
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
        } else {
          incorrectQids.delete(q.id);
        }
        localStorage.setItem('pcip_incorrect', JSON.stringify([...incorrectQids]));

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
      }
    });

    saveCompletedState();
    localStorage.setItem('pcip_incorrect', JSON.stringify([...incorrectQids]));
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
  // FOCUS REVIEW / WEAK AREAS
  // ---------------------------------------------------------------------
  function renderReviewView() {
    const bookmarkedList = allQuestions.filter(q => bookmarks.has(q.id));
    const incorrectList = allQuestions.filter(q => incorrectQids.has(q.id));

    const bookmarkedCountEl = document.getElementById('bookmarked-count');
    const incorrectCountEl = document.getElementById('incorrect-count');
    if (bookmarkedCountEl) bookmarkedCountEl.textContent = bookmarkedList.length;
    if (incorrectCountEl) incorrectCountEl.textContent = incorrectList.length;

    const listContainer = document.getElementById('review-items-container');
    if (!listContainer) return;

    if (!bookmarkedList.length && !incorrectList.length) {
      listContainer.innerHTML = `
        <div class="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <p class="text-slate-500 text-base">No bookmarked or incorrect questions yet!</p>
          <p class="text-slate-400 text-xs mt-1">Bookmark questions in Practice Mode or take an Exam Simulation to populate your focus review queue.</p>
        </div>
      `;
      return;
    }

    const combinedMap = new Map();
    incorrectList.forEach(q => combinedMap.set(q.id, { q, tag: 'Missed in Quiz' }));
    bookmarkedList.forEach(q => combinedMap.set(q.id, { q, tag: combinedMap.has(q.id) ? 'Missed & Bookmarked' : 'Bookmarked' }));

    listContainer.innerHTML = Array.from(combinedMap.values()).map(({ q, tag }) => {
      const opts = q.options.map((opt, idx) => {
        const isC = q.correct.includes(idx);
        return `
          <div class="p-2.5 rounded-lg border text-xs md:text-sm ${isC ? 'border-emerald-400 bg-emerald-50 text-emerald-900 font-medium' : 'border-slate-200 text-slate-600 bg-white'}">
            <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt} ${isC ? '✓ (Correct)' : ''}
          </div>
        `;
      }).join('');

      return `
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between gap-3">
            <span class="text-xs font-bold px-2.5 py-1 rounded-full ${tag.includes('Missed') ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}">
              ${tag}
            </span>
            <span class="text-xs text-slate-400">${q.category}</span>
          </div>
          <h4 class="font-bold text-slate-900 text-base">${q.question}</h4>
          <div class="space-y-1.5">${opts}</div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs md:text-sm text-slate-700">
            <p class="font-bold text-slate-900 mb-1">Reasoning & Standard Reference:</p>
            ${q.explanation}
          </div>
        </div>
      `;
    }).join('');
  }

  const clearBmBtn = document.getElementById('clear-bookmarks-btn');
  if (clearBmBtn) {
    clearBmBtn.addEventListener('click', () => {
      bookmarks.clear();
      localStorage.removeItem('pcip_bookmarks');
      renderReviewView();
    });
  }

  const clearIncBtn = document.getElementById('clear-incorrect-btn');
  if (clearIncBtn) {
    clearIncBtn.addEventListener('click', () => {
      incorrectQids.clear();
      localStorage.removeItem('pcip_incorrect');
      renderReviewView();
    });
  }


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

  function buildBackupPayload() {
    return {
      appName: 'PCIP Exam Accelerator',
      standard: 'PCI DSS v4.0.1',
      exportedAt: new Date().toISOString(),
      completedQids: Array.from(completedQids),
      userAnswers: userAnswers,
      userSubmitted: userSubmitted,
      incorrectQids: Array.from(incorrectQids),
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
      data.incorrectQids.forEach(id => incorrectQids.add(Number(id)));
    }

    // Merge bookmarks
    if (Array.isArray(data.bookmarks)) {
      data.bookmarks.forEach(id => bookmarks.add(Number(id)));
    }

    saveCompletedState();
    localStorage.setItem('pcip_incorrect', JSON.stringify([...incorrectQids]));
    localStorage.setItem('pcip_bookmarks', JSON.stringify([...bookmarks]));

    updatePracticeStats();
    updatePracticeList();
    renderPracticeQuestion();
    if (currentTab === 'review') renderReviewView();
    if (currentTab === 'exam') renderExamView();
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

  // Initial load
  updatePracticeList();
  renderPracticeQuestion();
});
