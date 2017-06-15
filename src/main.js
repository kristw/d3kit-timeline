import { axisLeft, axisRight, axisBottom, axisTop } from 'd3-axis';
import { scaleTime } from 'd3-scale';
import 'd3-transition';
import { max, extent } from 'd3-array';
import { SvgChart, helper } from 'd3kit';
import labella from 'labella';

const rectWidth = d => d.w;
const rectHeight = d => d.h;
const identity = d => d;

class Timeline extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      margin: {left: 40, right: 20, top: 20, bottom: 20},
      initialWidth: 400,
      initialHeight: 400,
      scale: scaleTime(),
      domain: undefined,
      direction: 'right',
      dotRadius: 3,
      layerGap: 60,
      labella: {},
      keyFn: undefined,
      timeFn: d => d.time,
      textFn: d => d.text,
      dotColor: '#222',
      labelBgColor: '#222',
      labelTextColor: '#fff',
      linkColor: '#222',
      labelPadding: {left: 4, right: 4, top: 3, bottom: 2},
      textYOffset: '0.85em'
    });
  }

  static getCustomEventNames() {
    return [
      'dotClick',
      'dotMouseover',
      'dotMousemove',
      'dotMouseout',
      'labelClick',
      'labelMouseover',
      'labelMousemove',
      'labelMouseenter',
      'labelMouseleave',
      'labelMouseout'
    ];
  }

  constructor(element, options) {
    super(element, options);

    this.layers.create(['dummy', {main:['axis', 'link', 'label', 'dot']}]);
    this.layers.get('main/axis').classed('axis', true);

    this.force = new labella.Force(options.labella);
    this.setupScale();

    this.updateLabelText = this.updateLabelText.bind(this);
    this.visualize = this.visualize.bind(this);
    this.on('data', this.visualize);
    this.on('options', this.visualize);
    this.on('resize', this.visualize);
  }

  resizeToFit(){
    const options = this.options();
    let maxVal;
    const nodes = this.force.nodes();

    switch(options.direction){
      case 'up':
        maxVal = max(nodes, d => Math.abs(d.y)) || 0;
        this.height(maxVal + options.margin.top + options.margin.bottom);
        break;
      case 'down':
        maxVal = max(nodes, d => Math.abs(d.y + d.dy)) || 0;
        this.height(maxVal + options.margin.top + options.margin.bottom);
        break;
      case 'left':
        maxVal = max(nodes, d => Math.abs(d.x)) || 0;
        this.width(maxVal + options.margin.left + options.margin.right);
        break;
      case 'right':
        maxVal = max(nodes, d => Math.abs(d.x + d.dx)) || 0;
        this.width(maxVal + options.margin.left + options.margin.right);
        break;
    }

    return this;
  }

  updateLabelText(selection, textStyle, accessor){
    const options = this.options();

    accessor = accessor ? helper.functor(accessor) : identity;

    selection
      .text(d => options.textFn(accessor(d)))
      .attr('dy', options.textYOffset)
      .attr('x', options.labelPadding.left)
      .attr('y', options.labelPadding.top);

    Object.keys(textStyle).forEach(key => {
      const styleFn = textStyle[key];
      selection.style(key, (d,i) => styleFn(accessor(d),i));
    });

    return selection;
  }

  setupScale() {
    const options = this.options();
    let axisTransform;

    switch(options.direction){
      case 'right':
        this.axis = axisLeft();
        axisTransform = 'translate('+(0)+','+(0)+')';
        break;
      case 'left':
        this.axis = axisRight();
        axisTransform ='translate('+(this.getInnerWidth())+','+(0)+')';
        break;
      case 'up':
        this.axis = axisBottom();
        axisTransform ='translate('+(0)+','+(this.getInnerHeight())+')';
        break;
      case 'down':
        this.axis = axisTop();
        axisTransform = 'translate('+(0)+','+(0)+')';
        break;
    }

    this.axis.scale(options.scale);
    this.layers.get('main')
      .attr('transform', axisTransform);

    return this;
  }

  updateScale() {
    this.layers.get('main/axis')
      .call(this.axis);

    return this;
  }

  drawDots(data) {
    const options = this.options();
    const timePos = d => options.scale(options.timeFn(d));

    const sUpdate = this.layers.get('main/dot').selectAll('circle.dot')
      .data(data, options.keyFn);

    const field = (options.direction==='left' || options.direction==='right') ? 'cy' : 'cx';

    sUpdate.enter().append('circle')
      .classed('dot', true)
      .on('click', this.dispatchAs('dotClick'))
      .on('mouseover', function(d, i){
        dispatch.dotMouseover(d, i);
      })
      .on('mousemove', function(d, i){
        dispatch.dotMousemove(d, i);
      })
      .on('mouseout', function(d, i){
        dispatch.dotMouseout(d, i);
      })
      .style('fill', options.dotColor)
      .attr('r', options.dotRadius)
      .attr(field, timePos);

    sUpdate.transition()
      .style('fill', options.dotColor)
      .attr('r', options.dotRadius)
      .attr(field, timePos);

    sUpdate.exit().remove();

    return this;
  }

  drawLabels(nodes, labelTextStyle) {
    const options = this.options();
    let nodeHeight;
    if(options.direction==='left' || options.direction==='right'){
      nodeHeight = max(nodes, rectWidth);
    }
    else{
      nodeHeight = max(nodes, rectHeight);
    }

    const renderer = new labella.Renderer({
      nodeHeight,
      layerGap: options.layerGap,
      direction: options.direction
    });

    renderer.layout(nodes);

    function nodePos(d){
      switch(options.direction){
        case 'right':
          return 'translate('+(d.x)+','+(d.y-d.dy/2)+')';
        case 'left':
          return 'translate('+(d.x + nodeHeight - d.w)+','+(d.y-d.dy/2)+')';
        case 'up':
          return 'translate('+(d.x-d.dx/2)+','+(d.y)+')';
        case 'down':
          return 'translate('+(d.x-d.dx/2)+','+(d.y)+')';
      }
    }

    const labelBgColor = helper.functor(options.labelBgColor);
    const linkColor = helper.functor(options.linkColor);

    // Draw label rectangles
    const selection = this.layers.get('main/label').selectAll('g.label-g')
      .data(nodes, options.keyFn ? d => options.keyFn(d.data) : undefined);

    const sEnter = selection.enter().append('g')
      .classed('label-g', true)
      .on('click', function(d, i){
        dispatch.labelClick(d.data, i);
      })
      .on('mouseover', function(d, i){
        dispatch.labelMouseover(d.data, i);
      })
      .on('mousemove', function(d, i){
        dispatch.labelMousemove(d.data, i);
      })
      .on('mouseenter', function(d, i){
        dispatch.labelMouseenter(d.data, i);
      })
      .on('mouseleave', function(d, i){
        dispatch.labelMouseleave(d.data, i);
      })
      .on('mouseout', function(d, i){
        dispatch.labelMouseout(d.data, i);
      })
      .attr('transform', nodePos);

    sEnter
      .append('rect')
      .classed('label-bg', true)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .style('fill', d => labelBgColor(d.data));

    sEnter.append('text')
      .classed('label-text', true)
      .call(this.updateLabelText, labelTextStyle, d => d.data);

    const sTrans = selection.transition()
      .attr('transform', nodePos);

    sTrans.select('rect')
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .style('fill', d => labelBgColor(d.data));

    sTrans.select('text.label-text')
      .call(this.updateLabelText, labelTextStyle, d => d.data);

    selection.exit().remove();

    // Draw path from point on the timeline to the label rectangle
    const paths = this.layers.get('main/link').selectAll('path.link')
      .data(nodes, options.keyFn ? d => options.keyFn(d.data) : undefined);

    paths.enter().append('path')
      .classed('link', true)
      .attr('d', d => renderer.generatePath(d))
      .style('stroke', d => linkColor(d.data))
      .style('fill', 'none');

    paths.transition()
      .attr('d', d => renderer.generatePath(d))
      .style('stroke', d => linkColor(d.data));

    paths.exit().remove();

    return this;
  }

  visualize() {
    if (!this.hasData() || !this.hasNonZeroArea()) return;

    const data = this.data() || [];
    const options = this.options();
    this.force = new labella.Force(options.labella);

    if(options.domain){
      options.scale.domain(options.domain);
    }
    else{
      options.scale
        .domain(extent(data, options.timeFn))
        .nice();
    }
    options.scale.range([0, (options.direction==='left' || options.direction==='right')
      ? this.getInnerHeight()
      : this.getInnerWidth()]
    );

    this.setupScale();
    this.updateScale();
    this.drawDots(data);

    const labelTextStyle = helper.extend({}, options.textStyle);
    Object.keys(labelTextStyle).forEach(key => {
      labelTextStyle[key] = helper.functor(labelTextStyle[key]);
    });
    // for backward compatibility
    labelTextStyle.fill = labelTextStyle.fill || helper.functor(options.labelTextColor);

    const dummyText = this.layers.get('dummy').append('text')
      .classed('label-text', true);

    const timePos = d => options.scale(options.timeFn(d));
    const nodes = data.map(d => {
      const bbox = dummyText
        .call(this.updateLabelText, labelTextStyle, d)
        .node()
        .getBBox();
      const w = bbox.width + options.labelPadding.left + options.labelPadding.right;
      const h = bbox.height + options.labelPadding.top + options.labelPadding.bottom;
      const node = new labella.Node(
        timePos(d),
        (options.direction==='left' || options.direction==='right') ? h : w,
        d
      );
      node.w = w;
      node.h = h;
      return node;
    });

    dummyText.remove();

    this.force.options(options.labella)
      .nodes(nodes)
      .compute();

    this.drawLabels(this.force.nodes(), labelTextStyle);

    return this;
  }
}

export default Timeline;

  //   function drawLabels(nodes, labelTextStyle){


  //   }

  // });
