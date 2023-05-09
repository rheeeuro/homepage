import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="header">
        <div className="clock">
          <h1 className="clock-date"></h1>
          <h1 className="clock-time"></h1>
        </div>
        <div className="search">
          <input type="text" name="search" id="search" />
        </div>
        <div className="theme">
          <button>Change Theme</button>
        </div>
      </div>
      <div className="content">
        <div className="todo">
          <div className="todo-todo">
            <h1>To Do</h1>
            <div className="todo-todo-items todo-items">
              <div className="todo-todo-item todo-item">123123123</div>
              <div className="todo-todo-item todo-item">234234234234</div>
              <div className="todo-todo-item todo-item">3453454353</div>
              <div className="todo-todo-item todo-item">567567567</div>
              <div className="todo-todo-item todo-item">34534565353</div>
              <div className="todo-todo-item todo-item">
                1231236547567567123
              </div>
              <div className="todo-todo-item todo-item">123123456456123</div>
              <div className="todo-todo-item todo-item">1231233453123</div>
            </div>
          </div>
          <div className="todo-progress">
            <h1>In Progress</h1>
            <div className="todo-progress-items todo-items">
              <div className="todo-progress-item todo-item">123123123</div>
              <div className="todo-progress-item todo-item">12312341123123</div>
              <div className="todo-progress-item todo-item">dfsgtdfgs</div>
              <div className="todo-progress-item todo-item">12312123</div>
              <div className="todo-progress-item todo-item">vbncxvnbcn</div>
              <div className="todo-progress-item todo-item">123123123</div>
            </div>
          </div>
          <div className="todo-done">
            <h1>Done</h1>
            <div className="todo-done-items todo-items">
              <div className="todo-done-item todo-item">123123123</div>
              <div className="todo-done-item todo-item">123123123</div>
              <div className="todo-done-item todo-item">123123123</div>
              <div className="todo-done-item todo-item">123123123</div>
              <div className="todo-done-item todo-item">123123123</div>
              <div className="todo-done-item todo-item">123123123</div>
            </div>
          </div>
        </div>
        <div className="bookmark">
          <div className="bookmark-item">123</div>
          <div className="bookmark-item">123</div>
          <div className="bookmark-item">123</div>
          <div className="bookmark-item">123</div>
          <div className="bookmark-item">123</div>
        </div>
      </div>
      <div className="footer">Copyright rheeeuro</div>
    </div>
  );
}

export default App;
