function saveToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key)
  return data ? (JSON.parse(data) as T) : null
}

function deepClone<T>(obj: any): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

export const utilsService = {
  saveToStorage,
  loadFromStorage,
  deepClone,
}
