import { createSignal } from 'react';
import { useAuth } from '@/admin/presentation/contexts/AuthContext.tsx';
import { Container, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (!username || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios',
            })
            return
        }

        const logged = await login(username, password);

        if (!logged) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Credenciales incorrectas',
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Sesión iniciada',
                text: 'Sesión iniciada correctamente',
            }).then(() => {
                navigate('/market/admin/products');
            })
        }

    };

    return (
        <Container>
            <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-6 col-xxl-3">
                            <div className="card mb-0 bg-body">
                                <div className="card-body">
                                    <h2 className="text-center mb-4">Iniciar sesión</h2>
                                    <div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                                            <Form.Control
                                                type="text"
                                                value={username}
                                                onChange={(e) => {
                                                    const { value } = e.target as HTMLInputElement
                                                    setUsername(value)
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSubmit()
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => {
                                                    const { value } = e.target as HTMLInputElement
                                                    setPassword(value)
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSubmit()
                                                    }
                                                }}
                                            />
                                        </div>
                                        <button onClick={handleSubmit} className="btn btn-primary w-100 py-8 mb-1 rounded-2">Acceder</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Login;