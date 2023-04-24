import react, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {getStudents, deleteStudent} from '../services/StudentService';
import "../App.css";
import AddStudentModal from './AddStudentModal';
import UpdateStudentModal from './UpdateStudentModal';


const Manage = () => {
    const [students, setStudents] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editStudent, setEditStudent] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (students.length && !isUpdated){
          return;
        }
        getStudents()
            .then(data => {
                if (mounted) {
                    setStudents(data)
                }

           })
        return () => {
          mounted = false;
          setIsUpdated(false);
        }
    }, [isUpdated, students ]);

    const handleAdd = (e) => {
      e.preventDefault();
      setAddModalShow(true);
    };

    const handleUpdate = (e, stu) => {
      e.preventDefault();
      setEditModalShow(true);
      setEditStudent(stu);
    };

    const handleDelete = (e, studentId) => {
      if(window.confirm('Are you Sure?')){
        e.preventDefault();
        deleteStudent(studentId)
        .then((result)=>{
           alert(result);
           setIsUpdated(true);
        },
        (error)=>{
          alert("Failed to Delete Student");
        })
      }
      
    };

    let AddModalClose = () => setAddModalShow(false);
    let EditModalClose = () => setEditModalShow(false);



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
              <th>Action</th>
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
                <td>
                <Button variant="primary" onClick={event => handleUpdate(event, stu)}>Update</Button>{' '}
                <UpdateStudentModal show={editModalShow} onHide={EditModalClose} student={editStudent} 
                setUpdated={setIsUpdated}>
                </UpdateStudentModal>
                <Button variant="danger" onClick={event => handleDelete(event, stu.studentId)}>Delete</Button>{' '}
                </td>
              </tr>)}
          </tbody>
        </Table>
        <ButtonToolbar>
        <Button variant="success"onClick={handleAdd}>Add Student</Button>{' '}
        <AddStudentModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}></AddStudentModal>
        </ButtonToolbar>
        </div>
    );
};

export default Manage;