import React, {Component} from 'react';
import axios from 'axios';
import {Button, Container, Dropdown, Table} from "react-bootstrap";
import './HomeScreen.css';

class HomeScreen extends Component {
    state = {
        events: []
    }

    constructor() {
        super();
        this.state.events = []

        this.updateRow = this.updateRow.bind(this);
        this.delRow = this.delRow.bind(this);
    }

    async componentDidMount() {
        await axios.get('http://localhost:3000/api/v1/todo_events').then(r => this.setState({events : r.data.data})).catch(e => this.setState({events : []}))
    }

    delRow = async (e) => {
        await axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/todo_events/delete/',
            data: {id: e.target.value}
            }).then(async r => await axios.get('http://localhost:3000/api/v1/todo_events').then(r => this.setState({events : r.data.data})).catch(e => this.setState({events : []})))
    }

    updateRow = async (e) => {
        let ev = this.state.events;
        ev[parseInt(e[0])]['event_status'] = e[1] === 'Done';

        await axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/todo_events/update',
            data: {
                "todo": ev[parseInt(e[0])]
            }}).then(r => this.setState({events : ev}))
    }

    render(){
        if(this.state.events.length > 0)
        {
            let count = 0
            return (
                <Container>
                    <h3 align={'center'} >Todo Events</h3>
                    <Table responsive={"md"} striped bordered size={"sm"}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Event Details</th>
                            <th>Event Date</th>
                            <th>Status</th>
                            <th>Edit/Update Status</th>
                            <th>Delete</th>
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
                                        <p>{item.event_date}</p>
                                    </td>
                                    <td>
                                        {item.event_status ? <p>Done</p> : <p>Not Done</p>}
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant={"info"} id="dropdown-basic">
                                                Select
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey={[count-1, 'Done']} onSelect={this.updateRow}>Done</Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item eventKey={[count-1, 'Not Done']} onSelect={this.updateRow}>Not Done</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
                    <Table striped bordered hover size={"sm"}>
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
