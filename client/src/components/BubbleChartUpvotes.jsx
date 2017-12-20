import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

@connect((store) => {
  return {
    height: store.analyzer.height,
    tone: store.analyzer.tone,
    width: store.analyzer.width,
  };
}) export default class BubbleChartUpvotes extends React.Component {
  drawChart() {
    var div = new ReactFauxDOM.Element('div');
    var dataset = {};
    const tone = this.props.tone.document_tone;
    const emotionList = tone.tone_categories[0].tones.map(emo =>
      { return {
          Name : emo.tone_name,
          Count: Math.round(emo.score * 100)
        }
      }
    );

    const languageToneList = tone.tone_categories[1].tones.map(lang =>
      { return {
          Name : lang.tone_name,
          Count: Math.round(lang.score * 100)
        }
      }
    );
    const socialToneList = tone.tone_categories[2].tones.map(soc =>
      { return {
          Name : soc.tone_name,
          Count: Math.round(soc.score * 100)
        }
      }
    );
    const allTonesList = emotionList.concat(languageToneList, socialToneList);
    dataset.children = allTonesList;


    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var diameter = this.props.height;
    var bubble = d3.pack(dataset)
                    .size([diameter, diameter])
                    .padding(1.5);

    var svg = d3.select(div)
                .append('svg')
                .attr('width', diameter)
                .attr('height', diameter)
                .attr('class', 'bubble');

    var nodes = d3.hierarchy(dataset)
                  .sum( (d) => {return d.Count;});

    var node = svg.selectAll('.node')
                  .data(bubble(nodes).descendants())
                  .enter()
                  .filter((d)=>{return !d.children})
                  .append('g')
                  .attr('class', 'node')
                  .attr('transform', (d) => {
                    return "translate(" + d.x + "," + d.y + ")";
                  });

        node.append('title')
            .text( (d)=> {
              return d.Name + ': ' + d.Count;
            });

        node.append('circle')
            .attr('r', (d)=> {
              return d.r;
            })
            .style('fill', (d,i)=> {
              return color(i);
            });

        node.append('text')
            .attr('dy', '.2em')
            .style('text-anchor', 'middle')
            .text( (d) => {
              return d.data.Name.substring(0, d.r / 3);
            })
            .attr('font-size', (d) => {return d.r / 5})
            .attr('fill', 'white');

        node.append('text')
            .attr('dy', '1.3em')
            .style('text-anchor', 'middle')
            .text( (d) => {
              return d.data.Count;
            })
            .attr('font-size', (d) => {return d.r /5})
            .attr('fill', 'white');

    d3.select(self.frameElement)
    .style('height', diameter + 'px');
    return div.toReact();
  }

  render() {
    return (
      <div className="container">
        {this.drawChart()}
      </div>
    );
  }
}