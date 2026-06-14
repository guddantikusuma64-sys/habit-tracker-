 {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f4f4f4;
    display: flex;
    justify-content: center;
    padding: 50px;
}

.container {
    background: white;
    width: 500px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.input-section {
    display: flex;
    gap: 10px;
}

input {
    flex: 1;
    padding: 10px;
}

button {
    padding: 10px 15px;
    border: none;
    background: #28a745;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background: #218838;
}

ul {
    list-style: none;
    margin-top: 20px;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9f9f9;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.completed {
    text-decoration: line-through;
    color: gray;
}

.actions button {
    margin-left: 5px;
}



