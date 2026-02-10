document.addEventListener('DOMContentLoaded', () => {
  // 支持: data-export-target 属性 または .btn-export-image クラスを持つボタンを検出
  const buttons = Array.from(
    document.querySelectorAll('.btn-export-image, [data-export-target]')
  );
  if (!buttons.length) return;

  /**
   * Replace input elements with styled span elements for image export
   * @param {HTMLElement} container - Container element with inputs to replace
   * @returns {Array<{input: HTMLInputElement, span: HTMLSpanElement}>} Replacement pairs for restoration
   */
  function replaceInputsForExport(container) {
    const replacements = [];
    const inputs = container.querySelectorAll('input');

    inputs.forEach((input) => {
      const span = document.createElement('span');
      const style = window.getComputedStyle(input);
      const value = input.value || input.placeholder || '';

      span.className = 'export-input-replacement';
      span.textContent = value;
      span.style.display = 'inline-flex';
      span.style.alignItems = 'center';
      span.style.justifyContent =
        style.textAlign === 'center' ? 'center' : 'flex-start';
      span.style.width = style.width;
      span.style.height = style.height;
      span.style.padding = style.padding;
      span.style.border = style.border;
      span.style.borderRadius = style.borderRadius;
      span.style.boxSizing = style.boxSizing;
      span.style.fontFamily = style.fontFamily;
      span.style.fontSize = style.fontSize;
      span.style.fontWeight = style.fontWeight;
      span.style.lineHeight = style.lineHeight;
      span.style.letterSpacing = style.letterSpacing;
      span.style.backgroundColor = style.backgroundColor;
      span.style.color = style.color;
      span.style.whiteSpace = 'nowrap';
      span.style.overflow = 'hidden';
      span.style.textOverflow = 'ellipsis';

      input.style.display = 'none';
      input.parentNode.insertBefore(span, input);
      replacements.push({ input, span });
    });

    return replacements;
  }

  /**
   * Restore original input elements after image export
   * @param {Array<{input: HTMLInputElement, span: HTMLSpanElement}>} replacements - Replacement pairs to restore
   */
  function restoreInputsAfterExport(replacements) {
    replacements.forEach(({ input, span }) => {
      span.remove();
      input.style.display = '';
    });
  }

  /**
   * Export a DOM element as a PNG image using html2canvas
   * @param {HTMLElement} el - Element to capture
   * @param {string} filenamePrefix - Prefix for the exported filename
   * @returns {Promise<void>}
   */
  async function exportElementAsImage(el, filenamePrefix) {
    if (!el) {
      console.error('Element not found for export');
      alert('エクスポート対象の要素が見つかりませんでした');
      return;
    }

    // Validate filename prefix to prevent path traversal
    const sanitizedPrefix = filenamePrefix.replace(/[^a-zA-Z0-9_-]/g, '_');

    let inputReplacements = [];
    try {
      inputReplacements = replaceInputsForExport(el);
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
      a.href = dataUrl;
      a.download = `${sanitizedPrefix}_${ts}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Image export failed', err);
      alert('画像出力に失敗しました（コンソールを確認）');
    } finally {
      restoreInputsAfterExport(inputReplacements);
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      const original = btn.textContent;
      btn.textContent = '作成中...';

      // 1) もしボタンが data-get-week-from を持つ場合、そこから週指定を読み取って setWeekByISO を呼ぶ
      let weekSpec = btn.dataset.exportWeek || null;
      const getWeekFrom = btn.dataset.getWeekFrom || null;
      if (!weekSpec && getWeekFrom) {
        const input = document.getElementById(getWeekFrom);
        if (input) {
          weekSpec = input.value;
        }
      }

      if (weekSpec) {
        // 期待形式: YYYY-Wnn
        const m = weekSpec.match(/(\d{4})-W(\d{2})/i);
        if (m) {
          const isoYear = Number(m[1]);
          const weekNumber = Number(m[2]);
          if (typeof window.setWeekByISO === 'function') {
            await window.setWeekByISO(isoYear, weekNumber);
            // setWeekByISO は await 完了時に loadData も完了済み
          } else {
            console.warn('setWeekByISO not available on this page');
          }
        }
      }

      const targetId =
        btn.dataset.exportTarget ||
        btn.getAttribute('data-export-target') ||
        'weekly-progress-section';
      const el = document.getElementById(targetId) || document.body;
      const prefix =
        btn.dataset.filenamePrefix ||
        'Elevation_Loom_' + (targetId || 'export');

      await exportElementAsImage(el, prefix);

      btn.disabled = false;
      btn.textContent = original;
    });
  });
});
