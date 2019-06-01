import React, { Component } from 'react'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialTime: props.initialTime,
      timeRemaining: props.initialTime,
      timeExpired: false,
      prevTick: 0,
      timerRunning: false,
      pollInterval: null,
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.controlButton = this.controlButton.bind(this)
    this.tick = this.tick.bind(this)
  }
  
  componentDidMount() {
    if (this.props.startImmediately) {
      this.startTimer()
    }
  }

  componentDidUpdate(prevProps){
    if (prevProps.initialTime !== this.props.initialTime) {
      this.setState({
        initialTime: this.props.initialTime
      })
    }
  }

  startTimer() {
    this.setState({
      prevTick: Date.now(),
      timerRunning: true,
      pollInterval: setInterval(this.tick, 10)
    })
  }

  stopTimer() {
    clearInterval(this.state.pollInterval)
    this.setState({
      timerStarted: 0,
      timerRunning: false
    })
  }

  resetTimer() {
    this.stopTimer()
    this.setState({
      timeRemaining: this.state.initialTime
    })
  }

  tick() {
    const { timerRunning, timeRemaining, pollInterval } = this.state
    
    if (timerRunning && timeRemaining > 0) {
      this.setState(prevState => {
        const timeRemaining = prevState.timeRemaining - (Date.now() - prevState.prevTick)
        return {
          timeRemaining: timeRemaining > 0 ? timeRemaining : 0,
          prevTick: Date.now()
        }
      })
    } else {
      clearInterval(pollInterval)
      this.setState({
        timeRemaining: 0,
        timerRunning: false,
        timeExpired: true
      })
      if (this.props.onExpiration){
        this.props.onExpiration()
      }
    }
  }

  renderTime(time) {
    const seconds = ((time % 60000) / 1000).toFixed(2)
    const minutes = (time - (time % 60000)) / 60000
    return `${minutes ? minutes + ':' : ''}${seconds < 10 && minutes ? `0${seconds}` : seconds}`
  }

  controlButton() {
    const { timerRunning, timeRemaining } = this.state
    if (!timeRemaining) {
      return null
    } else {
      return timerRunning
        ? <button disabled={!timerRunning} onClick={this.stopTimer} >Stop</button>
        : <button disabled={timerRunning} onClick={this.startTimer} >Start</button>
    }
  }

  render() {
    const { state: { timeRemaining }, renderTime, resetTimer, controlButton } = this

    return (
      <div>
        <h1>{renderTime(timeRemaining)}</h1>
        {controlButton()}
        <button onClick={resetTimer}>Reset</button>
      </div>
    )
  }
}

export default Timer
