import React, { Component } from 'react';
import Header from '../Header/Header';
import { Row, Col } from "react-bootstrap";
import "../Style/Task.css";
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Button, FormGroup, Form, Input, Card, Label } from "reactstrap";
import Modal from 'react-bootstrap/Modal';
import { AiFillDelete } from 'react-icons/ai';
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosRefresh,
} from "react-icons/io";
import { FaEdit } from 'react-icons/fa';
class Task extends Component {
    constructor(props) {
        super(props);
        this.state={
          show: false,
          show1: false,
          gettask: [],
          title: "",
          _id:'',
          Description: "",
          completed: false,
          currentPage: 1,
          totalPages: 1,
        }
    }
    handleShow = (e) => {
        this.setState({
            show:!this.state.show
        })
    }
    handleClose = (e) => {
        this.setState({
            show:!this.state.show
        })
  }
  handleShow1 = (e) => {
    this.setState({
        show1:!this.state.show1
    })
}
handleClose1 = (e) => {
    this.setState({
        show1:!this.state.show1
    })
  }
  
  gettaskall = async (page) => {
    const res = await axios.get(`http://localhost:8000/alltask?page=${page}`)
      .then((res) => {
        console.log(res.data)
        const getdata = res.data.tasks
         this.setState({ 
          currentPage: page,
           totalPages: res.data.totalPages,
          gettask: getdata,
         
        })
        console.log(this.state.gettask);
      })
      .catch((err) => {
        console.log(err)
       });
  }; 
  handlePageChange = (selected) => {
    const page = selected.selected + 1;
      this.gettaskall(page);
   
  
   
  };
  componentDidMount() {
    this.gettaskall();
  }
  completecheck= () => {
    this.setState(initialState => ({
      completed: !initialState.completed,
    }));
  }
  handlesubmit = async (e) => {
    e.preventDefault();
    
    const task = {
      title: this.state.title,
      Description:this.state.Description,
      // completed:this.state.completed
    }
    const res = await axios.post(`http://localhost:8000/create`,task)
      .then((res) => {
        console.log(res.data);
        alert("Add success");
        this.gettaskall()
      })
      .catch((err) => {
        console.log(err)
       });
  }
  handleupdate = async (e) => {
    e.preventDefault();
    
    const task = {
      title: this.state.title,
      Description:this.state.Description,
      completed:this.state.completed
    }
    const res = await axios.put(`http://localhost:8000/update/${this.state._id}`,task)
      .then((res) => {
        console.log(res.data);
        alert("update success");
        this.gettaskall()
      })
      .catch((err) => {
        console.log(err)
       });
  }
  handledelete= async(_id, e)=> {
    const res =  await axios.delete(`http://localhost:8000/delete/${_id}`)
    .then((res) => {
      console.log(res.data);
      alert("Delete success");
      this.gettaskall()
    })
    .catch((err) => {
      console.log(err)
     });
  }
  render() {
    const pageNumbers = Array.from({ length: this.state.totalPages }, (_, index) => index + 1);
        return (
            <div>
                <Header />
                <br/>
                <Card className='cardtask'>
                    <button className='addbut' onClick={this.handleShow}>ADD TITLE</button>
              <br />
              <Card className='cardtask1'>
                <br/>
              <table className='tablestask' id="customers">
              <tr>
    <th>TITLE</th>
    <th>DESCRIPTION</th>
                    <th>UPDATE/DELETE</th>
                    <th>status</th>
  </tr>
                {this.state.gettask.map((index) => {
                  return(
                  <tr key={index}>
                      <td>{index.title}</td>
                      <td>{index.Description}</td>
                      <td><span ><AiFillDelete className='delete'  onClick={(e)=>this.handledelete(index._id,e)}/><span onClick={() => { this.setState({ title: index.title, Description: index.Description, completed: index.completed, _id: index._id }) }}><FaEdit onClick={this.handleShow1} className='editicon' /></span></span></td>
                      {index.completed.toString() === "true" ? (
                        <td>completed</td>
                      ) : (
                        <td>Not completed</td>  
                      )}
                      
                </tr>
                )})}
 
  
 
                </table>
                <br/>
</Card>
                    <br />  
        <div>
        <Modal  show={this.state.show} onHide={this.handleClose}>
        <Modal.Header className='modals' closeButton>
          <Modal.Title >ADD TASK</Modal.Title>
                            </Modal.Header>
                            <br/>
                            <Row>
                                <Col>
                                    <Label className='modellabel'>Title:</Label></Col>
                    <Col> <Input className='modelin' type='text'  onChange={(e) => { this.setState({ title:e.target.value } )}}></Input></Col>
                            </Row>  
                            <br/>
                            <Row>
                                <Col>
                                    <Label className='modellabel'>Description:</Label></Col>
                                <Col> <Input className='modelin' type='text'  onChange={(e) => { this.setState({ Description:e.target.value } )}}></Input></Col>
                            </Row> 
                            <br/>
                            {/* <Row>
                                <Col>
                                    <Label className='modellabel'>completed:</Label></Col>
                                <Col> <Input className='modelincheck' type='checkbox' checked={this.state.completed}onChange={this.completecheck }></Input></Col>
                            </Row>  */}
                            <br/>
    
       <Modal.Body>
                                
        </Modal.Body>
        <Modal.Footer>
          <button className='closebut'   onClick={this.handleClose}>
            Close
          </button>
          <button className='successbut' onClick={this.handlesubmit}>
            ADD
          </button>
        </Modal.Footer>
        </Modal>
              </div>
              <div>
              <Modal  show={this.state.show1} onHide={this.handleClose1}>
        <Modal.Header className='modals' closeButton>
          <Modal.Title>Update Task</Modal.Title>
                            </Modal.Header>
                            <br/>
                            <Row>
                                <Col>
                                    <Label className='modellabel'>Title:</Label></Col>
                    <Col> <Input className='modelin' type='text' value={this.state.title}  onChange={(e) => { this.setState({ title:e.target.value } )}}></Input></Col>
                            </Row>  
                            <br/>
                            <Row>
                                <Col>
                                    <Label className='modellabel'>Description:</Label></Col>
                                <Col> <Input className='modelin' type='text' value={this.state.Description} onChange={(e) => { this.setState({ Description:e.target.value } )}}></Input></Col>
                            </Row> 
                            <br/>
                            <Row>
                            <Col>
                                    <Label className='modellabel'>completed:</Label></Col>
                                <Col> <Input className='modelincheck' type='checkbox' checked={this.state.completed}onChange={this.completecheck }></Input></Col>
                            </Row> 
                            <br/>
    
       <Modal.Body>
                                
        </Modal.Body>
        <Modal.Footer>
        <button className='closebut'   onClick={this.handleClose1}>
            Close
          </button>
          <button className='successbut' onClick={this.handleupdate}>
            Update
          </button>
        </Modal.Footer>
        </Modal>
              </div>

              <div className="data-paginate">
              <ReactPaginate
          previousLabel={<IoIosArrowBack />}
          nextLabel={<IoIosArrowForward />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active1'}
          
        />
               
              </div>
                </Card>
            </div>
        );
    }
}

export default Task;
