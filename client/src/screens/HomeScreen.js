import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import {Button, Container, Table} from "react-bootstrap";
import './HomeScreen.css';
import endpoints from '../endpoints.js';

class HomeScreen extends Component {
    state = {
        events: [],
        redirect: false,
        id : null
    }

    constructor() {
        super();
        this.state.events = []

        this.updateRow = this.updateRow.bind(this);
        this.delRow = this.delRow.bind(this);
        this.getDateFormat = this.getDateFormat.bind(this);
    }

    componentDidMount() {
        axios.get(endpoints.backend + '/api/v1/todo_events').then(r => this.setState({events : r.data.data})).catch(e => this.setState({events : []}))
    }

    delRow = async (e) => {
        await axios({
            method: 'post',
            url: endpoints.backend + '/api/v1/todo_events/delete/',
            data: {id: e.target.value}
            }).then(r => axios.get(endpoints.backend + '/api/v1/todo_events').then(r => this.setState({events : r.data.data})).catch(e => this.setState({events : []})))
    }

    updateRow = (e) => {
        this.setState({id : e.target.value, redirect : true})
    }

    getDateFormat = (date) => {
        let _ = date.split("-")
        return _[1] + '-' + _[2] + '-' + _[0]
    }

    render(){
        if(this.state.redirect)
        {
            return <Redirect
                to={{
                    pathname: "/newTodo",
                    state: {
                        id: this.state.id
                    }
                }}
            />
        }
        else if(this.state.events.length > 0)
        {
            let count = 0
            return (
                <Container>
                    <h3 align={'center'} >Todo Events</h3>
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Event Details</th>
                            <th>Event Date</th>
                            <th>Status</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.events.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <p>{++count}</p>
                                    </td>
                                    <td>
                                        <p>{item.title}</p>
                                    </td>
                                    <td>
                                        <p>{item.event_data}</p>
                                    </td>
                                    <td>
                                        <p>{this.getDateFormat(item.event_date)}</p>
                                    </td>
                                    <td>
                                        {item.event_status ? <p>Done</p> : <p>Not Done</p>}
                                    </td>
                                    <td>
                                        <Button variant={"primary"} value={item.id} onClick={this.updateRow}>Edit Event</Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" value={item.id} onClick={this.delRow}>Delete</Button>{' '}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Container>
            );
        }
        else
        {
            return (
                <Container>
                    <h3 align={'center'} >Todo Events</h3>
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Event Details</th>
                            <th>Event Date</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                    </Table>
                </Container>
            );
        }
    }
}

export default HomeScreen;
