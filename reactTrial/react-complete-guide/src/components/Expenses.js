import ExpenseItem from "./ExpenseItem";
import './Expenses.css'

function Expenses({expenses}) {
  let items = expenses.map((el, id) =>
     <ExpenseItem
        key={`item_${id}`}
        id={id}
        title={el.title}
        amount={el.amount}
        date={el.date}
    />)
    return (
        <div className="expenses">
            {items}
        </div>
    )
}

export default Expenses