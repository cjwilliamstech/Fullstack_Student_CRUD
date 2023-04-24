import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {getStudents} from '../services/StudentService';
import "../App.css";

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        let mounted = true;
        getStudents()
            .then(data => {
                if (mounted) {
                    setStudents(data)
                }

           })
        return () => mounted = false;
    }, []);
    return (
        <div className="row side-row">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Registration Number</th>
              <th>Email</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) =>
              <tr key={stu.id}>
                <td>{stu.studentId}</td>
                <td>{stu.FirstName}</td>
                <td>{stu.LastName}</td>
                <td>{stu.RegistrationNo}</td>
                <td>{stu.Email}</td>
                <td>{stu.Course}</td>
              </tr>)}
          </tbody>
        </Table>
        </div>
    );
};

export default Students;