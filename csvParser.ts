import { knownFolders, File, Folder } from '@nativescript/core';

export async function readCSVFile(filename: string): Promise<string[][]> {
  const documents = knownFolders.currentApp();
  const file = documents.getFile(`data/${filename}`);
  
  try {
    const content = await file.readText();
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.split(','));
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

export function parseCSVData<T>(headers: string[], data: string[][]): T[] {
  const [headerRow, ...rows] = data;
  
  return rows.map(row => {
    const item: any = {};
    headers.forEach((header, index) => {
      item[header] = row[index];
    });
    return item as T;
  });
}