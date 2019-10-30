import useSound from './useSound';

export default function usePlayback(source) {
  const [status, loadStatusAsync] = useSound(source);
  const sound = {
    playAsync: () => loadStatusAsync({ shouldPlay: true }),
    pauseAsync: () => loadStatusAsync({ shouldPlay: false }),
    stopAsync: () => loadStatusAsync({ positionMillis: 0, shouldPlay: false }),
  };

  return { status, sound };
}
