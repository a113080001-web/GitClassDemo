/**
 * 配色小助手 (Color Palette Assistant) - Phase 1 Script
 * 基準色選択、リアルタイム色見本表示、プリセットカラー選択機能
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM要素の取得
  const baseColorPicker = document.getElementById('baseColorPicker');
  const colorChip = document.getElementById('colorChip');
  const hexValue = document.getElementById('hexValue');
  const rgbValue = document.getElementById('rgbValue');
  const presetButtons = document.querySelectorAll('.preset-btn');

  /**
   * 16進数カラーコード (HEX) を RGB 文字列に変換する
   * @param {string} hex - 例: "#3B82F6"
   * @returns {string} - 例: "rgb(59, 130, 246)"
   */
  function hexToRgb(hex) {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    }
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * 選択色を画面上のUI要素に反映・同期する
   * @param {string} hexColor - 16進数カラーコード
   */
  function applyColor(hexColor) {
    const formattedHex = hexColor.toUpperCase();
    
    // カラーピッカーの値と同期
    if (baseColorPicker.value.toUpperCase() !== formattedHex) {
      baseColorPicker.value = formattedHex;
    }

    // カラーチップの背景色を更新
    colorChip.style.backgroundColor = formattedHex;

    // HEXおよびRGBテキストを更新
    hexValue.textContent = formattedHex;
    rgbValue.textContent = hexToRgb(formattedHex);

    // プリセットボタンのアクティブ状態の同期
    presetButtons.forEach(btn => {
      const btnColor = (btn.getAttribute('data-color') || '').toUpperCase();
      if (btnColor === formattedHex) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // --- イベントリスナーの登録 ---

  // 1. カラーピッカー変更時のリアルタイム反映 (inputイベント)
  baseColorPicker.addEventListener('input', (e) => {
    applyColor(e.target.value);
  });

  // changeイベント時にも反映を担保
  baseColorPicker.addEventListener('change', (e) => {
    applyColor(e.target.value);
  });

  // 2. プリセットカラーボタンのクリックイベント
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetColor = btn.getAttribute('data-color');
      if (targetColor) {
        applyColor(targetColor);
      }
    });
  });

  // 初期化：初期選択色 (#3B82F6) を反映
  applyColor(baseColorPicker.value || '#3B82F6');
});
