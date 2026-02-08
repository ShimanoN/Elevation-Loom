// Dependencies (global scope):
// - getWeekTarget, saveWeekTarget, getDayLog, saveDayLog, getDayLogsByWeek (from db.js)
// - getISOWeekInfo (from iso-week.js)
// - calculateWeekTotal (from calculations.js)

const weekNumberSpan = document.getElementById('week-number');
const weekRangeSpan = document.getElementById('week-range');
const targetInput = document.getElementById('target-input');
const currentTotalSpan = document.getElementById('current-total');
const forecastTotalSpan = document.getElementById('forecast-total');
const forecastDiffSpan = document.getElementById('forecast-diff');
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const scheduleBody = document.getElementById('schedule-body');

// 表示中の週の基準日（初期値は今日）
let currentDate = new Date();

/**
 * UIを現在の基準日で更新
 */
async function loadData() {
    const weekInfo = getISOWeekInfo(currentDate);
    const targetKey = `${weekInfo.iso_year}-W${String(weekInfo.week_number).padStart(2, '0')}`;

    // 週情報の表示更新
    weekNumberSpan.textContent = `${weekInfo.iso_year}-W${String(weekInfo.week_number).padStart(2, '0')}`;
    weekRangeSpan.textContent = `${weekInfo.start_date.replace(/-/g, '/')} - ${weekInfo.end_date.replace(/-/g, '/')}`;

    // 目標値の読み込み
    const targetRecord = await getWeekTarget(targetKey);
    const targetElevation = targetRecord?.target_elevation ?? null;
    if (targetRecord) {
        targetInput.value = targetRecord.target_elevation ?? '';
    } else {
        targetInput.value = '';
    }

    // 現在の実績値の読み込み (週合計)
    const currentTotal = await calculateWeekTotal(weekInfo.iso_year, weekInfo.week_number);
    currentTotalSpan.textContent = currentTotal;

    // 週間スケジュールの生成と予実計算
    await renderSchedule(weekInfo, currentTotal, targetElevation);
}

/**
 * 週間スケジュールの描画と見込み計算
 * @param {Object} weekInfo 
 * @param {number} currentTotal 
 * @param {number|null} targetElevation 
 */
async function renderSchedule(weekInfo, currentTotal, targetElevation) {
    scheduleBody.innerHTML = '';
    let forecastTotal = 0;

    // 週の開始日(月曜)から7日間ループ
    const startDate = new Date(weekInfo.start_date); // YYYY-MM-DD string is parseable

    for (let i = 0; i < 7; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const dayName = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];

        const log = await getDayLog(dateStr);
        const plan1 = log?.daily_plan_part1 ?? null;
        const plan2 = log?.daily_plan_part2 ?? null;
        const actual = log?.elevation_total ?? null;

        // 見込み計算ロジック:
        // 実績があれば実績を、なければ(予定1 + 予定2)を加算。
        // もし両方なければ0。
        // actualがnullでない(0含む)場合は実績採用。

        let valueForForecast = 0;
        if (actual !== null) {
            valueForForecast = actual;
        } else {
            valueForForecast = (plan1 ?? 0) + (plan2 ?? 0);
        }
        forecastTotal += valueForForecast;

        const tr = document.createElement('tr');

        // 日付セル
        const tdDate = document.createElement('td');
        tdDate.textContent = `${d.getMonth() + 1}/${d.getDate()} (${dayName})`;
        tr.appendChild(tdDate);

        // 予定セル (1部)
        const tdPlan1 = document.createElement('td');
        const planInput1 = document.createElement('input');
        planInput1.type = 'number';
        planInput1.min = '0';
        planInput1.step = '100';
        planInput1.value = plan1 ?? '';
        planInput1.dataset.date = dateStr;
        planInput1.addEventListener('blur', (e) => saveDailyPlan(dateStr, 'part1', e.target.value));
        tdPlan1.appendChild(planInput1);
        tr.appendChild(tdPlan1);

        // 予定セル (2部)
        const tdPlan2 = document.createElement('td');
        const planInput2 = document.createElement('input');
        planInput2.type = 'number';
        planInput2.min = '0';
        planInput2.step = '100';
        planInput2.value = plan2 ?? '';
        planInput2.dataset.date = dateStr;
        planInput2.addEventListener('blur', (e) => saveDailyPlan(dateStr, 'part2', e.target.value));
        tdPlan2.appendChild(planInput2);
        tr.appendChild(tdPlan2);


        // 実績セル (読み取り専用)
        const tdActual = document.createElement('td');
        tdActual.textContent = actual !== null ? `${actual}m` : '-';
        tr.appendChild(tdActual);

        scheduleBody.appendChild(tr);
    }

    // 見込み合計表示更新
    forecastTotalSpan.textContent = forecastTotal;

    if (targetElevation !== null && targetElevation > 0) {
        const diff = forecastTotal - targetElevation;
        const sign = diff >= 0 ? '+' : '';
        const percentage = Math.round((forecastTotal / targetElevation) * 100);
        forecastDiffSpan.textContent = `(目標比: ${sign}${diff}m / ${percentage}%)`;
    } else {
        forecastDiffSpan.textContent = '';
    }
}

/**
 * 日次予定の保存
 * @param {string} dateStr 
 * @param {string} part 'part1' or 'part2'
 * @param {string} value 
 */
async function saveDailyPlan(dateStr, part, value) {
    const numValue = value === '' ? null : Number(value);

    const existing = await getDayLog(dateStr);
    const weekInfo = getISOWeekInfo(new Date(dateStr));

    const record = {
        date: dateStr,
        elevation_part1: existing?.elevation_part1 ?? null,
        elevation_part2: existing?.elevation_part2 ?? null,
        elevation_total: existing?.elevation_total ?? 0,
        subjective_condition: existing?.subjective_condition ?? null,

        // 既存の値を保持しつつ更新
        daily_plan_part1: part === 'part1' ? numValue : (existing?.daily_plan_part1 ?? null),
        daily_plan_part2: part === 'part2' ? numValue : (existing?.daily_plan_part2 ?? null),

        iso_year: weekInfo.iso_year,
        week_number: weekInfo.week_number,
        timezone: "Asia/Tokyo",
        created_at: existing?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    await saveDayLog(record);
    await loadData(); // 再計算
}


/**
 * 目標の保存
 */
async function saveTarget() {
    const weekInfo = getISOWeekInfo(currentDate);
    const targetKey = `${weekInfo.iso_year}-W${String(weekInfo.week_number).padStart(2, '0')}`;

    const targetValue = targetInput.value === '' ? null : Number(targetInput.value);

    const existing = await getWeekTarget(targetKey);

    const record = {
        key: targetKey,
        iso_year: weekInfo.iso_year,
        week_number: weekInfo.week_number,
        start_date: weekInfo.start_date,
        end_date: weekInfo.end_date,
        target_elevation: targetValue,
        created_at: existing?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    await saveWeekTarget(record);
    await loadData();
}

/**
 * 週の変更
 * @param {number} offset 
 */
async function changeWeek(offset) {
    currentDate.setDate(currentDate.getDate() + (offset * 7));
    await loadData();
}

// イベントリスナー
targetInput.addEventListener('blur', saveTarget);

prevWeekBtn.addEventListener('click', () => changeWeek(-1));
nextWeekBtn.addEventListener('click', () => changeWeek(1));

// 初期ロード
loadData();
