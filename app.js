var allUsers = []
var UserData = localStorage.getItem('Users')

if(UserData !== null){
    allUsers = JSON.parse(UserData)
}

function signUp(){
    var sinEmail = document.getElementById('semail').value;
    var sinPassword = document.getElementById('spass').value;
    
    if(sinEmail == '' && sinPassword == ''){
        document.getElementById('para').innerHTML = 'Please Fill The Form'
    }
    else if(sinEmail == ''){
        document.getElementById('para').innerHTML = 'Please Enter The Email'
    }
    else if(sinPassword == ''){
        document.getElementById('para').innerHTML = 'Please Enter The Password'
    }
    else{
        var users = {
    
            Email : sinEmail,
            Password : sinPassword
        }
        
        allUsers.push(users)
       
        localStorage.setItem('Users', JSON.stringify(allUsers))
        location.href = './signIn.html'
    }

}




function logIn(){
   var logemail = document.getElementById('lemail').value
   var logpassword = document.getElementById('lpass').value

   var filterUser = allUsers.filter(function(data){
       return data.Email === logemail && data.Password === logpassword
   })
     if(logemail == '' && logpassword == ''){
       document.getElementById('para').innerHTML = 'Please Fill The Form'
   }
   else if(logemail == ''){
    document.getElementById('para').innerHTML = 'Please Enter The Email'
    }
    else if(logpassword == ''){
    document.getElementById('para').innerHTML = 'Please Enter The Password'
    }
   else if(filterUser.length){
       location.href = './index.html'
   }
  
     else{
    alert('Your Email / Password Is Wrong So Please Sign Up Again')
    location.href = './signUp.html'
   }

   
}                      
                        
                   
function SIchange(){
    location.href = './signIn.html'
}
function SUchange(){
    location.href = './signUp.html'
}                        
function logOut(){
    alert('Thank You for coming:')
      
      location.href = './signUp.html'
    
    
}                       
                        
                        
                        
                                    
                        // Expense Managment system //
var expenses = [];
var expenseList = document.getElementById("expense-list");
var totalAmount = 0;

function addExpense() {
  var titleInput = document.getElementById("expense-title");
  var amountInput = document.getElementById("expense-amount");
  var dateInput = document.getElementById("expense-date");
  var title = titleInput.value;
  var amount = parseFloat(amountInput.value);
  var date = dateInput.value;

  if (title === "" || isNaN(amount) || date === "") {
    alert("Please fill in all fields with valid data.");
    return;
  }

  var newRow = document.createElement("tr");

  var titleCell = document.createElement("td");
  titleCell.textContent = title;

  var amountCell = document.createElement("td");
  amountCell.textContent = amount.toFixed(2);

  var dateCell = document.createElement("td");
  dateCell.textContent = date;

  var actionCell = document.createElement("td");

  var updateButton = document.createElement("button");
  updateButton.textContent = "Edit";
  updateButton.setAttribute("onclick", "updateExpense(this)");
  actionCell.appendChild(updateButton);
  updateButton.setAttribute("class", "btn btn-success m-2");

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("onclick", "deleteExpense(this)");
  actionCell.appendChild(deleteButton);
  deleteButton.setAttribute("class", "btn btn-danger m-2");

  newRow.appendChild(titleCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(dateCell);
  newRow.appendChild(actionCell);

  expenseList.appendChild(newRow);

  titleInput.value = "";
  amountInput.value = "";
  dateInput.value = "";

  totalAmount += amount;
  displayTotalAmount();
}
function updateExpense(button) {
  var row = button.parentNode.parentNode;
  var titleCell = row.cells[0];
  var amountCell = row.cells[1];
  var dateCell = row.cells[2];

  var updatedTitle = prompt("Enter Updated Title", titleCell.textContent);
  var updatedAmount = parseFloat(
    prompt("Enter Updated Amount", amountCell.textContent)
  );
  var updatedDate = prompt("Enter Updated Date", dateCell.textContent);

  if (updatedTitle === null || isNaN(updatedAmount) || updatedDate === null) {
    alert("Please fill in all fields with valid data.");
    return;
  }

  titleCell.textContent = updatedTitle;
  amountCell.textContent = updatedAmount.toFixed(2);
  dateCell.textContent = updatedDate;
}

function deleteExpense(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);

  var amountCell = row.cells[1];
  var deletedAmount = parseFloat(amountCell.textContent);
  totalAmount -= deletedAmount;
  displayTotalAmount();
}

function deleteAll() {
  expenseList.innerHTML = "";
  totalAmount = 0;
  displayTotalAmount();
}

function displayTotalAmount() {
  var totalAmountElement = document.getElementById("total-amount");

  if (totalAmountElement) {
    totalAmountElement.textContent =
      "Total Amount : " + totalAmount.toFixed(2) + "$";
  }
}

displayTotalAmount();