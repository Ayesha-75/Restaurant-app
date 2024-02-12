import './index.css'

const RestaurantItem = props => {
  const {itemDetails} = props
  const {
    dishAvail,
    dishCal,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishPrice,
    dishName,
  } = itemDetails

  return (
    <li className="item-container">
      <div>
        <h1 className="item-heading">{dishName}</h1>
        <p className="item-currency">{dishCurrency}</p>
        <p>{dishPrice}</p>
        <div className="desc-cont">
          <p className="desc">{dishDescription}</p>
          <p className="calories">{dishCal} calories</p>
        </div>
        <div className="btn-container">
          <button className="btn" type="button">
            -
          </button>
          <p className="count">0</p>
          <button className="btn" type="button">
            +
          </button>
        </div>
      </div>
      <div>
        <img src={dishImage} className="item-img" />
      </div>
    </li>
  )
}

export default RestaurantItem
