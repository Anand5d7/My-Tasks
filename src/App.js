import {Component} from 'react'
import {v4} from 'uuid'
import Tasks from './components/Tasks'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    myTasksList: [],
    inputTask: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onClickAddButton = () => {
    const {inputTask, selectTag} = this.state
    const taskName = inputTask
    const taskCategory = selectTag
    const id = v4()
    const bgColor = false

    if (taskName.length !== 0) {
      this.setState(prevState => ({
        myTasksList: [
          ...prevState.myTasksList,
          {id, taskName, taskCategory, bgColor},
        ],
        inputTask: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  onChangeInputTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeSelectTag = event => {
    this.setState({selectTag: event.target.value})
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {myTasksList, inputTask, selectTag, activeTag} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? myTasksList
        : myTasksList.filter(eachItem => eachItem.taskCategory === activeTag)

    return (
      <div className="main-container">
        <div className="container-1">
          <h1 className="heading">Create a task!</h1>
          <form className="form-container">
            <label className="label" htmlFor="textInput">
              Task
            </label>
            <input
              type="text"
              id="textInput"
              placeholder="Enter the task here"
              value={inputTask}
              onChange={this.onChangeInputTask}
              className="input-text"
            />
            <label className="label" htmlFor="optionInput">
              Tags
            </label>
            <select
              id="optionInput"
              value={selectTag}
              onChange={this.onChangeSelectTag}
              className="select-container"
            >
              {tagsList.map(eachTag => (
                <option value={eachTag.optionId}>{eachTag.displayText}</option>
              ))}
            </select>
          </form>
          <button
            className="button"
            type="button"
            onClick={this.onClickAddButton}
          >
            Add Task
          </button>
        </div>
        <div className="container-2">
          <h1 className="side-heading">Tags</h1>
          <ul className="tags-container">
            {tagsList.map(eachTag => {
              // eslint-disable-next-line
              const isActive = activeTag === eachTag.optionId
              return (
                <li className="list-item-container" key={eachTag.optionId}>
                  <button
                    className="tag-button"
                    type="button"
                    value={eachTag.optionId}
                    onClick={this.onClickTag}
                  >
                    {eachTag.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="side-heading">Tasks</h1>
          <ul className="task-container">
            {filterTaskList.length === 0 ? (
              <p className="para">No Tasks Added Yet</p>
            ) : (
              filterTaskList.map(eachTask => (
                <Tasks key={eachTask.id} taskDetails={eachTask} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
