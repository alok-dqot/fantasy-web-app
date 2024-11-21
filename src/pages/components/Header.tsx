import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import { useRouter } from "next/router";

function Header(props?: any) {
	const route = useRouter();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { series_id, match_id } = route.query;

	return (
		<>
			<main>
				<header>
					<div className='top_menu'>
						<Link href='/home'>
							<h2>Cricket Score Live</h2>
						</Link>
					</div>
					<Navbar expand='sm' className=''>
						<Container fluid>
							<Navbar.Toggle aria-controls='offcanvasNavbar-expand-sm' />
							<Button
								className='btn btn-primary genrate_btn d-xl-none d-md-none d-sm-none'
								onClick={handleShow}>
								Genrate Team
							</Button>
							<Navbar.Offcanvas
								id='offcanvasNavbar-expand-sm'
								aria-labelledby='offcanvasNavbarLabel-expand-sm'
								placement='end'>
								<Offcanvas.Header closeButton>
									<Offcanvas.Title id='offcanvasNavbarLabel-expand-sm'>
										Cricket Score Live
									</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body>
									<Nav className='justify-content-center flex-grow-1 pe-3'>
										<Nav.Link href='/home' className='text-white'>
											Home
										</Nav.Link>
										<Nav.Link href='/latestnews' className='text-white'>
											Cricket
										</Nav.Link>
										<Nav.Link href='/latestnews' className='text-white'>
											{" "}
											Latest News
										</Nav.Link>
										<Nav.Link href='/blog' className='text-white'>
											Blog
										</Nav.Link>
									</Nav>
									<div className=''>
										<Button
											className='btn btn-primary genrate_btn gentrate_desktop'
											style={{
												display:
													route.asPath.startsWith("/team-confirmation") ||
													route.asPath.startsWith("/teampreview") ||
													route.asPath.startsWith("/match")
														? "block"
														: "none",
											}}
											onClick={() => {
												route.push(
													`/team-confirmation/${match_id || props?.match_id}/${
														series_id || props?.series_id
													}`,
												);
											}}>
											Generate Team
										</Button>
									</div>
								</Offcanvas.Body>
							</Navbar.Offcanvas>
						</Container>
					</Navbar>
				</header>
				<div className='model_login'>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Login Here</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className='Login_form'>
								<Form>
									<div className='input_fileds'>
										<Form.Label htmlFor='inputPassword5'>
											Phone Number
										</Form.Label>
										<Form.Control
											type='number'
											id='phonenumber'
											placeholder='Enter Phone Number'
										/>
									</div>
									<div className='input_fileds'>
										<Form.Label htmlFor='inputPassword5'>Password</Form.Label>
										<Form.Control
											type='password'
											id='inputPassword5'
											placeholder='Password'
										/>
									</div>
									<Button className='login_btn'>Login</Button>
								</Form>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</main>
		</>
	);
}

export default Header;
