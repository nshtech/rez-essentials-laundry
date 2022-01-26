import React, { Component } from 'react'
import * as emailjs from 'emailjs-com'
import { Button, FormFeedback, Form, FormGroup, Label, Input } from 'reactstrap'
import firebase from './shared/firebase'
import 'firebase/database';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

class ForgotEmail extends Component {
  state = {
    id:'',
    email: '',
  }

checkUser() {
    const {email, id} = this.state
      const db = firebase.database().ref()
      console.log(this.state.email)
      // console.log(password)
      let newid = ''
          db.child('/customers/').on("value", function (snapshot) {
              console.log(snapshot.val());
              snapshot.forEach(function (data) {
                  console.log(data.val().email)
                  console.log(data.val().id)

                  if (data.val().email == email) {
                      newid = data.val().id;
                      localStorage.setItem('user_id', newid);
                      console.log('updated id:')
                      console.log(newid)

                      // localStorage.setItem('user_password', password);

                  }

              });
          });

          // const isuser = localStorage.getItem('user_id');
          // console.log(isuser)
          // if (!isuser) {
          //     setOpen(true);
          // }
      // }

      this.setState({
        id: newid,
      })
    return 1;
  };

async handleSubmit(e) {
    e.preventDefault()
    const {email, id} = this.state


     let j = this.checkUser()
     await j;
     console.log('this is the id:')
     console.log(this.state.id)
     if(this.state.id != ""){
     let templateParams = {

       to_email: email,
       user_id: id

      }


     emailjs.init("user_Bx7rV9Pnz8ZVdzm6FUXwo");
     console.log('sending')
     emailjs.send(
      'service_8se7duq',
      'template_vlh7dj6',
       templateParams,
     );


     console.log('hi')

     this.resetForm()
   }
 }

resetForm() {
    this.setState({
      email: '',
    })
  }
handleChange = (param, e) => {
    this.setState({ [param]: e.target.value })
  }

render() {
    return (
      <>
        <Paper elevation={3} />
          <Typography  component="h1" variant="h5">Receive an Email with your Customer ID:</Typography>
          <Form className="test-box" onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="formBasicEmail">
              <Label className="text-muted">Email address: </Label>
              <Input
                type="email"
                name="email"
                value={this.state.email}
                className="text-primary"
                onChange={this.handleChange.bind(this, 'email')}
                placeholder="Enter email"
              />
            </FormGroup>

<Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Paper />

      </>
    )
  }
}
export default ForgotEmail
