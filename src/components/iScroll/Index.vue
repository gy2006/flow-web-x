<template>
  <div class="iscroll_wrapper" ref="iscrollWrapper">
    <slot></slot>
  </div>
</template>
<script>
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    name: 'iscroll',
    props: {
      probeType: {
        type: Number,
        default: () => 1
      },
      click: {
        type: Boolean,
        default: () => true
      },
      mouseWheel: {
        type: Boolean,
        default: () => true
      },
      scrollbars: {
        type: Boolean,
        default: () => true
      },
      fadeScrollbars: {
        type: Boolean,
        default: () => false
      },
      interactiveScrollbars: {
        type: Boolean,
        default: () => true
      },
      shrinkScrollbars: {
        type: String,
        default: () => 'scale'
      },
      data: {
        type: Array,
        default: () => []
      },
      refreshDelay: {
        type: Number,
        default: () => 20
      },
      listenScroll: {
        type: Boolean,
        default: () => false
      },
      pullup: {
        type: Boolean,
        default: () => false
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.iscrollWrapper) {
          return
        }
        this.iscroll = new IScroll(this.$refs.iscrollWrapper, {
          probeType: this.probeType,
          click: this.click,
          mouseWheel: this.mouseWheel,
          scrollbars: this.scrollbars,
          fadeScrollbars: this.fadeScrollbars,
          interactiveScrollbars: this.interactiveScrollbars,
          shrinkScrollbars: this.shrinkScrollbars
        })
        this.iscroll.y = -300
        if (this.listenScroll) {
          this.iscroll.on('scroll', () => {
            this.$emit('scroll', this.iscroll.y)
          })
        }

        if (this.pullup) {
          this.iscroll.on('scrollEnd', () => {
            if (this.iscroll.y === 0) {
              this.$emit('scrollEnd')
            }
          })
        }
      },
      refresh () {
        this.iscroll && this.iscroll.refresh()
        this.iscroll.y = this.iscroll.maxScrollY - 30
      },
      scrollToElement () {
        this.iscroll && this.iscroll.scrollToElement.apply(this.iscroll, arguments)
      },
      scrollTo () {
        this.iscroll && this.iscroll.scrollTo.apply(this.iscroll, arguments)
      }
    },
    watch: {
      data: {
        handler: function (val) {
          setTimeout(() => {
            this.refresh()
          }, this.refreshDelay)
        },
        deep: true
      }
    }
  }
</script>

<style media="screen">
  .iscroll_wrapper {
    position: absolute;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 100%;
    height: 100%;
    transform: translateZ(0);
    -ms-user-select: none;
    user-select: none;
    text-size-adjust: none;
  }
</style>
