/**
 * Обработчик всех учебных тестов.
 * ВСТАВЛЯТЬ В Apps Script, открытый через Google Таблицу:
 * Расширения → Apps Script.
 * Развертывание: веб-приложение; выполнить от моего имени; доступ: все.
 *
 * Листы создаются автоматически:
 *   «Результаты» — 1 строка на попытку;
 *   «Ответы» — по одной строке на каждое задание попытки.
 */
const RESULTS_SHEET = 'Результаты';
const ANSWERS_SHEET = 'Ответы';
const RESULTS_HEADERS = [
  'Дата записи', 'ID попытки', 'Ученик', 'Тема теста',
  'Всего заданий', 'Заполнено', 'Верно', 'Процент', 'Время ученика (UTC)'
];
const ANSWERS_HEADERS = [
  'Дата записи', 'ID попытки', 'Ученик', 'Тема теста',
  '№ задания', 'Вопрос', 'Ответ ученика', 'Ожидаемый ответ', 'Верно'
];

function doGet() {
  return HtmlService.createHtmlOutput('Сервис сохранения результатов теста работает.').setTitle('Приём результатов');
}

function doPost(e) {
  let attemptId = '';
  let message;
  try {
    if (!e || !e.parameter || !e.parameter.payload) {
      throw new Error('Отсутствует параметр payload');
    }
    const data = JSON.parse(e.parameter.payload);
    attemptId = String(data.attemptId || '');
    validateAttempt_(data);

    const lock = LockService.getScriptLock();
    lock.waitLock(25000);
    try {
      const book = SpreadsheetApp.getActiveSpreadsheet();
      if (!book) throw new Error('Скрипт должен быть создан из Google Таблицы');
      const results = getSheet_(book, RESULTS_SHEET, RESULTS_HEADERS);
      const answers = getSheet_(book, ANSWERS_SHEET, ANSWERS_HEADERS);
      const count = results.getLastRow() - 1;
      const existingIds = count > 0 ? results.getRange(2, 2, count, 1).getValues().flat() : [];
      if (!existingIds.includes(attemptId)) {
        const now = new Date();
        const student = safeText_(data.studentName, 120);
        const title = safeText_(data.testTitle, 150);
        const answerRows = data.details.map(item => [
          now, attemptId, student, title,
          Number(item.number), safeText_(item.question, 1000),
          safeText_(item.answer, 1500), safeText_(item.expected, 1500),
          item.correct ? 'Да' : 'Нет'
        ]);
        // Сначала подробные ответы, затем сводка. При повторном ID не дублируем сводку.
        answers.getRange(answers.getLastRow() + 1, 1, answerRows.length, ANSWERS_HEADERS.length).setValues(answerRows);
        results.appendRow([
          now, attemptId, student, title, Number(data.total),
          Number(data.answered), Number(data.correct),
          Math.round(10000 * Number(data.correct) / Number(data.total)) / 100,
          safeText_(data.submittedAt || '', 70)
        ]);
      }
      message = { type: 'TRIANGLE_TEST_SAVED', ok: true, attemptId };
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    console.error(err);
    message = { type: 'TRIANGLE_TEST_SAVED', ok: false, attemptId, error: String(err.message || err).slice(0, 250) };
  }
  // HTML-ответ отправляет подтверждение назад в исходный сайт, через скрытый iframe.
  const safeJson = JSON.stringify(message).replace(/</g, '\\u003c');
  const html = '<!doctype html><html><head><meta charset="UTF-8"></head><body>' +
    '<script>window.top.postMessage(' + safeJson + ', "*");</scr' + 'ipt>' +
    '</body></html>';
  // В кадре нет секретов или данных из таблицы; разрешение встраивания нужно для ответа сайту.
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function validateAttempt_(d) {
  if (!d || typeof d !== 'object') throw new Error('Неверный формат данных');
  if (!/^[a-zA-Z0-9_-]{8,100}$/.test(String(d.attemptId || ''))) throw new Error('Неверный ID попытки');
  if (!String(d.studentName || '').trim()) throw new Error('Не указано имя');
  if (!Number.isInteger(d.total) || d.total < 1 || d.total > 200) throw new Error('Ожидается от 1 до 200 заданий');
  if (!Array.isArray(d.details) || d.details.length !== d.total) throw new Error('Неверное количество ответов');
  if (!Number.isInteger(d.correct) || d.correct < 0 || d.correct > d.total) throw new Error('Неверный балл');
  if (!Number.isInteger(d.answered) || d.answered < 0 || d.answered > d.total) throw new Error('Неверное число ответов');
  for (let i = 0; i < d.details.length; i++) {
    const item = d.details[i];
    if (!item || item.number !== i + 1 || typeof item.correct !== 'boolean') throw new Error('Неверные данные ответа №' + (i + 1));
  }
}

function getSheet_(book, name, headers) {
  let sheet = book.getSheetByName(name);
  if (!sheet) sheet = book.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#dff3ff');
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

// Предотвращаем интерпретацию вводимого учениками текста как формулы Google Таблиц.
function safeText_(value, maxLength) {
  let text = String(value === undefined || value === null ? '' : value).slice(0, maxLength);
  if (/^[\\s]*[=+@-]/.test(text)) text = "'" + text;
  return text;
}
