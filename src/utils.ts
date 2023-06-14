export function captureOptionsFromTokenInfo(tokenInfo: string): {} {
  try {
    return JSON.parse(tokenInfo.trim());
  } catch (_error) {
    return {};
  }
}
