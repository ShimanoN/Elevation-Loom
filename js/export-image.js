document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-export-image');
    if (!btn) return;

    async function exportProgressAsImage() {
        const el = document.getElementById('weekly-progress-section') || document.body;

        try {
            const canvas = await html2canvas(el, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            const dataUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
            a.href = dataUrl;
            a.download = `Elevation_Loom_progress_${ts}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            console.error('Image export failed', err);
            alert('画像出力に失敗しました（コンソールを確認）');
        }
    }

    btn.addEventListener('click', async () => {
        btn.disabled = true;
        const original = btn.textContent;
        btn.textContent = '作成中...';
        await exportProgressAsImage();
        btn.disabled = false;
        btn.textContent = original;
    });
});
