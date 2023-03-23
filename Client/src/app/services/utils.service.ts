function saveToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key)
  return data ? (JSON.parse(data) as T) : null
}

export const utilsService = {
  saveToStorage,
  loadFromStorage
}
