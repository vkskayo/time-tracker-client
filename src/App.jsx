import DayNavigator from "./components/DayNavigator";
import TaskTable from "./components/TasksTable";
import DayBar from "./components/DayBar";
import "./App.css";
import CreateTaskForm from "./components/CreateTaskForm";

function App() {
  return (
    <div className="App">
      <div className="d-flex home-page-container">
        <DayBar />

        <div className="d-flex flex-column col-10">
          <DayNavigator />
          <CreateTaskForm />
          <TaskTable />
        </div>
      </div>
    </div>
  );
}

export default App;
