  render() {
    const div = new ReactFauxDOM.Element('div');
    let data = this.props.emotionData;
    console.log('data', data);
    let padding = 25;
    let margin = {top:25, right:25, bottom:25, left:25},
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

    var tooltip = d3
        .select('body')
        .append('div')
        .attr('class','tooltip')
        .style('opacity',0)

    let tone = this.props.tone.document_tone;
    let sentiment = this.props.sentiment;

    //emotion list array in ['emotion type', score] format
    var socialToneList = tone.tone_categories[2].tones.map((soc) => {
      return [soc.tone_name, Math.round(soc.score*100)];
    })
}