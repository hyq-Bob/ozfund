/*
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-01-22 14:28:48
 * @LastEditors: hyq_bob bob.he@autech.one
 * @LastEditTime: 2024-03-27 10:12:04
 * @FilePath: /ozfund-vue/src/directives/animation.js
 * @Description: 指令
 */
import { observeDom } from "../utils/base";

export default {
  animation: {
    bind(el) {
      // el.src = el.dataset["default_url"];
      el.timer = setTimeout(() => {
        observeDom(el, (boolean) => {
          if (boolean) {
            el.src = el.dataset["gif_url"];
            // el.timer2 = setTimeout(() => {
            //   el.src = el.dataset["default_url"];
            // }, value?.deplay || 5000);
          }
        });
      }, 0);
      // el.addEventListener("mouseover", ()=>{
      //   el.src=el.dataset['gif_url']
      // })
      // el.addEventListener("mouseout", ()=>{
      //   el.src=el.dataset['default_url']
      // })
    },
    unbind(el) {
      clearTimeout(el.timer);
      // clearTimeout(el.timer2);
      // el.removeEventListener("mouseover", () => {});
      // el.removeEventListener("mouseout", () => {});
    },
  },
  scroll: {
    bind(el) {
      window.addEventListener("scroll", () => {
        var scrollTop =
          window.pageYOffset || document.documentElement.scrollTop; //获取当前滚动条位置
        el.style.cssText =
          scrollTop > 60 ? "background:#fff" : "background:transparent";
      });
    },
    unbind() {
      window.removeEventListener("scroll", () => {});
    },
  },
};
