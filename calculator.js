
document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="container">
      <h2>基金止盈收益计算器</h2>
      <label>选择基金类型：</label>
      <select id="fundType">
        <option value="货币基金">货币基金</option>
        <option value="债券基金">债券基金</option>
        <option value="混合基金" selected>混合基金</option>
        <option value="股票基金">股票基金</option>
        <option value="指数基金">指数基金</option>
        <option value="行业/主题基金">行业/主题基金</option>
      </select>
      <p id="suggestion" style="font-style: italic;"></p>
      <label>买入净值：</label>
      <input type="number" id="buyPrice" step="0.01" value="1.00"/>
      <label>当前净值：</label>
      <input type="number" id="currentPrice" step="0.01" value="1.00"/>
      <label>自定义止盈率 (%)：</label>
      <input type="number" id="customRate" step="0.1" value="15"/>
      <button onclick="calculate()">计算收益</button>
      <div id="result" class="result"></div>
    </div>
  `;

  const suggestions = {
    "货币基金": "无需设置止盈率，适合长期放置以获取稳定收益。",
    "债券基金": "建议止盈率设为 5%–10%。",
    "混合基金": "建议止盈率设为 10%–20%。",
    "股票基金": "建议止盈率设为 20%–50%。",
    "指数基金": "建议止盈率设为 20%–50%。",
    "行业/主题基金": "建议止盈率设为 30%–60%。"
  };

  const fundTypeEl = document.getElementById('fundType');
  const suggestionEl = document.getElementById('suggestion');
  fundTypeEl.addEventListener('change', () => {
    suggestionEl.textContent = suggestions[fundTypeEl.value];
  });
  suggestionEl.textContent = suggestions[fundTypeEl.value];
});

function calculate() {
  const buyPrice = parseFloat(document.getElementById('buyPrice').value);
  const currentPrice = parseFloat(document.getElementById('currentPrice').value);
  const customRate = parseFloat(document.getElementById('customRate').value);

  const targetPrice = buyPrice * (1 + customRate / 100);
  const holdingRate = ((currentPrice - buyPrice) / buyPrice) * 100;
  const hitTarget = holdingRate >= customRate;

  const result = document.getElementById('result');
  result.innerHTML = `
    <p>🎯 目标止盈净值：<strong>${targetPrice.toFixed(4)} 元</strong></p>
    <p>📊 当前持有收益率：<strong>${holdingRate.toFixed(2)}%</strong></p>
    <p style="color: ${hitTarget ? 'green' : 'orange'};">${
      hitTarget ? '✅ 已达到止盈点，可考虑止盈' : '⌛ 尚未达到止盈点'
    }</p>
  `;
}
