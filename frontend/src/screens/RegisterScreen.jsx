import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from 'react-toastify';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);
    // const { pathname } = useLocation();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    // const redirect = pathname || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                toast.success('Login Successful');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };


    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter name"
                        autoComplete='name'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="my-2">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder="Enter email"
                        autoComplete='email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Enter password"
                        autoComplete='new-password'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="my-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Re-Enter password"
                        autoComplete="nah"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type="submit" variant="primary" className="mt-2" >Register</Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    Already have an account?<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Click Here To Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;