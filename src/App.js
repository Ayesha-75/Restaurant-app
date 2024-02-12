import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import RestaurantItem from './component/RestaurantItem'
import TabItems from './component/TabItems'
import './App.css'

const tabList = [
  {tabId: 'Salads and Soup', displayText: 'Salads and Soup'},
  {tabId: 'From The Barnyard', displayText: 'From The Barnyard'},
  {tabId: 'From the Hen House', displayText: 'From the Hen House'},
  {tabId: 'Fresh From The Sea', displayText: 'Fresh From The Sea'},
  {tabId: 'Biryani', displayText: 'Biryani'},
  {tabId: 'Fast Food', displayText: 'Fast Food'},
]

class App extends Component {
  state = {
    list: [],
    activeTabId: tabList[0].tabId,
    count: 1,
  }

  componentDidMount() {
    this.getRestaurantList()
  }

  clickTabItem = tabId => {
    this.setState({activeTabId: tabId})
  }

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrement = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  getRestaurantList = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedList = data.map(each => ({
      restaurantName: each.restaurant_name,
      restaurantId: each.restaurant_id,
      tableMenuList: each.table_menu_list.map(item => ({
        menuCat: item.menu_category,
        menuCatId: item.menu_category_id,
        categoryList: item.category_dishes.map(eachItem => ({
          dishType: eachItem.dish_Type,
          dishCal: eachItem.dish_calories,
          dishCurrency: eachItem.dish_currency,
          dishAvail: eachItem.dish_Availability,
          dishId: eachItem.dish_id,
          dishImage: eachItem.dish_image,
          dishDescription: eachItem.dish_description,
          dishPrice: eachItem.dish_price,
          dishName: eachItem.dish_name,
        })),
      })),
    }))
    // const filteredList = data.table_menu_list.filter(each=> each.menuCat === activeTabId)
    // console.log(filteredList)

    this.setState({list: updatedList})
    console.log(updatedList)
  }

  getFilteredList = updatedList => {
    const {activeTabId, list} = this.state
    const filteredList = updatedList.filter(
      each => each.menuCat === activeTabId,
    )
    console.log(filteredList)
    return filteredList
  }

  render() {
    const {list} = this.state
    // const filteredList = this.getFilteredList()

    return (
      <div className="app-container">
        <div className="container">
          <h1 className="main-heading">UNI Resto Cafe</h1>
          <div className="right-container">
            <p className="my-orders">My Orders</p>
            <div className="cart-icon">
              <AiOutlineShoppingCart />
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        <ul className="tab-list">
          {tabList.map(eachTab => (
            <TabItems
              key={eachTab.tabId}
              tabDetails={eachTab}
              clickTabItem={this.clickTabItem}
            />
          ))}
        </ul>
        <hr className="hr-line" />
        <div>
          {list.map(each => (
            <div>
              {each.tableMenuList.map(sub => (
                <div>
                  {sub.categoryList.map(item => (
                    <ul className="list-items">
                      <RestaurantItem itemDetails={item} key={item.dish_id} />
                    </ul>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
