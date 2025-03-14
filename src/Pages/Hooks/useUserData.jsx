import { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { authContext } from '../../Provider/AuthProvider';

const useUserData = () => {
    const {user} = useContext(authContext);
    const axiosPublic = useAxiosPublic()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.email}`);
            return res.data;
        }
    });
    return [users, refetch]
};

export default useUserData;