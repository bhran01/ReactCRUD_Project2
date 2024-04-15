import React, { useState, useEffect } from 'react'
import { Button, Form, Table } from 'react-bootstrap'

export default function CreateStudent() {
  const [teachersIds, setTeachersIds] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/api/students?populate=*`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log('Student --->>>>>', data.data);
        setStudents(data.data);
      })
      .catch()


    // I want to call the get all teacher api
    fetch(`http://localhost:1337/api/teachers`, {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
        console.log('Teacher --->>>>>', data.data);
        setTeacher(data.data)
      })
      .catch(() => {

      })
  }, []);



  let createStudent = () => {
    let payload = {
      "data": {
        "name": document.getElementById('student_name').value,
        "teachers": teachersIds
      }
    }
    //Our payload is ready to send to the server
    console.log(payload);

    fetch(`http://localhost:1337/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert("Student Inserted Succesfully");
        document.querySelector('table#myTable > tbody').innerHTML += `<tr>
                                                                        <td>1</td>
                                                                        <td>${document.getElementById('student_name').value}</td>
                                                                        <td>${teachersIds}</td>
                                                                        <td>
                                                                          <Button class="btn btn-sm me-1 btn-success">View</Button>
                                                                          <Button class="btn btn-sm me-1 btn-primary">Edit</Button>
                                                                          <Button id= class="btn btn-sm me-1 btn-danger" onClick={(e) => { deleteStudent(e) }}>Delete</Button>
                                                                        </td>
                                                                      </tr>`;

        console.log(data);
      })
      .catch(() => { })
  }

  let deleteStudent = (e) => {
    let tr = e.target.closest('tr');
    console.log(tr.querySelector('td:first-child').innerHTML);
    let sid = tr.querySelector('td:first-child').innerHTML;

    let x = window.confirm('Do you really want to delete student');
    console.log(typeof x);
    if (x === true) {
      //alert('Lets call the delete API');
      fetch(`http://localhost:1337/api/students/${sid}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          tr.remove();
          alert('Student Deleted SUccessfully');
        })
        .catch(err => err)
    }
  }

  let handleSelect = (selectedOptions) => {
    const teachersIds = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      teachersIds.push(parseInt(selectedOptions[i].value))
    }
    setTeachersIds(teachersIds);
  }

  return (
    <>
      <div className='container'>
        <h1 className="text-center mt-5">Create Student</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Teacher</Form.Label>

            <Form.Select multiple={true} value={teachersIds} id="teacher" name="teacher[]" aria-label="Default select example" onChange={(e) => { handleSelect(e.target.selectedOptions) }} >
              {
                teacher.map((cv, idx, arr) => {
                  return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                })
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control id="student_name" type="text" placeholder="Enter name" />
          </Form.Group>

          <Button variant="primary" type="button" onClick={() => { createStudent() }}>Submit</Button>
        </Form>

        <br />
        <hr />
        <br />

        <Table striped bordered hover id="myTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Teacher Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((cv, idx, arr) => {
                return <tr key={idx}>
                  <td>{cv.id}</td>
                  <td>{cv.attributes.name}</td>
                  <td>
                    {
                      cv.attributes.teachers.data.map((obj) => {
                        return obj.attributes.name
                      }).toString() //to get the comma separated values
                    }
                  </td>
                  <td>
                    <Button className="btn btn-sm me-1 btn-success">View</Button>
                    <Button className="btn btn-sm me-1 btn-primary">Edit</Button>
                    <Button id={`sid${cv.id}`} className="btn btn-sm me-1 btn-danger" onClick={(e) => { deleteStudent(e) }}>Delete</Button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}
