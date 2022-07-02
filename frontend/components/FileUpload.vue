<template>
  <div>
    <dropzone
      id="foo"
      ref="el"
      :options="options"
      @vdropzone-removed-file="removed"
      @vdropzone-success="success"
    ></dropzone>
    <!-- @vdropzone-file-added="added" -->
    <!--   @vdropzone-sending="vsending" -->
  </div>
</template>

<script>
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";

export default {
  props: {
    attachable_type: {
      type: Number,
      default: null,
    },
  },
  components: {
    Dropzone,
  },
  data() {
    return {
      is_destroying: false,
      id: null,
      options: {
        // acceptedFiles: null,
        /**
         * *Deprecated!*
         * Use acceptedFiles instead.
         */
        // acceptedMimeTypes: null,
        url: `http://localhost/api/file`,
        params: {},
        uploadMultiple: false,
        addRemoveLinks: true,
        dictDefaultMessage: this.template(),
        createImageThumbnails: true,
        dictMaxFilesExceeded: this.$t("cant upload more than one file"),
        maxFiles: 1,
        headers: { Authorization: this.$auth.strategy.token.get() },
      },
    };
  },
  methods: {
    removedfile: function (file) {
      var _ref;
      return (_ref = file.previewElement) != null
        ? _ref.parentNode.removeChild(file.previewElement)
        : void 0;
    },
    template() {
      return `
         <div style="justify-self:center">
      <div>
        <img
          style="width: 60px"
          src="/upload.jpeg"
          alt=""
        />
      </div>
      <h5>اسحب الصورة هنا ليتم رفعها او قم بتحميل صورة للمنتج من الجهاز </h5>
      <p>صغية الملفات المسموح بها : png , jpg اقصي حجم للرفع 2 ميجا بايت </p>
    </div>
      
      `;
    },
    removed(file, xhr, error) {
      if (this.is_destroying) {
        return;
      }
      if (file.upload.uuid == this.uuid) {
        this.$store.dispatch("file/delete", { id: this.id });
        this.id = null;
      }

      // window.toastr.warning('', 'Event : vdropzone-removedFile')
    },
    success(file, response) {
      this.id = response.data.id;
      this.uuid = file.upload.uuid;
    },
    // added(file) {
    // this.options.params.uuid = file.upload.uuid;
    // window.toastr.warning('', 'Event : vdropzone-removedFile')
    // },
  },
  mounted() {
    // Everything is mounted and you can access the dropzone instance
    const instance = this.$refs.el.dropzone;
  },
  watch: {
    attachable_type: {
      handler(val) {
        if (val) {
          this.options.params.attachable_type = val;
        }
      },
      immediate: true,
    },
    id(val) {
      this.$emit("input", val);
    },
  },
  beforeDestroy() {
    this.is_destroying = true;
  },
  destroyed() {
    this.is_destroying = false;
  },
};
</script>

<style>
.dz-message {
  justify-content: center;
  background: #f5f5f5;
  padding: 8px;
  padding-top: 20px;
  border-radius: 10px;
}
.dropzone {
  border: dashed 2px #8d8d8d;
}
</style>