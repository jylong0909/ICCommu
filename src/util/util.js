export function fullScreenCompatibility() {
  let type = browserType();
  if (type == "Chrome") {
    let main = document.getElementById("app");
    if (main) {
      main.style.height = "1080px";
    }
  }
}
export function browserType() {
  let explorer = window.navigator.userAgent;
  if (explorer.indexOf("MSIE") >= 0) {
    return "ie";
  } else if (explorer.indexOf("Firefox") >= 0) {
    return "Firefox";
  } else if (explorer.indexOf("Chrome") >= 0) {
    return "Chrome";
  } else if (explorer.indexOf("Opera") >= 0) {
    return "Opera";
  } else if (explorer.indexOf("Safari") >= 0) {
    return "Safari";
  }
}
