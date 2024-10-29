import { PincodeInfo } from '../types';

export function isWithinCutoffTime(provider: string): boolean {
  const now = new Date();
  const currentHour = now.getHours();

  switch (provider) {
    case 'A':
      return currentHour < 17; // Before 5 PM
    case 'B':
      return currentHour < 9; // Before 9 AM
    default:
      return false;
  }
}

export function calculateDeliveryDate(pincodeInfo: PincodeInfo): Date {
  const now = new Date();
  
  switch (pincodeInfo.provider) {
    case 'A':
      return isWithinCutoffTime('A') ? now : new Date(now.setDate(now.getDate() + 1));
    case 'B':
      return isWithinCutoffTime('B') ? now : new Date(now.setDate(now.getDate() + 1));
    case 'GENERAL':
      const daysToAdd = pincodeInfo.region === 'METRO' ? 2 : 
                       pincodeInfo.region === 'NON_METRO' ? 3 : 5;
      return new Date(now.setDate(now.getDate() + daysToAdd));
    default:
      return new Date(now.setDate(now.getDate() + 5));
  }
}

export function getRemainingTimeForCutoff(provider: string): string {
  const now = new Date();
  const cutoffHour = provider === 'A' ? 17 : 9;
  const cutoff = new Date(now.setHours(cutoffHour, 0, 0, 0));
  
  if (now > cutoff) return '00:00:00';
  
  const diff = cutoff.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}