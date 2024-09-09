import { reactive } from 'vue';
import NotifyUtil from './NotifyUtil';

const MOUSE_MOVE = 'mouse_move';
const WINDOW_SATE_MINIMIZE = 'minimize';
const WINDOW_CLOSE = 'close';
const APP_MOUNTED = 'app_mounted';
const APP_RESIZE_DEFAULT = 'resize_default';
const APP_RESIZE_MAX = 'resize_max';

interface Point {
  x: number;
  y: number;
}

interface DrageState {
  dragging: boolean;
  dragStartPos: Point;
}

export const drageState: DrageState = reactive({
  dragging: false,
  dragStartPos: {
    x: 0,
    y: 0,
  },
});

export function useWebview() {
  const appResize = (option: 'default' | 'max') => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.chrome.webview.postMessage(
        option == 'default' ? APP_RESIZE_DEFAULT : APP_RESIZE_MAX
      );
    } catch {}
  };
  const appStart = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.chrome.webview.postMessage(APP_MOUNTED);
    } catch {}
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (event.button == 0) {
      drageState.dragging = true;
      drageState.dragStartPos = { x: event.clientX, y: event.clientY };
    }
  };

  const handleMouseUp = () => {
    drageState.dragging = false;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (drageState.dragging) {
      const x = event.clientX - drageState.dragStartPos.x;
      const y = event.clientY - drageState.dragStartPos.y;
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.chrome.webview.postMessage(`${MOUSE_MOVE}|${x}|${y}`);
      } catch {}
    }
  };

  const minimize = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.chrome.webview.postMessage(WINDOW_SATE_MINIMIZE);
    } catch {}
  };

  const appClose = () => {
    NotifyUtil.yesno('프로그램을 종료하겠습니까?', () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.chrome.webview.postMessage(WINDOW_CLOSE);
      } catch {}
    });
  };

  return {
    appStart,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    minimize,
    appClose,
    appResize,
  };
}
