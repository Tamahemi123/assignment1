import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get(`${API_URL}/students`);
    setStudents(response.data);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/students/${id}`);
    fetchStudents();
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/register">
            {/* Registration Form Component */}
          </Route>
          <Route path="/">
            <h2>All Students</h2>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  {/* Add other table headers for student information */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    {/* Display other student information */}
                    <td>
                      <button onClick={() => deleteStudent(student._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

