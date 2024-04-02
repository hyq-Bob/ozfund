/*
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-01-22 14:28:48
 * @LastEditors: hyq_bob bob.he@autech.one
 * @LastEditTime: 2024-03-29 18:26:03
 * @FilePath: /ozfund-vue/src/utils/base.js
 * @Description: 常用函数
 */
import { AES, enc, mode, pad } from "crypto-js";
const AseKey = "abcopekiYHJFMGTO";
const SessionStorage = window.sessionStorage;
function isMobile() {
  return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function mobileType() {
  let ua = navigator.userAgent.toLowerCase();
  if (/android|adr/gi.test(ua)) {
    return "android";
  } else if (/\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(ua)) {
    //苹果
    return "apple";
  } else if (/iPad/gi.test(ua)) {
    //ipad
    return "ipad";
  }
}
const encrypt = (message, key = AseKey) => {
  return AES.encrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  }).toString();
};
const decrypt = (message, key = AseKey) => {
  if (!message) return message;
  return AES.decrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  }).toString(enc.Utf8);
};
const dataType = (obj) => {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLocaleLowerCase();
};
function getSession(name) {
  if (!name.endsWith("_ozfund")) {
    name = name + "_ozfund";
  }
  let value = decrypt(SessionStorage.getItem(name));
  try {
    value = JSON.parse(value);
    if (value["_flag"] === "boolean") {
      value = Boolean(Number(value.val));
    }
    return value;
  } catch (error) {
    return value;
  }
}
function setSession(name, value) {
  if (dataType(value) === "boolean")
    value = JSON.stringify({ _flag: "boolean", val: Number(value) });
  else if (dataType(value) === "object")
    value = JSON.stringify({ ...value, _flag: "object" });
  if (!name.endsWith("_ozfund")) {
    name = name + "_ozfund";
  }
  return SessionStorage.setItem(name, encrypt(value));
}
function removeSession(name) {
  return SessionStorage.removeItem(name);
}
function clearSession() {
  return SessionStorage.clear();
}

function observeDom(el, fn) {
  let observer = null;
  function observerFn() {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fn(true);
        } else {
          fn(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
  }
  observerFn();
  // document.addEventListener("DOMContentLoaded", observerFn);
  return () => {
    // observer?.unobserve(el);
    // document?.removeEventListener("load", observerFn);
  };
}
function viewePdf(fileUrl) {
  if (!fileUrl) return;
  const routePath = this.$router.resolve({ path: `/view-pdf`, query:{file:fileUrl} }).href;
  window.open(routePath, '_blank')
}
export {
  viewePdf,
  observeDom,
  mobileType,
  isMobile,
  getSession,
  dataType,
  setSession,
  removeSession,
  clearSession,
};
