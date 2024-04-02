<template>
  <div class="pdf-content">
    <canvas v-for="pageNum in totalPages" :key="pageNum" :id="'canvas-' + pageNum"></canvas>
  </div>
</template>

<script>
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
export default {
  name: "PdfViewer",
  props: ["pdfUrl"],
  data() {
    return {
      totalPages: 0,
    };
  },
  created() {
    let { file } = this.$route.query
    if (process.env.NODE_ENV === "development") {
      import(`@/assets/pdf/${file}`).then(res => {
        this.loadPdf(res.default);
      })
    } else {
      this.loadPdf(`static/${file}`);
    }

  },
  methods: {
    async loadPdf(url) {
      try {
        const loadingTask = getDocument({
          url,
          cMapUrl: `https://unpkg.com/pdfjs-dist@2.16.105/cmaps/`,
          cMapPacked: true,
          useWorkerFetch: false, // 根据需要可能需要设置为true或false
        });
        const pdf = await loadingTask.promise;
        this.totalPages = pdf.numPages;
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const canvas = document.getElementById("canvas-" + pageNum);
          const context = canvas.getContext("2d");
          // 获取浏览器视窗的宽度
          const viewportWidth = window.innerWidth;
          // 计算缩放比例以适应视窗宽度，留出一些边距
          // const scale = (viewportWidth - 20) / viewport.width;
          // 获取PDF页面的原始尺寸
          let viewport = page.getViewport({ scale: 1 });
          const scale = (viewportWidth / viewport.width) * devicePixelRatio;
          viewport = page.getViewport({ scale });
          const scaledViewport = page.getViewport({ scale });

          // 设置canvas尺寸
          canvas.width = scaledViewport.width;
          canvas.height = scaledViewport.height;

          canvas.style.width = `${viewport.width / devicePixelRatio}px`;
          canvas.style.height = `${viewport.height / devicePixelRatio}px`;
          const renderContext = {
            canvasContext: context,
            viewport: scaledViewport,
          };
          await page.render(renderContext).promise;
        }
      } catch (error) {
        console.error("加载PDF时出错:", error);
      }
    },
  },
};
</script>
