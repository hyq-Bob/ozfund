const state={
  site:''
}
const getters={
  getNavModuleFlag: (state) =>  state.site
}
const actions = {
  setNavModuleFlag({state}, {flag}){
    return {
      ...state,
      site:flag
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
};