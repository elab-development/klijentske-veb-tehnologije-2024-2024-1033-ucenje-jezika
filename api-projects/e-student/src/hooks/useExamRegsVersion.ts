import { useEffect, useState } from 'react';
import { REG_CHANGE_EVENT } from '../services/examService';

export function useExamRegsVersion() {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const handler = () => setVersion((v) => v + 1);
    window.addEventListener(REG_CHANGE_EVENT, handler);
    return () => window.removeEventListener(REG_CHANGE_EVENT, handler);
  }, []);
  return version;
}
