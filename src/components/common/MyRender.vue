

<script>
// 哎 （用于table组件里面的渲染）
export default {
  functional: true,
  props: {
    row: Object,
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index
    };
    return ctx.props.render(h, params);
  }
};
</script>