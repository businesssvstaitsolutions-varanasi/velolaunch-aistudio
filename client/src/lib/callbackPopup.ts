export const CALLBACK_POPUP_SESSION_KEY = "velolaunch-callback-popup-state";
export const MOBILE_CALLBACK_DELAY_MS = 60_000;
export const MOBILE_MIN_SCROLL_Y = 160;

export function shouldOpenForExitIntent({ clientY, isDesktop, hasHandled }: { clientY: number; isDesktop: boolean; hasHandled: boolean }) {
  return isDesktop && !hasHandled && clientY <= 0;
}

export function shouldStartMobileCallbackTimer({ isMobile, scrollY, hasHandled }: { isMobile: boolean; scrollY: number; hasHandled: boolean }) {
  return isMobile && !hasHandled && scrollY >= MOBILE_MIN_SCROLL_Y;
}
