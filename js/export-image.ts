/**
 * Image export functionality using html2canvas
 * Exports DOM elements as PNG images
 */

// ============================================================
// Type Definitions
// ============================================================

/**
 * Input replacement pair for restoration
 */
interface InputReplacement {
  /** Original input element */
  input: HTMLInputElement;
  /** Replacement span element */
  span: HTMLSpanElement;
}

// Declare html2canvas types (loaded from CDN)
declare const html2canvas: (
  element: HTMLElement,
  options?: {
    scale?: number;
    useCORS?: boolean;
    backgroundColor?: string;
  }
) => Promise<HTMLCanvasElement>;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Replace input elements with styled span elements for image export
 * @param container - Container element with inputs to replace
 * @returns Array of replacement pairs for restoration
 */
function replaceInputsForExport(container: HTMLElement): InputReplacement[] {
  const replacements: InputReplacement[] = [];
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
    input.parentNode!.insertBefore(span, input);
    replacements.push({ input, span });
  });

  return replacements;
}

/**
 * Restore original input elements after image export
 * @param replacements - Array of replacement pairs to restore
 */
function restoreInputsAfterExport(replacements: InputReplacement[]): void {
  replacements.forEach(({ input, span }) => {
    span.remove();
    input.style.display = '';
  });
}

/**
 * Export a DOM element as a PNG image using html2canvas
 * @param el - Element to capture
 * @param filenamePrefix - Prefix for the exported filename
 */
async function exportElementAsImage(
  el: HTMLElement,
  filenamePrefix: string
): Promise<void> {
  if (!el) {
    console.error('Element not found for export');
    alert('エクスポート対象の要素が見つかりませんでした');
    return;
  }

  // Validate filename prefix to prevent path traversal
  const sanitizedPrefix = filenamePrefix.replace(/[^a-zA-Z0-9_-]/g, '_');

  let inputReplacements: InputReplacement[] = [];
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

// ============================================================
// Initialization
// ============================================================

/**
 * Initialize export button handlers on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(
      '.btn-export-image, [data-export-target]'
    )
  );
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      const original = btn.textContent;
      btn.textContent = '作成中...';

      // Check if we need to set a specific week before exporting
      let weekSpec = btn.dataset.exportWeek || null;
      const getWeekFrom = btn.dataset.getWeekFrom || null;
      if (!weekSpec && getWeekFrom) {
        const input = document.getElementById(getWeekFrom) as HTMLInputElement;
        if (input) {
          weekSpec = input.value;
        }
      }

      if (weekSpec) {
        // Expected format: YYYY-Wnn
        const m = weekSpec.match(/(\d{4})-W(\d{2})/i);
        if (m) {
          const isoYear = Number(m[1]);
          const weekNumber = Number(m[2]);
          // Check if setWeekByISO function exists (from week-target.js)
          if (typeof window.setWeekByISO === 'function') {
            await window.setWeekByISO(isoYear, weekNumber);
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
      btn.textContent = original || '';
    });
  });
});
