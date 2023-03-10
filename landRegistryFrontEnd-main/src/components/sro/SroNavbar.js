import React from 'react';
import { Button, Stack, Badge, Alert, Form, Table, Spinner, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './SroHome.css'

function SroNavbar(props) {

    const { page } = props;
    return (
        <div>
            <Navbar className='sro-navbar' bg="dark" expand="lg">
                <Container >
                    <Navbar.Brand href="#home" className='sro-navbar-text'>Blockchain Land Registry Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" disabled>Home</Nav.Link>

                            <Nav.Link href="/sroAddLand" className='sro-navbar-text'>Add Land</Nav.Link>
                            <Nav.Link href="/sroSearchLand" className='sro-navbar-text'>Search Land</Nav.Link>
                            <Nav.Link href="/sroDeleteLand" className='sro-navbar-text'>Delete Land</Nav.Link>
                            <Nav.Link href="/sroUpdateLand" disabled>Update Land</Nav.Link>

                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                        </Nav>
                        <Nav className='sro-navbar-text2'>SRO - {page}</Nav>
                        <Nav>
                            <Nav.Link className='sro-navbar-text' href="/">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Stack className='text-center'>
                <Navbar bg="secondary" expand="lg" fixed="bottom" className='sro-navbar-bottom m-auto' >
                    <Nav className='m-auto'>
                        ©2023 | KBA Project | v1.0
                    </Nav>
                </Navbar>
            </Stack>
        </div >
    )
}

export default SroNavbar