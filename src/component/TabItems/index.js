import './index.css'

const TabItems = props => {
  const {tabDetails, clickTabItem} = props
  const {tabId, displayText} = tabDetails

  const onClickTabItem = () => {
    clickTabItem(tabId)
    console.log('clicked')
  }

  return (
    <li className="tab-container">
      <button className="tab-btn" type="button" onClick={onClickTabItem}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItems
