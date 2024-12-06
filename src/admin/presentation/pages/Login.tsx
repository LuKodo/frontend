import { createSignal } from 'solid-js';
import { Container, Form } from 'solid-bootstrap';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '@solidjs/router';

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

        const logged = await login(username(), password());

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
            <div class="position-relative overflow-hidden radial-gradient min-vh-100 w-100 d-flex align-items-center justify-content-center">
                <div class="d-flex align-items-center justify-content-center w-100">
                    <div class="row justify-content-center w-100">
                        <div class="col-md-8 col-lg-6 col-xxl-3">
                            <div class="card mb-0 bg-body">
                                <div class="card-body">
                                    <h2 class="text-center mb-4">Iniciar sesión</h2>
                                    <div>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label">Usuario</label>
                                            <Form.Control
                                                type="text"
                                                value={username()}
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
                                        <div class="mb-4">
                                            <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                                            <Form.Control
                                                type="password"
                                                value={password()}
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
                                        <button onClick={handleSubmit} class="btn btn-primary w-100 py-8 mb-1 rounded-2">Acceder</button>
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