import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import logo from '../assets/logo2.svg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';




class Todo extends Component {


    constructor(props) {
        super(props)
        this.state = {
            username: '',
            events: [],
            current_user: localStorage.getItem('userId'),
            isAuthenticated: false,
            eventTitle: '',
            eventDescription: '',
            eventStatus: '',
            eventDate: ''
        }

    }

    UNSAFE_componentWillMount() {
        this.autoAuth();
        this.loadTodoList();
    }

    loadTodoList = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/events/',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({
                    events: response.data.events
                })
            })
    }

    autoAuth() {
        let token = localStorage.getItem('token')
        if (token != null) {
            this.setState({ isAuthenticated: true })
        };
    }

    validateForm() {
        return this.state.eventTitle.length > 0 && this.state.eventDescription.length > 0 && this.state.eventStatus.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    serializeForm() {
        return (
            {
                title: this.state.eventTitle,
                description: this.state.eventDescription,
                status: this.state.eventStatus,
                date: this.state.eventDate
            }
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to add this event?")) {


            axios.post('http://localhost:3000/api/events/', this.serializeForm(), {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            })
                .then(response => {
                    this.setState({ state: this.state });
                    this.props.history.push("/");
                })
                .catch((err) => {
                    this.setState({
                        error: 'Try Again!'
                    })
                })
        }

    }

    handleDelete = (event) => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete this event?")) {
            let id = event.currentTarget.value;
            axios({
                method: 'delete',
                url: 'http://localhost:3000/api/events/' + id,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log("Event Deleted!")
                })
        }
    }

    render() {
        this.loadTodoList();

        if (!this.state.isAuthenticated) {

            return (
                <Redirect to='/login' />
            )
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="form">
                        <Paper className='root'>
                            <Table className='result-table'>
                                <TableHead>
                                    <TableRow id="table-header">
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={({ backgroundColor: 'rgb(214, 196, 240)' })} >
                                    {this.state.events.map(event => (
                                        <TableRow key={event._id}>
                                            <TableCell component="th" scope="event">
                                                {event.title}
                                            </TableCell>
                                            <TableCell component="th" scope="event">
                                                {event.description}
                                            </TableCell>
                                            <TableCell component="th" scope="event">
                                                {event.status}
                                            </TableCell>
                                            <TableCell component="th" scope="event">
                                                {event.date}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Fab variant="extended" color="secondary" aria-label="Delete" onClick={this.handleDelete} value={event._id}>
                                                    <DeleteIcon />
                                                </Fab>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <ExpansionPanel id="add_event">

                                <ExpansionPanelSummary expandIcon={<AddIcon />}>
                                    <Typography>Got Something On Your Mind?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <form className="form" onSubmit={this.handleSubmit} autoComplete='off'>
                                        <TextField
                                            name="eventTitle"
                                            className='formControl'
                                            placeholder="Title"
                                            value={this.state.eventTitle}
                                            onChange={this.handleChange}
                                            type="text"
                                        />
                                        <br />
                                        <TextField
                                            name="eventDescription"
                                            className='formControl'
                                            placeholder="Description"
                                            onChange={this.handleChange}
                                            type="text"
                                        />
                                        <FormControl className='formControl'>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                onChange={this.handleChange}
                                                value={this.state.eventStatus}
                                                inputProps={{
                                                    name: 'eventStatus',
                                                    id: 'eventStatus'
                                                }}
                                            >
                                                <MenuItem value="1-low">Low</MenuItem>
                                                <MenuItem value="2-medium">Medium</MenuItem>
                                                <MenuItem value="3-high">High</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <br />
                                        <br />

                                        <TextField
                                            name="eventDate"
                                            label="Date"
                                            type="date"
                                            value={this.state.eventDate}
                                            onChange={this.handleChange}
                                            className='formControl'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <br />
                                        <br />
                                        <br />
                                        <Button
                                            id='add-event-button'
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={!this.validateForm()}
                                        ><AddIcon />Add Event</Button><br />
                                    </form>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Paper>
                    </div>
                </header>
            </div>
        )


    }

}
export default withRouter(Todo)