import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Student.css'

function Student() {

    const [formData,setFormData] = useState({
      name: '',
      rollno: '',
      dept: '',
      section: ''
    })
    const [students,setStudents] = useState('')
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_BASE}/student/allstudents`)
      .then(response => {
        setStudents(response.data)

      })
      .catch((err)=>{
        console.log(err,"while fetching details")
      })

    
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
    //   console.log("form data", formData);
      if (editingId) {
        axios.put(`${import.meta.env.VITE_API_BASE}/student/update/${editingId}`, formData)
          .then(() => {
            alert("Student updated successfully");
            setEditingId(null);
            axios.get(`${import.meta.env.VITE_API_BASE}/student/allstudents`)
              .then(response => setStudents(response.data));
          })
          .catch((err) => console.log(err));
      } else {
        axios.post(`${import.meta.env.VITE_API_BASE}/student/add-student`, formData)
          .then(() => {
            alert("Student fetched Successfully");
            axios.get(`${import.meta.env.VITE_API_BASE}/student/allstudents`)
              .then(response => setStudents(response.data));
          })
          .catch((err) => console.log(err));
      }
      setFormData({
        name: '',
        rollno: '',
        dept: '',
        section: ''
      });
    }

    const handleEdit = (student) => {
      setFormData(student);
      setEditingId(student._id);
    };

    const handleDelete = (id) => {
      axios.delete(`${import.meta.env.VITE_API_BASE}/student/delete/${id}`)
        .then(() => {
          setStudents(students.filter((s) => s._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting student:", err);
        });
    };

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
    }

  return (
    <div className='student-div'
    >
        <h1>SAMPLE PROJECT FOR CRUD OPERATIONS</h1>
        <div className='para'>
        <p >CRUD stands for Create(POST), Read(GET), Update(PUT), and Delete(DELETE), which are the four basic operations used to manage data in applications. These operations allow users to create new data entries, read or retrieve existing records, update or modify existing information, and delete data when it’s no longer needed. CRUD is fundamental to both frontend and backend development, especially when working with databases like MongoDB or SQL, and is commonly implemented through web interfaces or APIs.</p>

        </div>
      <form className='student-form'
      
      onSubmit={handleSubmit}
      >
        <div className='student-text-group text-1'>
        <label htmlFor='name'>Student Name:</label>
        <input type="text" placeholder='Name' name="name" onChange={handleChange} value={formData.name} />
        </div>
        
      <div className='student-text-group text-2'>
      <label htmlFor='rollo'>Roll No:</label>
        <input type="number" placeholder='Rollno' name="rollno" onChange={handleChange}  value={formData.rollno}/>

      </div>
        <div className='student-text-group text-3'>
        <label htmlFor='dept'>Department:</label>
        <input type="text" placeholder='Department' name="dept" onChange={handleChange}  value={formData.dept}/>

        </div>
        <div className='student-text-group text-4'>
        <label htmlFor='section'>Section:</label>
        <input type="text" placeholder='Section' name="section" onChange={handleChange}  value={formData.section}/>

        </div>

        <div className='student-text-group' >
        <button className='button submit-button' type="submit" >Submit</button>
        </div>
        
      </form>

      {students.length>0 && students.map((student,i)=>{
        return <div className='details-div' key={i} >
        <h1>Student Details</h1>
        <h2>Name:{student.name}</h2>
        <h2>Roll No:{student.rollno}</h2>
        <h2>Department:{student.dept}</h2>
        <h2>Section:{student.section}</h2>
        <div className='buttons-div'>
        <button className='edit-button button'  onClick={() => handleEdit(student)}>Edit</button>
        <button className='delete-button button'  onClick={() => handleDelete(student._id)}>Delete</button>
      
        </div>
      </div>
        
      })}
      
    </div>
  )
}

export default Student
