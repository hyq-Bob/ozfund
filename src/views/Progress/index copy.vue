<template>
  <div class="animate__animated animate__bounceInRight">
    <div class="progress_mobile_bg">
      <!-- 模块一 -->
      <div class="progress_module_one">
        <div class="w">
          <div class="progress_module_left">
            <h3>{{$t('时间线')}}</h3>
          </div>
          <div class="progress_module_right">
            <img
              v-if="scroll.moduleOne === 2"
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/progress/gif/module1.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/progress/gif/module1.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 模块二 -->
      <div class="progress_module_two">
        <div class="w">
          <h3 class="mobile_show progress_module_two_tit">{{$t('时间线')}}</h3>
          <ul class="progress_list">
            <li class="progress_line">
              <img src="@/assets/images/progress/line.png" alt="" />
            </li>
            <li class="progress_i progress_i_right">
              <div class="progress_i_info">
                <div class="pointer">
                  <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                </div>
                <div class="progress_txt">
                  <p>2022.08</p>
                  <span>{{$t('progress1')}}</span>
                </div>
              </div>
            </li>
            <li class="progress_i progress_i_left">
              <div class="progress_i_info">
                <div class="mobile_show">
                  <div class="pointer">
                    <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                  </div>
                </div>
                <div class="progress_txt">
                  <p>2023.05</p>
                  <span>{{$t('progress2')}}</span>
                </div>
                <div class="pc_show">
                  <div class="pointer">
                    <i class="hollow"></i><i class="line"></i><i class="solid"></i>
                  </div>
                </div>
              </div>
            </li>
            <li class="progress_i progress_i_right">
              <div class="progress_i_info">
                <div class="pointer">
                  <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                </div>
                <div class="progress_txt">
                  <p>2023.05</p>
                  <span>{{$t('progress3')}}</span>
                </div>
              </div>
            </li>
            <li class="progress_i progress_i_left">
              <div class="progress_i_info">
                <div class="mobile_show">
                  <div class="pointer">
                    <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                  </div>
                </div>
                <div class="progress_txt">
                  <p>2023.06</p>
                  <span>{{$t('progress4')}}</span>
                </div>
                <div class="pc_show">
                  <div class="pointer">
                    <i class="hollow"></i><i class="line"></i><i class="solid"></i>
                  </div>
                </div>
              </div>
            </li>
            <li class="progress_i progress_i_right">
              <div class="progress_i_info">
                <div class="pointer">
                  <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                </div>
                <div class="progress_txt">
                  <p>2023.10</p>
                  <span>{{$t('progress5')}}</span>
                </div>
              </div>
            </li>
            <li class="progress_i progress_i_left">
              <div class="progress_i_info">
                <div class="mobile_show">
                  <div class="pointer">
                    <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                  </div>
                </div>
                <div class="progress_txt">
                  <p>2024.01</p>
                  <span>{{$t('progress6')}}</span>
                </div>
                <div class="pc_show">
                  <div class="pointer">
                    <i class="hollow"></i><i class="line"></i><i class="solid"></i>
                  </div>
                </div>
              </div>
            </li>
            <li class="progress_i progress_i_right">
              <div class="progress_i_info">
                <div class="pointer">
                  <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                </div>
                <div class="progress_txt">
                  <p>2024.06</p>
                  <span
                    >{{$t('progress7')}}</span
                  >
                </div>
              </div>
            </li>
            <li class="progress_i progress_i_left">
              <div class="progress_i_info">
                <div class="mobile_show">
                  <div class="pointer">
                    <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                  </div>
                </div>
                <div class="progress_txt">
                  <p>2024.09</p>
                  <span>{{$t('progress8')}}</span>
                </div>
                <div class="pc_show">
                  <div class="pointer">
                    <i class="hollow"></i><i class="line"></i><i class="solid"></i>
                  </div>
                </div>
              </div>
            </li>
            <li class="progress_i progress_i_right">
              <div class="progress_i_info">
                <div class="pointer">
                  <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                </div>
                <div class="progress_txt">
                  <p>2025.03</p>
                  <span>{{$t('progress9')}}</span>
                </div>
              </div>
            </li>
            <li class="progress_i progress_i_left">
              <div class="progress_i_info">
                <div class="mobile_show">
                  <div class="pointer">
                    <i class="solid"></i><i class="line"></i><i class="hollow"></i>
                  </div>
                </div>
                <div class="progress_txt">
                  <p>2026.03</p>
                  <span>{{$t('progress10')}}</span>
                </div>
                <div class="pc_show">
                  <div class="pointer">
                    <i class="hollow"></i><i class="line"></i><i class="solid"></i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="dynamic_module_two">
      <div class="w">
        <h4 class="dynamic_module_tit min_tit">{{$t('规划')}}</h4>
        <ul class="dynamic_ul">
          <li>
            <img
              v-if="scroll.moduleTwo === 2"
              ref="moduleTwo"
              class="page_gif"
              src="@/assets/images/dynamic/gif/ul4.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleTwo"
              class="page_gif"
              src="@/assets/images/dynamic/gif/ul4.png"
              alt=""
            />
            <div class="dynamic_ul_txt">
              <p>NFT</p>
              <span>
                {{$t('dynamicModule2txt')}}
                <br />
                {{$t('dynamicModule2txt2')}}</span
              >
            </div>
          </li>
          <li>
            <img
              v-if="scroll.moduleThree === 2"
              ref="moduleThree"
              class="page_gif"
              src="@/assets/images/dynamic/gif/ul1.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleThree"
              class="page_gif"
              src="@/assets/images/dynamic/gif/ul1.png"
              alt=""
            />
            <div class="dynamic_ul_txt">
              <p>DAO</p>
              <span>
                {{$t('dynamicModule2txt3')}}
              </span>
            </div>
          </li>
          <li>
            <img
              v-if="scroll.moduleFour === 2"
              ref="moduleFour"
              class="page_gif"
              src="@/assets/images/dynamic/gif/ul2.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleFour"
              class="page_gif"
              src="@/assets/images/dynamic/gif/ul2.png"
              alt=""
            />
            <div class="dynamic_ul_txt">
              <p>{{$t('周边产业联动')}}</p>
              <span
                >{{$t('dynamicModule2txt4')}}</span
              >
            </div>
          </li>
          <li>
            <img
              v-if="scroll.moduleFive === 2"
              ref="moduleFive"
              class="page_gif"
              src="@/assets/images/dynamic/gif/ul3.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleFive"
              class="page_gif"
              src="@/assets/images/dynamic/gif/ul3.png"
              alt=""
            />
            <div class="dynamic_ul_txt">
              <p>{{$t('目前Oz生态正在推进合作的项目包括')}}</p>
              <span>
                {{$t('dynamicModule2txt5')}}
                <br>{{$t('dynamicModule2txt6')}}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import scrollGif from '@/utils/scrollGif'
  export default {
    data() {
      return {
        scroll: {
          moduleOne: 1,
          moduleTwo: 1,
          moduleThree: 1,
          moduleFour: 1,
          moduleFive: 1,
        }
      }
    },
    mounted() {
      document.addEventListener('scroll', this.scrollChange)
    },
    destroyed() {
      document.removeEventListener('scroll', this.scrollChange)
    },
    methods: {
      scrollChange() {
        const moduleOne = this.$refs.moduleOne.offsetTop + this.$refs.moduleOne.offsetParent.offsetTop
        const moduleTwo = this.$refs.moduleTwo.offsetTop + this.$refs.moduleTwo.offsetParent.offsetTop
        const moduleThree = this.$refs.moduleThree.offsetTop + this.$refs.moduleThree.offsetParent.offsetTop
        const moduleFour =this.$refs.moduleFour.offsetTop + this.$refs.moduleFour.offsetParent.offsetTop
        const moduleFive =this.$refs.moduleFive.offsetTop + this.$refs.moduleFive.offsetParent.offsetTop
        const domList = [
          { label: 'moduleOne', value: moduleOne, time: 6 },
          { label: 'moduleTwo', value: moduleTwo, time: 5 },
          { label: 'moduleThree', value: moduleThree, time: 5 },
          { label: 'moduleFour', value: moduleFour, time: 5 },
          { label: 'moduleFive', value: moduleFive, time: 5 }
        ]
        scrollGif(this, domList)
      },
    }
  }

</script>

<style scoped>
@import "~@/styles/progress.css";
</style>
