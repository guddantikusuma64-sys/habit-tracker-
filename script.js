let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
    const habitList = document.getElementById("habitList");
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = habit.name;

        if (habit.completed) {
            span.classList.add("completed");
        }

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.onclick = () => toggleHabit(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.background = "red";
        deleteBtn.onclick = () => deleteHabit(index);

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        habitList.appendChild(li);
    });
}

function addHabit() {
    const input = document.getElementById("habitInput");
    const habitName = input.value.trim();

    if (habitName === "") {
        alert("Please enter a habit!");
        return;
    }

    habits.push({
        name: habitName,
        completed: false
    });

    saveHabits();
    renderHabits();
    input.value = "";
}

function toggleHabit(index) {
    habits[index].completed = !habits[index].completed;
    saveHabits();
    renderHabits();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    saveHabits();
    renderHabits();
}

renderHabits();


3.BACKEND CODE

 from flask import *
import sqlite3

app = Flask(__name__)
app.secret_key = "habit123"

def get_db():
    return sqlite3.connect("database.db")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add", methods=["GET", "POST"])
def add_habit():
    if request.method == "POST":
        data = request.form

        con = get_db()
        cur = con.cursor()

        cur.execute(
            "INSERT INTO habits (habit_name, category, status) VALUES (?,?,?)",
            (data["habit"], data["category"], "Pending")
        )

        con.commit()
        con.close()

        return redirect("/dashboard")

    return render_template("add_habit.html")


@app.route("/dashboard")
def dashboard():

    con = get_db()
    cur = con.cursor()

    cur.execute("SELECT * FROM habits")
    habits = cur.fetchall()

    con.close()

    return render_template("dashboard.html", habits=habits)


@app.route("/complete/<int:id>")
def complete(id):

    con = get_db()
    cur = con.cursor()

    cur.execute(
        "UPDATE habits SET status='Completed' WHERE id=?",
        (id,)
    )

    con.commit()
    con.close()

    return redirect("/dashboard")


@app.route("/delete/<int:id>")
def delete(id):

    con = get_db()
    cur = con.cursor()

    cur.execute("DELETE FROM habits WHERE id=?", (id,))

    con.commit()
    con.close()

    return redirect("/dashboard")
if __name__ == "__main__":
    app.run(debug=True)


