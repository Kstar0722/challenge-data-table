require('./test.css')

var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')
var ReactPivot = require('.')
var data = require('./data.json')

var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'},  
]

var reduce = function(row, memo) {
  
  if(row.type == "impression")
    memo.impressionCount = (memo.impressionCount || 0) + 1
  else if(row.type == "load")
    memo.loadCount = (memo.loadCount || 0) + 1
  else if(row.type == "display")
    memo.displayCount = (memo.displayCount || 0) + 1
  
  memo.loadRate = (memo.loadCount/memo.impressionCount*100).toFixed(1) + "%"
  memo.displayRate = (memo.displayCount/memo.loadCount*100).toFixed(1) + "%"
  return memo
}

var calculations = [
  {
    title: 'Impressions',
    value: 'impressionCount',
    className: 'alignRight'
  },
  {
    title: 'Loads',
    value: 'loadCount',
    className: 'alignRight'
  },
  {
    title: 'Displays',
    value: 'displayCount',
    className: 'alignRight'
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    className: 'alignRight'
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    className: 'alignRight'
  }
  
]

var Test = createReactClass({
  getInitialState: function() {
    return {showInput: false}
  },
  toggleShow: function() {
    var showInput = this.state.showInput
    this.setState({showInput: !showInput})
  },
  render: function() {
    return (
      <div className='test'>
        <h1>React Test</h1>
        <div className={this.state.showInput ? 'hide' : ''}>
          <ReactPivot rows={data}
                      dimensions={dimensions}
                      calculations={calculations}
                      reduce={reduce}
                      activeDimensions={['Transaction Type']}
                      nPaginateRows={20} />
        </div>

        <div className={this.state.showInput ? '' : 'hide'}>
          <textarea
            value={JSON.stringify(data, null, 2)}
            readOnly={true} />
        </div>

        <p>
          <a className={this.state.showInput ? '' : 'strong'}
             onClick={this.toggleShow}>Grid View</a>
          {' | '}
          <a className={this.state.showInput ? 'strong' : ''}
             onClick={this.toggleShow}>Input Data</a>
        </p>
      </div>
    )
  }
})

var el = document.createElement('div')
document.body.appendChild(el)

ReactDOM.render(
  <Test />,
  el
)
