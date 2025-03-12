import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlices';
import { fetchCart, mergeCart } from '../redux/slices/cartSlices';

const registerHooks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loading, error } = useSelector((state) => state.auth);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            return;
        }
        dispatch(registerUser({ name, email, password }));
    };
    useEffect(() => {
        if (user && !loading && !error) {
            const userId = user._id;
            const storedGuestId = localStorage.getItem('guestId');
            console.log('registerHooks - userId:', userId, 'storedGuestId:', storedGuestId);
            const handleCart = async () => {
                if (storedGuestId && storedGuestId !== 'undefined' && storedGuestId !== null) {
                    try {
                        const mergeResult = await dispatch(mergeCart({ userId, guestId: storedGuestId })).unwrap();
                        console.log('Merge cart result:', mergeResult);
                        localStorage.removeItem('guestId'); // Xóa guestId sau khi merge
                    } catch (err) {
                        console.error('Failed to merge cart:', err);
                    }
                }
                try {
                    const cartResult = await dispatch(fetchCart({ userId })).unwrap();
                    navigate('/');
                } catch (err) {
                    navigate('/');
                }
            };
            handleCart();
        }
    }, [user, loading, error, dispatch, navigate]);

    return {
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        handleSubmit,
    };
};

export default registerHooks;