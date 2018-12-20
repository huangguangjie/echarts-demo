<template>
	<div class="container">
		<div id="chart" class="chart"></div>
		<div class="right">
			<el-select v-model="value" placeholder="请选择">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</div>
	</div>
</template>
<script>
import echarts from 'echarts'
import dataCreate from './dataCreate'
import getOption from './getOption'

const data = [];
for (let i = 0; i < 1000; i++) {
    data.push(dataCreate());
}

export default {
	data() {
		return {
			value: '',
			options: Array.from({ length: 20 }).map((it, i) => ({ value: `192.168.0.${i}`, label: `192.168.0.${i}` }))
		}
	},
	mounted() {
		const chart = this.chart = echarts.init(document.getElementById('chart'));
		const option = getOption(data);
        chart.setOption(option);

        setInterval(function () {
            for (let i = 0; i < 5; i++) {
                data.shift();
                data.push(dataCreate());
            }

            chart.setOption({
                series: [{
                    data: data
                }]
            });
        }, 1000 * 2);
	}
}
</script>
<style lang="less">
	.container {
		position: relative;
		margin: 20px;
	}

	.chart {
		width: 500px;
		height: 500px;
	}

	.right {
		position: absolute;
		top: 0;
		left: 600px
	}
</style>