import './share';
import './style.css';

import d3KitTimeline from '../../src/main';
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';

const data = [
  {time: new Date(1977, 4,25), episode: 4, name: 'A New Hope'},
  {time: new Date(1980, 4,17), episode: 5, name: 'The Empire Strikes Back'},
  {time: new Date(1984, 4,25), episode: 6, name: 'Return of the Jedi'},
  {time: new Date(1999, 4,19), episode: 1, name: 'The Phantom Menace'},
  {time: new Date(2002, 4,16), episode: 2, name: 'Attack of the Clones'},
  {time: new Date(2005, 4,19), episode: 3, name: 'Revenge of the Sith'},
  {time: new Date(2015,11,18), episode: 7, name: 'The Force Awakens'},
];

const data2 = [
  {time: 1,  name: 'MÜller',  team: 'GER'},
  {time: 23, name: 'Klose',   team: 'GER'},
  {time: 24, name: 'Kroos',   team: 'GER'},
  {time: 26, name: 'Kroos',   team: 'GER'},
  {time: 29, name: 'Khedira', team: 'GER'},
  {time: 69, name: 'SchÜrrle', team: 'GER'},
  {time: 79, name: 'SchÜrrle', team: 'GER'},
  {time: 90, name: 'Oscar', team: 'BRA'},
];

const colorScale = scaleOrdinal(schemeCategory10);

//---------------------------------------------------

const chart = new d3KitTimeline('#t1', {
  direction: 'right',
  initialWidth: 400,
  initialHeight: 250,
  textFn: d => [d.time.getFullYear(), d.name].join(' - '),
}).data(data);

const chart2 = new d3KitTimeline('#t2', {
  direction: 'left',
  initialWidth: 400,
  initialHeight: 250,
  margin: {left: 20, right: 20, top: 20, bottom: 20},
  textFn: d => [d.name, d.time.getFullYear()].join(' - '),
  labelBgColor: '#777',
  linkColor: '#777',
  formatAxis: axis => axis.ticks(0).tickSize(0)
});
chart2.data(data);

//---------------------------------------------------

const chart1x = new d3KitTimeline('#t1x', {
  direction: 'right',
  initialHeight: 250,
  textFn: d => [d.time.getFullYear(), d.name].join(' - '),
})

chart1x
  .data(data)
  .visualize()
  .resizeToFit();

const chart2x = new d3KitTimeline('#t2x', {
  direction: 'left',
  initialHeight: 250,
  margin: {left: 20, right: 20, top: 20, bottom: 20},
  textFn: d => [d.name, d.time.getFullYear()].join(' - '),
  labelBgColor: '#777',
  linkColor: '#777',
  formatAxis: axis => axis.ticks(0).tickSize(0)
});

chart2x
  .data(data)
  .updateDimensionNow()
  .resizeToFit();

//---------------------------------------------------

function color3(d){
  return colorScale(d.name);
}

const chart3 = new d3KitTimeline('#timeline3', {
  direction: 'up',
  initialWidth: 804,
  margin: {left: 20, right: 20, top: 20, bottom: 30},
  textFn: d => d.name,
  layerGap: 40,
  dotColor: color3,
  labelBgColor: color3,
  linkColor: color3,
  labella: {
    maxPos: 800
  }
});
chart3
  .data(data)
  .updateDimensionNow()
  .resizeToFit();

//---------------------------------------------------

function color4(d){
  return colorScale(Math.ceil(d.episode/3));
}

const chart4 = new d3KitTimeline('#timeline4', {
  direction: 'down',
  initialWidth: 804,
  margin: {left: 20, right: 20, top: 30, bottom: 20},
  textFn: d => d.name,
  layerGap: 40,
  dotColor: color4,
  labelBgColor: color4,
  linkColor: color4,
  labella: {
    maxPos: 800,
    algorithm: 'simple'
  }
});
chart4
  .data(data)
  .updateDimensionNow()
  .resizeToFit();

//---------------------------------------------------

function color5(d){
  return colorScale(d.team);
}

const chart5 = new d3KitTimeline('#timeline5', {
  direction: 'up',
  initialWidth: 804,
  scale: scaleLinear(),
  domain: [0,90],
  formatAxis: axis => axis.tickFormat(d => `${d}'`),
  margin: {left: 20, right: 20, top: 20, bottom: 30},
  textFn: d => d.name,
  layerGap: 40,
  dotColor: color5,
  labelBgColor: color5,
  linkColor: color5,
  labella: {
    maxPos: 764,
    algorithm: 'simple'
  }
});
chart5
  .data(data2)
  .updateDimensionNow()
  .resizeToFit();

//---------------------------------------------------

function color6(d){
  return colorScale(d.team);
}

const chart6 = new d3KitTimeline('#timeline6', {
  direction: 'up',
  initialWidth: 804,
  scale: scaleLinear(),
  domain: [0,90],
  formatAxis: axis => axis.tickFormat(d => `${d}'`),
  margin: {left: 20, right: 20, top: 20, bottom: 30},
  textFn: d => d.name,
  layerGap: 40,
  dotColor: color6,
  labelBgColor: color6,
  linkColor: color6,
  labella: {
    maxPos: 764,
    algorithm: 'simple'
  },
  textStyle: {
    'fill': d => d.team==='BRA'? '#000': '#fff',
    'text-decoration' : d => d.team==='BRA'? 'none': 'underline',
    'font-weight': d => d.team==='BRA'? 700: 400
  }
});

chart6
  .data(data2)
  .updateDimensionNow()
  .resizeToFit();
