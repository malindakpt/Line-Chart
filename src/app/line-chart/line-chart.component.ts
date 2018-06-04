import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.drawChart2();
  }
	@ViewChild('chartContainer') private chartContainer: ElementRef;
	@ViewChild('canvasElement') private canvasElement: ElementRef;
  @Input() private options: object;
	private opt = {
		width: null,
		padding: 0,
		chartHeight: 50,
		fontSize: 8,
		data: [],
		property: 'Close',
		font: 'Arial',
		showX: false,
		showY: false,
		showMinMax: false,
		allowMultiColor: false,
		lineWidth: 0.5,
		axisWidth: 1,
		lineColor: '#118f49',
		gradColor1: '#c2e4c8',
		gradColor2: '#c2e4c8',
		oldColor: '#959595',
		lowColor: '#118f49',
		highColor: '#ff2413',
		axisColor: '#1528ff',
		fontColor: '#0718c6',
		backgroundColor: '#ffffff',
	};
	private marginLeft = 5;

  public onInit(): void {
		this.drawChart2();
	}

	public onChanges(): void {
		this.drawChart2();
  }
  
  private drawChart2(): void {
    const optData = [
			{ time: 1, close: 10 },
			{ time: 2, close: 5 },
			{ time: 3, close: 3 },
			{ time: 4, close: 7 },
			{ time: 5, close: 9 },
			{ time: 6, close: 21 },
			{ time: 7, close: 2 },
			{ time: 8, close: 4 },
			{ time: 9, close: 10 },
			{ time: 10, close: 5 },
		];
		const size = optData.length;
		const width = this.opt.width ? this.opt.width : (this.canvasElement.nativeElement.offsetWidth);
		const height = this.opt.width ? this.opt.width : (this.canvasElement.nativeElement.offsetHeight);
		const min = Math.min.apply(Math, optData.map(function(o){return o.close;}))
		const max = Math.max.apply(Math, optData.map(function(o){return o.close;}))
		const yMod = height/(max-min);
		const xMod = width/(optData[size-1].time - optData[0].time);

		console.log('w:',width);
		console.log('h:',height);
		
		const data = optData.map( x => {
			return { time: x.time*xMod, close: (x.close - min)*yMod };
		});

		console.log(data);

		const canvas = this.canvasElement.nativeElement;
		const context = canvas.getContext('2d');
		context.lineCap = 'round';
	
		context.beginPath();

		let prevPoint = { time: 0, close: 0 };
		for(const point of data){
			context.moveTo(prevPoint.time, prevPoint.close);
			context.lineTo(point.time, point.close);
			prevPoint = point;
		}
	

		// context.moveTo(40, 10);
		// context.lineTo(21, 21);


		context.stroke();
  }

	private drawChart(): void {
		Object.assign(this.opt, this.options);
		// [Todo] Chandana,Dinushka and Malinda refactor following calculations
		const reduceWidth =50;
		const width = this.opt.width ? this.opt.width : (this.chartContainer.nativeElement.offsetWidth - reduceWidth);
		const height =  this.opt.chartHeight; // this.chartContainer.nativeElement.offsetHeight;

		const canvas = this.canvasElement.nativeElement;
		const context = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;

		context.translate(0, height);
		context.scale(1, -1);
		context.fillStyle = this.opt.backgroundColor;
		context.clearRect(0, 0, width, height);

		// if (!this.opt.data || this.opt.data.length < 1) {
		// 	return;
    // }
    this.opt.data = [50,20,30, 40, 40, 100];
		let data = [];
		let dayCount = 0;
		let devider;
		let lastDate = new Date(this.opt.data[this.opt.data.length - 1].Date).getDate();
		let secondDate = -1;
		for (let i = this.opt.data.length - 1; i >= 0; i--) {
			if (dayCount > 2) {
				// break;
			}
			if (lastDate !== new Date(this.opt.data[i].Date).getDate()) {
				dayCount++;
				if (dayCount <= 2) {
          // devider = this.opt.data[i + 1][this.opt.property];
          devider = this.opt.data[i + 1];
					if (secondDate === -1) {
						secondDate = i;
					}
				}
			}
      // data.push(this.opt.data[i][this.opt.property]);
      data.push(this.opt.data[i]);
      // lastDate = new Date(this.opt.data[i].Date).getDate();
			lastDate = new Date().getDate();
		}
	
		// data.push(data[0]);
		// console.log(data);

		const max = Math.max.apply(Math, data);
		let min = Math.min.apply(Math, data);

		// data = [min - this.opt.padding].concat(data).concat([min - this.opt.padding]);
		const moveLeftBy = (width - 2 * this.opt.padding) / (data.length);
    console.log(data);
		let yRange = max - min;
		if (yRange === 0) {
			// If all data values are equal, avoid chart drawn at bottom
			yRange = min * 2;
			min = 0;
		}

		const mod = (height - 2 * this.opt.padding) / yRange;

		let paddingY;
		if (this.opt.showMinMax) {
			// Change the vertical padding along with font size
			paddingY = this.opt.padding + this.opt.fontSize / 5;
			// Avoid reverse scaling while drawing texts
			context.scale(1, -1);
			context.font = this.opt.fontSize + 'px ' + this.opt.font;
			context.fillStyle = this.opt.fontColor;
			context.fillText(max, this.marginLeft, -1 * (height - paddingY + 5));
			context.fillText(min, this.marginLeft, -1 * (paddingY - this.opt.fontSize));
			context.scale(1, -1);
		} else {
			paddingY = this.opt.padding;
		}

		let left = this.opt.padding;
		let prevEle = data[data.length - 1];

		if (!this.opt.allowMultiColor) {
			// For single color charts set all line colors to single color
			this.opt.oldColor = this.opt.lineColor;
			this.opt.lowColor = this.opt.lineColor;
			this.opt.highColor = this.opt.lineColor;
		} else {
			// For multi-color charts hide the radient
			this.opt.gradColor1 = this.opt.backgroundColor;
			this.opt.gradColor2 = this.opt.backgroundColor;
		}

		context.lineWidth = this.opt.lineWidth;
		// For smoothing line joins
		context.lineCap = 'round';

		// Fill chart body with gradient
		const grd = context.createLinearGradient(0, 0, 0, this.opt.chartHeight);
		grd.addColorStop(0, this.opt.gradColor1);
		grd.addColorStop(1, this.opt.gradColor2);
		context.fillStyle = grd;

		let lastColor;

		context.beginPath();
		// context.moveTo(0, paddingY);

		for (let j = data.length - 1; j >= -1; j--) {
			const ele = data[j];
			// console.log(ele);
			let color;
			if (j === data.length - 1 || j === 0) {
				// Draw the first and last line segments transparent
				const transpiredRgbaVal = 'rgba(255, 255, 255, 0)';
				color = transpiredRgbaVal;
			} else if (j > secondDate) {
				// Draw the previous day values in differant color
				color = this.opt.oldColor;
			} else if (devider > ele) {
				color = this.opt.lowColor;
			} else {
				color = this.opt.highColor;
			}

      if( j === data.length - 1 ){
        context.strokeStyle = this.opt.highColor;
        this.drawChartLine(context, this.opt.padding, this.opt.padding, this.opt.padding, (ele - min) * mod + this.opt.padding);
        left -= moveLeftBy;

      } else if( j == -1) {
        context.strokeStyle = this.opt.backgroundColor;
				this.drawChartLine(context, left, (prevEle - min) * mod + this.opt.padding, left + moveLeftBy, (ele - min) * mod + this.opt.padding);

      }	else if (lastColor && (color !== lastColor)) {
				// When draw color changes, it should be drawn as -> from val to devider - previous color and devider to val in new color
				context.strokeStyle = lastColor;
				this.drawChartLine(context, left, (prevEle - min) * mod +
					this.opt.padding, left + moveLeftBy / 2, (devider - min) * mod + this.opt.padding);
				context.strokeStyle = color;
				this.drawChartLine(context, left + moveLeftBy / 2, (devider - min) * mod +
					this.opt.padding, left + moveLeftBy, (ele - min) * mod + this.opt.padding);
			} else {
				context.strokeStyle = color;
				this.drawChartLine(context, left, (prevEle - min) * mod + this.opt.padding, left + moveLeftBy, (ele - min) * mod + this.opt.padding);

			}
			lastColor = color;

			prevEle = ele;
			left += moveLeftBy;
		}
		context.closePath();
		context.fill();
		context.lineWidth = this.opt.axisWidth;
		context.strokeStyle = this.opt.axisColor;
		if (this.opt.showX) {
			this.drawChartLine(context, this.opt.padding, this.opt.padding, width - this.opt.padding, this.opt.padding);
		}
		if (this.opt.showY) {
			this.drawChartLine(context, this.opt.padding, paddingY, this.opt.padding, height - paddingY);
		}
	}

	private drawChartLine(ctx: any, x1: number, y1: number, x2: number, y2: number): void {
		if (this.opt.allowMultiColor) {
			ctx.beginPath();
			ctx.moveTo(x1, y1);
		}
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

}
