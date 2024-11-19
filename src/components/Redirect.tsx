import { useNavigate } from '@solidjs/router';
import { Component, createEffect } from 'solid-js';

export const Redirect: Component<{ to: string }> = ({ to }) => {
    const navigate = useNavigate();

    createEffect(() => {
        navigate(to)
    })

    return null
}