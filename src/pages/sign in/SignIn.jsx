import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './SignIn.css'

function SignIn() {
    // INPUT VALIDATION: ENSURE FILLED
    const [validated, setValidated] = useState(false)

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }

      setValidated(true)

    }

    return (
      <div className='signInFormContainer'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* SIGN IN FORM TEXT HEADER */}
          <div className='signInFormHeader'>
            <img src="" alt="aim-logo" />
            <h1>Jabatan Audit Dalaman</h1>
            <h2>Selamat Datang</h2>
            <p>Masukkan maklumat log masuk anda</p>
          </div>
  
          {/* SIGN IN FORM CONTENT */}
          <Form.Group className='mb-3' controlId='signInStaffId'>
            <Form.Control required type='text' placeholder='Masukkan ID kakitangan anda' />
            <Form.Control.Feedback type='invalid'>Sila masukkan ID kakitangan anda</Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group className='mb-3' controlId='signInPassword'>
            <Form.Control required type='password' placeholder='Masukkan kata laluan anda'></Form.Control>
            <Form.Control.Feedback type='invalid'>Sila masukkan kata laluan anda</Form.Control.Feedback>
          </Form.Group>
  
          <Button variant='primary' type='submit'> Log Masuk </Button>
  
          {/* CREATE ACCOUNT CTA */}
          <div className='createAccountCta'>
            <p>Bagi pengguna baru, sila {<Link to='/signup'>tekan di sini</Link>}</p>
          </div>
  
        </Form>
      </div>
    
    )
  }

export default SignIn