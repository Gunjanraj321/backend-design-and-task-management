import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = "http://localhost:3000";

const TaskManager = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tasks`, {
          headers: { token: `${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${apiUrl}/task`, { task }, {
        headers: { token: `${token}` }
      });
      setTasks([...tasks, task]);
      setTask('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Queue Management System</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TaskManager;
