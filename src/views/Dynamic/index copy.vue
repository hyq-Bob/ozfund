<template>
  <div class="animate__animated animate__bounceInLeft">
    <!-- 模块一 -->
    <div class="dynamic_module_one">
      <div class="w">
        <div class="dynamic_module_left pc_show">
          <h3 class="max_tit">{{$t('动态')}}</h3>
        </div>
        <div class="dynamic_module_right">
          <img
            v-if="scroll.moduleOne === 2"
            ref="moduleOne"
            class="page_gif"
            src="@/assets/images/dynamic/gif/module2.gif"
            alt=""
          />
          <img
            v-else
            ref="moduleOne"
            class="page_gif"
            src="@/assets/images/dynamic/gif/module2.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- 模块二 -->
    <div class="dynamic_module_two">
      <div class="w">
        <h3 class="max_tit mobile_show">{{$t('动态')}}</h3>
        <ul v-if="$i18n.locale === 'zh'" class="news_list">
          <li>
            <p>TOTO预售正式开启</p>
            <span>
              TOTO预售将于2022年9月18日9时（UTC+8）正式开启。
              <br>TOTO是Oz生态中的会员通证，在BNB Chain上发行，可以在多种博彩场景中应用，同时也作为Oz生态的管理通证用于平台治理。在Ozbet上线后，TOTO将能够用于平台收益的共享，多种销毁机制也将维持TOTO的通缩。为了在生态搭建前期更好地对Oz产品和应用进行运营维护，Ozfund决定开放部分TOTO的预售以召集支持者与资金。
              <br>TOTO的预售价格为1TOTO=0.1BUSD，每日预售数量上限100万个。
              <br>预售地址：<a target="_blank" href="https://ozfund.one/presale">https://ozfund.one/presale</a>
              <!--  -->
            </span>
          </li>
          <li>
            <p>Ozfund在BNB Chain正式部署上线</p>
            <span>
              Ozfund <a target="_blank" href="https://ozfund.one/">(https://ozfund.one/)</a> 将于2022年9月18日9时（UTC+8）正式在BNB Chain部署上线。Ozfund是对Oz Web3.0博彩生态进行开发、建设和维护的DAO组织，在生态搭建前期，成员由各应用的主要开发者们构成。
              <br>Ozfund致力于完善生态基础设施，并参与到生态的改造与升级中，为更多商户和用户进入Oz世界提供入口。目前Ozfund管理的主要产品包括auPay与Ozbet。
              <br>欢迎关注Ozfund的社交平台以获取最及时的信息：
              <br>Ozfund推特页面：<a target="_blank" href="https://twitter.com/OzfundOfficial">https://twitter.com/OzfundOfficial</a>
              <br>Ozfund油管频道：<a target="_blank" href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ">https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ</a>
              <br>Ozfund全球社区：<a target="_blank" href="t.me/ozfundglobal">t.me/ozfundglobal</a>
              <br>Ozfund中文社区：<a target="_blank" href="t.me/ozfundcn">t.me/ozfundcn</a>
            </span>
          </li>
        </ul>
        <ul v-if="$i18n.locale === 'ru'" class="news_list">
          <li>
            <p>Предварительная продажа TOTO официально открыта</p>
            <span>
              Предварительная продажа TOTO будет официально открыта 18 сентября 2022 года в 9:00 (UTC+8).
              <br>TOTO - это сертификат членства в OZ, выпущенный на BNB Chain, может быть применен в различных сценариях ставок, а также используется в качестве сертификата управления OZ для управления платформой.   После запуска Ozbet TOTO можно будет использовать для совместного использования выручки платформы, а также многочисленные механизмы уничтожения будут поддерживать дефляцию TOTO.
              <br>Для лучшего оперативного обслуживания продуктов и приложений OZ в период до экостроительства, Ozfund решил открыть предварительную продажу некоторых TOTO, чтобы собрать сторонников и средства.   Предпродажная цена TOTO составляет 1TOTO=0,1BUSD, а ежедневное предпродажное количество ограничено 1 миллионом.   Адрес предварительной продажи: <a target="_blank" href="https://ozfund.one/presale">https://ozfund.one/presale</a>
              
            </span>
          </li>
          <li>
            <p>Ozfund официально развернут в BNB Chain</p>
            <span>
              Ozfund <a target="_blank" href="https://ozfund.one/">(https://ozfund.one/)</a>  будет официально развернут в BNB Chain 18 сентября 2022 года в 9:00 (UTC+8).   OzFund-это организация DAO, которая разрабатывает, строит и поддерживает игровые экологии Oz Web 3, в состав которой входят ведущие разработчики приложений на этапе, предшествующем созданию экосистемы.  Ozfund стремится совершенствовать экологическую инфраструктуру и участвует в преобразовании и модернизации экологии, обеспечивая доступ к миру Oz для большего числа торговцев и пользователей.  В настоящее время Ozfund управляет основными продуктами, включая auPay и Ozbet.
              <br>Подпишите социальную платформу Ozfund для получения последней оперативной информации:
              <br>Страница Ozfund в Twitter：<a target="_blank" href="https://twitter.com/OzfundOfficial">https://twitter.com/OzfundOfficial</a>
              <br>Канал OzFund в YouTube：<a target="_blank" href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ">https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ</a>
              <br>Глобальное сообщество Ozfund：<a target="_blank" href="t.me/ozfundglobal">t.me/ozfundglobal</a>
              <br>Китайское сообщество Ozfund：<a target="_blank" href="t.me/ozfundcn">t.me/ozfundcn</a>
              
            </span>
          </li>
        </ul>
        <ul v-if="$i18n.locale === 'tc'" class="news_list">
          <li>
            <p>TOTO預售正式開啟</p>
            <span>
              TOTO預售將於2022年9月18日9時（UTC+8）正式開啟。
              <br>TOTO是Oz生態中的會員通證，在BNB Chain上發行，可以在多種博彩場景中應用，同時也作為Oz生態的管理通證用於平臺治理。在Ozbet上線後，TOTO將能夠用於平臺收益的共享，多種銷毀機製也將維持TOTO的通縮。
              <br>為了在生態搭建前期更好地對Oz產品和應用進行運營維護，Ozfund決定開放部分TOTO的預售以召集支持者與資金。TOTO的預售價格為1TOTO=0.1BUSD，每日預售數量上限100萬個。預售地址：<a target="_blank" href="https://ozfund.one/presale">https://ozfund.one/presale</a>
              
            </span>
          </li>
          <li>
            <p>Ozfund在BNB Chain正式部署上線</p>
            <span>
              Ozfund <a target="_blank" href="https://ozfund.one/">(https://ozfund.one/)</a> 將於2022年9月18日9時（UTC+8）正式在BNB Chain部署上線。Ozfund是對Oz Web3.0博彩生態進行開發、建設和維護的DAO組織，在生態搭建前期，成員由各應用的主要開發者們構成。Ozfund致力於完善生態基礎設施，並參與到生態的改造與升級中，為更多商戶和用戶進入Oz世界提供入口。目前Ozfund管理的主要產品包括auPay與Ozbet。
              <br>歡迎關註Ozfund的社交平臺以獲取最及時的信息：
              <br>Ozfund推特頁面：<a target="_blank" href="https://twitter.com/OzfundOfficial">https://twitter.com/OzfundOfficial</a>
              <br>Ozfund油管頻道：<a target="_blank" href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ">https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ</a>
              <br>Ozfund全球社區：<a target="_blank" href="t.me/ozfundglobal">t.me/ozfundglobal</a>
              <br>Ozfund中文社區：<a target="_blank" href="t.me/ozfundcn">t.me/ozfundcn</a>
              
            </span>
          </li>
        </ul>
        <ul v-if="$i18n.locale === 'kr'" class="news_list">
          <li>
            <p>TOTO 예매 오픈</p>
            <span>
              TOTO예매는 2022년 9월 18일 9시(UTC+8)에 오픈합니다.
              <br>TOTO는 오즈 생태 속 회원 토큰으로 BNB Chain에서 발행되며, 여러 베팅 환경에 적용되며 플랫폼 거버넌스를 위한 Oz 생태 관리 토큰 증거로도 사용됩니다. Ozbet이 출시되면 TOTO는 플랫폼 수익 공유를 위해 사용될 수 있으며 다양한 폐기 메커니즘도 TOTO의 디플레이션을 유지할 것입니다.
              <br>생태조성 초기에 Oz제품과 응용에 대한 운영보수를 위해 Ozfund는 일부 TOTO의 예매를 정하여 지지자와 자금을 모집합니다.TOTO의 예약 판매 가격은 1TOTO=0.1BUSD이며 일일 예약 판매 수량은 100만 개로 제한됩니다.예매주소:<a target="_blank" href="https://ozfund.one/presale">https://ozfund.one/presale</a>
              
            </span>
          </li>
          <li>
            <p>Ozfund가 BNB 체인에 정식 출시</p>
            <span>
              Ozfund <a target="_blank" href="https://ozfund.one/">(https://ozfund.one/)</a> 는 2022년 9월 18일 9시(UTC+8)에 BNB Chain에 정식 출시될 예정입니다.Ozfund는 Oz Web3.0 베팅 생태를 개발, 건설 및 유지하는 DAO 조직으로 생태 구축 초기 단계에서 구성원은 각 응용 프로그램의 주요 개발자로 구성됩니다.Ozfund는 생태 인프라를 개선하고 생태 개조 및 업그레이드에 참여하여 더 많은 사업자와 사용자가 Oz월드에 진입할 수 있는 입구를 제공합니다.현재 Ozfund가 관리하는 주요 제품에는 auPay와 Ozbet이 있습니다.
              <br>Ozfund의 소셜 플랫폼을 구독하고 가장 빠른 소식을 접하세요.
              <br>Ozfund 트위터 페이지：<a target="_blank" href="https://twitter.com/OzfundOfficial">https://twitter.com/OzfundOfficial</a>
              <br>Ozfund 유튜브 채널：<a target="_blank" href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ">https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ</a>
              <br>Ozfund 글로벌 커뮤니티：<a target="_blank" href="t.me/ozfundglobal">t.me/ozfundglobal</a>
              <br>Ozfund 중국어 커뮤니티：<a target="_blank" href="t.me/ozfundcn">t.me/ozfundcn</a>
              
            </span>
          </li>
        </ul>
        <ul v-if="$i18n.locale === 'en'" class="news_list">
          <li>
            <p>TOTO pre-sale is live</p>
            <span>
              TOTO pre-sale will be live at 9 am (UTC+8) on Sept 18 2020.
              <br>TOTO is a membership and governance token in the Oz ecosystem issued on BNB Chain. It can be used in a variety of gaming and betting scenarios. After the launch of Ozbet, TOTO will be used for revenue sharing, and multiple burn mechanisms will maintain TOTO’s deflation.
              <br>Ozfund decided to launch TOTO pre-sales to gather supporters and funds in the early stages of the ecology building process. The pre-sale price would be 1 TOTO = 0.1 BUSD and the daily pre-sale quantity is capped at 1 million. Go get TOTO at:  <a target="_blank" href="https://ozfund.one/presale">https://ozfund.one/presale</a>
            </span>
          </li>
          <li>
            <p>Ozfund officially launched on BNB Chain</p>
            <span>
              Ozfund <a target="_blank" href="https://ozfund.one/">(https://ozfund.one/)</a> will be officially launched on BNB Chain at 9 am (UTC+8) on Sept 18 2020.
              Ozfund is a DAO that builds, develops, and maintains the Oz Web 3 gaming ecosystem. In the early stage, ozfund members consist of key developers of each product. Ozfund is committed to improving the ecological infrastructure and participating in the transformation and upgrading of the ecology, providing a portal for more merchants and users to enter the Oz world. The main products managed by Ozfund now include auPay and Ozbet.
              <br>Welcome to subscribe Ozfund’s social channels to learn the latest news:
              <br>Twitter：<a target="_blank" href="https://twitter.com/OzfundOfficial">https://twitter.com/OzfundOfficial</a>
              <br>Youtube：<a target="_blank" href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ">https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ</a>
              <br>Telegram：<a target="_blank" href="t.me/ozfundglobal">t.me/ozfundglobal</a>
              
            </span>
          </li>
        </ul>
        <ul v-if="$i18n.locale === 'jpn'" class="news_list">
          <li>
            <p>TOTO先行発売中</p>
            <span>
              TOTOの先行販売が正式に開始されました。
              <br>2022年9月18日9時（UTC+8）にTOTOの先行販売は正式に開始されました。OzエコシステムのメンバートークンとしてのTOTOはBNB Chain上で発行されます。多様なギャンブルシーンでご利用いただけます。また、Ozエコシステムの管理トークンとしてもご利用いただけます。Ozbetが稼働後、TOTOはプラットフォーム収益の共有に使用され、多数のバーンメカニズムによってTOTOの通貨価値が保たれます。
              <br>Ozfundは、Oz製品とアプリケーションをオペレーションおよびメンテナンスするために、一部のTOTOの先行販売を決定し、スポンサーと資金を集めます。先行販売価格は1TOTO=0.1BUSDです。1日の販売上限数は100万個です。先行販売サイト：<a target="_blank" href="https://ozfund.one/presale">https://ozfund.one/presale</a>
            </span>
          </li>
          <li>
            <p>OzfundはBNB Chain上で正式にデプロイされ、オンラインで稼働しています。</p>
            <span>
              Ozfund <a target="_blank" href="https://ozfund.one/">(https://ozfund.one/)</a> は、2022年9月18日9時（UTC + 8）にBNB Chainに正式に展開しました。
              Ozfundは、Oz Web3.0ギャンブルエコシステムの開発、構築、および維持を担当するDAO組織です。また、エコシステムの構築初期段階のメンバーは各アプリケーションのメイン開発者で構成されます。Ozfundは、エコシステムのインフラストラクチャを改善し、エコシステムの改造とアップグレードに参加します。より多くの事業者やユーザー様がOzの世界に入るための入り口を提供することを目指しております。現在、Ozfundが管理する主要な製品には、auPayとOzbetがあります。
              <br>最新情報のご入手はOzfundのソーシャルプラットフォームをフォローしてください。
              <br>OzfundのTwitterページ：<a target="_blank" href="https://twitter.com/OzfundOfficial">https://twitter.com/OzfundOfficial</a>
              <br>OzfundのYouTubeチャンネル：<a target="_blank" href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ">https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ</a>
              <br>Ozfundグローバルコミュニティ：<a target="_blank" href="t.me/ozfundglobal">t.me/ozfundglobal</a>
              <br>Ozfund中国語コミュニティ：<a target="_blank" href="t.me/ozfundcn">t.me/ozfundcn</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 模块三 -->
    <QA></QA>
  </div>
</template>

<script>
import scrollGif from '@/utils/scrollGif'
import QA from '@/components/QA'

export default {
  components: { QA },
  data() {
    return {
      qaList: [
        {
          label: this.$t("如何获得OZC"),
          value: this.$t('如何获得OZCanswer')
        },
        {
          label: this.$t("如何获得TOTO"),
          value: this.$t('如何获得TOTOanswer')
        },
        {
          label: this.$t("投注返水规则是什么"),
          value: this.$t('投注返水规则是什么answer')
        },
        {
          label: this.$t("VIP会员福利有什么"),
          value: this.$t('VIP会员福利有什么answer')
        },
        {
          label: this.$t("如何成为Ozbet代理合作伙伴"),
          value: this.$t('如何成为Ozbet代理合作伙伴answer')
        }
      ],
      scroll: {
        moduleOne: 1,
      }
    };
  },
  watch: {
    '$i18n.locale'() {
      this.qaList = [
        {
          label: this.$t("如何获得OZC"),
          value: this.$t('如何获得OZCanswer')
        },
        {
          label: this.$t("如何获得TOTO"),
          value: this.$t('如何获得TOTOanswer')
        },
        {
          label: this.$t("投注返水规则是什么"),
          value: this.$t('投注返水规则是什么answer')
        },
        {
          label: this.$t("VIP会员福利有什么"),
          value: this.$t('VIP会员福利有什么answer')
        },
        {
          label: this.$t("如何成为Ozbet代理合作伙伴"),
          value: this.$t('如何成为Ozbet代理合作伙伴answer')
        }
      ]
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
      const domList = [
        { label: 'moduleOne', value: moduleOne, time: 6 },
      ]
      scrollGif(this, domList)
    },
    clickQq(v) {
      if (v.open) return this.$set(v, "open", false);
      return this.$set(v, "open", true);
    }
  }
};
</script>

<style scoped>
@import "~@/styles/dynamic.css";
</style>
