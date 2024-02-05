import { fabric } from 'fabric';

const Arrow = fabric.util.createClass(fabric.Line, {
	type: 'arrow',
	superType: 'drawing',
	initialize(points: any, options: any) {
		if (!points) {
			const { x1, x2, y1, y2 } = options;
			points = [x1, y1, x2, y2];
		}
		options = options || {};
		this.callSuper('initialize', points, options);
	},
	_render(ctx: CanvasRenderingContext2D) {
		this.callSuper('_render', ctx);
		ctx.save();
		const xDiff = this.x2 - this.x1;
		const yDiff = this.y2 - this.y1;
		const angle = Math.atan2(yDiff, xDiff);
		ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
		ctx.rotate(angle);
		ctx.beginPath();
		// Move 5px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
		ctx.moveTo(5, 0);
		ctx.lineTo(-5, 5);
		ctx.lineTo(-5, -5);
		ctx.closePath();
		ctx.fillStyle = this.stroke;
		ctx.fill();
		ctx.restore();
	},
});

Arrow.fromObject = (options: any, callback: any) => {
	const { x1, x2, y1, y2 } = options;
	return callback(new Arrow([x1, y1, x2, y2], options));
};

export const PathArrow  = fabric.util.createClass(fabric.Path, {
	type: 'pathArrow',
	superType: 'drawing',
  hasControls: false,
  id: '',
	initialize(points: any, options: any) {
    let path;
    const { path: initPath } = options;
    if (!points && !initPath) {
      const { x1, x2, y1, y2 } = options;
			points = [x1, y1, x2, y2];
      path = svgArrow(points);
    } else if (!initPath) {
      path = svgArrow(points);
    } else {
      path = initPath
    }
    const {id, left, top, strokeDashArray} = options;
    this.id = id
		options = options || {};
		this.callSuper('initialize', path, { fill: '', stroke: 'white', objectCaching: false, top, left, strokeDashArray });
	},
});

export const SineArrow  = fabric.util.createClass(fabric.Path, {
	type: 'sineArrow',
	superType: 'drawing',
  hasControls: false,
  id: '',
	initialize(points: any, options: any) {
    let path;
    const { path: initPath } = options;
    if (!points && !initPath) {
      const { x1, x2, y1, y2 } = options;
			points = [x1, y1, x2, y2];
      path = svgSineArrow(points);
    } else if (!initPath) {
      path = svgSineArrow(points);
    } else {
      path = initPath
    }
    const {id, left, top, strokeDashArray} = options;
    this.id = id
		options = options || {};
		this.callSuper('initialize', path, { obj_type: 'sinePath', strokeWidth: 2 ,fill: '', stroke: 'white', objectCaching: false, top, left, strokeDashArray });
	},
});

const svgSineArrow = (points: any) => {
  const [x1, y1, x2, y2] = points;
  const sq = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
  const tetha = Math.asin((y2-y1)/sq);
  const signX = x2 < x1 ? -1 : 1
  const peakY = (8 * (Math.sin(tetha) - (signX * Math.cos(tetha))));
  const peakX = (8 * (Math.sin(tetha) + (signX * Math.cos(tetha))));
  const moveX = signX * (10 * Math.cos(tetha));
  const moveY = (10 * Math.sin(tetha));
  const n = ~~(sq/10) - 1;
  const repeated = `t ${moveX} ${moveY} `.repeat(n).trim();
  const [arrowX1, arrowY1, arrowX2, arrowY2] = tipArrow(points);

  return `M ${x1} ${y1} q ${peakX} ${peakY} ${moveX} ${moveY} ${repeated} M ${x2} ${y2} L ${arrowX1} ${arrowY1} M ${x2} ${y2} L ${arrowX2} ${arrowY2} z`
}

const svgArrow = (points: any) => {
  const [x1, y1, x2, y2] = points;
  const curveX = (x1+x2)/2;
  const curveY = (y1+y2)/2;
  const [arrowX1, arrowY1, arrowX2, arrowY2] = tipArrow(points);
  const path = `M ${x2} ${y2} C ${curveX} ${curveY} ${x1} ${y1} ${x1} ${y1} M ${x2} ${y2} L ${arrowX1} ${arrowY1} M ${x2} ${y2} L ${arrowX2} ${arrowY2} z`;
  return path
}

export const tipArrow = (points: any) => {
  const [x1, y1, x2, y2] = points;
  const sq = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
  const tetha = Math.asin((y2-y1)/sq);
  const signX = x2 > x1 ? -1 : 1
  const arrowX1 = x2 + signX * 20 * (Math.sin(tetha + Math.PI/4));
  const arrowY1 = y2 + 20 * (Math.cos(tetha + Math.PI/4));
  const arrowX2 = x2 - signX * 20 * (Math.sin(tetha - Math.PI/4));
  const arrowY2 = y2 - 20 * (Math.cos(tetha - Math.PI/4));
  return [arrowX1, arrowY1, arrowX2, arrowY2];
}

// @ts-ignore
window.fabric.Arrow = Arrow;

export default Arrow;
