import {Nav, Navbar, Container} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand>ToDo Application</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            <LinkContainer to={"/"}>
                                <Nav.Link><i className={'fas fa-home'}/> Home</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to={"/newTodo"}>
                                  <Nav.Link><i className={'fas fa-plus'}/> New Event</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
