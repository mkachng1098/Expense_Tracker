let transactions = [
    {
        id:1,
        date:"2026-03-12",
        amount:-372,
        status:"Success",
        type:"expense",
        category:"Travel"
    },
    {
        id:2,
        date:"2026-01-28",
        amount:-12,
        status:"Success",
        type:"expense",
        category:"Drinks"
    },
    {
        id:3,
        date:"2026-02-22",
        amount:-92,
        status:"Success",
        type:"expense",
        category:"Food"
    }
]

let monthlyIncome = 7492
let monthlyExpense = 1490

const today = new Date().toISOString().split("T")[0]

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("incomeDate").value = today
    document.getElementById("expenseDate").value = today
    updateTransactionTable()
})

function openIncomeModel(){
    document.getElementById("incomeModel").style.display="block"
}

function openExpenseModel(){
    document.getElementById("expenseModel").style.display="block"
}

function closeModel(id){
    document.getElementById(id).style.display="none"
}

function addIncome(){

    const amount=parseFloat(document.getElementById("incomeAmount").value)
    const category=document.getElementById("incomeCategory").value
    const description=document.getElementById("incomeDescription").value
    const date=document.getElementById("incomeDate").value

    if(!amount || !category || !description || !date){
        alert("Fill all fields")
        return
    }

    const transaction={
        id:transactions.length+1,
        date,
        category,
        description,
        amount:amount,
        status:"Success",
        type:"income"
    }

    transactions.unshift(transaction)

    monthlyIncome+=amount

    updateTransactionTable()
    closeModel("incomeModel")
}

function addExpense(){

    const amount=parseFloat(document.getElementById("expenseAmount").value)
    const category=document.getElementById("expenseCategory").value
    const description=document.getElementById("expenseDescription").value
    const date=document.getElementById("expenseDate").value

    if(!amount || !category || !description || !date){
        alert("Fill all fields")
        return
    }

    const transaction={
        id:transactions.length+1,
        date,
        category,
        description,
        amount:-amount,
        status:"Success",
        type:"expense"
    }

    transactions.unshift(transaction)

    monthlyExpense+=amount

    updateTransactionTable()
    closeModel("expenseModel")
}

function updateTransactionTable(){

    const tbody=document.querySelector(".transactions-table tbody")
    tbody.innerHTML=""

    transactions.slice(0,10).forEach(t=>{

        const row=document.createElement("tr")

        const formattedDate=new Date(t.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})

        const amountDisplay=t.amount>0
            ?`+$${t.amount.toLocaleString()}`
            :`-$${Math.abs(t.amount).toLocaleString()}`

        row.innerHTML=`
<td>${formattedDate}</td>
<td>${t.category}</td>
<td>${amountDisplay}</td>
<td><span class="status-success">${t.status}</span></td>
<td><button class="action-btn"><i class="fas fa-ellipsis"></i></button></td>
`

        tbody.appendChild(row)

    })

}