// Dependencies (global scope):
// - getDayLog, saveDayLog, getWeekTarget (from db.js)
// - getISOWeekInfo (from iso-week.js)
// - calculateWeekTotal, calculateWeekProgress (from calculations.js)

const dateInput = document.getElementById('current-date');
const part1Input = document.getElementById('part1');
const part2Input = document.getElementById('part2');
const dailyTotalSpan = document.getElementById('daily-total');
const conditionRadios = document.getElementsByName('condition');
const weekRangeSpan = document.getElementById('week-range');
const weekTargetSpan = document.getElementById('week-target');
const weekCurrentSpan = document.getElementById('week-current');
const weekDiffArea = document.getElementById('week-diff-area');
const weekDiffSpan = document.getElementById('week-diff');
const weekPercentageSpan = document.getElementById('week-percentage');

const prevDayBtn = document.getElementById('prev-day');
const nextDayBtn = document.getElementById('next-day');

// 今日の日付を初期値として保持
const TODAY_STR = new Date().toISOString().split('T')[0];
dateInput.value = TODAY_STR;

/**
 * 30日制限のチェックとボタンの無効化
 */
function updateNavButtons() {
    const current = new Date(dateInput.value);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 30);

    // 前日ボタンの制限
    if (current <= minDate) {
        prevDayBtn.disabled = true;
    } else {
        prevDayBtn.disabled = false;
    }
}

/**
 * UIを現在のデータで更新
 */
async function loadData() {
    const date = dateInput.value;
    const log = await getDayLog(date);

    if (log) {
        part1Input.value = log.elevation_part1 ?? '';
        part2Input.value = log.elevation_part2 ?? '';
        dailyTotalSpan.textContent = log.elevation_total || 0;

        for (const radio of conditionRadios) {
            radio.checked = log.subjective_condition === radio.value;
        }
    } else {
        part1Input.value = '';
        part2Input.value = '';
        dailyTotalSpan.textContent = 0;
        for (const radio of conditionRadios) {
            radio.checked = false;
        }
    }

    await updateWeekProgress();
    updateNavButtons();
}

/**
 * 現在の入力を保存
 */
async function saveData() {
    const date = dateInput.value;
    const part1Value = part1Input.value;
    const part2Value = part2Input.value;

    const part1 = part1Value === '' ? null : Number(part1Value);
    const part2 = part2Value === '' ? null : Number(part2Value);

    let condition = null;
    for (const radio of conditionRadios) {
        if (radio.checked) {
            condition = radio.value;
            break;
        }
    }

    const existing = await getDayLog(date);
    const weekInfo = getISOWeekInfo(new Date(date));
    const total = (part1 ?? 0) + (part2 ?? 0);

    const record = {
        date: date,
        elevation_part1: part1,
        elevation_part2: part2,
        elevation_total: total,
        subjective_condition: condition,
        iso_year: weekInfo.iso_year,
        week_number: weekInfo.week_number,
        timezone: "Asia/Tokyo",
        created_at: existing?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    await saveDayLog(record);
    dailyTotalSpan.textContent = total;
    await updateWeekProgress();
}

/**
 * 日付変更処理
 * @param {number} offset 
 */
async function changeDate(offset) {
    // 遷移前に保存
    await saveData();

    const current = new Date(dateInput.value);
    current.setDate(current.getDate() + offset);

    // 30日制限チェック (前日のみ)
    if (offset < 0) {
        const minDate = new Date();
        minDate.setDate(minDate.getDate() - 30);
        if (current < minDate) return;
    }

    dateInput.value = current.toISOString().split('T')[0];
    await loadData();
}

/**
 * 週進捗エリアの更新
 */
async function updateWeekProgress() {
    const date = new Date(dateInput.value);
    const weekInfo = getISOWeekInfo(date);

    // 表示更新
    weekRangeSpan.textContent = `${weekInfo.start_date.replace(/-/g, '/')} - ${weekInfo.end_date.replace(/-/g, '/')}`;

    const targetKey = `${weekInfo.iso_year}-W${String(weekInfo.week_number).padStart(2, '0')}`;
    const targetRecord = await getWeekTarget(targetKey);
    const currentTotal = await calculateWeekTotal(weekInfo.iso_year, weekInfo.week_number);

    weekCurrentSpan.textContent = currentTotal;

    if (targetRecord && targetRecord.target_elevation !== null) {
        weekTargetSpan.textContent = `${targetRecord.target_elevation}m`;
        const progress = calculateWeekProgress(currentTotal, targetRecord.target_elevation);

        weekDiffArea.style.display = 'block';
        weekDiffSpan.textContent = `${progress.diff >= 0 ? '+' : ''}${progress.diff}m`;
        weekPercentageSpan.textContent = `${progress.percentage}%`;
    } else {
        weekTargetSpan.textContent = '未設定';
        weekDiffArea.style.display = 'none';
    }
}

// イベントリスナー
part1Input.addEventListener('blur', saveData);
part2Input.addEventListener('blur', saveData);
for (const radio of conditionRadios) {
    radio.addEventListener('change', saveData);
}

prevDayBtn.addEventListener('click', () => changeDate(-1));
nextDayBtn.addEventListener('click', () => changeDate(1));
dateInput.addEventListener('change', async () => {
    // 日付変更時
    await loadData();
});

// 初期ロード
loadData();
