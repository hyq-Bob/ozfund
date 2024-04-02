/*
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-03-19 17:27:27
 * @LastEditors: hyq_bob bob.he@autech.one
 * @LastEditTime: 2024-04-01 20:48:58
 * @FilePath: /ozfund-mobile/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "css-ruleorselectorexpected":0,
    "vue/valid-template-root":0,
    "no-console":0,
    "no-unused-vars":0,
    "no-undef":0,
    "prettier/prettier":0,
    "vue/no-unused-components":0,
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
