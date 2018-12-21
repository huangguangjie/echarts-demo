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

let fd = new Date('2016/12/18 06:38:00');
const oneMinute = 60 * 1000;

const data = [
	// {name:'2016/12/18 06:38:08', value:['2016/12/18 06:38:08', 80]},
    // {name:'2016/12/18 16:18:18', value:['2016/12/18 16:18:18', 60]},
    // {name:'2016/12/18 19:18:18', value:['2016/12/18 19:18:18', 90]}
];


export default {
	data() {
		return {
			value: '',
			options: Array.from({ length: 20 }).map((it, i) => ({ value: `192.168.0.${i}`, label: `192.168.0.${i}` }))
		}
	},
	mounted() {
		const chart = this.chart = echarts.init(document.getElementById('chart'));

		for(let i = 0; i < 10; i++) {
			data.push(this.getItemData());
		}
		const option = this.getOption(data);
        chart.setOption(option);

        setInterval(() => {
            data.shift();
            data.push(this.getItemData());

            chart.setOption({
                series: [{
                    data: data
                }]
            });
        }, 1000 * 10);
	},
	methods: {
		getOption(data) {
			return {
		        title: {
		            text: '实时访问情况'
		        },
		        tooltip: {
		            trigger: 'axis',
		            formatter: function (params) {
		                params = params[0];
		                var date = new Date(params.name);
		                return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes() + ' : ' + params.value[1];
		            },
		            axisPointer: {
		                animation: false
		            }
		        },
		        xAxis: {
		            type: 'time',
		            splitLine: {
		                show: false
		            }
		        },
		        yAxis: {
		            type: 'value',
		            boundaryGap: [0, '100%'],
		            splitLine: {
		                show: false
		            }
		        },
		        series: [{
		            name: '模拟数据',
		            type: 'line',
		            showSymbol: false,
		            hoverAnimation: false,
		            data: data
		        }]
		    }
		},
		getItemData() {
			fd = new Date(+fd + oneMinute);
			return {
				name: fd,
				value: [fd, parseInt(Math.random() * 10 + 10)]
			}
		}
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