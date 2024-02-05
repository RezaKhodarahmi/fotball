import { FabricObjectOption, WorkareaObject } from '../utils';

export const canvasOption = {
	preserveObjectStacking: true,
	selection: true,
	defaultCursor: 'default',
	backgroundColor: '#777',
};

export const keyEvent = {
	move: true,
	all: true,
	copy: true,
	paste: true,
	esc: true,
	del: true,
	clipboard: false,
	transaction: true,
	zoom: false,
	cut: true,
	grab: true,
};

export const gridOption = {
	enabled: false,
	grid: 10,
	snapToGrid: false,
	lineColor: '#ebebeb',
	borderColor: '#cccccc',
};

export const workareaOption: Partial<WorkareaObject> = {
	width: 1150,
	height: 690,
	lockScalingX: true,
	lockScalingY: true,
	scaleX: 1,
	scaleY: 1,
	backgroundColor: '#777',
	hasBorders: false,
	hasControls: false,
	selectable: false,
	lockMovementX: true,
	lockMovementY: true,
	hoverCursor: 'default',
	name: '',
	id: 'workarea',
	type: 'image',
	layout: 'fixed', // fixed, responsive, fullscreen
	link: {},
	tooltip: {
		enabled: false,
	},
	isElement: false,
};

export const objectOption: Partial<FabricObjectOption> = {
	rotation: 0,
	centeredRotation: true,
	strokeUniform: true,
};

export const guidelineOption = {
	enabled: false,
};

export const activeSelectionOption = {
	hasControls: true,
};

export const propertiesToInclude = ['id', 'name', 'parentId', 'fillIndex', 'strokeDashArray', 'name', 'locked', 'editable'];
