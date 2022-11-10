<template>
  <div>
    <dropzone
      id="foo"
      ref="el"
      :options="options"
      @vdropzone-error="error_handle"
      @vdropzone-removed-file="removed"
      @vdropzone-success="success"
      @vdropzone-sending="vsending"
      @vdropzone-canceled="vcanceled"
      @vdropzone-duplicate-file="vduplicate"
      @vdropzone-files-added="vadded"
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
      files: null,
      is_destroying: false,
      photo: null,
      options: {
        // acceptedFiles: null,
        /**
         * *Deprecated!*
         * Use acceptedFiles instead.
         */
        // acceptedMimeTypes: null,
        url: "http://localhost:8000/api/file",
        params: {},
        uploadMultiple: false,
        addRemoveLinks: true,
        preventDuplicates: true,
        duplicateCheck: true,
        dictDuplicateFile: "Duplicate Files Cannot Be Uploaded",
        dictDefaultMessage: this.template(),
        createImageThumbnails: true,
        dictMaxFilesExceeded: this.$t("cant upload more than one file"),
        maxFiles: 5,
        headers: { Authorization: this.$auth.strategy.token.get() },
      },
    };
  },
  methods: {
    // msg_error(msg) {
    //   return this.$swal.fire({
    //     title: this.$t("Error"),
    //     text: this.$t(msg),
    //     icon: "error",
    //     confirmButtonText: this.$t("Ok"),
    //     confirmButtonColor: "#41b882",
    //   });
    // },
    error_handle(files, message, xhr) {
      console.log("message");
      console.log(message);
      // this.msg_error(this.$t(message));
    },
    getAllFiles() {
      this.files = this.$refs.el.getAcceptedFiles();
    },
    vadded(file) {
      this.getAllFiles();
      console.log(file);
      if (this.files.length) {
        var i, len, pre;
        for (i = 0, len = this.files.length; i < len - 1; i++) {
          if (this.files[i].name == file.name) {
            alert("The Doc.: " + file.name + " is already registered.");
            var _ref;
            return (_ref = file.previewElement) != null
              ? _ref.parentNode.removeChild(file.previewElement)
              : void 0;
          }
        }
      }
    },
    vduplicate() {
      console.log("vduplicate");
      alert("vduplicate");
    },
    vcanceled() {
      this.photo = null;
    },
    vsending(file, xhr, formData) {
      this.photo = file;
      xhr.abort();
      return;
    },
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
          style="width: 50px"
          src="/upload.jpeg"
          alt=""
        />
      </div>
      <p>صغية الملفات المسموح بها : png , jpg اقصي حجم للرفع 2 ميجا بايت </p>
    </div>
      
      `;
    },
    // removed(file, xhr, error) {
    //   if (this.is_destroying) {
    //     return;
    //   }
    //   if (file.upload.uuid == this.uuid) {
    //     this.$store.dispatch("file/delete", { id: this.photo });
    //     this.photo = null;
    //   }

    //   // window.toastr.warning('', 'Event : vdropzone-removedFile')
    // },
    // success(file, response) {
    //   this.photo = response.data.id;
    //   this.uuid = file.upload.uuid;
    // },
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
    photo(val) {
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
  padding-top: 0px;
  border-radius: 0px;
}
.dropzone {
  border: dashed 2px #8d8d8d;
}
.vue-dropzone {
  padding: 0px;
}
</style>