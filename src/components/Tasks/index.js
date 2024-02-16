import './index.css'

const Tasks = props => {
  const {taskDetails} = props
  const {taskName, taskCategory} = taskDetails

  return (
    <li className="list-item">
      <p className="paragraph">{taskName}</p>
      <p className="tag-para">{taskCategory}</p>
    </li>
  )
}

export default Tasks
