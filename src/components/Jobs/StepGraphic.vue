<template>
  <div id="stepgraphic">placeholder</div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  name: "StepGraphic",
  props: {
    steps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
			startX: 100,
			viewHeight: 300,
			circleSize: 25,
			lineWidth: 50,

      nodes: [
        {
          id: "1",
          label: "1",
          x: 100,
          y: 150
        },
        {
          id: "2",
          label: "2",
          x: 200,
          y: 150
        }
      ],
      edges: [
        {
          source: "node1",
          target: "node2"
        }
      ]
    };
  },
  mounted() {
    const graph = this.initG6();
    graph.data({
      nodes: this.nodes,
      edges: this.edges
    });
    graph.render();
  },
  methods: {
    initG6() {
			const width = document.getElementById("stepgraphic").offsetWidth;
			const height = this.viewHeight
			const circle = this.circleSize

      return new G6.Graph({
        container: "stepgraphic",
        width: width,
        height: height,
        defaultNode: {
          shape: "circle",
          size: [circle],
          color: "#5B8FF9",
          style: {
            fill: "#9EC9FF",
            lineWidth: 3
          },
          labelCfg: {
            style: {
              fill: "#fff",
              fontSize: 12
            }
          }
        },
        defaultEdge: {
          style: {
            stroke: "#e2e2e2"
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>