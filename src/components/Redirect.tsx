import { FC } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';

export const Redirect: FC<{ to: string }> = ({ to }) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to)
    })

    return null
}