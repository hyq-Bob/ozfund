export default function scrollGif(_this, domList) {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  domList.map(item => {
    if (scrollTop > item.value - cHeight) {
      if (_this.scroll[item.label] === 3) return
      _this.scroll[item.label] = 2
      setTimeout(() => {
        _this.scroll[item.label] = 3
      }, item.time * 1000)
    }
  })
}