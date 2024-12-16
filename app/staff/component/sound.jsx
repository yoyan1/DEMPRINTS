import { useCallback } from 'react';

const useAudio = (audioPath) => {
  return useCallback(() => {
    const audio = new Audio(audioPath);
    audio.play();
  }, [audioPath]);
};

export default useAudio;
