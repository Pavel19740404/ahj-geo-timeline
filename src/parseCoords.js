/**
 * Парсит строку с координатами в объект { lat, lng }.
 * Поддерживает форматы:
 *   - "51.50851, -0.12572"   (с пробелом)
 *   - "51.50851,-0.12572"    (без пробела)
 *   - "[51.50851, -0.12572]" (в квадратных скобках)
 *
 * @param {string} input
 * @returns {{ lat: number, lng: number }}
 * @throws {Error} если формат не распознан
 */
export function parseCoords(input) {
  if (typeof input !== 'string') {
    throw new Error('Некорректный формат координат');
  }

  // Убираем квадратные скобки если есть
  const cleaned = input.trim().replace(/^\[|\]$/g, '').trim();

  // Разделяем по запятой
  const parts = cleaned.split(',');
  if (parts.length !== 2) {
    throw new Error('Некорректный формат координат');
  }

  const lat = parseFloat(parts[0].trim());
  const lng = parseFloat(parts[1].trim());

  if (isNaN(lat) || isNaN(lng)) {
    throw new Error('Некорректный формат координат');
  }

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    throw new Error('Некорректный формат координат');
  }

  return { lat, lng };
}
