/**
 * @file Grid.js
 * @author Davis Yarbrough
 * @date 6/9/2014
 */
 
/*
 * Grid class
 * @param settings Object containing initializations for the Grid
 */
var Grid = klass(function (settings) {
	this.lineColor = settings.lineColor;
	this.lineSpacing = settings.lineSpacing;
	this.labelColor = settings.labelColor;
})
	.methods({
		render: function (ctx) {
			ctx.beginPath();
			ctx.strokeStyle = this.strokeStyle;
			ctx.lineWidth = 1;
			ctx.font = '8px Arial';
			for (var y = this.lineSpacing; y < ctx.canvas.height; y += this.lineSpacing)
			{
				y = Math.floor(y) + 0.5;
				ctx.moveTo(0, y);
				ctx.lineTo(ctx.canvas.width, y);
				ctx.stroke();
				ctx.fillText(y - 0.5, 0, y - 2);
			}
			for (var x = this.lineSpacing; x < ctx.canvas.width; x += this.lineSpacing)
			{
				x = Math.floor(x) + 0.5;
				ctx.moveTo(x, 0);
				ctx.lineTo(x, ctx.canvas.height);
				ctx.stroke();
				//ctx.save();
				//ctx.rotate(Math.PI);
				//ctx.fillText(x - 0.5, x - 2, 0);
				//ctx.restore();
			}
		}
	});