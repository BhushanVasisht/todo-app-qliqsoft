import React, {Component} from 'react';
import axios from 'axios';
import {Form, Row, Col, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class NewTodo extends Component {
    state = {
        id : undefined,
        title: "",
        data: "",
        date: "",
        status: false,
        redirect: undefined
    }

    constructor(props)
    {
        super(props);

        if(this.props.location.state !== undefined)
            this.state.id = this.props.location.state.id

        this.updateForm = this.updateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if(this.state.id !== undefined)
        {
            await axios({
                method : 'get',
                url : 'http://localhost:3000/api/v1/todo_events/' + this.state.id
            }).then(async r => {
                let data = r.data.data
                this.setState({title:data.title, data:data.event_data, date:data.event_date, status:data.event_status})
            })
        }
    }

    updateForm = (e) => {
        if(e.target.id === "title")
        {
            this.setState({title: e.target.value})
        }
        else if(e.target.id === "data")
        {
            this.setState({data: e.target.value})
        }
        else if(e.target.id === "date")
        {
            this.setState({date: e.target.value})
        }
        else
        {
            this.setState({status: e.target.value === "1"})
        }
    }

    handleSubmit = async (e) => {
        if(this.state.id === undefined)
        {
            //new event
            await axios({
                method: 'post',
                url: 'http://localhost:3000/api/v1/todo_events/',
                data: {
                    "todo" : {
                        "title" : this.state.title,
                        "event_data" : this.state.data,
                        "event_date" : this.state.date,
                        "event_status" : this.state.status
                    }
                }
            }).then(r => this.setState({redirect: "/"}))
        }
        else
        {
            //old event
            await axios({
                method: 'post',
                url: 'http://localhost:3000/api/v1/todo_events/update',
                data: {
                    "id" : this.state.id,
                    "todo" : {
                        "title" : this.state.title,
                        "event_data" : this.state.data,
                        "event_date" : this.state.date,
                        "event_status" : this.state.status
                    }
                }
            }).then(r => this.setState({redirect: "/"}))
        }
    }

    render(){
        if(this.state.redirect)
        {
            return <Redirect
                to={{
                    pathname: this.state.redirect,
                }}
            />
        }
        else
        {
            return (
                <div>
                    <h2>New Todo</h2>
                    <br/>
                    <Form>
                        <Form.Group as={Row} controlId="title">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type={"text"} required value={this.state.title} onChange={this.updateForm}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="data">
                            <Form.Label column sm={2}>
                                Event Details
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control as={"textarea"} rows={3} required value={this.state.data} onChange={this.updateForm}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="date">
                            <Form.Label column sm={2}>
                                Event Date
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control required value={this.state.date} onChange={this.updateForm}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="status">
                            <Form.Label column sm={2}>
                                Event Status
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control as={"select"} required value={this.state.status === false? "0" : "1"} onChange={this.updateForm}>
                                    <option value="0">Not Done</option>
                                    <option value="1">Done</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                    </Form>
                    <Button variant={"primary"} onClick={this.handleSubmit}>Submit</Button>
                </div>
            );
        }
    }
}

export default NewTodo;
