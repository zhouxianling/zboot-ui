// 弹窗公共方法
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            display: this.value
        }
    },
    watch: {
        value() {
            this.display = this.value
        },
        display(value) {
            this.$emit('input', value)
        }
    },
    methods: {
        confirm(data) {
            this.display = false
            this.$emit('on-confirm', data)
        },
        cancel() {
            this.display = false
        }
    }
}